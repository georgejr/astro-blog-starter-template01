// Registry of the calculator pages that actually exist under src/pages/.
// Articles may only reference calculators by these ids (validated by
// scripts/validate-content.ts), and UI components may only render hrefs
// taken from this file — never fabricate a calculator URL elsewhere.
export interface Calculator {
  id: string;
  title: string;
  href: string;
  keywords: string[];
}

export const calculators: Calculator[] = [
  {
    id: 'solar-panel-calculator',
    title: 'Solar Panel Calculator',
    href: '/solar-panel-calculator/',
    keywords: ['solar calculator', 'system size', 'panel count', 'solar estimate'],
  },
  {
    id: 'solar-panel-cost-calculator',
    title: 'Solar Panel Cost Calculator',
    href: '/solar-panel-cost-calculator/',
    keywords: ['solar cost', 'installation cost', 'price per watt', 'net cost'],
  },
  {
    id: 'solar-roi-calculator',
    title: 'Solar ROI Calculator',
    href: '/solar-roi-calculator/',
    keywords: ['solar roi', 'solar savings', 'payback period', 'return on investment'],
  },
  {
    id: 'solar-battery-calculator',
    title: 'Solar Battery Calculator',
    href: '/solar-battery-calculator/',
    keywords: ['solar battery', 'battery backup', 'storage sizing', 'home battery'],
  },
  {
    id: 'how-many-solar-panels-do-i-need',
    title: 'How Many Solar Panels Do I Need?',
    href: '/how-many-solar-panels-do-i-need/',
    keywords: ['how many panels', 'panel count', 'kwh usage', 'system size'],
  },
  {
    id: 'solar-panel-size-calculator',
    title: 'Solar Panel Size Calculator',
    href: '/solar-panel-size-calculator/',
    keywords: ['panel size', 'roof area', 'panel dimensions', 'wattage'],
  },
];

export const calculatorIds = new Set(calculators.map((c) => c.id));

export function getCalculator(id: string): Calculator | undefined {
  return calculators.find((c) => c.id === id);
}
