// Registry of generated share images for NON-article pages (the site card,
// calculators, state and city cost pages). Each entry becomes
// /og/pages/<slug>.png at build time via src/pages/og/pages/[slug].png.ts.
import { calculators } from '../data/calculators';
import { STATE_SOLAR, ASSUMPTIONS, paybackYears, stateSlug } from '../data/state-solar';
import { CITIES, cityAsState, citySlug } from '../data/city-solar';
import type { OgOptions } from './og-image';

export interface OgPage extends OgOptions {
  slug: string;
}

const kw = ASSUMPTIONS.representativeKw;

export const OG_PAGES: OgPage[] = [
  { slug: 'site', title: 'Free Solar Panel Calculator: Size, Cost, Savings and Payback', category: 'Solar Calculator' },
  { slug: 'about', title: 'About SunMetricLab: who writes and checks the numbers', category: 'About' },
  { slug: 'methodology', title: 'How our solar estimates are calculated', category: 'Methodology' },
  { slug: 'blog', title: 'Solar Blog: sizing, costs, incentives and state guides', category: 'Blog' },
  { slug: 'cost-by-state', title: 'Solar Panel Cost by State (2026 modeled estimates)', category: 'Cost by State' },
  { slug: 'cost-by-city', title: 'Solar Panel Cost by City (2026 modeled estimates)', category: 'Cost by City' },
  ...calculators.map((c) => ({ slug: c.id, title: c.title, category: 'Free Calculator' })),
  ...STATE_SOLAR.map((s) => ({
    slug: `state-${stateSlug(s)}`,
    title: `Solar Panel Cost in ${s.name} (2026 Estimate)`,
    category: 'Cost by State',
    stat: { value: `${paybackYears(kw, s).toFixed(1)} yrs`, label: `modeled payback, ${kw} kW system` },
  })),
  ...CITIES.map((c) => ({
    slug: `city-${citySlug(c)}`,
    title: `Solar Panel Cost in ${c.name}, ${c.stateAbbr} (2026 Estimate)`,
    category: 'Cost by City',
    stat: {
      value: `${paybackYears(kw, cityAsState(c)).toFixed(1)} yrs`,
      label: `modeled payback, ${kw} kW system`,
    },
  })),
];

/** Absolute URL of a page's generated share image. */
export function ogPageUrl(slug: string, site: URL | string | undefined): string {
  return new URL(`/og/pages/${slug}.png`, site).href;
}
