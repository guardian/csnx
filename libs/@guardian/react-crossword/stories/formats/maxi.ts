import type { CAPICrossword } from '../../src/@types/CAPI';
import { cryptic } from './cryptic';

// Reuse an existing solved 15x15 grid until editorial Maxi content is available.
export const maxi: CAPICrossword = {
	id: 'crosswords/maxi/1',
	number: 1,
	name: 'Maxi crossword test fixture',
	crosswordType: 'maxi',
	date: Date.UTC(2026, 10, 23),
	dimensions: { cols: 15, rows: 15 },
	entries: cryptic.entries,
	solutionAvailable: true,
};
