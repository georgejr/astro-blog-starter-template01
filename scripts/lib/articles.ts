// Shared article lookups for the content CLIs.
import { join } from 'node:path';
import { BLOG_DIR, loadArticles, type RawArticle } from './load';
import { calculators } from '../../src/data/calculators';

export interface Article extends RawArticle {
  path: string;
  publishDate: Date | null;
  draft: boolean;
}

export function loadIndex(): Map<string, Article> {
  const index = new Map<string, Article>();
  for (const a of loadArticles()) {
    const date = new Date(a.data.publishDate as string | Date);
    index.set(a.slug, {
      ...a,
      path: join(BLOG_DIR, a.file),
      publishDate: Number.isNaN(date.getTime()) ? null : date,
      draft: a.data.draft === true,
    });
  }
  return index;
}

/** Same rule as the site: not a draft and publishDate <= now. */
export function isLive(article: Article, now = new Date()): boolean {
  return !article.draft && article.publishDate !== null && article.publishDate <= now;
}

export type Target =
  | { kind: 'article'; href: string; article: Article }
  | { kind: 'calculator'; href: string }
  | { kind: 'path'; href: string }
  | { kind: 'external'; href: string };

/**
 * Resolve a CLI link target: an article slug, a calculator id, a site path
 * ("/blog/x/", "/solar-panel-cost-by-state/texas/") or an absolute URL.
 */
export function resolveTarget(target: string, index: Map<string, Article>): Target {
  if (/^https?:\/\//i.test(target)) return { kind: 'external', href: target };
  if (target.startsWith('/')) {
    const blog = target.match(/^\/blog\/([^/#?]+)\/?/);
    const article = blog ? index.get(blog[1]) : undefined;
    if (blog && !article) throw new Error(`no article with slug "${blog[1]}"`);
    return article ? { kind: 'article', href: `/blog/${article.slug}/`, article } : { kind: 'path', href: target };
  }
  const calculator = calculators.find((c) => c.id === target);
  if (calculator) return { kind: 'calculator', href: calculator.href };
  const article = index.get(target);
  if (article) return { kind: 'article', href: `/blog/${article.slug}/`, article };
  throw new Error(
    `"${target}" is not an article slug, calculator id, site path (/...) or http(s) URL`,
  );
}

/**
 * Why `source` may not link to `target` (null = allowed). Mirrors the build
 * validator: the target must be live now, or publish no later than the source.
 */
export function linkBlocker(source: Article, target: Article, now = new Date()): string | null {
  if (source.slug === target.slug) return 'an article cannot link to itself';
  if (target.draft) return `"${target.slug}" is a draft`;
  if (isLive(target, now)) return null;
  if (source.publishDate && target.publishDate && target.publishDate <= source.publishDate) return null;
  return `"${target.slug}" is scheduled for ${target.publishDate?.toISOString()} — after "${source.slug}" (${source.publishDate?.toISOString()}) and not live yet`;
}

export function fmtDate(date: Date | null): string {
  return date ? date.toISOString().replace(/:\d\d\.\d{3}Z$/, 'Z').replace('T', ' ') : 'invalid date';
}
