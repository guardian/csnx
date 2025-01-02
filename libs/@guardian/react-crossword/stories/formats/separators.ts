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
		// hyphens
		{
			id: '1-across',
			number: 1,
			humanNumber: '1',
			clue: 'hyphen across',
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
			clue: 'hyphen down',
			direction: 'down',
			length: 2,
			group: ['1-down'],
			position: {
				x: 0,
				y: 0,
			},
			separatorLocations: { '-': [1] },
		},
		// everything else
		{
			id: '2-across',
			number: 2,
			humanNumber: '2',
			clue: 'commma across',
			direction: 'across',
			length: 2,
			group: ['2-across'],
			position: {
				x: 3,
				y: 0,
			},
			separatorLocations: { ',': [1] },
		},
		{
			id: '2-down',
			number: 2,
			humanNumber: '2',
			clue: 'comma down',
			direction: 'down',
			length: 2,
			group: ['2-down'],
			position: {
				x: 3,
				y: 0,
			},
			separatorLocations: { ',': [1] },
		},
		{
			id: '3-across',
			number: 3,
			humanNumber: '3',
			clue: 'slash across',
			direction: 'across',
			length: 2,
			group: ['3-across'],
			position: {
				x: 6,
				y: 0,
			},
			separatorLocations: { '/': [1] },
		},
		{
			id: '3-down',
			number: 3,
			humanNumber: '3',
			clue: 'slash down',
			direction: 'down',
			length: 2,
			group: ['3-down'],
			position: {
				x: 6,
				y: 0,
			},
			separatorLocations: { '/': [1] },
		},
	],
	solutionAvailable: true,
	dateSolutionAvailable: 0,
	dimensions: {
		cols: 8,
		rows: 2,
	},
	crosswordType: 'cryptic',
	pdf: '',
};
