// Curated, contextual relationships between calculators. Replaces the
// repeated 13-item "all calculators" list (boilerplate that search engines
// discount) with a short set of genuinely related tools per page, plus a
// one-line call to action used when an article references a calculator.
import { calculators, type Calculator } from './calculators';

interface CalculatorMeta {
  /** ids of the 3-4 most relevant sibling calculators, in display order. */
  related: string[];
  /** Action phrase used in contextual CTAs, e.g. "Calculate your own payback". */
  cta: string;
  /** One sentence describing what the reader gets. */
  blurb: string;
}

export const CALCULATOR_META: Record<string, CalculatorMeta> = {
  'solar-panel-calculator': {
    related: ['how-many-solar-panels-do-i-need', 'solar-panel-cost-calculator', 'solar-roi-calculator', 'solar-battery-calculator'],
    cta: 'Run your own solar estimate',
    blurb: 'System size, panel count, cost after the federal credit, savings and payback from your monthly bill.',
  },
  'solar-panel-cost-calculator': {
    related: ['federal-tax-credit-calculator', 'solar-loan-calculator', 'solar-panel-calculator', 'solar-payment-comparison'],
    cta: 'Estimate your installed cost',
    blurb: 'Gross and net system cost from your usage, local price per watt and the 30% federal credit.',
  },
  'solar-roi-calculator': {
    related: ['solar-payback-calculator', 'solar-loan-calculator', 'solar-panel-cost-calculator', 'solar-battery-calculator'],
    cta: 'Calculate your solar ROI',
    blurb: 'Yearly savings, payback period and 25-year return for a system sized to your bill.',
  },
  'solar-battery-calculator': {
    related: ['solar-payback-calculator', 'solar-roi-calculator', 'federal-tax-credit-calculator', 'solar-panel-calculator'],
    cta: 'See what a battery does to your payback',
    blurb: 'Compare solar-only against a small backup or whole-home battery on total cost and payback.',
  },
  'how-many-solar-panels-do-i-need': {
    related: ['solar-panel-size-calculator', 'solar-panel-calculator', 'electricity-bill-calculator', 'solar-panel-cost-calculator'],
    cta: 'Get your exact panel count',
    blurb: 'Panels needed from your bill, sun hours and panel wattage, with a roof-area check.',
  },
  'solar-panel-size-calculator': {
    related: ['how-many-solar-panels-do-i-need', 'solar-panel-calculator', 'electricity-bill-calculator', 'solar-panel-cost-calculator'],
    cta: 'Size your system in kW',
    blurb: 'Convert your electricity usage into the right system size and see the panels and cost that go with it.',
  },
  'solar-loan-calculator': {
    related: ['solar-payment-comparison', 'solar-payback-calculator', 'solar-panel-cost-calculator', 'solar-roi-calculator'],
    cta: 'Check your monthly loan payment',
    blurb: 'Monthly payment, total interest and whether the loan is cash-flow positive against your savings.',
  },
  'solar-payback-calculator': {
    related: ['solar-roi-calculator', 'solar-loan-calculator', 'solar-battery-calculator', 'solar-panel-cost-calculator'],
    cta: 'Calculate your own payback period',
    blurb: 'Break-even year and lifetime savings from your net cost and yearly bill savings.',
  },
  'ev-charging-calculator': {
    related: ['electricity-bill-calculator', 'how-many-solar-panels-do-i-need', 'solar-panel-calculator', 'heat-pump-calculator'],
    cta: 'Estimate your EV charging cost',
    blurb: 'Monthly kWh and cost of home charging, and how many extra panels would cover it.',
  },
  'heat-pump-calculator': {
    related: ['electricity-bill-calculator', 'ev-charging-calculator', 'how-many-solar-panels-do-i-need', 'solar-panel-calculator'],
    cta: 'Estimate your heat pump running cost',
    blurb: 'Yearly heating and cooling electricity use and cost for a heat pump, and the solar to offset it.',
  },
  'electricity-bill-calculator': {
    related: ['how-many-solar-panels-do-i-need', 'solar-panel-size-calculator', 'ev-charging-calculator', 'heat-pump-calculator'],
    cta: 'Break down your electricity bill',
    blurb: 'Monthly kWh and cost from your appliances and rate, the starting point for any solar sizing.',
  },
  'federal-tax-credit-calculator': {
    related: ['solar-panel-cost-calculator', 'solar-battery-calculator', 'solar-payment-comparison', 'solar-roi-calculator'],
    cta: 'Calculate your federal tax credit',
    blurb: 'The 30% Residential Clean Energy Credit on your system cost, and what is left after it.',
  },
  'solar-payment-comparison': {
    related: ['solar-loan-calculator', 'solar-payback-calculator', 'solar-roi-calculator', 'federal-tax-credit-calculator'],
    cta: 'Compare cash, loan and lease',
    blurb: 'Side-by-side 25-year cost of paying cash, financing or leasing the same system.',
  },
};

export interface RelatedCalculator extends Calculator {
  cta: string;
  blurb: string;
}

const byId = new Map(calculators.map((c) => [c.id, c]));

export function calculatorById(id: string): RelatedCalculator | undefined {
  const calc = byId.get(id);
  const meta = CALCULATOR_META[id];
  if (!calc) return undefined;
  return { ...calc, cta: meta?.cta ?? calc.title, blurb: meta?.blurb ?? '' };
}

/** Related calculators for a calculator page, resolved to full entries. */
export function relatedCalculators(id: string, limit = 4): RelatedCalculator[] {
  const ids = CALCULATOR_META[id]?.related ?? calculators.filter((c) => c.id !== id).map((c) => c.id);
  return ids
    .slice(0, limit)
    .map((rid) => calculatorById(rid))
    .filter((c): c is RelatedCalculator => Boolean(c));
}

/** Find the calculator id for a page path such as "/solar-roi-calculator/". */
export function calculatorIdForPath(pathname: string): string | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return calculators.find((c) => c.href === normalized)?.id;
}
