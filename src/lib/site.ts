export const SITE_NAME = 'Solar Panel Calculator';

// Third-party integration IDs. Leave empty until the service is connected —
// the matching component renders nothing while the value is ''.
export const GA_MEASUREMENT_ID = 'G-0ZKTHM0BCL'; // Google Analytics 4
export const GOOGLE_SITE_VERIFICATION = ''; // Search Console meta tag `content` value
// Monetag zone ids. Monetization is script-based (site-wide tags plus a
// vignette on article pages), not per-slot markup — see Monetag.astro and
// MonetagVignette.astro. There are no ad-unit slot ids to configure.
export const MONETAG_MULTITAG_ZONE = '259117';
export const MONETAG_VIGNETTE_ZONE = '11278311';
// Additional site-wide Monetag zone tag (separate CDN/format).
export const MONETAG_TAG2_SRC = 'https://5gvci.com/act/files/tag.min.js?z=11278348';

export const SITE_TAGLINE =
  'Estimate your solar system size, cost, savings, and payback time in minutes.';

export const DISCLAIMER_TEXT =
  'This calculator provides a rough estimate only. Actual solar production, installation cost, incentives, utility savings, and payback period depend on your location, roof orientation, shading, electricity provider, installer pricing, tax eligibility, and local regulations. Always consult a qualified solar installer or tax professional before making a purchase decision.';

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/solar-panel-calculator/', label: 'Solar Calculator' },
  { href: '/solar-panel-cost-calculator/', label: 'Cost' },
  { href: '/solar-roi-calculator/', label: 'ROI' },
  { href: '/solar-battery-calculator/', label: 'Battery' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
];

export const CALCULATOR_LINKS: NavLink[] = [
  { href: '/solar-panel-calculator/', label: 'Solar Panel Calculator' },
  { href: '/solar-panel-cost-calculator/', label: 'Solar Panel Cost Calculator' },
  { href: '/solar-roi-calculator/', label: 'Solar ROI Calculator' },
  { href: '/solar-battery-calculator/', label: 'Solar Battery Calculator' },
  { href: '/how-many-solar-panels-do-i-need/', label: 'How Many Solar Panels Do I Need?' },
  { href: '/solar-panel-size-calculator/', label: 'Solar Panel Size Calculator' },
];



