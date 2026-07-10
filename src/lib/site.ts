export const SITE_NAME = 'Solar Panel Calculator';

// Third-party integration IDs. Leave empty until the service is connected —
// the matching component renders nothing while the value is ''.
export const GA_MEASUREMENT_ID = 'G-0ZKTHM0BCL'; // Google Analytics 4
export const GOOGLE_SITE_VERIFICATION = ''; // Search Console meta tag `content` value
export const ADSENSE_CLIENT_ID = 'ca-pub-9548133728498958'; // AdSense publisher id

// Ad unit slot ids per AdSlot format. A format with an empty slot renders
// the dashed placeholder instead of a real ad.
export type AdFormat = 'horizontal' | 'rectangle' | 'in-feed' | 'in-article' | 'multiplex';

export const ADSENSE_SLOTS: Record<AdFormat, string> = {
  horizontal: '8103168523', // "sunmetric vizszintes"
  rectangle: '8103168523', // reuses the responsive "sunmetric vizszintes" unit for now
  'in-feed': '3892460772', // content feed unit (blog list)
  'in-article': '9224678507', // in-article unit (inside posts)
  multiplex: '7911596832', // autorelaxed "recommended content" grid (below posts)
};

// Layout key of the in-feed ad unit (comes with the unit's embed code).
export const ADSENSE_IN_FEED_LAYOUT_KEY = '-6t+ed+2i-1n-4w';

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



