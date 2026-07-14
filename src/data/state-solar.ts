// Modeled inputs for the "Solar Panel Cost by State" comparison. These are
// deliberately approximate, time-stable inputs — average daily peak sun hours
// (a climate value that barely moves year to year) and a rounded approximate
// residential electricity rate. Everything else on the page is COMPUTED from
// these two inputs plus the documented assumptions below, so the table is a
// transparent model, not a claim of surveyed current market prices.

export interface StateSolar {
  name: string;
  abbr: string;
  /** Average daily peak sun hours (annual). */
  sunHours: number;
  /** Approximate residential electricity rate, cents per kWh. */
  rateCents: number;
  /** Rough regional install-cost tier (labor/permitting/market maturity). */
  tier: 'low' | 'mid' | 'high';
}

// Documented modeling assumptions (shown to readers on the page).
export const ASSUMPTIONS = {
  grossPricePerWatt: { low: 2.7, mid: 3.0, high: 3.35 } as Record<StateSolar['tier'], number>,
  federalCreditRate: 0.3, // 30% federal Residential Clean Energy Credit
  derate: 0.8, // system losses (inverter, wiring, soiling, temperature)
  representativeKw: 8, // size used for the savings/payback columns
  daysPerYear: 365,
};

export const STATE_SOLAR: StateSolar[] = [
  { name: 'Alabama', abbr: 'AL', sunHours: 4.5, rateCents: 15, tier: 'low' },
  { name: 'Alaska', abbr: 'AK', sunHours: 3.0, rateCents: 24, tier: 'high' },
  { name: 'Arizona', abbr: 'AZ', sunHours: 6.5, rateCents: 14, tier: 'low' },
  { name: 'Arkansas', abbr: 'AR', sunHours: 4.5, rateCents: 12, tier: 'low' },
  { name: 'California', abbr: 'CA', sunHours: 5.5, rateCents: 30, tier: 'high' },
  { name: 'Colorado', abbr: 'CO', sunHours: 5.5, rateCents: 15, tier: 'mid' },
  { name: 'Connecticut', abbr: 'CT', sunHours: 4.2, rateCents: 30, tier: 'high' },
  { name: 'Delaware', abbr: 'DE', sunHours: 4.4, rateCents: 15, tier: 'mid' },
  { name: 'Florida', abbr: 'FL', sunHours: 5.3, rateCents: 15, tier: 'low' },
  { name: 'Georgia', abbr: 'GA', sunHours: 4.8, rateCents: 14, tier: 'low' },
  { name: 'Hawaii', abbr: 'HI', sunHours: 5.9, rateCents: 42, tier: 'high' },
  { name: 'Idaho', abbr: 'ID', sunHours: 4.9, rateCents: 11, tier: 'mid' },
  { name: 'Illinois', abbr: 'IL', sunHours: 4.2, rateCents: 16, tier: 'mid' },
  { name: 'Indiana', abbr: 'IN', sunHours: 4.2, rateCents: 15, tier: 'mid' },
  { name: 'Iowa', abbr: 'IA', sunHours: 4.3, rateCents: 13, tier: 'mid' },
  { name: 'Kansas', abbr: 'KS', sunHours: 5.0, rateCents: 14, tier: 'mid' },
  { name: 'Kentucky', abbr: 'KY', sunHours: 4.2, rateCents: 12, tier: 'mid' },
  { name: 'Louisiana', abbr: 'LA', sunHours: 4.7, rateCents: 12, tier: 'low' },
  { name: 'Maine', abbr: 'ME', sunHours: 4.2, rateCents: 20, tier: 'high' },
  { name: 'Maryland', abbr: 'MD', sunHours: 4.4, rateCents: 17, tier: 'high' },
  { name: 'Massachusetts', abbr: 'MA', sunHours: 4.2, rateCents: 30, tier: 'high' },
  { name: 'Michigan', abbr: 'MI', sunHours: 4.0, rateCents: 18, tier: 'mid' },
  { name: 'Minnesota', abbr: 'MN', sunHours: 4.3, rateCents: 15, tier: 'mid' },
  { name: 'Mississippi', abbr: 'MS', sunHours: 4.6, rateCents: 13, tier: 'low' },
  { name: 'Missouri', abbr: 'MO', sunHours: 4.5, rateCents: 12, tier: 'mid' },
  { name: 'Montana', abbr: 'MT', sunHours: 4.6, rateCents: 12, tier: 'mid' },
  { name: 'Nebraska', abbr: 'NE', sunHours: 4.8, rateCents: 11, tier: 'mid' },
  { name: 'Nevada', abbr: 'NV', sunHours: 6.4, rateCents: 15, tier: 'low' },
  { name: 'New Hampshire', abbr: 'NH', sunHours: 4.2, rateCents: 22, tier: 'high' },
  { name: 'New Jersey', abbr: 'NJ', sunHours: 4.3, rateCents: 18, tier: 'high' },
  { name: 'New Mexico', abbr: 'NM', sunHours: 6.5, rateCents: 14, tier: 'low' },
  { name: 'New York', abbr: 'NY', sunHours: 4.0, rateCents: 23, tier: 'high' },
  { name: 'North Carolina', abbr: 'NC', sunHours: 4.7, rateCents: 13, tier: 'low' },
  { name: 'North Dakota', abbr: 'ND', sunHours: 4.5, rateCents: 11, tier: 'mid' },
  { name: 'Ohio', abbr: 'OH', sunHours: 4.0, rateCents: 16, tier: 'mid' },
  { name: 'Oklahoma', abbr: 'OK', sunHours: 5.2, rateCents: 12, tier: 'low' },
  { name: 'Oregon', abbr: 'OR', sunHours: 4.0, rateCents: 13, tier: 'mid' },
  { name: 'Pennsylvania', abbr: 'PA', sunHours: 4.1, rateCents: 17, tier: 'mid' },
  { name: 'Rhode Island', abbr: 'RI', sunHours: 4.2, rateCents: 27, tier: 'high' },
  { name: 'South Carolina', abbr: 'SC', sunHours: 4.8, rateCents: 14, tier: 'low' },
  { name: 'South Dakota', abbr: 'SD', sunHours: 4.7, rateCents: 13, tier: 'mid' },
  { name: 'Tennessee', abbr: 'TN', sunHours: 4.4, rateCents: 12, tier: 'low' },
  { name: 'Texas', abbr: 'TX', sunHours: 5.3, rateCents: 15, tier: 'low' },
  { name: 'Utah', abbr: 'UT', sunHours: 5.3, rateCents: 11, tier: 'mid' },
  { name: 'Vermont', abbr: 'VT', sunHours: 4.0, rateCents: 21, tier: 'high' },
  { name: 'Virginia', abbr: 'VA', sunHours: 4.5, rateCents: 14, tier: 'mid' },
  { name: 'Washington', abbr: 'WA', sunHours: 3.7, rateCents: 11, tier: 'mid' },
  { name: 'West Virginia', abbr: 'WV', sunHours: 4.0, rateCents: 14, tier: 'mid' },
  { name: 'Wisconsin', abbr: 'WI', sunHours: 4.2, rateCents: 17, tier: 'mid' },
  { name: 'Wyoming', abbr: 'WY', sunHours: 5.3, rateCents: 12, tier: 'mid' },
];

// General export-compensation posture per state — a stable, structural
// description (not a dollar value). Distinctive states are called out; the
// rest use the historically common retail-rate default. Always paired in the
// UI with a "verify current terms via DSIRE" caveat, since these shift.
const NET_METERING_OVERRIDES: Record<string, string> = {
  CA: 'net billing, where exports are credited below the retail rate (a NEM 3.0-style structure)',
  AZ: 'export credits set below the retail rate',
  NV: 'export credits below the retail rate that have stepped down over time',
  HI: 'no standard net metering — self-supply and separate export programs instead',
  TX: 'no statewide net-metering mandate, so buyback plans vary by retailer and utility',
  ID: 'utility-specific export terms, with several utilities having moved off full retail',
  MI: 'an inflow/outflow billing structure rather than one-to-one net metering',
};

/** The state's general export-compensation posture (structural, not a price). */
export function netMeteringPosture(s: StateSolar): string {
  return (
    NET_METERING_OVERRIDES[s.abbr] ??
    'retail-rate net metering, where exported energy credits near the retail rate'
  );
}

/** URL slug for a state, e.g. "New York" -> "new-york". */
export function stateSlug(s: StateSolar): string {
  return s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function getStateBySlug(slug: string): StateSolar | undefined {
  return STATE_SOLAR.find((s) => stateSlug(s) === slug);
}

export function grossCost(kw: number, tier: StateSolar['tier']): number {
  return kw * 1000 * ASSUMPTIONS.grossPricePerWatt[tier];
}

export function netCost(kw: number, tier: StateSolar['tier']): number {
  return grossCost(kw, tier) * (1 - ASSUMPTIONS.federalCreditRate);
}

export function annualProduction(kw: number, sunHours: number): number {
  return kw * sunHours * ASSUMPTIONS.daysPerYear * ASSUMPTIONS.derate;
}

export function annualSavings(kw: number, s: StateSolar): number {
  return annualProduction(kw, s.sunHours) * (s.rateCents / 100);
}

export function paybackYears(kw: number, s: StateSolar): number {
  return netCost(kw, s.tier) / annualSavings(kw, s);
}
