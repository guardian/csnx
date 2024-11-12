import type { CAPICrossword } from '../@types/CAPI';
import type { Cell, Cells, Entries } from '../@types/crossword';

/**
 * Takes the crossword data from the CAPI and returns some things we can use.
 */
export const parseCrosswordData = (data: CAPICrossword) => {
	/**
	 * A map of all entries in the crossword, indexed by their id.
	 */
	const entries: Entries = new Map();

	// create a map of all possible cells that assumes they are all empty (black)
	const { cols, rows } = data.dimensions;
	/**
	 * A map of all cells in the crossword, indexed by their x and y coordinates.
	 */
	const cells: Cells = new Map(
		Array.from({ length: cols }, (_, x) =>
			Array.from({ length: rows }, (_, y) => [`x${x}y${y}`, { x, y }] as const),
		).flat(),
	);

	// Now loop through all entries. For each entry, we'll populate the entriesById and allCells maps.
	// We're mutating the 'empty' maps here so we can do it in one loop.
	for (const entry of data.entries) {
		// populate the entriesById map
		entries.set(entry.id, entry);

		// For each  cell in the entry's solution
		for (let i = 0; i < entry.length; i += 1) {
			let x = entry.position.x;
			let y = entry.position.y;

			if (entry.direction === 'across') {
				x += i;
			} else {
				y += i;
			}

			const cell = cells.get(`x${x}y${y}`);
			const group: Cell['group'] = [entry.id, ...(cell?.group ?? [])];
			const number: Cell['number'] = i === 0 ? entry.number : undefined;

			cells.set(`x${x}y${y}`, {
				group,
				number,
				x,
				y,
				solution: entry.solution?.[i],
			});
		}
	}

	return {
		cells,
		entries,
	};
};
