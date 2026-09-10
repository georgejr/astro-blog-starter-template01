import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  INDEXNOW_KEY,
  buildPayload,
  chunk,
  describeStatus,
  filterUrlsForHost,
  parseSitemapLocs,
} from '../scripts/lib/indexnow.mjs';

describe('indexnow helpers', () => {
  it('parses <loc> entries from sitemap XML', () => {
    const xml =
      '<?xml version="1.0"?><urlset><url><loc>https://a.com/</loc></url>' +
      '<url><loc> https://a.com/x/ </loc></url></urlset>';
    expect(parseSitemapLocs(xml)).toEqual(['https://a.com/', 'https://a.com/x/']);
  });

  it('keeps only same-host http(s) URLs, de-duplicated', () => {
    const urls = [
      'https://a.com/',
      'https://a.com/',
      'https://other.com/',
      'mailto:x@a.com',
      'not a url',
      'http://a.com/p/',
    ];
    expect(filterUrlsForHost(urls, 'a.com')).toEqual(['https://a.com/', 'http://a.com/p/']);
  });

  it('builds the documented bulk payload shape', () => {
    expect(
      buildPayload({
        host: 'a.com',
        key: 'k',
        keyLocation: 'https://a.com/k.txt',
        urlList: ['https://a.com/'],
      }),
    ).toEqual({
      host: 'a.com',
      key: 'k',
      keyLocation: 'https://a.com/k.txt',
      urlList: ['https://a.com/'],
    });
  });

  it('chunks into batches', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 2)).toEqual([]);
  });

  it('describes known statuses', () => {
    expect(describeStatus(200)).toMatch(/OK/);
    expect(describeStatus(403)).toMatch(/key/i);
    expect(describeStatus(418)).toMatch(/418/);
  });

  it('hosted key file matches the key constant exactly', () => {
    const body = readFileSync(`public/${INDEXNOW_KEY}.txt`, 'utf8');
    expect(body).toBe(INDEXNOW_KEY);
  });
});
