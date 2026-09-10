import type { StateNotes, StateNotesMap } from './types';
import { batch1 } from './batch-1';
import { batch2 } from './batch-2';
import { batch3 } from './batch-3';
import { batch4 } from './batch-4';
import { batch5 } from './batch-5';

export type { StateNotes, StateNotesMap, StateSource } from './types';

export const STATE_NOTES: StateNotesMap = {
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
};

export function stateNotes(abbr: string): StateNotes | undefined {
  return STATE_NOTES[abbr];
}
