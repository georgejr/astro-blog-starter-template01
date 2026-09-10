export const SITE_NAME = 'SunMetricLab';
export const SITE_URL = 'https://sunmetriclab.com';

/**
 * Date the modeled data inputs (state sun hours, electricity rates, price
 * tiers) were last reviewed. Shown as "Last updated" on the data pages and
 * emitted as `dateModified` in their structured data. Bump it whenever
 * src/data/state-solar.ts, city-solar.ts or state-notes/* change.
 */
export const DATA_LAST_UPDATED = '2026-09-10';
export const DATA_FIRST_PUBLISHED = '2026-07-13';

/**
 * Status of the 30% federal Residential Clean Energy Credit (IRC 25D). The
 * July 2025 federal budget law ended it for expenditures made after
 * December 31, 2025, so a homeowner-purchased system installed in 2026 no
 * longer qualifies; third-party-owned (leased / PPA) systems can still carry
 * the separate commercial credit through the installer for a limited time.
 * The calculators keep the credit as an optional toggle so figures stay
 * comparable with quotes that include it.
 */
export const FEDERAL_CREDIT_NOTE =
  'The 30% federal Residential Clean Energy Credit ended for systems paid for after December 31, 2025 under the 2025 federal budget law. Net-after-credit figures apply only if you still qualify (for example a 2025 expenditure, or a leased system where the installer passes a credit through). Confirm with a tax professional.';

// Third-party integration IDs. Leave empty until the service is connected —
// the matching component renders nothing while the value is ''.
export const GA_MEASUREMENT_ID = 'G-0ZKTHM0BCL'; // Google Analytics 4
export const GOOGLE_SITE_VERIFICATION = ''; // Search Console meta tag `content` value

// Web3Forms access key for the contact form. Create a free key at
// https://web3forms.com using the destination inbox (volanosdi@gmail.com) —
// the key is tied to that address and is safe to expose client-side. While
// this is '' the contact form shows a "not configured yet" message instead of
// submitting. Paste the key you receive by email here.
export const WEB3FORMS_ACCESS_KEY = '8be85f48-7911-4155-8722-b02a2201fcfc';

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
  { href: '/about/', label: 'About' },
];

export const CALCULATOR_LINKS: NavLink[] = [
  { href: '/solar-panel-calculator/', label: 'Solar Panel Calculator' },
  { href: '/solar-panel-cost-calculator/', label: 'Solar Panel Cost Calculator' },
  { href: '/solar-roi-calculator/', label: 'Solar ROI Calculator' },
  { href: '/solar-battery-calculator/', label: 'Solar Battery Calculator' },
  { href: '/how-many-solar-panels-do-i-need/', label: 'How Many Solar Panels Do I Need?' },
  { href: '/solar-panel-size-calculator/', label: 'Solar Panel Size Calculator' },
  { href: '/solar-loan-calculator/', label: 'Solar Loan Calculator' },
  { href: '/solar-payback-calculator/', label: 'Solar Payback Calculator' },
  { href: '/ev-charging-calculator/', label: 'EV Charging Cost Calculator' },
  { href: '/heat-pump-calculator/', label: 'Heat Pump Cost Calculator' },
  { href: '/electricity-bill-calculator/', label: 'Electricity Bill Calculator' },
  { href: '/federal-tax-credit-calculator/', label: 'Federal Solar Tax Credit Calculator' },
  { href: '/solar-payment-comparison/', label: 'Cash vs. Loan vs. Lease Comparator' },
];

/**
 * Short, curated calculator set for hub/listing pages (blog index, category,
 * tag, state and city indexes). The full CALCULATOR_LINKS list lives in the
 * footer only, so it is not repeated as boilerplate on every page.
 */
export const TOP_CALCULATOR_LINKS: NavLink[] = [
  { href: '/solar-panel-calculator/', label: 'Solar Panel Calculator' },
  { href: '/how-many-solar-panels-do-i-need/', label: 'How Many Solar Panels Do I Need?' },
  { href: '/solar-panel-cost-calculator/', label: 'Solar Panel Cost Calculator' },
  { href: '/solar-payback-calculator/', label: 'Solar Payback Calculator' },
];
