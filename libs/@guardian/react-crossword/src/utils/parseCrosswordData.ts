import { isUndefined } from '@guardian/libs';
import type { CAPICrossword } from '../@types/CAPI';
import type {
	Cell,
	Cells,
	Coords,
	Dimensions,
	Entries,
	Separators,
} from '../@types/crossword';

/**
 * Takes the crossword data from the CAPI and returns some things we can use.
 *
 * We're doing it all in here to avoid having to loop through the data multiple times.
 */
export const parseCrosswordData = (data: {
	dimensions: Dimensions;
	entries: CAPICrossword['entries'];
}) => {
	/**
	 * A map of all entries in the crossword, indexed by their id.
	 */
	const entries: Entries = new Map();

	/**
	 * An array of all separators in the crossword.
	 */
	const separators: Separators = [];

	const { cols, rows } = data.dimensions;

	/**
	 * A map of all cells in the crossword, indexed by their x and y coordinates.
	 */
	const cells: Cells = Object.assign(
		// create an initial map of all possible cells that assumes they are all empty (black)
		new Map(
			Array.from({ length: cols }, (_, x) =>
				Array.from(
					{ length: rows },
					(_, y) => [`x${x}y${y}`, { x, y }] as const,
				),
			).flat(),
		),
		{
			getByCoords: ({ x, y }: Coords) => cells.get(`x${x}y${y}`),
		},
	);

	// Now loop through all entries.
	//
	// For each entry, we'll populate `entries` and `separators` and `cells`.
	//
	// We're mutating the 'empty' targets so we can do it all in one loop.

	for (let j = 0; j < data.entries.length; j += 1) {
		const nextEntryIndex = (j + 1) % data.entries.length;
		const prevEntryIndex = (j - 1 + data.entries.length) % data.entries.length;
		const nextEntry = data.entries[nextEntryIndex];
		const prevEntry = data.entries[prevEntryIndex];
		const entry = data.entries[j];
		if (
			isUndefined(entry) ||
			isUndefined(nextEntry) ||
			isUndefined(prevEntry)
		) {
			throw new Error('Entry out of range');
		}
		// populate the `entries` map
		entries.set(entry.id, {
			...entry,
			nextEntryID: nextEntry.id,
			prevEntryID: prevEntry.id,
		});

		// populate the `separators` array
		for (const [separator, locations] of Object.entries(
			entry.separatorLocations,
		)) {
			for (const location of locations) {
				const { direction } = entry;
				const x =
					entry.position.x + (direction === 'across' ? location - 1 : 0);
				const y = entry.position.y + (direction === 'down' ? location - 1 : 0);
				separators.push({
					type: separator as ',' | '-',
					position: { x, y },
					direction,
				});
			}
		}

		// populate the `cells` map
		for (let i = 0; i < entry.length; i += 1) {
			let x = entry.position.x;
			let y = entry.position.y;

			if (entry.direction === 'across') {
				x += i;
			} else {
				y += i;
			}

			const cell = cells.getByCoords({ x, y });
			const group: Cell['group'] = [entry.id, ...(cell?.group ?? [])];
			const number: Cell['number'] = i === 0 ? entry.number : cell?.number;

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
		separators,
	};
};
