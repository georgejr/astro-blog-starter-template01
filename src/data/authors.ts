// Named authors for articles and data pages. A real, named person behind the
// content is part of the E-E-A-T signal that a faceless, high-volume site
// lacks. Articles reference an author by `id` in frontmatter (`author`);
// unknown values fall back to the site's editorial team entry.
//
// TODO(owner): confirm the display name, bio and profile links below before
// the next deploy - they are published on every article and on /about/.
export interface Author {
  id: string;
  name: string;
  /** Short role line shown next to the byline. */
  title: string;
  /** 2-3 sentence bio, shown on /about/ and in the article footer. */
  bio: string;
  /** Public profile links used for schema.org `sameAs` (LinkedIn, GitHub, X ...). */
  sameAs: string[];
  /** Absolute path of the author page. */
  url: string;
}

export const AUTHORS: Author[] = [
  {
    id: 'gyorgy-zsibrita',
    name: 'György Zsibrita',
    title: 'Founder and editor, SunMetricLab',
    bio:
      'György builds the calculators and data models behind SunMetricLab and writes and reviews the guides. A software engineer by trade, György started the site after sizing a rooftop system at home and finding most online estimates either vague or tied to a sales funnel. Every figure on the site is modeled from public data and can be reproduced with the formulas on the methodology page.',
    sameAs: ['https://github.com/georgejr'],
    url: '/about/',
  },
];

export const DEFAULT_AUTHOR = AUTHORS[0];

/**
 * Resolve an author by id or display name. The legacy frontmatter value
 * "SunMetricLab Editorial Team" (and any unknown value) resolves to the
 * default named author, who edits and signs off every article.
 */
export function getAuthor(ref?: string): Author {
  if (!ref) return DEFAULT_AUTHOR;
  const key = ref.trim().toLowerCase();
  return (
    AUTHORS.find((a) => a.id === key || a.name.toLowerCase() === key) ?? DEFAULT_AUTHOR
  );
}
