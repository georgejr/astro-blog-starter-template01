// Author registry for articles and data pages. The site publishes under an
// impersonal editorial-team byline (an Organization in structured data),
// with no personal name and no personal profile links. To add a pen name
// later, add an entry with `type: 'Person'` and point DEFAULT_AUTHOR at it.
export interface Author {
  id: string;
  name: string;
  /** 'Person' or 'Organization' for schema.org. */
  type: 'Person' | 'Organization';
  /** Short role line shown next to the byline. */
  title: string;
  /** 2-3 sentence bio, shown on /about/ and in the article footer. */
  bio: string;
  /** Public profile links used for schema.org `sameAs`. */
  sameAs: string[];
  /** Absolute path of the author page. */
  url: string;
}

export const AUTHORS: Author[] = [
  {
    id: 'editorial-team',
    name: 'SunMetricLab Editorial Team',
    type: 'Organization',
    title: 'Independent solar research and calculators',
    bio:
      'The SunMetricLab editorial team builds the calculators and data models on this site and writes and reviews the guides. The site started as a personal project to size a rooftop system when most online estimates were either vague or tied to a sales funnel. Every figure on the site is modeled from public data and can be reproduced with the formulas on the methodology page.',
    sameAs: [],
    url: '/about/',
  },
];

export const DEFAULT_AUTHOR = AUTHORS[0];

/**
 * Resolve an author by id or display name. Unknown values (including any
 * legacy frontmatter string) resolve to the default author.
 */
export function getAuthor(ref?: string): Author {
  if (!ref) return DEFAULT_AUTHOR;
  const key = ref.trim().toLowerCase();
  return (
    AUTHORS.find((a) => a.id === key || a.name.toLowerCase() === key) ?? DEFAULT_AUTHOR
  );
}
