import type { GuardianCrossword } from '../interfaces';

const data: GuardianCrossword = {
	id: 'test/invalid/7',
	number: 7,
	name: 'Invalid Test 7',
	date: 1542326400000,
	entries: [
		{
			id: '1-across',
			number: 1,
			humanNumber: '1',
			clue: 'Toy on a string (2-2)',
			direction: 'across',
			length: 4,
			group: ['1-across'],
			position: { x: 0, y: 0 },
			separatorLocations: {
				'-': [2],
			},
			solution: 'YOYO',
		},
		{
			id: '4-across',
			number: 4,
			humanNumber: '4',
			clue: 'Have a rest (3,4)',
			direction: 'across',
			length: 7,
			group: ['4-across'],
			position: { x: 0, y: 2 },
			separatorLocations: {
				',': [3],
			},
			solution: 'LIEDOWN',
		},
		{
			id: '1-down',
			number: 1,
			humanNumber: '1',
			clue: 'Colour (6)',
			direction: 'down',
			length: 6,
			group: ['1-down'],
			position: { x: 0, y: 0 },
			separatorLocations: {},
			solution: 'YELLOW',
		},
		{
			id: '2-down',
			number: 2,
			humanNumber: '2',
			clue: 'Bits and bobs (4,3,4)',
			direction: 'down',
			length: 7,
			group: ['2-down', '99-down'], // <--------------- INVALID CLUE ID
			position: { x: 3, y: 0 },
			separatorLocations: {
				',': [4, 7],
			},
			solution: 'ODDSAND',
		},
		{
			id: '3-down',
			number: 3,
			humanNumber: '3',
			clue: 'See 2',
			direction: 'down',
			length: 4,
			group: ['2-down', '3-down'],
			position: {
				x: 6,
				y: 1,
			},
			separatorLocations: {},
			solution: 'ENDS',
		},
	],
	solutionAvailable: true,
	dateSolutionAvailable: 1542326400000,
	dimensions: {
		cols: 13,
		rows: 13,
	},
	crosswordType: 'quick',
};

export default data;
