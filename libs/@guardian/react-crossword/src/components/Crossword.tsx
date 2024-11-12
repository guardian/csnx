import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type {
	CurrentCell,
	CurrentEntryId,
	Progress,
	Theme,
} from '../@types/crossword';
import type { EntryID } from '../@types/Entry';
import { defaultTheme } from '../theme';
import { parseCrosswordData } from '../utils/getCells';
import {
	getEmptyProgress,
	getStoredProgress,
	saveProgress,
} from '../utils/progress';
import { Clues } from './Clues';
import { Grid } from './Grid';

export type CrosswordProps = {
	data: CAPICrossword;
	theme?: Partial<Theme>;
};

export const Crossword = ({ theme: userTheme, ...props }: CrosswordProps) => {
	const { id, dimensions } = props.data;
	const [progress, setProgress] = useState<Progress>(
		getStoredProgress({ id, dimensions }) ?? getEmptyProgress(dimensions),
	);

	// Storage event listener to update progress when another instance of the crossword is updated
	// 'storage' event is fired when localStorage is updated in another tab or window
	const handleLocalStorageEvent = useCallback(
		(event: StorageEvent) => {
			if (event.key === id) {
				const storedProgress = getStoredProgress({
					id,
					dimensions,
				});
				if (storedProgress) {
					setProgress(storedProgress);
				}
			}
		},
		[dimensions, id],
	);

	useEffect(() => {
		window.addEventListener('storage', handleLocalStorageEvent);
		return () => {
			window.removeEventListener('storage', handleLocalStorageEvent);
		};
	}, [handleLocalStorageEvent]);

	const [currentEntryId, setCurrentEntryId] = useState<
		CurrentEntryId | undefined
	>(props.data.entries[0].id);

	const [currentCell, setCurrentCell] = useState<CurrentCell | undefined>({
		x: props.data.entries[0].position.x,
		y: props.data.entries[0].position.y,
	});

	const applicationRef = useRef<HTMLDivElement | null>(null);

	const theme = { ...defaultTheme, ...userTheme };

	const { entries, cells } = useMemo(
		() => parseCrosswordData(props.data),
		[props.data],
	);

	const moveFocus = useCallback(
		({
			delta,
			isTyping = false,
		}: {
			delta: { x: number; y: number };
			isTyping?: boolean;
		}) => {
			if (!currentCell) {
				return;
			}

			const newX = currentCell.x + delta.x;
			const newY = currentCell.y + delta.y;
			const newCell = cells.get(`x${newX}y${newY}`);

			if (!newCell) {
				return;
			}

			// TODO: this logic is very similar to the click handler entry selection stuff.
			// maybe we can refactor this out into a shared function?
			const possibleAcross = newCell.group?.find((group) =>
				group.includes('across'),
			);
			const possibleDown = newCell.group?.find((group) =>
				group.includes('down'),
			);

			// If we're typing, we only want to move focus if the new cell is an entry square
			if (isTyping && !possibleDown && !possibleAcross) {
				return;
			}

			if (delta.x !== 0) {
				setCurrentCell({ x: newX, y: newY });
				setCurrentEntryId(possibleAcross ?? possibleDown);
				return;
			}

			if (delta.y !== 0) {
				setCurrentCell({ x: newX, y: newY });
				setCurrentEntryId(possibleDown ?? possibleAcross);
				return;
			}
		},
		[currentCell, cells],
	);

	const handleTab = useCallback(() => {
		return;
	}, []);

	const updateProgress = useCallback(
		({ x, y, value }: { x: number; y: number; value: string }) => {
			// setProgress using callback to make sure progress is updated from the most recent state.
			// Prevents issues with async state updates
			setProgress((currentProgress) => {
				const newProgress = [...currentProgress];
				if (!isUndefined(newProgress[x]) && !isUndefined(newProgress[x][y])) {
					newProgress[x][y] = value;
				}
				saveProgress({ progress: newProgress, id });
				return newProgress;
			});
		},
		[id],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent): void => {
			if (event.ctrlKey || event.altKey || event.metaKey) {
				return;
			}

			if (!currentCell) {
				return;
			}

			const direction = currentEntryId?.includes('across') ? 'across' : 'down';
			let preventDefault = true;
			const { key } = event;

			switch (key) {
				case 'ArrowUp':
					moveFocus({ delta: { x: 0, y: -1 } });
					break;
				case 'ArrowDown':
					moveFocus({ delta: { x: 0, y: 1 } });
					break;
				case 'ArrowLeft':
					moveFocus({ delta: { x: -1, y: 0 } });
					break;
				case 'ArrowRight':
					moveFocus({ delta: { x: 1, y: 0 } });
					break;
				case ' ':
				case 'Tab':
					handleTab();
					break;
				case 'Backspace':
				case 'Delete': {
					if (!currentEntryId) {
						return;
					}
					updateProgress({ ...currentCell, value: '' });
					if (key === 'Backspace') {
						if (direction === 'across') {
							moveFocus({ delta: { x: -1, y: 0 }, isTyping: true });
						}
						if (direction === 'down') {
							moveFocus({ delta: { x: 0, y: -1 }, isTyping: true });
						}
					}
					break;
				}
				default: {
					const upperCaseKey = key.toUpperCase();
					if (/^[A-Z]$/.test(upperCaseKey) && currentEntryId) {
						updateProgress({ ...currentCell, value: upperCaseKey });
						if (direction === 'across') {
							moveFocus({ delta: { x: 1, y: 0 }, isTyping: true });
						}
						if (direction === 'down') {
							moveFocus({ delta: { x: 0, y: 1 }, isTyping: true });
						}
					} else {
						preventDefault = false;
					}
					break;
				}
			}

			if (preventDefault) {
				event.preventDefault();
			}
		},
		[currentCell, currentEntryId, moveFocus, handleTab, updateProgress],
	);

	const handleClueClick = useCallback(
		(event: MouseEvent) => {
			const target = event.target as HTMLElement;

			const entry = entries.get(
				target.closest('[role="option"][id]')?.id as EntryID,
			);

			if (entry) {
				setCurrentEntryId(entry.id);
				setCurrentCell({ x: entry.position.x, y: entry.position.y });
			}
		},
		[entries],
	);

	useEffect(() => {
		const application = applicationRef.current;

		application?.addEventListener('keydown', handleKeyDown);
		application?.addEventListener('click', handleClueClick);

		return () => {
			application?.removeEventListener('keydown', handleKeyDown);
			application?.removeEventListener('click', handleClueClick);
		};
	}, [handleKeyDown, handleClueClick]);

	return (
		<div
			role="application"
			ref={applicationRef}
			css={css`
				display: grid;
				grid-template-columns: minmax(300px, 500px) 1fr;
			`}
		>
			<div>
				<Grid
					setCurrentCell={setCurrentCell}
					setCurrentEntryId={setCurrentEntryId}
					cells={cells}
					theme={theme}
					progress={progress}
					currentCell={currentCell}
					currentEntryId={currentEntryId}
					dimensions={dimensions}
				/>
			</div>
			<div>
				<Clues
					direction="across"
					entries={props.data.entries}
					currentEntryId={currentEntryId}
					theme={theme}
				/>
				<Clues
					direction="down"
					entries={props.data.entries}
					currentEntryId={currentEntryId}
					theme={theme}
				/>
			</div>
			{JSON.stringify(focus)}
		</div>
	);
};
