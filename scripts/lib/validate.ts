// Content validation rules. Pure functions over parsed articles/plan so
// vitest can exercise them; scripts/validate-content.ts is the CLI wrapper.
import { CATEGORIES } from '../../src/lib/taxonomy';
import { calculators } from '../../src/data/calculators';
import type { PlanEntry, RawArticle } from './load';

const CALCULATOR_IDS = new Set(calculators.map((c) => c.id));
const CALCULATOR_HREFS = new Set(calculators.map((c) => c.href));

// Static, always-existing site routes article bodies may link to.
const STATIC_ROUTES = new Set(['/', '/blog/', '/about/', '/contact/', '/privacy-policy/', '/terms/']);

// Labeled template blocks that must never appear in article bodies.
export const FORBIDDEN_BLOCK_RE =
  /^\s*(?:\*\*|__|#+\s*)?(good for|best for|perfect for|who (?:it'?s|it is) for|example use case|action step|next steps?|pro tip|key takeaway)\s*(?:\*\*|__)?\s*:/im;

export interface ValidationIssue {
  file: string;
  message: string;
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function publishTime(article: RawArticle): number | null {
  const value = article.data.publishDate;
  if (isValidDate(value)) return value.getTime();
  if (typeof value === 'string') {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.getTime();
  }
  return null;
}

const MARKDOWN_LINK_RE = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

export function extractInternalLinks(body: string): string[] {
  const links: string[] = [];
  for (const match of body.matchAll(MARKDOWN_LINK_RE)) {
    const href = match[1];
    if (href.startsWith('/')) links.push(href.split('#')[0]);
  }
  return links;
}

/**
 * Validates all articles as a set. Every article-to-article reference
 * (frontmatter relatedArticles AND markdown body links) is checked against
 * the TARGET's publishDate relative to the SOURCE's publishDate — a source
 * may never reference an article published after itself, regardless of when
 * validation runs.
 */
export function validateArticles(articles: RawArticle[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const bySlug = new Map<string, RawArticle>();

  for (const article of articles) {
    const { file, data } = article;
    const err = (message: string) => issues.push({ file, message });

    if (typeof data.title !== 'string' || data.title.trim() === '') err('empty or missing title');
    if (typeof data.description !== 'string' || data.description.trim() === '')
      err('empty or missing description');
    if (publishTime(article) === null)
      err(`invalid or missing publishDate (got: ${JSON.stringify(data.publishDate ?? null)})`);
    if (typeof data.category !== 'string' || !(CATEGORIES as readonly string[]).includes(data.category))
      err(`invalid category "${String(data.category)}" — must be one of taxonomy.ts CATEGORIES`);
    if (typeof data.primaryKeyword !== 'string' || data.primaryKeyword.trim() === '')
      err('empty or missing primaryKeyword');

    for (const id of (data.relatedCalculators as string[] | undefined) ?? []) {
      if (!CALCULATOR_IDS.has(id)) err(`unknown calculator id "${id}" (see src/data/calculators.ts)`);
    }

    if (bySlug.has(article.slug)) {
      err(`duplicate slug "${article.slug}" (also used by ${bySlug.get(article.slug)!.file})`);
    } else {
      bySlug.set(article.slug, article);
    }
  }

  // Duplicate primary keywords across articles.
  const byKeyword = new Map<string, string>();
  for (const article of articles) {
    const keyword = String(article.data.primaryKeyword ?? '').toLowerCase().trim();
    if (!keyword) continue;
    const existing = byKeyword.get(keyword);
    if (existing) {
      issues.push({
        file: article.file,
        message: `duplicate primaryKeyword "${keyword}" (also used by ${existing})`,
      });
    } else {
      byKeyword.set(keyword, article.file);
    }
  }

  // Cross-article references, judged at the source article's publish time.
  for (const article of articles) {
    const sourceTime = publishTime(article);
    const err = (message: string) => issues.push({ file: article.file, message });

    for (const slug of (article.data.relatedArticles as string[] | undefined) ?? []) {
      const target = bySlug.get(slug);
      if (!target) {
        err(`relatedArticles references unknown slug "${slug}"`);
        continue;
      }
      if (target.data.draft === true) err(`relatedArticles references draft article "${slug}"`);
      const targetTime = publishTime(target);
      if (sourceTime !== null && targetTime !== null && targetTime > sourceTime)
        err(`relatedArticles references "${slug}" published after this article`);
    }

    for (const link of extractInternalLinks(article.body)) {
      const blogMatch = link.match(/^\/blog\/([^/]+)\/?$/);
      if (blogMatch) {
        const target = bySlug.get(blogMatch[1]);
        if (!target) {
          err(`body links to nonexistent article ${link}`);
          continue;
        }
        if (target.data.draft === true) err(`body links to draft article ${link}`);
        const targetTime = publishTime(target);
        if (sourceTime !== null && targetTime !== null && targetTime > sourceTime)
          err(`body links to ${link}, which publishes after this article`);
        continue;
      }
      if (CALCULATOR_HREFS.has(link) || STATIC_ROUTES.has(link)) continue;
      err(`body links to unknown internal path ${link} (allowed: calculators, /blog/<slug>/, static pages)`);
    }

    if (FORBIDDEN_BLOCK_RE.test(article.body)) {
      const label = article.body.match(FORBIDDEN_BLOCK_RE)?.[1];
      err(`forbidden labeled block "${label}:" — weave this into prose instead`);
    }
  }

  return issues;
}

/** Validates the 300-article generation plan for internal consistency. */
export function validatePlan(plan: PlanEntry[], existingArticles: RawArticle[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const err = (slug: string, message: string) => issues.push({ file: `plan:${slug}`, message });

  if (plan.length !== 500) {
    issues.push({ file: 'content-plan.json', message: `plan must contain exactly 500 entries, found ${plan.length}` });
  }

  const planSlugs = new Set<string>();
  const keywords = new Map<string, string>();
  const existingSlugs = new Set(existingArticles.map((a) => a.slug));
  const existingKeywords = new Set(
    existingArticles.map((a) => String(a.data.primaryKeyword ?? '').toLowerCase().trim()).filter(Boolean),
  );
  const byPlanSlug = new Map(plan.map((entry) => [entry.slug, entry]));

  for (const entry of plan) {
    if (!entry.title?.trim()) err(entry.slug, 'empty title');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) err(entry.slug, `invalid slug "${entry.slug}"`);
    if (planSlugs.has(entry.slug)) err(entry.slug, 'duplicate slug within plan');
    planSlugs.add(entry.slug);
    if (existingSlugs.has(entry.slug) && !byPlanSlug.get(entry.slug)?.pillar) {
      // A plan slug may match an existing file only once that file was generated from the plan.
      const generated = existingArticles.find((a) => a.slug === entry.slug);
      if (generated && String(generated.data.primaryKeyword).toLowerCase() !== entry.primaryKeyword.toLowerCase()) {
        err(entry.slug, 'slug collides with an existing article that is not this plan entry');
      }
    }

    const time = Date.parse(entry.publishDate);
    if (Number.isNaN(time)) err(entry.slug, `invalid publishDate "${entry.publishDate}"`);
    if (!entry.publishDate?.endsWith('Z')) err(entry.slug, 'publishDate must be UTC (end with Z)');

    if (!(CATEGORIES as readonly string[]).includes(entry.category))
      err(entry.slug, `invalid category "${entry.category}"`);

    const keyword = entry.primaryKeyword?.toLowerCase().trim();
    if (!keyword) {
      err(entry.slug, 'empty primaryKeyword');
    } else {
      const dupe = keywords.get(keyword);
      if (dupe) err(entry.slug, `duplicate primaryKeyword "${keyword}" (also in plan:${dupe})`);
      keywords.set(keyword, entry.slug);
      if (existingKeywords.has(keyword)) {
        const owner = existingArticles.find(
          (a) => String(a.data.primaryKeyword ?? '').toLowerCase().trim() === keyword,
        );
        if (owner && owner.slug !== entry.slug)
          err(entry.slug, `primaryKeyword "${keyword}" already used by existing article ${owner.file}`);
      }
    }

    for (const id of entry.relatedCalculators ?? []) {
      if (!CALCULATOR_IDS.has(id)) err(entry.slug, `unknown calculator id "${id}"`);
    }
  }

  return issues;
}
