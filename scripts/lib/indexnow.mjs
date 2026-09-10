// IndexNow helpers (pure, testable). See https://www.indexnow.org/documentation
export const INDEXNOW_KEY = 'b80a112afefb4a8c97e9e763e1a8ae9c';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const MAX_URLS_PER_REQUEST = 10_000;

/** Extract every <loc> from a sitemap or sitemap index XML string. */
export function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

/** Keep only http(s) URLs whose host matches `host`, de-duplicated, order kept. */
export function filterUrlsForHost(urls, host) {
  const seen = new Set();
  const out = [];
  for (const raw of urls) {
    let u;
    try {
      u = new URL(raw);
    } catch {
      continue;
    }
    if (u.protocol !== 'https:' && u.protocol !== 'http:') continue;
    if (u.host !== host) continue;
    const s = u.toString();
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

/** Build the JSON body for a bulk IndexNow submission. */
export function buildPayload({ host, key, keyLocation, urlList }) {
  return { host, key, keyLocation, urlList };
}

/** Split a URL list into IndexNow-sized batches. */
export function chunk(list, size = MAX_URLS_PER_REQUEST) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

/** Human-readable meaning of an IndexNow response status. */
export function describeStatus(status) {
  switch (status) {
    case 200:
      return 'OK - URLs submitted';
    case 202:
      return 'Accepted - key validation pending';
    case 400:
      return 'Bad request - invalid format';
    case 403:
      return 'Forbidden - key not valid (key file not reachable or mismatched)';
    case 422:
      return 'Unprocessable - URLs do not belong to the host or key mismatch';
    case 429:
      return 'Too many requests - potential spam';
    default:
      return `Unexpected status ${status}`;
  }
}
