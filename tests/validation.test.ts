import { describe, expect, it } from 'vitest';
import { validateArticles, validatePlan } from '../scripts/lib/validate';
import { lintArticles } from '../scripts/lib/style';
import type { PlanEntry, RawArticle } from '../scripts/lib/load';

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

  it('rejects an explicit related article that publishes later', () => {
    const issues = validateArticles([
      raw({
        file: 'early.md',
        data: { publishDate: new Date('2026-01-01T08:00:00Z'), relatedArticles: ['late'] },
      }),
      raw({
        file: 'late.md',
        data: { publishDate: new Date('2026-06-01T08:00:00Z'), primaryKeyword: 'late kw' },
      }),
    ]);
    expect(issues.some((i) => i.message.includes('published after this article'))).toBe(true);
  });

  it('fails on a nonexistent calculator id', () => {
    const issues = validateArticles([
      raw({ file: 'a.md', data: { relatedCalculators: ['no-such-calculator'] } }),
    ]);
    expect(issues.some((i) => i.message.includes('unknown calculator id'))).toBe(true);
  });

  it('rejects a body link to an article published later than the source', () => {
    const issues = validateArticles([
      raw({
        file: 'early.md',
        body: 'See [the later guide](/blog/late/) for details.',
        data: { publishDate: new Date('2026-01-01T08:00:00Z') },
      }),
      raw({
        file: 'late.md',
        data: { publishDate: new Date('2026-06-01T08:00:00Z'), primaryKeyword: 'late kw' },
      }),
    ]);
    expect(issues.some((i) => i.message.includes('publishes after this article'))).toBe(true);
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

describe('validatePlan', () => {
  const entry = (slug: string, i: number): PlanEntry => ({
    title: `Title ${slug}`,
    slug,
    cluster: 'Solar panel costs',
    category: 'Solar Costs',
    publishDate: new Date(Date.UTC(2026, 6, 13 + Math.floor(i / 2), i % 2 ? 16 : 8)).toISOString().replace('.000Z', 'Z'),
    primaryKeyword: `keyword ${slug}`,
    secondaryKeywords: [],
    searchIntent: `intent ${slug}`,
    relatedCalculators: ['solar-panel-calculator'],
  });

  it('requires exactly 300 rows', () => {
    const plan = Array.from({ length: 299 }, (_, i) => entry(`slug-${i}`, i));
    const issues = validatePlan(plan, []);
    expect(issues.some((i) => i.message.includes('exactly 300'))).toBe(true);

    const fullPlan = Array.from({ length: 300 }, (_, i) => entry(`slug-${i}`, i));
    expect(validatePlan(fullPlan, [])).toHaveLength(0);
  });

  it('rejects duplicate slugs and keywords', () => {
    const plan = Array.from({ length: 300 }, (_, i) => entry(`slug-${i}`, i));
    plan[5] = { ...plan[5], slug: 'slug-4', primaryKeyword: 'keyword slug-4' };
    const issues = validatePlan(plan, []);
    expect(issues.some((i) => i.message.includes('duplicate slug'))).toBe(true);
    expect(issues.some((i) => i.message.includes('duplicate primaryKeyword'))).toBe(true);
  });
});
