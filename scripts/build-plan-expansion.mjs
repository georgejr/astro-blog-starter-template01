// Appends the expansion clusters (scripts/plan/clusters-f..j) to the EXISTING
// content-plan.json without touching the first 300 entries or their publish
// dates. New articles are scheduled 2/day (08:00 & 16:00 UTC) continuing from
// the day after the last existing entry. Run once after the cluster files land.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const planPath = join(root, 'content-plan.json');
const existing = JSON.parse(readFileSync(planPath, 'utf8'));
if (existing.length !== 300) {
  console.error(`expected 300 existing entries, found ${existing.length} — aborting to avoid double-append.`);
  process.exit(1);
}

const takenSlugs = new Set(existing.map((e) => e.slug));
const takenKw = new Set(existing.map((e) => e.primaryKeyword.toLowerCase().trim()));

// Load expansion cluster files (f onward).
const PLAN_DIR = join(root, 'scripts', 'plan');
const files = readdirSync(PLAN_DIR).filter((f) => /^clusters-[f-z]\.mjs$/.test(f)).sort();
const clusters = [];
for (const file of files) {
  const mod = await import(pathToFileURL(join(PLAN_DIR, file)).href);
  clusters.push(...mod.clusters);
}

const total = clusters.reduce((sum, c) => sum + c.entries.length, 0);
console.log(`expansion cluster files: ${files.join(', ')}`);
console.log(`expansion entries: ${total}`);
if (total !== 200) {
  console.error(`expected 200 expansion entries, got ${total}`);
  for (const c of clusters) console.error(`  ${c.cluster}: ${c.entries.length}`);
  process.exit(1);
}

// Drop any collisions with existing plan (defensive) and within the expansion.
const seenSlug = new Set(takenSlugs);
const seenKw = new Set(takenKw);
const queues = clusters.map((c) => ({ cluster: c.cluster, category: c.category, entries: [] }));
clusters.forEach((c, qi) => {
  for (const e of c.entries) {
    const kw = e.primaryKeyword.toLowerCase().trim();
    if (seenSlug.has(e.slug)) { console.error(`DROP duplicate slug ${e.slug}`); continue; }
    if (seenKw.has(kw)) { console.error(`DROP duplicate keyword "${kw}" (${e.slug})`); continue; }
    seenSlug.add(e.slug);
    seenKw.add(kw);
    queues[qi].entries.push(e);
  }
});
for (const q of queues) q.total = q.entries.length;
const kept = queues.reduce((s, q) => s + q.entries.length, 0);
if (kept !== 200) {
  console.error(`after de-dup, ${kept} entries remain (need 200). Fix the cluster files.`);
  process.exit(1);
}

// Largest-remainder interleave to spread categories.
const ordered = [];
while (ordered.length < kept) {
  let best = null;
  let bestScore = -1;
  for (const q of queues) {
    if (q.entries.length === 0) continue;
    const score = q.entries.length / q.total;
    if (score > bestScore) { bestScore = score; best = q; }
  }
  const entry = best.entries.shift();
  ordered.push({ ...entry, cluster: best.cluster, category: best.category });
}
// Guard: no two same-cluster entries on the same day.
for (let i = 0; i + 1 < ordered.length; i += 2) {
  if (ordered[i].cluster === ordered[i + 1].cluster) {
    for (let j = i + 2; j < ordered.length; j++) {
      if (ordered[j].cluster !== ordered[i].cluster) {
        [ordered[i + 1], ordered[j]] = [ordered[j], ordered[i + 1]];
        break;
      }
    }
  }
}

// Schedule continuing from the day after the last existing entry.
function nextSlot(date) {
  const d = new Date(date);
  if (d.getUTCHours() === 8) d.setUTCHours(16);
  else { d.setUTCHours(8); d.setUTCDate(d.getUTCDate() + 1); }
  d.setUTCMinutes(0, 0, 0);
  return d;
}
let cur = nextSlot(new Date(existing[existing.length - 1].publishDate));

const appended = ordered.map((entry) => {
  const publishDate = cur.toISOString().replace('.000Z', 'Z');
  cur = nextSlot(cur);
  return {
    title: entry.title,
    slug: entry.slug,
    cluster: entry.cluster,
    category: entry.category,
    publishDate,
    primaryKeyword: entry.primaryKeyword,
    secondaryKeywords: entry.secondaryKeywords ?? [],
    searchIntent: entry.searchIntent,
    relatedCalculators: entry.relatedCalculators ?? [],
    ...(entry.pillar ? { pillar: true } : {}),
  };
});

const plan = [...existing, ...appended];
writeFileSync(planPath, JSON.stringify(plan, null, 2) + '\n');

const md = [
  '# Content plan — 500 scheduled articles',
  '',
  `Source of truth: \`content-plan.json\`. First 300 generated in the original run; 301–500 are the expansion.`,
  `Full window: ${plan[0].publishDate} → ${plan[plan.length - 1].publishDate}, 2 articles/day (08:00 & 16:00 UTC).`,
  '',
  '| # | Cluster | Title | Slug | Primary keyword | Search intent | Publish date | Related calculator |',
  '|---|---|---|---|---|---|---|---|',
  ...plan.map(
    (e, i) =>
      `| ${i + 1} | ${e.cluster} | ${e.title.replace(/\|/g, '\\|')} | ${e.slug} | ${e.primaryKeyword} | ${(e.searchIntent || '').replace(/\|/g, '\\|')} | ${e.publishDate} | ${(e.relatedCalculators || []).join(', ')} |`,
  ),
  '',
].join('\n');
writeFileSync(join(root, 'docs', 'content-plan.md'), md);

console.log(`content-plan.json now ${plan.length} entries.`);
console.log(`expansion window: ${appended[0].publishDate} → ${appended[appended.length - 1].publishDate}`);
