export type CrosswordData = {
	creator?: {
		name: string;
		webUrl: string;
	};
	crosswordType:
		| 'cryptic'
		| 'everyman'
		| 'prize'
		| 'quick-cryptic'
		| 'quick'
		| 'quiptic'
		| 'special'
		| 'speedy'
		| 'weekend';

	date: number;
	dateSolutionAvailable?: number;
	dimensions: {
		cols: number;
		rows: number;
	};
	entries: Array<{
		clue: string;
		direction: 'across' | 'down';
		group: string[];
		humanNumber: string;
		id: string;
		length: number;
		number: number;
		position: { x: number; y: number };
		separatorLocations: {
			','?: number[] | undefined;
			'-'?: number[] | undefined;
		};
		solution?: string;
	}>;
	id: string;
	name: string;
	number: number;
	pdf?: string;
	solutionAvailable: boolean;
	webPublicationDate?: number;
	instructions?: string;
};
