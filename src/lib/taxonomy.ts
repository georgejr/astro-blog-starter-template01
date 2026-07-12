// Canonical article categories. The content schema, the content validator,
// the content plan, and the category pages all consume this list — adding a
// category here is the single step needed to make it valid everywhere.
export const CATEGORIES = [
  'Solar Costs',
  'Savings & ROI',
  'Payback',
  'System Sizing',
  'Electricity Usage',
  'Roof & Shading',
  'Batteries & Storage',
  'Inverters & Components',
  'Installation',
  'Maintenance & Lifespan',
  'Incentives & Tax Credits',
  'State Guides',
  'Off-Grid & Mobile',
  'Myths & Comparisons',
] as const;

export type Category = (typeof CATEGORIES)[number];

/** URL slug for a category or tag: "Savings & ROI" -> "savings-roi". */
export function taxonomySlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
