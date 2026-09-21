// Banner CLI — manage src/data/banners.json. Full guide: docs/banners.md
//
//   npm run banner -- list
//   npm run banner -- add --id <id> --placement <slot> --image <file|/banners/x.webp|https://...> --href <url> --alt "text" [options]
//   npm run banner -- add --id <id> --placement <slot> --html-file snippet.html [options]
//       Options:
//         --mobile <file|path>        narrower creative for screens < 640px
//         --width N --height N        only needed when the size can't be read (SVG, remote URL)
//         --start ISO --end ISO       show only between these moments (checked at build time)
//         --categories "A,B"          only on these categories   --articles "slug1,slug2"  only on these articles
//         --exclude "slug1,slug2"     never on these articles     --priority N              higher wins (default 0)
//         --house                     own promo: no "sponsored" rel, no "Advertisement" label
//         --label "Sponsored"         custom label ('' to hide)   --inactive                add switched off
//       A local image outside public/ is copied to public/banners/.
//   npm run banner -- enable <id> | disable <id> | remove <id>
//
// Placements: article-top, article-bottom, listing, home, calculator.
// On Windows PowerShell 5.1, which drops the "--", run: npx tsx scripts/banner.ts <command> ...
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, isAbsolute, join, relative, resolve } from 'node:path';
import { BANNER_PLACEMENTS, isBannerLive, validateBanners, type Banner } from '../src/lib/banners';
import { CATEGORIES } from '../src/lib/taxonomy';
import { loadArticles } from './lib/load';
import { fail, list, parseArgs, str } from './lib/cli';
import { imageSize } from './lib/image-size';

const FILE = join(process.cwd(), 'src', 'data', 'banners.json');
const PUBLIC = join(process.cwd(), 'public');
const args = parseArgs();
const [command, id] = args._;

const load = (): Banner[] => JSON.parse(readFileSync(FILE, 'utf8'));

function save(banners: Banner[]) {
  const problems = validateBanners(banners, {
    categories: CATEGORIES,
    slugs: new Set(loadArticles().map((a) => a.slug)),
    publicFileExists: (p) => existsSync(join(PUBLIC, decodeURI(p.split(/[?#]/)[0]))),
  });
  if (problems.length) fail(`not saved:\n  ${problems.join('\n  ')}`);
  writeFileSync(FILE, `${JSON.stringify(banners, null, 2)}\n`);
}

/** Turn a CLI image argument into a site path or URL, copying local files into public/banners/. */
function importImage(value: string): { src: string; file: string | null } {
  if (/^https?:\/\//.test(value)) return { src: value, file: null };
  if (value.startsWith('/') && existsSync(join(PUBLIC, value))) return { src: value, file: join(PUBLIC, value) };
  const local = resolve(value);
  if (!existsSync(local)) fail(`image not found: ${value}`);
  const rel = relative(PUBLIC, local);
  if (rel && !rel.startsWith('..') && !isAbsolute(rel)) {
    return { src: `/${rel.split('\\').join('/')}`, file: local };
  }
  const name = basename(local).toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  mkdirSync(join(PUBLIC, 'banners'), { recursive: true });
  const dest = join(PUBLIC, 'banners', name);
  if (existsSync(dest)) fail(`public/banners/${name} already exists — rename the file or reference it as /banners/${name}`);
  copyFileSync(local, dest);
  console.log(`copied ${value} -> public/banners/${name}`);
  return { src: `/banners/${name}`, file: dest };
}

function cmdList() {
  const banners = load();
  if (banners.length === 0) {
    console.log('No banners configured (src/data/banners.json is empty).');
    return;
  }
  const now = new Date();
  for (const b of banners) {
    const state = isBannerLive(b, now) ? 'LIVE' : b.active === false ? 'off' : 'scheduled/expired';
    const target = [
      b.categories?.length ? `categories=${b.categories.join('|')}` : '',
      b.articles?.length ? `articles=${b.articles.join('|')}` : '',
    ]
      .filter(Boolean)
      .join(' ');
    console.log(
      `${b.id.padEnd(28)} ${b.placement.padEnd(15)} ${state.padEnd(17)} prio=${b.priority ?? 0} ${b.html ? 'html' : `${b.image} -> ${b.href}`}${target ? ` ${target}` : ''}${b.start || b.end ? ` [${b.start ?? '…'} – ${b.end ?? '…'}]` : ''}`,
    );
  }
}

function cmdAdd() {
  const banners = load();
  const newId = str(args, 'id');
  if (!newId) fail('--id is required (kebab-case, e.g. solar-quotes-728x90)');
  if (banners.some((b) => b.id === newId)) fail(`a banner with id "${newId}" already exists`);
  const placement = str(args, 'placement') as Banner['placement'];
  if (!BANNER_PLACEMENTS.includes(placement)) fail(`--placement must be one of: ${BANNER_PLACEMENTS.join(', ')}`);

  const banner: Banner = { id: newId, placement };
  const htmlFile = str(args, 'html-file');
  const image = str(args, 'image');
  if (htmlFile) {
    if (!existsSync(htmlFile)) fail(`file not found: ${htmlFile}`);
    banner.html = readFileSync(htmlFile, 'utf8').trim();
  } else if (image) {
    const { src, file } = importImage(image);
    banner.image = src;
    const size = file ? imageSize(readFileSync(file)) : null;
    banner.width = Number(str(args, 'width') ?? size?.width);
    banner.height = Number(str(args, 'height') ?? size?.height);
    if (!banner.width || !banner.height) fail('could not read the image size — pass --width and --height');
    const mobile = str(args, 'mobile');
    if (mobile) banner.imageMobile = importImage(mobile).src;
    banner.href = str(args, 'href');
    banner.alt = str(args, 'alt');
  } else {
    fail('give --image <file> (with --href and --alt) or --html-file <snippet.html>');
  }

  if (args.house === true) banner.sponsored = false;
  if (typeof args.label === 'string') banner.label = args.label;
  if (args.inactive === true) banner.active = false;
  if (str(args, 'start')) banner.start = str(args, 'start');
  if (str(args, 'end')) banner.end = str(args, 'end');
  if (list(args, 'categories').length) banner.categories = list(args, 'categories');
  if (list(args, 'articles').length) banner.articles = list(args, 'articles');
  if (list(args, 'exclude').length) banner.excludeArticles = list(args, 'exclude');
  if (str(args, 'priority')) banner.priority = Number(str(args, 'priority'));

  banners.push(banner);
  save(banners);
  console.log(`added banner "${newId}" (${placement}). It goes live with the next deploy.`);
}

function setActive(active: boolean) {
  const banners = load();
  const banner = banners.find((b) => b.id === id);
  if (!banner) fail(`no banner with id "${id}"`);
  if (active) delete banner.active;
  else banner.active = false;
  save(banners);
  console.log(`banner "${id}" ${active ? 'enabled' : 'disabled'} (takes effect on next deploy)`);
}

function cmdRemove() {
  const banners = load();
  const banner = banners.find((b) => b.id === id);
  if (!banner) fail(`no banner with id "${id}"`);
  save(banners.filter((b) => b !== banner));
  console.log(`removed banner "${id}".`);
  const files = [banner.image, banner.imageMobile].filter((f): f is string => Boolean(f?.startsWith('/')));
  if (files.length) console.log(`Image file(s) kept: ${files.map((f) => `public${f}`).join(', ')} — delete them if unused.`);
}

const commands: Record<string, () => void> = {
  list: cmdList,
  add: cmdAdd,
  enable: () => setActive(true),
  disable: () => setActive(false),
  remove: cmdRemove,
};

if (!command || !commands[command]) {
  console.log('usage: npm run banner -- <list|add|enable|disable|remove> ... (see the header of scripts/banner.ts)');
  process.exit(command ? 1 : 0);
}
commands[command]();
