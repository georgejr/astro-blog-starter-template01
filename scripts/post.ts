// Article CLI — create, publish, schedule and inspect articles.
// Full guide: docs/content-guide.md
//
//   npm run post -- new --title "Title" --category "Solar Costs" [options]
//       --slug my-slug            default: derived from the title
//       --description "..."       meta description (140–160 chars)
//       --keyword "..."           primaryKeyword (must be unique across articles)
//       --tags "a,b"              2–4 lowercase tags
//       --calculators "id1,id2"   ids from src/data/calculators.ts
//       --date now|next-slot|ISO  publishDate (default: now)
//       --publish                 create as draft: false (default: draft: true)
//   npm run post -- publish <slug> [--date now|ISO]   draft: false; publishDate kept if already past, else now
//   npm run post -- schedule <slug> --date ISO|next-slot
//   npm run post -- unpublish <slug>                  draft: true (removed from the site on next deploy)
//   npm run post -- status [--next 10]                published / scheduled / draft overview
//
// On Windows PowerShell 5.1, which drops the "--", run the script directly:
//   npx tsx scripts/post.ts new --title "Title" --category "Solar Costs"
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES } from '../src/lib/taxonomy';
import { calculators } from '../src/data/calculators';
import { BANNER_PLACEMENTS, isBannerLive, type Banner } from '../src/lib/banners';
import { BLOG_DIR } from './lib/load';
import { fmtDate, isLive, loadIndex, type Article } from './lib/articles';
import { fail, list, parseArgs, str } from './lib/cli';
import { joinFile, setScalar, slugify, splitFile } from './lib/markdown-edit';

const args = parseArgs();
const [command, ...rest] = args._;
const now = new Date();

function iso(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/** Weekly cadence: Tuesday 08:00 UTC after the last scheduled article (or after now). */
function nextSlot(index: Map<string, Article>): Date {
  const latest = [...index.values()]
    .map((a) => a.publishDate)
    .filter((d): d is Date => d !== null)
    .reduce((max, d) => (d > max ? d : max), now);
  const d = new Date(Date.UTC(latest.getUTCFullYear(), latest.getUTCMonth(), latest.getUTCDate(), 8, 0, 0));
  while (d.getUTCDay() !== 2 || d <= latest) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

function parseDate(value: string | undefined, index: Map<string, Article>): Date {
  if (!value || value === 'now') return new Date(Math.floor(now.getTime() / 60000) * 60000);
  if (value === 'next-slot') return nextSlot(index);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) fail(`invalid --date "${value}" (use now, next-slot or e.g. 2026-10-06T08:00:00Z)`);
  return date;
}

function requireArticle(index: Map<string, Article>, slug: string | undefined): Article {
  if (!slug) fail('missing article slug');
  const article = index.get(slug);
  if (!article) fail(`no article with slug "${slug}" in src/content/blog/`);
  return article;
}

function editFrontmatter(article: Article, edits: Record<string, string>) {
  const raw = readFileSync(article.path, 'utf8');
  const parts = splitFile(raw);
  for (const [key, value] of Object.entries(edits)) parts.frontmatter = setScalar(parts.frontmatter, key, value, parts.eol);
  writeFileSync(article.path, joinFile(parts));
}

function cmdNew() {
  const index = loadIndex();
  const title = str(args, 'title');
  if (!title) fail('--title is required');
  const categoryArg = str(args, 'category');
  const category = CATEGORIES.find((c) => c.toLowerCase() === categoryArg?.toLowerCase());
  if (!category) fail(`--category must be one of:\n  ${CATEGORIES.join('\n  ')}`);

  const slug = str(args, 'slug') ?? slugify(title);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(`invalid slug "${slug}" (kebab-case only)`);
  const file = join(BLOG_DIR, `${slug}.md`);
  if (existsSync(file) || index.has(slug)) fail(`an article with slug "${slug}" already exists`);

  const keyword = (str(args, 'keyword') ?? title).toLowerCase().trim();
  const clash = [...index.values()].find((a) => String(a.data.primaryKeyword ?? '').toLowerCase().trim() === keyword);
  if (clash) fail(`primaryKeyword "${keyword}" is already used by ${clash.file} — pass a different --keyword`);

  const calcIds = list(args, 'calculators');
  for (const id of calcIds) {
    if (!calculators.some((c) => c.id === id)) fail(`unknown calculator id "${id}". Valid: ${calculators.map((c) => c.id).join(', ')}`);
  }

  const date = parseDate(str(args, 'date'), index);
  const draft = args.publish !== true;
  const description = str(args, 'description') ?? 'TODO: 140-160 character meta description containing the primary keyword.';
  const tags = list(args, 'tags');
  const q = (v: string) => JSON.stringify(v);
  const yamlList = (key: string, values: string[]) =>
    values.length ? `${key}:\n${values.map((v) => `  - ${v}`).join('\n')}` : `${key}: []`;

  const content = `---
title: ${q(title)}
description: ${q(description)}
publishDate: ${iso(date)}
draft: ${draft}
category: ${q(category)}
${yamlList('tags', tags)}
primaryKeyword: ${q(keyword)}
secondaryKeywords: []
${yamlList('relatedCalculators', calcIds)}
relatedArticles: []
---

TODO: Opening paragraph. Answer the reader's question directly in the first two or three sentences.

## TODO: A heading phrased as the question this section answers

TODO: Body text. Link calculators like [the solar panel cost calculator](/solar-panel-cost-calculator/)
and earlier articles with: npm run link -- add ${slug} <target-slug> --anchor "phrase in this text"

## Frequently asked questions

### TODO: A short question readers ask?

TODO: A direct answer in one paragraph. (Delete this whole section if the topic has no recurring questions.)
`;
  writeFileSync(file, content);
  console.log(`created src/content/blog/${slug}.md`);
  console.log(`  URL after publishing: /blog/${slug}/`);
  console.log(`  publishDate ${iso(date)}, draft: ${draft}`);
  console.log('Next: write the article (replace every TODO), then run `npm run build` to validate.');
  if (draft) console.log(`When ready: npm run post -- publish ${slug}`);
}

function cmdPublish() {
  const index = loadIndex();
  const article = requireArticle(index, rest[0]);
  const edits: Record<string, string> = { draft: 'false' };
  const dateArg = str(args, 'date');
  if (dateArg || !article.publishDate || article.publishDate > now) edits.publishDate = iso(parseDate(dateArg, index));
  editFrontmatter(article, edits);
  console.log(`${article.file}: draft: false${edits.publishDate ? `, publishDate: ${edits.publishDate}` : ''}`);
  console.log('Goes live with the next deploy (push to main, or `npm run build && npm run deploy`).');
}

function cmdSchedule() {
  const index = loadIndex();
  const article = requireArticle(index, rest[0]);
  if (!str(args, 'date')) fail('--date is required (ISO timestamp or next-slot)');
  const date = iso(parseDate(str(args, 'date'), index));
  editFrontmatter(article, { publishDate: date, draft: 'false' });
  console.log(`${article.file}: scheduled for ${date}`);
}

function cmdUnpublish() {
  const index = loadIndex();
  const article = requireArticle(index, rest[0]);
  editFrontmatter(article, { draft: 'true' });
  console.log(`${article.file}: draft: true — removed from the site with the next deploy.`);
  console.log('If it was live, consider a 301 in public/_redirects and check articles linking to it:');
  console.log(`  npm run link -- backlinks ${article.slug}`);
}

function cmdStatus() {
  const index = loadIndex();
  const all = [...index.values()];
  const live = all.filter((a) => isLive(a, now)).sort((a, b) => b.publishDate!.getTime() - a.publishDate!.getTime());
  const drafts = all.filter((a) => a.draft);
  const scheduled = all
    .filter((a) => !a.draft && a.publishDate && a.publishDate > now)
    .sort((a, b) => a.publishDate!.getTime() - b.publishDate!.getTime());
  const n = Number(str(args, 'next') ?? 10);

  console.log(`Articles: ${all.length} total | ${live.length} live | ${scheduled.length} scheduled | ${drafts.length} drafts`);
  console.log('(live = published as of now; the deployed site reflects the last successful build)\n');
  console.log('Latest live:');
  for (const a of live.slice(0, 5)) console.log(`  ${fmtDate(a.publishDate)}  ${a.slug}`);
  if (scheduled.length) {
    console.log(`\nNext ${Math.min(n, scheduled.length)} scheduled (queue ends ${fmtDate(scheduled.at(-1)!.publishDate)}):`);
    for (const a of scheduled.slice(0, n)) console.log(`  ${fmtDate(a.publishDate)}  ${a.slug}`);
  }
  if (drafts.length) {
    console.log('\nDrafts:');
    for (const a of drafts) console.log(`  ${a.slug}`);
  }

  const banners = JSON.parse(readFileSync(join(process.cwd(), 'src', 'data', 'banners.json'), 'utf8')) as Banner[];
  console.log(`\nBanners live now: (${banners.length} configured — details: npm run banner -- list)`);
  for (const placement of BANNER_PLACEMENTS) {
    const ids = banners
      .filter((b) => b.placement === placement && isBannerLive(b, now))
      .map((b) => (b.categories?.length || b.articles?.length ? `${b.id} (targeted)` : b.id));
    console.log(`  ${placement.padEnd(15)} ${ids.join(', ') || '—'}`);
  }
}

const commands: Record<string, () => void> = {
  new: cmdNew,
  publish: cmdPublish,
  schedule: cmdSchedule,
  unpublish: cmdUnpublish,
  status: cmdStatus,
};

if (!command || !commands[command]) {
  console.log('usage: npm run post -- <new|publish|schedule|unpublish|status> ... (see the header of scripts/post.ts)');
  process.exit(command ? 1 : 0);
}
commands[command]();
