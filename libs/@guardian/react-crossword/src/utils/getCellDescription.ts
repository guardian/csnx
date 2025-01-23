import { isUndefined } from '@guardian/libs';
import type { CAPIEntry } from '../@types/CAPI';
import type { Cell, Entries } from '../@types/crossword';
import { formatClueForScreenReader } from './formatClueForScreenReader';

export const getCellDescription = (cell: Cell, entries: Entries) => {
	const cellEntryIds = cell.group ?? [];
	const cellRelevantEntryId =
		cell.group?.length === 1
			? cell.group[0]
			: cellEntryIds.find((id) => id.endsWith('across'));
	if (isUndefined(cellRelevantEntryId)) {
		return 'Blank cell.';
	}
	const additionalEntries = cellEntryIds
		.filter((id) => !id.endsWith('across') && id !== cellRelevantEntryId)
		.map((id) => entries.get(id))
		.filter((entry) => !isUndefined(entry));
	const relevantEntry = entries.get(cellRelevantEntryId);

	return (
		`` +
		// ('Letter 2 of 4-across: Life is in a mess (5 letters).) | ('Blank cell.')
		`${relevantEntry ? `${getReadableLabelForCellAndEntry({ entry: relevantEntry, cell: cell })}. ` : 'Blank. '}` +
		// (Also, letter 1 of 5-down Life is always in a mess (2 letters).)
		`${additionalEntries.map((entry) => getReadableLabelForCellAndEntry({ entry, cell: cell, additionalEntry: true })).join('. ')}`
	);
};

const getReadableLabelForCellAndEntry = ({
	entry,
	cell,
	additionalEntry = false,
}: {
	entry: CAPIEntry;
	cell: Cell;
	additionalEntry?: boolean;
}): string => {
	const cellPosition =
		entry.direction === 'across'
			? String(cell.x + 1 - entry.position.x)
			: String(cell.y + 1 - entry.position.y);
	return `${additionalEntry ? 'Also, letter' : 'Letter'} ${cellPosition} of ${entry.length}. ${entry.id}. ${formatClueForScreenReader(entry.clue)}`;
};
