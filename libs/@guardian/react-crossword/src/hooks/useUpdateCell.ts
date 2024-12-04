import { isUndefined } from '@guardian/libs';
import { useCallback } from 'react';
import type { Coords, CrosswordEntry } from '../@types/crossword';
import { useProgress } from '../context/Progress';
import { useValidAnswers } from '../context/ValidAnswers';

export const useUpdateCell = () => {
	const { setProgress } = useProgress();
	const { setValidAnswers } = useValidAnswers();

	const updateCell = useCallback(
		({
			x,
			y,
			group,
			value,
		}: Coords & { value: string; group: CrosswordEntry['group'] }) => {
			setProgress((prevProgress) => {
				const newProgress = [...(prevProgress ?? [])];
				if (isUndefined(newProgress[x])) {
					throw new Error('Invalid x coordinate');
				}

				if (isUndefined(newProgress[x][y])) {
					throw new Error('Invalid y coordinate');
				}

				newProgress[x][y] = value;
				return newProgress;
			});
			setValidAnswers((prev) => {
				const newSet = new Set(prev);
				for (const entryId of group) {
					newSet.delete(entryId);
				}
				return newSet;
			});
		},
		[setProgress, setValidAnswers],
	);
	return { updateCell };
};
