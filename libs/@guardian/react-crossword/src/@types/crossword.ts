import type { CAPIEntry } from './CAPI';
import type { Direction } from './Direction';
import type { Entry, EntryID } from './Entry';

export type Axis = 'x' | 'y';

export type Coords = Record<Axis, number>;

export type Cell = Coords & {
	/** Clue number */
	number?: number;

	/** Array of entries that this solution is part of */
	group?: CrosswordEntry['group'];

	/** The cell's description */
	description?: string;

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

export type Separator = keyof CAPIEntry['separatorLocations'];

export type Separators = Array<{
	type: Separator;
	position: Coords;
	direction: Direction;
}>;

export type Theme = {
	/** Background colour of 'black' squares/dividers etc on the grid */
	gridBackgroundColor: string;
	/** Background colour of 'white' squares on the grid */
	gridForegroundColor: string;
	/** Colour of text in the grid (clue number and entered letters) */
	gridTextColor: string;
	/** Background colour of 'black' squares on grid when printed */
	gridPrintBackgroundColor: string;
	/** Size of the gap between grid cells */
	gridGutterSize: number;
	/** Length of one side of a cell on on the grid */
	gridCellSize: number;
	/** Colour of the strike through on an incorrect cell */
	gridCellStrikeThrough: string;

	/** Main text colour outside grid (headings, clues etc) */
	textColor: string;
	/** Colour of the currently selected cell border */
	focusColor: string;
	/** Colour of currently selected clue */
	selectedTextColor: string;
	/** Colour of selected cells / clues */
	selectedBackgroundColor: string;
	/** Colour of cells / clues that are connected to the currently selected clue */
	connectedBackgroundColor: string;

	/** Background colour of clue helper buttons */
	buttonBackgroundColor: string;
	/** Hover colour of clue helper buttons */
	buttonBackgroundHoverColor: string;

	/** Border colour used to visually separate parts of the UI */
	borderColor: string;
	/** Border colour applied to the top of the clue lists */
	clueListBorderColor: string;

	/** Minimum width of a clue */
	clueMinWidth: number;
	/** Maximum width of a clue */
	clueMaxWidth: number;

	/** Background colour of the anagram helper */
	anagramHelperBackgroundColor: string;
	/** Text colour of shuffled letter that are not yet on the grid */
	anagramHelperCandidateTextColor: string;

	/** Background colour for the focused clue */
	focusedClueBackgroundColour: string;
};

export type Dimensions = {
	rows: number;
	cols: number;
};
