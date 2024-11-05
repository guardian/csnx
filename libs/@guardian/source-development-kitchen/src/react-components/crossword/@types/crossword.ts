import type { Direction } from './Direction';
import type { Entry } from './Entry';

export type Cell = {
	// grid coords
	x: number;
	y: number;

	/** Clue number */
	number?: number;

	/** Array of entries that this solution is part of */
	group?: CrosswordEntry['group'];

	/** The cell's solution */
	solution?: string;
};

export type Progress = Array<Array<string>>;

export type CrosswordEntry = Entry<number> & {
	direction: Direction;
	clue: string;
	solution?: string;
};

export type Crossword = {
	id: string;
	cells: Cell[];
	entries: CrosswordEntry[];
	hasSolution: boolean;
};

export type Focus = {
	x: number;
	y: number;
	entryId: string;
};

export type Theme = {
	background: string;
	foreground: string;
	text: string;
	gutter: number;
};
