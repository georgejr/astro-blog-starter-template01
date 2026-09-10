// Re-stamps the publishDate of every NOT-YET-PUBLISHED article onto a weekly
// cadence (one article per week), preserving the existing queue order.
//
// Why: two auto-published posts a day reads as machine-generated volume to
// search engines' helpful-content systems. One deeper article a week is the
// editorial policy going forward (see docs/scheduled-publishing.md).
//
// Ordering is preserved exactly, so every cross-article link and
// relatedArticles reference (validated as "target published no later than
// source") stays valid.
//
// Usage:
//   node scripts/reschedule-weekly.mjs            # dry run: prints the new schedule
//   node scripts/reschedule-weekly.mjs --write    # rewrites frontmatter in place
//   node scripts/reschedule-weekly.mjs --write --start 2026-09-15 --hour 8 --weekday 2
//
// Defaults: first slot is the next Tuesday (weekday 2) at 08:00 UTC after
// "now"; only articles with publishDate > now are moved.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const WEEKDAY = Number(opt('--weekday', '2')); // 0 = Sunday ... 2 = Tuesday
const HOUR = Number(opt('--hour', '8'));
const NOW = new Date(opt('--now', new Date().toISOString()));

function nextSlot(from) {
  const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), HOUR, 0, 0));
  while (d.getUTCDay() !== WEEKDAY || d <= from) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

const startArg = opt('--start', null);
let slot = startArg ? new Date(`${startArg}T${String(HOUR).padStart(2, '0')}:00:00Z`) : nextSlot(NOW);

const DIR = join(process.cwd(), 'src', 'content', 'blog');
const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));

const queue = [];
for (const file of files) {
  const raw = readFileSync(join(DIR, file), 'utf8');
  const parsed = matter(raw);
  const date = new Date(parsed.data.publishDate);
  if (Number.isNaN(date.getTime())) {
    console.error(`skip ${file}: invalid publishDate`);
    continue;
  }
  if (date > NOW) queue.push({ file, date, raw });
}
queue.sort((a, b) => a.date - b.date || a.file.localeCompare(b.file));

console.log(`now: ${NOW.toISOString()} | unpublished articles: ${queue.length} | first slot: ${slot.toISOString()}`);

const ISO_RE = /^(publishDate:\s*)(\S+)\s*$/m;
let changed = 0;
for (const item of queue) {
  const iso = slot.toISOString().replace(/\.\d{3}Z$/, 'Z');
  const before = item.date.toISOString().replace(/\.\d{3}Z$/, 'Z');
  if (before !== iso) {
    changed++;
    if (WRITE) {
      if (!ISO_RE.test(item.raw)) throw new Error(`${item.file}: publishDate line not found`);
      const updated = item.raw.replace(ISO_RE, `$1${iso}`);
      writeFileSync(join(DIR, item.file), updated);
    }
  }
  if (!WRITE || queue.length <= 40) console.log(`${iso}  ${item.file}  (was ${before})`);
  slot = new Date(slot.getTime() + 7 * 24 * 60 * 60 * 1000);
}

const last = new Date(slot.getTime() - 7 * 24 * 60 * 60 * 1000);
console.log(`${WRITE ? 'rewrote' : 'would rewrite'} ${changed} file(s); last scheduled slot: ${last.toISOString()}`);
if (!WRITE) console.log('dry run - pass --write to apply');
