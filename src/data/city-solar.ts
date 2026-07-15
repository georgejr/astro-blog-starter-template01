// Major-city cost model. Each city carries a city-level average daily peak
// sun-hours estimate (a stable climate figure); the electricity rate and the
// regional install-cost tier are inherited from its state (see state-solar.ts),
// since utility rates are set at the state/utility level. Everything shown on a
// city page is COMPUTED from these plus the documented assumptions — a
// transparent model, not surveyed local prices.
import { STATE_SOLAR, type StateSolar } from './state-solar';

export interface City {
  name: string;
  stateAbbr: string;
  /** City-level average daily peak sun hours (annual). */
  sunHours: number;
}

export const CITIES: City[] = [
  { name: 'Phoenix', stateAbbr: 'AZ', sunHours: 6.6 },
  { name: 'Tucson', stateAbbr: 'AZ', sunHours: 6.6 },
  { name: 'Los Angeles', stateAbbr: 'CA', sunHours: 5.6 },
  { name: 'San Diego', stateAbbr: 'CA', sunHours: 5.8 },
  { name: 'San Jose', stateAbbr: 'CA', sunHours: 5.6 },
  { name: 'San Francisco', stateAbbr: 'CA', sunHours: 5.4 },
  { name: 'Sacramento', stateAbbr: 'CA', sunHours: 5.6 },
  { name: 'Fresno', stateAbbr: 'CA', sunHours: 5.9 },
  { name: 'Denver', stateAbbr: 'CO', sunHours: 5.5 },
  { name: 'Miami', stateAbbr: 'FL', sunHours: 5.4 },
  { name: 'Orlando', stateAbbr: 'FL', sunHours: 5.4 },
  { name: 'Tampa', stateAbbr: 'FL', sunHours: 5.4 },
  { name: 'Jacksonville', stateAbbr: 'FL', sunHours: 5.2 },
  { name: 'Atlanta', stateAbbr: 'GA', sunHours: 5.0 },
  { name: 'Honolulu', stateAbbr: 'HI', sunHours: 6.0 },
  { name: 'Chicago', stateAbbr: 'IL', sunHours: 4.2 },
  { name: 'Indianapolis', stateAbbr: 'IN', sunHours: 4.4 },
  { name: 'Boston', stateAbbr: 'MA', sunHours: 4.3 },
  { name: 'Baltimore', stateAbbr: 'MD', sunHours: 4.5 },
  { name: 'Detroit', stateAbbr: 'MI', sunHours: 4.0 },
  { name: 'Minneapolis', stateAbbr: 'MN', sunHours: 4.5 },
  { name: 'Kansas City', stateAbbr: 'MO', sunHours: 5.0 },
  { name: 'St. Louis', stateAbbr: 'MO', sunHours: 4.8 },
  { name: 'Las Vegas', stateAbbr: 'NV', sunHours: 6.4 },
  { name: 'Newark', stateAbbr: 'NJ', sunHours: 4.4 },
  { name: 'Albuquerque', stateAbbr: 'NM', sunHours: 6.8 },
  { name: 'New York', stateAbbr: 'NY', sunHours: 4.2 },
  { name: 'Charlotte', stateAbbr: 'NC', sunHours: 4.9 },
  { name: 'Raleigh', stateAbbr: 'NC', sunHours: 4.9 },
  { name: 'Columbus', stateAbbr: 'OH', sunHours: 4.2 },
  { name: 'Portland', stateAbbr: 'OR', sunHours: 3.9 },
  { name: 'Philadelphia', stateAbbr: 'PA', sunHours: 4.3 },
  { name: 'Pittsburgh', stateAbbr: 'PA', sunHours: 3.9 },
  { name: 'Nashville', stateAbbr: 'TN', sunHours: 4.6 },
  { name: 'Memphis', stateAbbr: 'TN', sunHours: 4.8 },
  { name: 'Austin', stateAbbr: 'TX', sunHours: 5.4 },
  { name: 'Houston', stateAbbr: 'TX', sunHours: 4.9 },
  { name: 'Dallas', stateAbbr: 'TX', sunHours: 5.3 },
  { name: 'San Antonio', stateAbbr: 'TX', sunHours: 5.3 },
  { name: 'Salt Lake City', stateAbbr: 'UT', sunHours: 5.3 },
  { name: 'Seattle', stateAbbr: 'WA', sunHours: 3.7 },
  { name: 'Milwaukee', stateAbbr: 'WI', sunHours: 4.3 },
  { name: 'Virginia Beach', stateAbbr: 'VA', sunHours: 4.7 },
];

export function cityState(c: City): StateSolar {
  return STATE_SOLAR.find((s) => s.abbr === c.stateAbbr)!;
}

/** A StateSolar-shaped object with the city's sun hours + the state's rate/tier,
 * so the state-solar compute helpers work unchanged for cities. */
export function cityAsState(c: City): StateSolar {
  const state = cityState(c);
  return { name: c.name, abbr: c.stateAbbr, sunHours: c.sunHours, rateCents: state.rateCents, tier: state.tier };
}

/** Unique URL slug, e.g. "phoenix-az". */
export function citySlug(c: City): string {
  const base = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${base}-${c.stateAbbr.toLowerCase()}`;
}

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => citySlug(c) === slug);
}
