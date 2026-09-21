// Banner / ad-slot logic. Banners are configured in src/data/banners.json
// (hand-edited or managed with `npm run banner`), rendered by
// src/components/BannerSlot.astro and validated before every build by
// scripts/validate-content.ts. Everything is resolved at BUILD time: a banner
// change (or a start/end date passing) goes live with the next deploy.
// See docs/banners.md.

/** Where a banner can appear. Each slot shows at most one banner. */
export const BANNER_PLACEMENTS = [
  /** Article page, under the header image. */
  'article-top',
  /** Article page, after the article body (before the calculator box). */
  'article-bottom',
  /** Blog index, its pagination pages, category and tag pages, above the list. */
  'listing',
  /** Homepage, under the calculator preview. */
  'home',
  /** Calculator pages, under the calculator. */
  'calculator',
] as const;

export type BannerPlacement = (typeof BANNER_PLACEMENTS)[number];

export interface Banner {
  /** Unique kebab-case id (also emitted as data-banner for click tracking). */
  id: string;
  placement: BannerPlacement;
  /** false keeps the entry in the file without showing it. Default true. */
  active?: boolean;

  // Creative: EITHER an image banner (image + href + alt + width + height)
  // OR a raw HTML snippet from an ad/affiliate network (html).
  /** Site path under public/ ("/banners/x.webp") or an absolute https URL. */
  image?: string;
  /** Optional narrower creative used below 640px viewport width. */
  imageMobile?: string;
  /** Intrinsic pixel size of `image` (prevents layout shift). */
  width?: number;
  height?: number;
  alt?: string;
  /** Click target: absolute URL or a site path ("/solar-panel-calculator/"). */
  href?: string;
  /** Raw HTML (ad-network tag, affiliate widget). Rendered as-is. */
  html?: string;

  /**
   * Paid/affiliate placement. Default true: adds rel="sponsored nofollow" and
   * the "Advertisement" label. Set false for house promos of your own pages.
   */
  sponsored?: boolean;
  /** Small label above the banner. Default "Advertisement" when sponsored, none otherwise. '' hides it. */
  label?: string;
  /** Open href in a new tab. Default: true for external URLs, false for site paths. */
  newTab?: boolean;

  /** ISO timestamp: only shown in builds at or after this moment. */
  start?: string;
  /** ISO timestamp: hidden in builds after this moment. */
  end?: string;

  // Targeting (article placements; `categories` also applies to category pages).
  /** Show only on these categories (exact names from src/lib/taxonomy.ts). */
  categories?: string[];
  /** Show only on these article slugs. */
  articles?: string[];
  /** Never show on these article slugs. */
  excludeArticles?: string[];

  /** Higher wins when several banners match a slot. Default 0. */
  priority?: number;
}

export interface BannerContext {
  placement: BannerPlacement;
  /** Category of the current article or category page. */
  category?: string;
  /** Slug of the current article. */
  slug?: string;
  now: Date;
}

export function isBannerLive(banner: Banner, now: Date): boolean {
  if (banner.active === false) return false;
  if (banner.start && Date.parse(banner.start) > now.getTime()) return false;
  if (banner.end && Date.parse(banner.end) < now.getTime()) return false;
  return true;
}

function matchesTargeting(banner: Banner, ctx: BannerContext): boolean {
  if (banner.categories?.length && !(ctx.category && banner.categories.includes(ctx.category))) return false;
  if (banner.articles?.length && !(ctx.slug && banner.articles.includes(ctx.slug))) return false;
  if (ctx.slug && banner.excludeArticles?.includes(ctx.slug)) return false;
  return true;
}

/** The banner to render in a slot, or null. Highest priority wins, then file order. */
export function selectBanner(banners: Banner[], ctx: BannerContext): Banner | null {
  const candidates = banners
    .map((banner, index) => ({ banner, index }))
    .filter(
      ({ banner }) =>
        banner.placement === ctx.placement && isBannerLive(banner, ctx.now) && matchesTargeting(banner, ctx),
    )
    .sort((a, b) => (b.banner.priority ?? 0) - (a.banner.priority ?? 0) || a.index - b.index);
  return candidates[0]?.banner ?? null;
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export interface BannerValidationOptions {
  /** Valid article categories. */
  categories: readonly string[];
  /** Existing article slugs (for articles / excludeArticles). */
  slugs: Set<string>;
  /** Whether a site path such as "/banners/x.webp" exists under public/. */
  publicFileExists: (sitePath: string) => boolean;
}

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Human-readable problems with the banner list; empty when valid. */
export function validateBanners(input: unknown, opts: BannerValidationOptions): string[] {
  if (!Array.isArray(input)) return ['banners.json must contain a JSON array'];
  const problems: string[] = [];
  const ids = new Set<string>();

  input.forEach((raw, index) => {
    const b = raw as Banner;
    const at = `banner #${index + 1}${b && typeof b.id === 'string' ? ` "${b.id}"` : ''}`;
    const bad = (message: string) => problems.push(`${at}: ${message}`);

    if (!b || typeof b !== 'object') return bad('must be an object');
    if (typeof b.id !== 'string' || !ID_RE.test(b.id)) bad('id must be kebab-case (e.g. "solar-quotes-728")');
    else if (ids.has(b.id)) bad('duplicate id');
    else ids.add(b.id);

    if (!(BANNER_PLACEMENTS as readonly string[]).includes(b.placement))
      bad(`placement must be one of: ${BANNER_PLACEMENTS.join(', ')}`);

    const hasImage = b.image !== undefined;
    const hasHtml = b.html !== undefined;
    if (hasImage === hasHtml) bad('set exactly one of "image" or "html"');

    const checkImage = (field: 'image' | 'imageMobile') => {
      const value = b[field];
      if (value === undefined) return;
      if (typeof value !== 'string' || !(value.startsWith('/') || /^https:\/\//.test(value))) {
        bad(`${field} must be a site path ("/banners/x.webp") or an https URL`);
      } else if (value.startsWith('/') && !opts.publicFileExists(value)) {
        bad(`${field} "${value}" not found — put the file at public${value}`);
      }
    };
    checkImage('image');
    checkImage('imageMobile');

    if (hasImage) {
      if (typeof b.href !== 'string' || !(b.href.startsWith('/') || isExternalHref(b.href)))
        bad('href must be an absolute http(s) URL or a site path starting with "/"');
      if (typeof b.alt !== 'string' || !b.alt.trim()) bad('alt text is required for image banners');
      for (const dim of ['width', 'height'] as const) {
        if (!Number.isInteger(b[dim]) || (b[dim] as number) <= 0) bad(`${dim} must be a positive integer (pixels)`);
      }
    }
    if (hasHtml && (typeof b.html !== 'string' || !b.html.trim())) bad('html must be a non-empty string');

    for (const field of ['start', 'end'] as const) {
      if (b[field] !== undefined && Number.isNaN(Date.parse(String(b[field]))))
        bad(`${field} must be an ISO timestamp, e.g. 2026-10-01T00:00:00Z`);
    }
    if (b.start && b.end && Date.parse(b.start) > Date.parse(b.end)) bad('start is after end');

    for (const category of b.categories ?? []) {
      if (!opts.categories.includes(category)) bad(`unknown category "${category}"`);
    }
    for (const field of ['articles', 'excludeArticles'] as const) {
      for (const slug of b[field] ?? []) {
        if (!opts.slugs.has(slug)) bad(`${field}: unknown article slug "${slug}"`);
      }
    }
  });

  return problems;
}
