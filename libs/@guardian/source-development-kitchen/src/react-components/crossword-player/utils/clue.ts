import { Cell, Clue, GuardianClue, SeparatorLocations } from '../interfaces';

export function getGroupCells(groupIds: string[], cells: Cell[]) {
	const groupCells: Cell[] = [];

	// get cells for each clueId in group array
	groupIds.forEach((groupId) => {
		const cellsForGroup = cells
			.filter((cell) => cell.clueIds.includes(groupId))
			.sort(
				(a: Cell, b: Cell) => a.pos.col - b.pos.col || a.pos.row - b.pos.row,
			);

		groupCells.push(...cellsForGroup);
	});

	return groupCells;
}

export function getGroupSeparators(groupIds: string[], clues: Clue[]) {
	const separators: SeparatorLocations = { ',': [], '-': [] };
	let total = 0;

	// combine separators for all clues in the group
	groupIds.forEach((groupId) => {
		const groupClue = clues.find((clue) => clue.id === groupId);

		if (groupClue !== undefined) {
			const spaces = groupClue.separatorLocations[',']?.map(
				(sep) => sep + total,
			);
			separators[','] = [...separators[','], ...(spaces ?? [])];

			const hyphens = groupClue.separatorLocations['-']?.map(
				(sep) => sep + total,
			);
			separators['-'] = [...separators['-'], ...(hyphens ?? [])];
		}

		total += groupClue !== undefined ? groupClue.length : 0;
	});

	return separators;
}

export function isCluePopulated(clue: Clue, cells: Cell[]) {
	const groupCells = getGroupCells(clue.group, cells);
	const populatedCells = groupCells.filter((cell) => cell.guess !== undefined);

	return groupCells.length > 0 && groupCells.length === populatedCells.length;
}

export function getCrossingClueIds(clue: Clue, cells: Cell[]) {
	const clueIds: string[] = [];
	const groupCells = getGroupCells(clue.group, cells);

	groupCells.forEach((cell) => {
		clueIds.push(...cell.clueIds);
	});

	// remove duplicates
	return Array.from(new Set(clueIds));
}

export function initialiseClues(
	entries: GuardianClue[],
	cells: Cell[],
	selectedClueId?: string,
) {
	return entries.map((entry) => ({
		...entry,
		answered: isCluePopulated(
			{ ...entry, selected: false, answered: false },
			cells,
		),
		selected: entry.id === selectedClueId,
	}));
}
