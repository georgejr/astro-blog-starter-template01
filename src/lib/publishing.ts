// Pure scheduled-publishing logic. This module deliberately has no
// astro:content import so unit tests and node scripts can use it directly;
// src/lib/content.ts wraps it with getCollection() for pages.

export interface ArticleData {
  title: string;
  description: string;
  slug?: string;
  publishDate: Date;
  updatedDate?: Date;
  draft: boolean;
  category: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  relatedCalculators: string[];
  relatedArticles: string[];
  featured: boolean;
  author: string;
}

export interface ArticleLike {
  id: string;
  data: ArticleData;
}

// One cutoff per build. Every route list, feed, and related-content
// calculation uses this value so a build cannot disagree with itself about
// which articles are published.
export const BUILD_TIME = new Date();

/** Public URL slug of an article (explicit frontmatter slug or filename id). */
export function articleSlug(entry: ArticleLike): string {
  return entry.data.slug ?? entry.id;
}

export function articlePath(entry: ArticleLike): string {
  return `/blog/${articleSlug(entry)}/`;
}

/**
 * Published = not a draft AND publishDate <= cutoff.
 * draft: true is always hidden regardless of date; an article whose
 * publishDate equals the cutoff exactly is published.
 */
export function isPublished(entry: ArticleLike, now: Date = BUILD_TIME): boolean {
  return entry.data.draft !== true && entry.data.publishDate.getTime() <= now.getTime();
}

/** Published entries, newest first (site-wide ordering for lists and feeds). */
export function publishedSorted<T extends ArticleLike>(entries: T[], now: Date = BUILD_TIME): T[] {
  return entries
    .filter((entry) => isPublished(entry, now))
    .sort(
      (a, b) =>
        b.data.publishDate.getTime() - a.data.publishDate.getTime() ||
        a.data.title.localeCompare(b.data.title),
    );
}

/** getStaticPaths() input: routes exist ONLY for published articles. */
export function buildRoutePaths<T extends ArticleLike>(entries: T[], now: Date = BUILD_TIME) {
  return publishedSorted(entries, now).map((post) => ({
    params: { slug: articleSlug(post) },
    props: { post },
  }));
}

/** RSS items for published articles only. */
export function buildRssItems<T extends ArticleLike>(entries: T[], now: Date = BUILD_TIME) {
  return publishedSorted(entries, now).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.publishDate,
    link: articlePath(post),
  }));
}

/**
 * Previous/next navigation within the published set.
 * Ordering is chronological: "previous" is the article published immediately
 * before the current one, "next" the one published immediately after.
 * Scheduled or draft articles are never revealed here.
 */
export function prevNext<T extends ArticleLike>(
  entries: T[],
  current: ArticleLike,
  now: Date = BUILD_TIME,
): { prev: T | null; next: T | null } {
  const chronological = publishedSorted(entries, now).reverse();
  const index = chronological.findIndex((entry) => articleSlug(entry) === articleSlug(current));
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? chronological[index - 1] : null,
    next: index < chronological.length - 1 ? chronological[index + 1] : null,
  };
}

function keywordTokens(data: ArticleData): Set<string> {
  const tokens = new Set<string>();
  for (const phrase of [data.primaryKeyword, ...data.secondaryKeywords]) {
    for (const token of phrase.toLowerCase().split(/[^a-z0-9]+/)) {
      if (token.length > 2) tokens.add(token);
    }
  }
  return tokens;
}

/**
 * Deterministic relevance score between two articles:
 * same category +5, each shared tag +2, each shared calculator +4,
 * primary-keyword token overlap +3, secondary overlap +1 per shared token.
 */
export function relatedScore(a: ArticleData, b: ArticleData): number {
  let score = 0;
  if (a.category === b.category) score += 5;
  const bTags = new Set(b.tags.map((t) => t.toLowerCase()));
  for (const tag of a.tags) if (bTags.has(tag.toLowerCase())) score += 2;
  const bCalcs = new Set(b.relatedCalculators);
  for (const calc of a.relatedCalculators) if (bCalcs.has(calc)) score += 4;
  const aPrimary = new Set(a.primaryKeyword.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2));
  const bAll = keywordTokens(b);
  for (const token of aPrimary) if (bAll.has(token)) score += 3;
  const aSecondary = new Set(
    a.secondaryKeywords.flatMap((k) => k.toLowerCase().split(/[^a-z0-9]+/)).filter((t) => t.length > 2),
  );
  for (const token of aSecondary) if (bAll.has(token)) score += 1;
  return score;
}

/**
 * Related articles for one entry, from the published set only:
 * 1. explicit relatedArticles slugs, resolved against published entries
 *    (missing, future, draft and self references are silently dropped),
 * 2. topped up with score-ranked published articles to `max`.
 */
export function getRelatedArticles<T extends ArticleLike>(
  current: ArticleLike,
  entries: T[],
  now: Date = BUILD_TIME,
  max = 6,
): T[] {
  const published = publishedSorted(entries, now).filter(
    (entry) => articleSlug(entry) !== articleSlug(current),
  );
  const bySlug = new Map(published.map((entry) => [articleSlug(entry), entry]));

  const picked: T[] = [];
  const seen = new Set<string>();
  for (const slug of current.data.relatedArticles) {
    const entry = bySlug.get(slug);
    if (entry && !seen.has(slug)) {
      picked.push(entry);
      seen.add(slug);
    }
  }

  if (picked.length < max) {
    const scored = published
      .filter((entry) => !seen.has(articleSlug(entry)))
      .map((entry) => ({ entry, score: relatedScore(current.data, entry.data) }))
      .filter(({ score }) => score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.entry.data.publishDate.getTime() - a.entry.data.publishDate.getTime(),
      );
    for (const { entry } of scored) {
      if (picked.length >= max) break;
      picked.push(entry);
    }
  }

  return picked.slice(0, max);
}
