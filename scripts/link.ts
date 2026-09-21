// Link CLI — add, find and audit links between articles, calculators, site
// pages and external URLs. Full guide: docs/linking.md
//
// <target> can be: an article slug, a calculator id, a site path
// ("/solar-panel-cost-by-state/texas/") or an absolute https:// URL.
//
//   npm run link -- add <source-slug> <target> --anchor "phrase" [--sponsored|--nofollow] [--dry-run] [--force]
//       Turns the first unlinked occurrence of the phrase in the source body into a link.
//   npm run link -- related <source-slug> <target-slug> [...]
//       Adds slugs to the source's relatedArticles (the "Related reading" cards).
//   npm run link -- find "<phrase>" [--to <target>] [--apply] [--limit 10] [--sponsored|--nofollow]
//       Lists articles that mention the phrase without a link. With --to + --apply,
//       links the phrase to the target in every eligible article (up to --limit).
//   npm run link -- list <slug>        Outgoing links of an article.
//   npm run link -- backlinks <slug>   Articles that link to <slug> (body or relatedArticles).
//
// On Windows PowerShell 5.1, which drops the "--", run: npx tsx scripts/link.ts <command> ...
import { readFileSync, writeFileSync } from 'node:fs';
import { extractLinks } from './lib/validate';
import { fmtDate, isLive, linkBlocker, loadIndex, resolveTarget, type Article, type Target } from './lib/articles';
import { fail, parseArgs, str } from './lib/cli';
import { addToList, bodyLinksTo, excerpt, findAnchors, insertLink, joinFile, readList, splitFile } from './lib/markdown-edit';

const args = parseArgs();
const [command, ...rest] = args._;
const now = new Date();
const index = loadIndex();
const dryRun = args['dry-run'] === true;

function article(slug: string | undefined): Article {
  if (!slug) fail('missing article slug');
  const found = index.get(slug);
  if (!found) fail(`no article with slug "${slug}"`);
  return found;
}

function target(value: string | undefined): Target {
  if (!value) fail('missing link target');
  try {
    return resolveTarget(value, index);
  } catch (error) {
    fail((error as Error).message);
  }
}

function relTitle(t: Target): string | undefined {
  if (args.sponsored === true || args.nofollow === true) {
    if (t.kind !== 'external') fail('--sponsored / --nofollow only apply to external URLs');
    return args.sponsored === true ? 'sponsored' : 'nofollow';
  }
  return undefined;
}

function status(a: Article): string {
  if (a.draft) return 'draft';
  return isLive(a, now) ? 'live' : `scheduled ${fmtDate(a.publishDate)}`;
}

/** Insert the link into one source. Returns a log line, or throws a reason to skip. */
function linkOne(source: Article, t: Target, anchor: string, title: string | undefined, force = false): string {
  if (t.kind === 'article') {
    const blocker = linkBlocker(source, t.article, now);
    if (blocker) throw new Error(blocker);
  }
  const raw = readFileSync(source.path, 'utf8');
  const parts = splitFile(raw);
  if (!force && bodyLinksTo(parts.body, t.href)) throw new Error(`already links to ${t.href} (use --force to add another)`);
  const result = insertLink(parts.body, anchor, t.href, title);
  if (!result) throw new Error(`no unlinked occurrence of "${anchor}" (headings, code and existing links are skipped)`);
  if (!dryRun) writeFileSync(source.path, joinFile({ ...parts, body: result.body }));
  return `${source.file}:${result.match.line}  "${result.match.text}" -> ${t.href}${title ? ` (${title})` : ''}`;
}

function cmdAdd() {
  const source = article(rest[0]);
  const t = target(rest[1]);
  const anchor = str(args, 'anchor');
  if (!anchor) fail('--anchor "phrase" is required (the words in the source text that become the link)');
  try {
    console.log(`${dryRun ? '[dry run] ' : ''}${linkOne(source, t, anchor, relTitle(t), args.force === true)}`);
  } catch (error) {
    fail((error as Error).message);
  }
}

function cmdRelated() {
  const source = article(rest[0]);
  const targets = rest.slice(1);
  if (targets.length === 0) fail('give at least one target slug');
  const raw = readFileSync(source.path, 'utf8');
  const parts = splitFile(raw);
  for (const slug of targets) {
    const t = article(slug);
    const blocker = linkBlocker(source, t, now);
    if (blocker) fail(blocker);
    parts.frontmatter = addToList(parts.frontmatter, 'relatedArticles', t.slug, parts.eol);
  }
  if (!dryRun) writeFileSync(source.path, joinFile(parts));
  console.log(`${dryRun ? '[dry run] ' : ''}${source.file} relatedArticles: ${readList(parts.frontmatter, 'relatedArticles').join(', ')}`);
}

function cmdFind() {
  const phrase = rest[0];
  if (!phrase) fail('usage: link find "<phrase>" [--to <target>] [--apply] [--limit N]');
  const t = str(args, 'to') ? target(str(args, 'to')) : null;
  const title = t ? relTitle(t) : undefined;
  const limit = Number(str(args, 'limit') ?? 10);
  const apply = args.apply === true;
  if (apply && !t) fail('--apply needs --to <target>');

  let applied = 0;
  let found = 0;
  const sources = [...index.values()].sort((a, b) => (b.publishDate?.getTime() ?? 0) - (a.publishDate?.getTime() ?? 0));
  for (const source of sources) {
    if (t?.kind === 'article' && t.article.slug === source.slug) continue;
    const hits = findAnchors(source.body, phrase);
    if (hits.length === 0) continue;
    found++;
    const where = `${source.slug} [${status(source)}]`;
    if (!t) {
      console.log(`${where}\n    ${excerpt(source.body, hits[0].index)}`);
      continue;
    }
    if (apply && applied >= limit) continue;
    try {
      if (apply && !dryRun) {
        console.log(`linked  ${linkOne(source, t, phrase, title)}`);
        applied++;
      } else {
        const blocker = t.kind === 'article' ? linkBlocker(source, t.article, now) : null;
        if (blocker) throw new Error(blocker);
        if (bodyLinksTo(source.body, t.href)) throw new Error(`already links to ${t.href}`);
        console.log(`can link  ${where}\n    ${excerpt(source.body, hits[0].index)}`);
        applied++;
      }
    } catch (error) {
      console.log(`skip    ${where}: ${(error as Error).message}`);
    }
  }
  console.log(`\n${found} article(s) mention "${phrase}" without a link${t ? `; ${applied} ${apply && !dryRun ? 'linked' : 'eligible'}` : ''}.`);
  if (t && !apply) console.log('Add --apply to insert the links (and --limit N to cap how many).');
}

function cmdList() {
  const source = article(rest[0]);
  console.log(`${source.slug} [${status(source)}]`);
  const links = extractLinks(source.body);
  console.log(`\nBody links (${links.length}):`);
  for (const href of links) console.log(`  ${href}`);
  const related = (source.data.relatedArticles as string[] | undefined) ?? [];
  console.log(`\nrelatedArticles: ${related.join(', ') || '—'}`);
  const calcs = (source.data.relatedCalculators as string[] | undefined) ?? [];
  console.log(`relatedCalculators: ${calcs.join(', ') || '—'}`);
}

function cmdBacklinks() {
  const t = article(rest[0]);
  const href = `/blog/${t.slug}/`;
  let count = 0;
  for (const source of index.values()) {
    const inBody = bodyLinksTo(source.body, href);
    const inRelated = ((source.data.relatedArticles as string[] | undefined) ?? []).includes(t.slug);
    if (!inBody && !inRelated) continue;
    count++;
    console.log(`  ${source.slug} [${status(source)}]${inBody ? ' body' : ''}${inRelated ? ' related' : ''}`);
  }
  console.log(`${count} article(s) link to ${href}`);
}

const commands: Record<string, () => void> = {
  add: cmdAdd,
  related: cmdRelated,
  find: cmdFind,
  list: cmdList,
  backlinks: cmdBacklinks,
};

if (!command || !commands[command]) {
  console.log('usage: npm run link -- <add|related|find|list|backlinks> ... (see the header of scripts/link.ts)');
  process.exit(command ? 1 : 0);
}
commands[command]();
