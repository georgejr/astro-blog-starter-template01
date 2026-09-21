import { describe, expect, it } from 'vitest';
import rehypeExternalLinks from '../src/lib/rehype-external-links.mjs';

type Node = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: Node[] };

const a = (href: string, extra: Record<string, unknown> = {}): Node => ({
  type: 'element',
  tagName: 'a',
  properties: { href, ...extra },
  children: [],
});

function run(links: Node[], options: Record<string, unknown> = {}) {
  const tree: Node = { type: 'root', children: [{ type: 'element', tagName: 'p', children: links }] };
  rehypeExternalLinks({ siteUrl: 'https://sunmetriclab.com', sponsoredDomains: ['partner.example'], ...options })(tree);
  return links.map((l) => l.properties);
}

describe('rehypeExternalLinks', () => {
  it('leaves internal and own-host links alone', () => {
    const [rel, own] = run([a('/blog/x/'), a('https://www.sunmetriclab.com/about/')]);
    expect(rel).toEqual({ href: '/blog/x/' });
    expect(own).toEqual({ href: 'https://www.sunmetriclab.com/about/' });
  });

  it('opens external links in a new tab with noopener', () => {
    const [ext] = run([a('https://www.nrel.gov/')]);
    expect(ext).toMatchObject({ rel: ['noopener'], target: '_blank' });
  });

  it('marks sponsored domains (including subdomains) and title markers', () => {
    const [domain, sub, marked, nofollow] = run([
      a('https://partner.example/x'),
      a('https://go.partner.example/x'),
      a('https://other.example/?ref=1', { title: 'sponsored' }),
      a('https://forum.example/', { title: 'nofollow' }),
    ]);
    expect(domain?.rel).toEqual(['noopener', 'sponsored', 'nofollow']);
    expect(sub?.rel).toEqual(['noopener', 'sponsored', 'nofollow']);
    expect(marked).toMatchObject({ rel: ['noopener', 'sponsored', 'nofollow'] });
    expect(marked).not.toHaveProperty('title');
    expect(nofollow?.rel).toEqual(['noopener', 'nofollow']);
  });

  it('respects openInNewTab: false and existing rel/target', () => {
    const [plain, kept] = run([a('https://x.example/'), a('https://y.example/', { rel: ['me'], target: '_self' })], {
      openInNewTab: false,
    });
    expect(plain).not.toHaveProperty('target');
    expect(kept).toMatchObject({ rel: ['me', 'noopener'], target: '_self' });
  });
});
