import { describe, expect, it } from 'vitest';
import { validateArticles } from '../scripts/lib/validate';
import { lintArticles } from '../scripts/lib/style';
import type { RawArticle } from '../scripts/lib/load';

function raw(overrides: Partial<RawArticle> & { file: string }): RawArticle {
  return {
    slug: overrides.file.replace(/\.md$/, ''),
    body: 'A normal paragraph about solar panels and payback economics.',
    ...overrides,
    data: {
      title: 'Title',
      description: 'Description',
      publishDate: new Date('2026-01-01T08:00:00Z'),
      category: 'Solar Costs',
      primaryKeyword: overrides.file,
      ...(overrides.data ?? {}),
    },
  };
}

// Validation "now" for the timing tests: after "early" (Jan) but before "late" (Jun), or after both.
const BEFORE_LATE = new Date('2026-03-01T00:00:00Z');
const AFTER_LATE = new Date('2026-09-01T00:00:00Z');

describe('validateArticles', () => {
  it('fails on invalid publish date', () => {
    const issues = validateArticles([raw({ file: 'a.md', data: { publishDate: 'not-a-date' } })]);
    expect(issues.some((i) => i.message.includes('invalid or missing publishDate'))).toBe(true);
  });

  it('fails on duplicate slug', () => {
    const issues = validateArticles([
      raw({ file: 'a.md', slug: 'same' }),
      raw({ file: 'b.md', slug: 'same', data: { primaryKeyword: 'other' } }),
    ]);
    expect(issues.some((i) => i.message.includes('duplicate slug'))).toBe(true);
  });

  const earlyLate = (early: Partial<RawArticle>) => [
    raw({
      file: 'early.md',
      ...early,
      data: { publishDate: new Date('2026-01-01T08:00:00Z'), ...(early.data ?? {}) },
    }),
    raw({
      file: 'late.md',
      data: { publishDate: new Date('2026-06-01T08:00:00Z'), primaryKeyword: 'late kw' },
    }),
  ];

  it('rejects an explicit related article that is unpublished and publishes later', () => {
    const issues = validateArticles(earlyLate({ data: { relatedArticles: ['late'] } }), BEFORE_LATE);
    expect(issues.some((i) => i.message.includes('publishes after this article'))).toBe(true);
  });

  it('allows an older article to reference a newer one once it is published', () => {
    expect(validateArticles(earlyLate({ data: { relatedArticles: ['late'] } }), AFTER_LATE)).toHaveLength(0);
    expect(
      validateArticles(earlyLate({ body: 'See [the later guide](/blog/late/) for details.' }), AFTER_LATE),
    ).toHaveLength(0);
  });

  it('fails on a nonexistent calculator id', () => {
    const issues = validateArticles([
      raw({ file: 'a.md', data: { relatedCalculators: ['no-such-calculator'] } }),
    ]);
    expect(issues.some((i) => i.message.includes('unknown calculator id'))).toBe(true);
  });

  it('rejects a body link to an unpublished article scheduled after the source', () => {
    const issues = validateArticles(
      earlyLate({ body: 'See [the later guide](/blog/late/) for details.' }),
      BEFORE_LATE,
    );
    expect(issues.some((i) => i.message.includes('publishes after this article'))).toBe(true);
  });

  it('accepts external links and rejects relative or malformed ones', () => {
    const ok = validateArticles([
      raw({ file: 'a.md', body: 'Data from [NREL](https://www.nrel.gov/) and [email](mailto:x@example.com).' }),
    ]);
    expect(ok).toHaveLength(0);
    const bad = validateArticles([raw({ file: 'a.md', body: 'See [this](blog/foo/) and [that](htps://x.com).' })]);
    expect(bad.filter((i) => i.message.includes('unsupported link target'))).toHaveLength(2);
  });

  it('rejects forbidden labeled blocks', () => {
    const issues = validateArticles([
      raw({ file: 'a.md', body: 'Good for: homeowners, families, and retirees.' }),
    ]);
    expect(issues.some((i) => i.message.includes('forbidden labeled block'))).toBe(true);
  });
});

describe('lintArticles', () => {
  it('flags a "Good for:" block as an error', () => {
    const issues = lintArticles([raw({ file: 'a.md', body: '**Good for:** everyone.' })]);
    expect(issues.some((i) => i.level === 'error' && i.message.includes('good for'))).toBe(true);
  });

  it('flags an "Example use case:" block as an error', () => {
    const issues = lintArticles([
      raw({ file: 'a.md', body: 'Example use case: You install a 6 kW system.' }),
    ]);
    expect(issues.some((i) => i.level === 'error' && i.message.includes('example use case'))).toBe(true);
  });
});
