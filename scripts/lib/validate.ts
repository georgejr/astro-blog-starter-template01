// Content validation rules. Pure functions over parsed articles/plan so
// vitest can exercise them; scripts/validate-content.ts is the CLI wrapper.
import { CATEGORIES } from '../../src/lib/taxonomy';
import { calculators } from '../../src/data/calculators';
import { STATE_SOLAR, stateSlug } from '../../src/data/state-solar';
import { CITIES, citySlug } from '../../src/data/city-solar';
import type { RawArticle } from './load';

const CALCULATOR_IDS = new Set(calculators.map((c) => c.id));
const CALCULATOR_HREFS = new Set(calculators.map((c) => c.href));

// Static, always-existing site routes article bodies may link to.
const STATIC_ROUTES = new Set([
  '/',
  '/blog/',
  '/about/',
  '/methodology/',
  '/contact/',
  '/privacy-policy/',
  '/terms/',
  '/solar-panel-cost-by-state/',
  '/solar-panel-cost-by-city/',
]);

// Data pages generated from src/data: /solar-panel-cost-by-state/<state>/ and
// /solar-panel-cost-by-city/<city-st>/. Articles may link to them so state
// guides and state data pages can cross-reference each other.
const STATE_ROUTES = new Set(STATE_SOLAR.map((s) => `/solar-panel-cost-by-state/${stateSlug(s)}/`));
const CITY_ROUTES = new Set(CITIES.map((c) => `/solar-panel-cost-by-city/${citySlug(c)}/`));

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

/** Every markdown link target in a body, as written. */
export function extractLinks(body: string): string[] {
  return [...body.matchAll(MARKDOWN_LINK_RE)].map((match) => match[1]);
}

export function extractInternalLinks(body: string): string[] {
  return extractLinks(body)
    .filter((href) => href.startsWith('/'))
    .map((href) => href.split('#')[0]);
}

// Link targets that work from any page: site-absolute paths, in-page
// anchors, absolute web URLs, mail and phone links. Anything else (e.g.
// "blog/foo/" or "htps://...") resolves relative to the article URL and
// breaks.
const SUPPORTED_HREF_RE = /^(?:\/|#|https?:\/\/[^\s/]+\.[^\s/]+|mailto:|tel:)/;

/**
 * Validates all articles as a set. Every article-to-article reference
 * (frontmatter relatedArticles AND markdown body links) must point at an
 * article that is either already published at `now` or publishes no later
 * than the source itself. Either way the target exists in every build in
 * which the source is live, so a link can never point at an unpublished
 * page. (Older articles may therefore link to newer ones once those are
 * live; a scheduled article may only link to targets published before it.)
 */
export function validateArticles(articles: RawArticle[], now: Date = new Date()): ValidationIssue[] {
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

  // Cross-article references (see the doc comment above for the rule).
  const nowTime = now.getTime();
  for (const article of articles) {
    const sourceTime = publishTime(article);
    const err = (message: string) => issues.push({ file: article.file, message });
    const tooLate = (target: RawArticle) => {
      const targetTime = publishTime(target);
      return sourceTime !== null && targetTime !== null && targetTime > Math.max(sourceTime, nowTime);
    };

    for (const slug of (article.data.relatedArticles as string[] | undefined) ?? []) {
      const target = bySlug.get(slug);
      if (!target) {
        err(`relatedArticles references unknown slug "${slug}"`);
        continue;
      }
      if (target.data.draft === true) err(`relatedArticles references draft article "${slug}"`);
      if (tooLate(target))
        err(`relatedArticles references "${slug}", which is not published yet and publishes after this article`);
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
        if (tooLate(target))
          err(`body links to ${link}, which is not published yet and publishes after this article`);
        continue;
      }
      if (CALCULATOR_HREFS.has(link) || STATIC_ROUTES.has(link) || STATE_ROUTES.has(link) || CITY_ROUTES.has(link)) continue;
      err(`body links to unknown internal path ${link} (allowed: calculators, /blog/<slug>/, state/city pages, static pages)`);
    }

    // Scaffolds from `npm run post -- new` carry TODO markers; never publish them.
    if (article.data.draft !== true && /\bTODO\b/.test(`${article.data.title} ${article.data.description} ${article.body}`))
      err('contains TODO placeholders — finish the article or set draft: true');

    for (const href of extractLinks(article.body)) {
      if (!SUPPORTED_HREF_RE.test(href))
        err(`unsupported link target "${href}" — use /site/path/, https://full.url or mailto:`);
    }

    if (FORBIDDEN_BLOCK_RE.test(article.body)) {
      const label = article.body.match(FORBIDDEN_BLOCK_RE)?.[1];
      err(`forbidden labeled block "${label}:" — weave this into prose instead`);
    }
  }

  return issues;
}
