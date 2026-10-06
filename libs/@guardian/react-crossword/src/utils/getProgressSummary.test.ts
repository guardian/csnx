import type { CAPICrossword } from '../@types/CAPI';
import type { Progress } from '../@types/crossword';
import { getProgressSummary } from './getProgressSummary';
import { parseCrosswordData } from './parseCrosswordData';

// A 3x3 grid with two answers: "CAT" across the first row and "COW" down the
// first column. Every other cell is blank.
const entries: CAPICrossword['entries'] = [
	{
		id: '1-across',
		group: ['1-across'],
		number: 1,
		humanNumber: '1',
		direction: 'across',
		position: { x: 0, y: 0 },
		clue: 'Pet',
		solution: 'CAT',
		length: 3,
		separatorLocations: {},
	},
	{
		id: '1-down',
		group: ['1-down'],
		number: 1,
		humanNumber: '1',
		direction: 'down',
		position: { x: 0, y: 0 },
		clue: 'Farm animal',
		solution: 'COW',
		length: 3,
		separatorLocations: {},
	},
];

const { cells } = parseCrosswordData({
	dimensions: { cols: 3, rows: 3 },
	entries,
});

// progress[x][y]
const progressOf = (filled: Record<string, string>): Progress => {
	const progress: Progress = Array.from({ length: 3 }, () =>
		Array.from({ length: 3 }, () => ''),
	);
	for (const [key, value] of Object.entries(filled)) {
		const [x, y] = key.split(',').map(Number);
		if (x !== undefined && y !== undefined && progress[x]) {
			progress[x][y] = value;
		}
	}
	return progress;
};

const solved = progressOf({
	'0,0': 'C',
	'1,0': 'A',
	'2,0': 'T',
	'0,1': 'O',
	'0,2': 'W',
});

describe('getProgressSummary', () => {
	it('only counts the cells that are part of an answer', () => {
		expect(
			getProgressSummary({
				cells,
				progress: progressOf({}),
				solutionAvailable: true,
			}),
		).toEqual({ filledCells: 0, totalCells: 5, isComplete: false });
	});

	it('counts the letters entered, right or wrong', () => {
		expect(
			getProgressSummary({
				cells,
				progress: progressOf({ '0,0': 'C', '1,0': 'X' }),
				solutionAvailable: true,
			}),
		).toEqual({ filledCells: 2, totalCells: 5, isComplete: false });
	});

	it('is complete when every cell holds its solution', () => {
		expect(
			getProgressSummary({
				cells,
				progress: solved,
				solutionAvailable: true,
			}),
		).toEqual({ filledCells: 5, totalCells: 5, isComplete: true });
	});

	it('is not complete when the grid is full but one letter is wrong', () => {
		expect(
			getProgressSummary({
				cells,
				progress: progressOf({
					'0,0': 'C',
					'1,0': 'A',
					'2,0': 'X',
					'0,1': 'O',
					'0,2': 'W',
				}),
				solutionAvailable: true,
			}),
		).toEqual({ filledCells: 5, totalCells: 5, isComplete: false });
	});

	it('is never complete without the solutions', () => {
		expect(
			getProgressSummary({
				cells,
				progress: solved,
				solutionAvailable: false,
			}),
		).toMatchObject({ filledCells: 5, isComplete: false });
	});

	it('is not complete for a grid with no answers', () => {
		const empty = parseCrosswordData({
			dimensions: { cols: 3, rows: 3 },
			entries: [],
		});

		expect(
			getProgressSummary({
				cells: empty.cells,
				progress: progressOf({}),
				solutionAvailable: true,
			}),
		).toEqual({ filledCells: 0, totalCells: 0, isComplete: false });
	});
});
