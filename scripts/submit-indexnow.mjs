// Submit the site's URLs to IndexNow (Bing, Yandex, Seznam, Naver, ...) so
// search engines learn about new and updated pages right after a deploy.
//
// Runs automatically as the `postdeploy` npm hook (after `wrangler deploy`),
// i.e. once the new build - including the key file - is live.
//
// Sources of URLs, in priority order:
//   1. INDEXNOW_URLS env var: comma/whitespace-separated absolute URLs.
//   2. dist/sitemap-index.xml (+ every sitemap it references) - the default.
//
// Flags:
//   --dry-run   print what would be submitted, do not call the API.
//
// The script never fails the deploy: any problem is logged and exit code is 0.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  buildPayload,
  chunk,
  describeStatus,
  filterUrlsForHost,
  parseSitemapLocs,
} from './lib/indexnow.mjs';

const SITE = process.env.INDEXNOW_SITE ?? 'https://sunmetriclab.com';
const HOST = new URL(SITE).host;
const KEY = process.env.INDEXNOW_KEY ?? INDEXNOW_KEY;
const KEY_LOCATION = `${SITE.replace(/\/$/, '')}/${KEY}.txt`;
const DIST = join(process.cwd(), 'dist');
const DRY_RUN = process.argv.includes('--dry-run');

const log = (msg) => console.log(`indexnow - ${msg}`);

function collectUrlsFromDist() {
  const index = join(DIST, 'sitemap-index.xml');
  if (!existsSync(index)) {
    log('dist/sitemap-index.xml not found; run astro build first');
    return [];
  }
  const urls = [];
  for (const loc of parseSitemapLocs(readFileSync(index, 'utf8'))) {
    const file = join(DIST, new URL(loc).pathname);
    if (!existsSync(file)) {
      log(`referenced sitemap missing in dist: ${loc}`);
      continue;
    }
    urls.push(...parseSitemapLocs(readFileSync(file, 'utf8')));
  }
  return urls;
}

function collectUrls() {
  const fromEnv = process.env.INDEXNOW_URLS;
  if (fromEnv && fromEnv.trim()) {
    return filterUrlsForHost(fromEnv.split(/[\s,]+/).filter(Boolean), HOST);
  }
  return filterUrlsForHost(collectUrlsFromDist(), HOST);
}

async function keyFileIsLive() {
  try {
    const res = await fetch(KEY_LOCATION, { cache: 'no-store' });
    if (!res.ok) return `HTTP ${res.status}`;
    const body = (await res.text()).trim();
    return body === KEY ? null : `content mismatch ("${body.slice(0, 40)}")`;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
}

async function submit(urlList) {
  const payload = buildPayload({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  return res.status;
}

async function main() {
  const urls = collectUrls();
  if (urls.length === 0) {
    log('no URLs to submit');
    return;
  }
  log(`${urls.length} URL(s) for ${HOST}, key file ${KEY_LOCATION}`);

  if (DRY_RUN) {
    for (const u of urls) console.log(`  ${u}`);
    log('dry run - nothing sent');
    return;
  }

  const keyProblem = await keyFileIsLive();
  if (keyProblem) {
    log(`key file not verified (${keyProblem}); skipping submission`);
    return;
  }

  for (const batch of chunk(urls)) {
    const status = await submit(batch);
    log(`submitted ${batch.length} URL(s): ${status} ${describeStatus(status)}`);
  }
}

main().catch((err) => {
  log(`error: ${err instanceof Error ? err.message : String(err)}`);
});
