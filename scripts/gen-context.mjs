// Prints the generation context for a batch of plan entries:
//   node scripts/gen-context.mjs <startIndex> <endIndexExclusive>
// Outputs JSON: { batch: [...full plan rows...], eligibleTargets: [...] }
// where eligibleTargets = existing published articles + plan entries BEFORE
// startIndex (the only articles a batch member may link to; per-article
// eligibility within the batch is the subset with earlier publishDate).
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [start, end] = process.argv.slice(2).map(Number);
const plan = JSON.parse(readFileSync(join(process.cwd(), 'content-plan.json'), 'utf8'));

const blogDir = join(process.cwd(), 'src', 'content', 'blog');
const existing = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));
const planSlugs = new Set(plan.map((e) => e.slug));

const seedArticles = existing
  .filter((slug) => !planSlugs.has(slug))
  .map((slug) => ({ slug, publishDate: '2026-07-08T08:00:00Z' }));

const eligible = [
  ...seedArticles,
  ...plan.slice(0, start).map((e) => ({ slug: e.slug, title: e.title, publishDate: e.publishDate })),
];

console.log(
  JSON.stringify({ batch: plan.slice(start, end), eligibleTargets: eligible }, null, 1),
);
