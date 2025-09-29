import type { Coords, Dimensions } from './crossword';
import type { Direction } from './Direction';
import type { Entry } from './Entry';

export type CAPIEntry = Entry<number> & {
	direction: Direction;

	// CELL DATA

	/** Coords of first cell */
	position: Coords;

	// CLUE DATA

	/** The clue for the current entry */
	clue: string;
	/** The number for the clue */
	humanNumber: string;

	// SOLUTION DATA

	/** The solution to the entry's clue */
	solution?: string;
	/**
	 * The length of the solution (we don't always have a solution)
	 */
	length: number;
	/**
	 * Separators for multi-part solutions e.g.
	 * - ready,steady,go
	 * - tofu-eating
	 */
	separatorLocations: Record<string, number[]>;
};

export type CAPICrossword = {
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
		| 'sunday-quick'
		| 'weekend'
		| 'mini';

	date: number;
	dateSolutionAvailable?: number;
	dimensions: Dimensions;
	entries: CAPIEntry[];
	id: string;
	name: string;
	number: number;
	pdf?: string;
	solutionAvailable: boolean;
	webPublicationDate?: number;
	instructions?: string;
};
