import { isUndefined } from '@guardian/libs';
import { useCallback } from 'react';
import type { Coords } from '../@types/crossword';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useValidAnswers } from '../context/ValidAnswers';

export const useUpdateCell = () => {
	const { updateProgress, progress } = useProgress();
	const { setValidAnswers } = useValidAnswers();
	const { cells } = useData();

	const updateCell = useCallback(
		({ x, y, value }: Coords & { value: string }) => {
			const cell = cells.getByCoords({ x, y });
			const cellGroup = cell?.group;

			// blank cells have no group
			if (isUndefined(cellGroup)) {
				return;
			}
			const newProgress = [...progress];
			if (isUndefined(newProgress[x])) {
				throw new Error('Invalid x coordinate');
			}

			if (isUndefined(newProgress[x][y])) {
				throw new Error('Invalid y coordinate');
			}

			newProgress[x][y] = value;
			updateProgress(newProgress);

			setValidAnswers((prev) => {
				const newSet = new Set(prev);
				for (const entryId of cellGroup) {
					newSet.delete(entryId);
				}
				return newSet;
			});
		},
		[cells, progress, updateProgress, setValidAnswers],
	);
	return { updateCell };
};
