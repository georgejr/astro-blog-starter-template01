// Rehype plugin for article Markdown: gives outbound links the right `rel`
// and `target`. Rules come from src/data/external-links.json (see
// docs/linking.md):
//
// - every link to another host gets rel="noopener" (+ target="_blank" when
//   openInNewTab is true);
// - hosts in sponsoredDomains (or their subdomains) also get
//   rel="sponsored nofollow" — required by Google for affiliate/paid links;
// - hosts in nofollowDomains get rel="nofollow";
// - a single link can be marked in Markdown with the title "sponsored" or
//   "nofollow":  [Get quotes](https://partner.example/?ref=1 "sponsored")
//   The marker title is removed from the output.
//
// Links to the site's own host and relative links are left untouched.

function hostMatches(host, domains) {
  return domains.some((domain) => {
    const d = domain.toLowerCase().replace(/^www\./, '');
    return host === d || host.endsWith(`.${d}`);
  });
}

function relTokens(value) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') return value.split(/\s+/).filter(Boolean);
  return [];
}

function visitLinks(node, fn) {
  if (node.type === 'element' && node.tagName === 'a') fn(node);
  if (node.children) for (const child of node.children) visitLinks(child, fn);
}

/**
 * @param {{ siteUrl: string, openInNewTab?: boolean, sponsoredDomains?: string[], nofollowDomains?: string[] }} options
 */
export default function rehypeExternalLinks(options) {
  const siteHost = new URL(options.siteUrl).host.replace(/^www\./, '');
  const { openInNewTab = true, sponsoredDomains = [], nofollowDomains = [] } = options;

  return (tree) => {
    visitLinks(tree, (node) => {
      const props = (node.properties ??= {});
      const href = typeof props.href === 'string' ? props.href : '';
      if (!/^https?:\/\//i.test(href)) return;

      let host;
      try {
        host = new URL(href).host.toLowerCase().replace(/^www\./, '');
      } catch {
        return;
      }
      if (host === siteHost) return;

      const rel = new Set(relTokens(props.rel));
      rel.add('noopener');

      const marker = typeof props.title === 'string' ? props.title.trim().toLowerCase() : '';
      if (marker === 'sponsored' || marker === 'nofollow') delete props.title;

      if (marker === 'sponsored' || hostMatches(host, sponsoredDomains)) {
        rel.add('sponsored');
        rel.add('nofollow');
      }
      if (marker === 'nofollow' || hostMatches(host, nofollowDomains)) rel.add('nofollow');

      props.rel = [...rel];
      if (openInNewTab && props.target === undefined) props.target = '_blank';
    });
  };
}
