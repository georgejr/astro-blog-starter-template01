export const SITE_NAME = 'Solar Panel Calculator';

// Third-party integration IDs. Leave empty until the service is connected —
// the matching component renders nothing while the value is ''.
export const GA_MEASUREMENT_ID = 'G-0ZKTHM0BCL'; // Google Analytics 4
export const GOOGLE_SITE_VERIFICATION = ''; // Search Console meta tag `content` value

export const SITE_TAGLINE =
  'Estimate your solar system size, cost, savings, and payback time in minutes.';

export const DISCLAIMER_TEXT =
  'This calculator provides a rough estimate only. Actual solar production, installation cost, incentives, utility savings, and payback period depend on your location, roof orientation, shading, electricity provider, installer pricing, tax eligibility, and local regulations. Always consult a qualified solar installer or tax professional before making a purchase decision.';

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/solar-panel-calculator/', label: 'Calculator' },
  { href: '/solar-panel-cost-calculator/', label: 'Cost' },
  { href: '/solar-roi-calculator/', label: 'ROI' },
  { href: '/solar-battery-calculator/', label: 'Battery' },
  { href: '/solar-panel-cost-by-state/', label: 'Cost by State' },
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



