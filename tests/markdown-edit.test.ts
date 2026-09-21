import { describe, expect, it } from 'vitest';
import {
  addToList,
  bodyLinksTo,
  findAnchors,
  insertLink,
  joinFile,
  readList,
  setScalar,
  slugify,
  splitFile,
} from '../scripts/lib/markdown-edit';
import { imageSize } from '../scripts/lib/image-size';

describe('frontmatter editing', () => {
  const fm = ['title: "T"', 'draft: true', 'relatedArticles:', '  - a', '  - b', 'tags: []'].join('\n');

  it('round-trips a file and keeps CRLF', () => {
    const raw = '---\r\ntitle: "T"\r\n---\r\nBody\r\n';
    const parts = splitFile(raw);
    expect(parts.eol).toBe('\r\n');
    expect(joinFile(parts)).toBe(raw);
  });

  it('sets scalars in place', () => {
    expect(setScalar(fm, 'draft', 'false')).toContain('draft: false');
    expect(setScalar(fm, 'updatedDate', '2026-10-01T00:00:00Z')).toMatch(/updatedDate: 2026-10-01T00:00:00Z$/);
  });

  it('appends to block, empty-inline, inline and missing lists', () => {
    expect(readList(addToList(fm, 'relatedArticles', 'c'), 'relatedArticles')).toEqual(['a', 'b', 'c']);
    expect(addToList(fm, 'relatedArticles', 'a')).toBe(fm);
    expect(readList(addToList(fm, 'tags', 'net metering'), 'tags')).toEqual(['net metering']);
    expect(readList(addToList('tags: [x, "y"]', 'tags', 'z'), 'tags')).toEqual(['x', 'y', 'z']);
    expect(readList(addToList('title: "T"', 'relatedArticles', 'q'), 'relatedArticles')).toEqual(['q']);
  });
});

describe('link insertion', () => {
  const body = [
    '## Net metering basics',
    '',
    'Under net metering, credits roll over. See [net metering rules](/blog/x/) and `net metering`.',
    '',
    '```',
    'net metering in code',
    '```',
    'Later, Net Metering matters again.',
  ].join('\n');

  it('skips headings, existing links, inline code and code blocks', () => {
    const hits = findAnchors(body, 'net metering');
    expect(hits.map((h) => h.text)).toEqual(['net metering', 'Net Metering']);
    expect(hits[0].line).toBe(3);
  });

  it('links the first unlinked occurrence and keeps its casing', () => {
    const result = insertLink('Later, Net Metering matters.', 'net metering', '/blog/net/');
    expect(result?.body).toBe('Later, [Net Metering](/blog/net/) matters.');
    expect(insertLink('nothing here', 'net metering', '/x/')).toBeNull();
  });

  it('adds a rel marker title for external links', () => {
    const result = insertLink('Get solar quotes today.', 'solar quotes', 'https://p.example/?r=1', 'sponsored');
    expect(result?.body).toBe('Get [solar quotes](https://p.example/?r=1 "sponsored") today.');
  });

  it('matches whole words only', () => {
    expect(findAnchors('solarpanel and solar-panel', 'solar')).toHaveLength(0);
  });

  it('detects existing links to a target', () => {
    expect(bodyLinksTo('see [x](/blog/a/#faq)', '/blog/a/')).toBe(true);
    expect(bodyLinksTo('see [x](/blog/ab/)', '/blog/a/')).toBe(false);
  });

  it('slugifies titles', () => {
    expect(slugify('Solar & Batteries: What’s Worth It in 2026?')).toBe('solar-and-batteries-what-s-worth-it-in-2026');
  });
});

describe('imageSize', () => {
  it('reads PNG and GIF headers', () => {
    const png = Buffer.alloc(24);
    png.writeUInt32BE(0x89504e47, 0);
    png.writeUInt32BE(728, 16);
    png.writeUInt32BE(90, 20);
    expect(imageSize(png)).toEqual({ width: 728, height: 90 });

    const gif = Buffer.from('GIF89a\x2c\x01\xfa\x00', 'latin1');
    expect(imageSize(gif)).toEqual({ width: 300, height: 250 });
    expect(imageSize(Buffer.from('<svg/>'))).toBeNull();
  });
});
