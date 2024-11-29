import { isUndefined } from '@guardian/libs';
import type { CAPIEntry } from '../@types/CAPI';
import type { Coords, Entries, Progress } from '../@types/crossword';

export type AnagramHelperProgress = {
	progress: string;
	coords: Coords;
	isSaved: boolean;
	number?: number;
	separator?: ',' | '-';
};

export const getAnagramHelperProgressForGroup = ({
	entry,
	entries,
	progress,
}: {
	entry?: CAPIEntry;
	entries: Entries;
	progress: Progress;
}) => {
	const groupProgress: AnagramHelperProgress[] = [];
	if (isUndefined(entry)) {
		return groupProgress;
	}
	for (const entryId of entry.group) {
		const entry = entries.get(entryId);
		if (!isUndefined(entry)) {
			groupProgress.push(
				...getAnagramHelperProgressForEntry({ entry, progress }),
			);
		}
	}
	return groupProgress;
};

export const getAnagramHelperProgressForEntry = ({
	entry,
	progress,
}: {
	entry: CAPIEntry;
	progress: Progress;
}): AnagramHelperProgress[] => {
	return Array.from({ length: entry.length }, (_, i) => {
		const x =
			entry.direction === 'across' ? entry.position.x + i : entry.position.x;
		const y =
			entry.direction === 'across' ? entry.position.y : entry.position.y + i;
		return {
			coords: { x, y },
			number: i === 0 ? entry.number : undefined,
			isSaved: true,
			progress: progress.at(x)?.[y] ?? '',
			separator: getSeparatorFromEntry(entry, i),
		};
	});
};

const getSeparatorFromEntry = (
	entry: CAPIEntry,
	index: number,
): ',' | '-' | undefined => {
	const separators = entry.separatorLocations;
	for (const [separator, locations] of Object.entries(separators)) {
		if (locations.includes(index + 1)) {
			return separator === '-' ? '-' : ',';
		}
	}
	return undefined;
};
