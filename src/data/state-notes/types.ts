// Hand-written, state-specific editorial notes rendered on the
// /solar-panel-cost-by-state/<state>/ pages. The modeled numbers on those
// pages come from state-solar.ts; these notes exist so every state page
// carries genuinely unique, locally relevant prose (net metering rules,
// state incentives, major utilities) instead of only different numbers.
//
// Style contract for every paragraph:
//   - plain text (no HTML/Markdown), 2-5 sentences, written for a homeowner
//   - name real programs, agencies and utilities; hedge anything that changes
//     ("as of 2026", "verify with your utility") rather than inventing figures
//   - never copy sentences between states
export interface StateSource {
  label: string;
  url: string;
}

export interface StateNotes {
  /** How exported solar power is compensated in this state (net metering, net billing, avoided-cost, utility programs). */
  netMetering: string[];
  /** State-level incentives beyond the federal credit: rebates, SRECs/performance payments, tax exemptions, loan programs. */
  incentives: string[];
  /** The major electric utilities and how their rates / rate plans shape solar savings. */
  utilities: string[];
  /** Optional state-specific official sources (PUC, energy office, program pages). */
  sources?: StateSource[];
}

/** Keyed by two-letter state abbreviation (e.g. "NJ"). */
export type StateNotesMap = Record<string, StateNotes>;
