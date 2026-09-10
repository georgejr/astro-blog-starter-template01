// Which interactive tool each /embed/<id>/ widget renders. Kept outside the
// page because Astro hoists getStaticPaths and it cannot see page-scope
// variables.
import type { CalculatorVariant } from '../components/CalculatorResult.astro';
import type { BatteryOption } from '../lib/solar/types';

export interface SolarVariant {
  kind: 'solar';
  variant: CalculatorVariant;
  defaultBattery?: BatteryOption;
}
export interface ToolVariant {
  kind: 'tool';
}
export type EmbedConfig = SolarVariant | ToolVariant;

export const EMBED_CONFIG: Record<string, EmbedConfig> = {
  'solar-panel-calculator': { kind: 'solar', variant: 'general' },
  'solar-panel-cost-calculator': { kind: 'solar', variant: 'cost' },
  'solar-roi-calculator': { kind: 'solar', variant: 'roi' },
  'solar-battery-calculator': { kind: 'solar', variant: 'battery', defaultBattery: 'small' },
  'how-many-solar-panels-do-i-need': { kind: 'solar', variant: 'panels' },
  'solar-panel-size-calculator': { kind: 'solar', variant: 'size' },
  'solar-loan-calculator': { kind: 'tool' },
  'solar-payback-calculator': { kind: 'tool' },
  'ev-charging-calculator': { kind: 'tool' },
  'heat-pump-calculator': { kind: 'tool' },
  'electricity-bill-calculator': { kind: 'tool' },
  'federal-tax-credit-calculator': { kind: 'tool' },
  'solar-payment-comparison': { kind: 'tool' },
};

