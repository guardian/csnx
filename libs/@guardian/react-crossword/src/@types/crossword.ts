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
	/** The background colour of 'black' squares/dividers etc on the grid */
	gridBackgroundColor: string;
	/** The background colour of 'white' squares on the grid */
	gridForegroundColor: string;
	/** The background colour of 'black' squares on grid when printed */
	gridPrintBackgroundColor: string;
	/** The size of the gap between grid cells */
	gridGutterSize: number;
	/** The length of one side of a cell on on the grid */
	gridCellSize: number;

	/** The main text colour (grid text, clues etc) */
	textColor: string;
	/** The colour of the currently selected cell border */
	focusColor: string;
	/** The colour of cells/clues that are currently selected clue */
	selectedColor: string;
	/** The colour of cells/clues that are connected to the currently selected clue */
	connectedColor: string;

	/** The background colour of clue-helper buttons */
	buttonBackgroundColor: string;
	/** The hover colour of clue-helper buttons */
	buttonBackgroundHoverColor: string;

	/** Border colour used to visually separate parts of the UI */
	borderColor: string;
	/** Border colour applied to the top of the clue lists */
	clueListBorderColor: string;

	/** The minimum width of a clue */
	clueMinWidth: number;
	/** The maximum width of a clue */
	clueMaxWidth: number;

	/** The background colour of the anagram helper */
	anagramHelperBackgroundColor: string;
	/** The text colour of shuffled letter that are not yet on the grid */
	anagramHelperCandidateTextColor: string;

	/** The background colour for the sticky clue */
	stickyClueBackgroundColour: string;
};

export type Dimensions = {
	rows: number;
	cols: number;
};
