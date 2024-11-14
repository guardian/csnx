import type { CAPICrossword } from '../../src/@types/CAPI';

export const separators: CAPICrossword = {
	id: '',
	number: 0,
	name: '',
	creator: {
		name: '',
		webUrl: '',
	},
	date: 0,
	webPublicationDate: 0,
	entries: [
		{
			id: '1-across',
			number: 1,
			humanNumber: '1',
			clue: '1',
			direction: 'across',
			length: 2,
			group: ['1-across'],
			position: {
				x: 0,
				y: 0,
			},
			separatorLocations: { '-': [1] },
		},
		{
			id: '1-down',
			number: 1,
			humanNumber: '1',
			clue: '1',
			direction: 'down',
			length: 2,
			group: ['1-down'],
			position: {
				x: 0,
				y: 0,
			},
			separatorLocations: { '-': [1] },
		},
		{
			id: '2-across',
			number: 2,
			humanNumber: '2',
			clue: '2',
			direction: 'across',
			length: 2,
			group: ['2-across'],
			position: {
				x: 0,
				y: 1,
			},
			separatorLocations: { ',': [1] },
		},
		{
			id: '3-down',
			number: 3,
			humanNumber: '3',
			clue: '3',
			direction: 'down',
			length: 2,
			group: ['2-down'],
			position: {
				x: 1,
				y: 0,
			},
			separatorLocations: { ',': [1] },
		},
	],
	solutionAvailable: true,
	dateSolutionAvailable: 0,
	dimensions: {
		cols: 2,
		rows: 2,
	},
	crosswordType: 'cryptic',
	pdf: '',
};
