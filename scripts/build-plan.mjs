// Assembles content-plan.json + docs/content-plan.md from the cluster topic
// files in scripts/plan/. Run once (or re-run to re-stamp the schedule BEFORE
// any articles are generated — never after, since generated files embed their
// publishDate).
//
// Ordering: weighted round-robin (largest remainder) across clusters, which
// preserves each cluster's internal order (pillar first, foundational before
// advanced), spreads big clusters evenly, prevents state guides from running
// consecutively, and naturally alternates broad and narrow topics.
// Schedule: 2 articles/day at 08:00 and 16:00 UTC, starting the next UTC day.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const PLAN_DIR = join(process.cwd(), 'scripts', 'plan');

const clusterFiles = readdirSync(PLAN_DIR).filter((f) => /^clusters-[a-z]\.mjs$/.test(f)).sort();
const clusters = [];
for (const file of clusterFiles) {
  const mod = await import(pathToFileURL(join(PLAN_DIR, file)).href);
  clusters.push(...mod.clusters);
}

const total = clusters.reduce((sum, c) => sum + c.entries.length, 0);
console.log(`clusters: ${clusters.length}, entries: ${total}`);
if (total !== 300) {
  console.error(`expected 300 entries, got ${total}`);
  for (const c of clusters) console.error(`  ${c.cluster}: ${c.entries.length}`);
  process.exit(1);
}

// Largest-remainder interleave.
const queues = clusters.map((c) => ({
  cluster: c.cluster,
  category: c.category,
  entries: [...c.entries],
  total: c.entries.length,
}));
const ordered = [];
while (ordered.length < total) {
  let best = null;
  let bestScore = -1;
  for (const q of queues) {
    if (q.entries.length === 0) continue;
    // Highest remaining fraction goes next; slight bonus so no queue starves.
    const score = q.entries.length / q.total;
    if (score > bestScore) {
      bestScore = score;
      best = q;
    }
  }
  const entry = best.entries.shift();
  ordered.push({ ...entry, cluster: best.cluster, category: best.category });
}

// Guard: no two same-cluster entries on the same day (positions 2k, 2k+1).
for (let i = 0; i + 1 < ordered.length; i += 2) {
  if (ordered[i].cluster === ordered[i + 1].cluster) {
    // Swap the second one with the next entry from a different cluster.
    for (let j = i + 2; j < ordered.length; j++) {
      if (ordered[j].cluster !== ordered[i].cluster) {
        [ordered[i + 1], ordered[j]] = [ordered[j], ordered[i + 1]];
        break;
      }
    }
  }
}

// Schedule from the next UTC day.
const now = new Date();
const startDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
const plan = ordered.map((entry, i) => {
  const day = startDay + Math.floor(i / 2) * 86_400_000;
  const date = new Date(day + (i % 2 === 0 ? 8 : 16) * 3_600_000);
  return {
    title: entry.title,
    slug: entry.slug,
    cluster: entry.cluster,
    category: entry.category,
    publishDate: date.toISOString().replace('.000Z', 'Z'),
    primaryKeyword: entry.primaryKeyword,
    secondaryKeywords: entry.secondaryKeywords ?? [],
    searchIntent: entry.searchIntent,
    relatedCalculators: entry.relatedCalculators ?? [],
    ...(entry.pillar ? { pillar: true } : {}),
  };
});

writeFileSync(join(process.cwd(), 'content-plan.json'), JSON.stringify(plan, null, 2) + '\n');

const md = [
  '# Content plan — 300 scheduled articles',
  '',
  `Generated ${new Date().toISOString()}. Source of truth: \`content-plan.json\`.`,
  `Publication window: ${plan[0].publishDate} → ${plan[plan.length - 1].publishDate}, 2 articles/day (08:00 & 16:00 UTC).`,
  '',
  '| # | Cluster | Title | Slug | Primary keyword | Search intent | Publish date | Related calculator |',
  '|---|---|---|---|---|---|---|---|',
  ...plan.map(
    (e, i) =>
      `| ${i + 1} | ${e.cluster} | ${e.title.replace(/\|/g, '\\|')} | ${e.slug} | ${e.primaryKeyword} | ${e.searchIntent.replace(/\|/g, '\\|')} | ${e.publishDate} | ${e.relatedCalculators.join(', ')} |`,
  ),
  '',
].join('\n');
writeFileSync(join(process.cwd(), 'docs', 'content-plan.md'), md);

console.log(`content-plan.json + docs/content-plan.md written.`);
console.log(`window: ${plan[0].publishDate} → ${plan[plan.length - 1].publishDate}`);
