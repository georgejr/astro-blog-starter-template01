import { describe, expect, it } from 'vitest';
import { selectBanner, validateBanners, type Banner } from '../src/lib/banners';

const NOW = new Date('2026-10-01T12:00:00Z');

const img = (overrides: Partial<Banner>): Banner => ({
  id: 'b',
  placement: 'article-bottom',
  image: '/banners/b.webp',
  width: 728,
  height: 90,
  alt: 'Alt',
  href: 'https://partner.example/',
  ...overrides,
});

describe('selectBanner', () => {
  it('picks by placement, then priority, then file order', () => {
    const banners = [
      img({ id: 'first' }),
      img({ id: 'top', placement: 'article-top' }),
      img({ id: 'second' }),
      img({ id: 'high', priority: 5 }),
    ];
    expect(selectBanner(banners, { placement: 'article-bottom', now: NOW })?.id).toBe('high');
    expect(selectBanner(banners.slice(0, 3), { placement: 'article-bottom', now: NOW })?.id).toBe('first');
    expect(selectBanner(banners, { placement: 'home', now: NOW })).toBeNull();
  });

  it('respects active flag and start/end window', () => {
    const banners = [
      img({ id: 'off', active: false, priority: 9 }),
      img({ id: 'future', start: '2026-11-01T00:00:00Z', priority: 8 }),
      img({ id: 'expired', end: '2026-09-01T00:00:00Z', priority: 7 }),
      img({ id: 'live', start: '2026-09-01T00:00:00Z', end: '2026-12-01T00:00:00Z' }),
    ];
    expect(selectBanner(banners, { placement: 'article-bottom', now: NOW })?.id).toBe('live');
  });

  it('applies category and article targeting', () => {
    const banners = [
      img({ id: 'batteries', categories: ['Batteries & Storage'], priority: 2 }),
      img({ id: 'one-article', articles: ['net-metering-explained'], priority: 1 }),
      img({ id: 'fallback', excludeArticles: ['no-ads-here'] }),
    ];
    const pick = (category?: string, slug?: string) =>
      selectBanner(banners, { placement: 'article-bottom', category, slug, now: NOW })?.id ?? null;
    expect(pick('Batteries & Storage', 'x')).toBe('batteries');
    expect(pick('Solar Costs', 'net-metering-explained')).toBe('one-article');
    expect(pick('Solar Costs', 'other')).toBe('fallback');
    expect(pick('Solar Costs', 'no-ads-here')).toBeNull();
  });
});

describe('validateBanners', () => {
  const opts = {
    categories: ['Solar Costs'],
    slugs: new Set(['known']),
    publicFileExists: (p: string) => p === '/banners/b.webp',
  };

  it('accepts a complete image banner and an html banner', () => {
    expect(validateBanners([img({}), { id: 'h', placement: 'home', html: '<div>ad</div>' }], opts)).toEqual([]);
  });

  it('reports every kind of mistake', () => {
    const problems = validateBanners(
      [
        img({ id: 'Bad Id' }),
        img({ id: 'dup' }),
        img({ id: 'dup' }),
        img({ id: 'missing-file', image: '/banners/nope.webp' }),
        img({ id: 'both', html: '<div/>' }),
        img({ id: 'no-alt', alt: '' }),
        img({ id: 'bad-slot', placement: 'sidebar' as Banner['placement'] }),
        img({ id: 'bad-date', start: 'tomorrow' }),
        img({ id: 'bad-target', categories: ['Nope'], articles: ['unknown'] }),
        img({ id: 'relative-href', href: 'partner.example' }),
      ],
      opts,
    );
    const text = problems.join('\n');
    for (const fragment of [
      'kebab-case',
      'duplicate id',
      'not found',
      'exactly one of',
      'alt text',
      'placement must be',
      'ISO timestamp',
      'unknown category',
      'unknown article slug',
      'href must be',
    ]) {
      expect(text).toContain(fragment);
    }
  });

  it('rejects a non-array file', () => {
    expect(validateBanners({}, opts)).toEqual(['banners.json must contain a JSON array']);
  });
});
