import type { CAPIEntry } from './CAPI';
import type { Direction } from './Direction';
import type { Entry, EntryID } from './Entry';

export type Coords = {
	[k in Axis]: number;
};

export type Cell = Coords & {
	/** Clue number */
	number?: number;

	/** Array of entries that this solution is part of */
	group?: CrosswordEntry['group'];

	/** The cell's solution */
	solution?: string;
};

export type Cells = Map<`x${number}y${number}`, Cell> & {
	getByCoords: (arg0: Coords) => ReturnType<Cells['get']>;
};

export type Entries = Map<EntryID, CAPIEntry>;

export type Progress = string[][];

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

export type Separator = ',' | '-';

export type Separators = Array<{
	type: Separator;
	position: Coords;
	direction: Direction;
}>;

export type CurrentEntryId = EntryID;

export type Theme = {
	background: string;
	foreground: string;
	text: string;
	gutter: number;
	focus: string;
	focusBorder: string;
	cellSize: number;
	buttonBackground: string;
	buttonBackgroundHover: string;
};

export type Dimensions = {
	rows: number;
	cols: number;
};

export type Axis = 'x' | 'y';
