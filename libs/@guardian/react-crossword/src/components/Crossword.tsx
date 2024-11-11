import { isUndefined } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type {
	CurrentCell,
	CurrentEntryId,
	Dimensions,
	Progress,
	Theme,
} from '../@types/crossword';
import { defaultTheme } from '../theme';
import { getCells } from '../utils/getCells';
import { Grid } from './Grid';

export type CrosswordProps = {
	data: CAPICrossword;
	theme?: Partial<Theme>;
};

export const initialiseProgress = ({ rows, cols }: Dimensions): Progress => {
	return Array.from({ length: cols }, () =>
		Array.from({ length: rows }, () => ''),
	);
};

export const Crossword = ({ theme: userTheme, ...props }: CrosswordProps) => {
	const theme = { ...defaultTheme, ...userTheme };
	const cells = getCells(props.data);
	const [progress, setProgress] = useState<Progress>(
		initialiseProgress(props.data.dimensions),
	);

	const [currentEntryId, setCurrentEntryId] = useState<
		CurrentEntryId | undefined
	>(props.data.entries[0].id);

	const [currentCell, setCurrentCell] = useState<CurrentCell | undefined>({
		x: props.data.entries[0].position.x,
		y: props.data.entries[0].position.y,
	});

	const moveFocus = useCallback(
		(delta: { x: number; y: number }) => {
			if (!currentCell) {
				return;
			}

			const newX = currentCell.x + delta.x;
			const newY = currentCell.y + delta.y;
			const newCell = cells.get(`x${newX}y${newY}`);

			if (!newCell) {
				return;
			}

			if (newCell.group) {
				// TODO: this logic is very similar to the click handler entry selection stuff.
				// maybe we can refactor this out into a shared function?
				const possibleAcross = newCell.group.find((group) =>
					group.includes('across'),
				);

				if (delta.x !== 0 && possibleAcross) {
					if (currentEntryId !== possibleAcross) {
						setCurrentEntryId(possibleAcross);
						return;
					}
					setCurrentCell({ x: newX, y: newY });
					setCurrentEntryId(possibleAcross);
					return;
				}

				const possibleDown = newCell.group.find((group) =>
					group.includes('down'),
				);

				if (delta.y !== 0 && possibleDown) {
					if (currentEntryId !== possibleDown) {
						setCurrentEntryId(possibleDown);
						return;
					}
					setCurrentCell({ x: newX, y: newY });
					setCurrentEntryId(possibleDown);
					return;
				}
			}
		},
		[currentCell, currentEntryId, cells],
	);

	const handleTab = useCallback(() => {
		return;
	}, []);

	const updateProgress = useCallback(
		({ x, y, value }: { x: number; y: number; value: string }) => {
			setProgress((currentProgress) => {
				const newProgress = [...currentProgress];
				if (!isUndefined(newProgress[x]) && !isUndefined(newProgress[x][y])) {
					newProgress[x][y] = value;
				}
				return newProgress;
			});
		},
		[],
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
					moveFocus({
						x: 0,
						y: -1,
					});
					break;
				case 'ArrowDown':
					moveFocus({ x: 0, y: 1 });
					break;
				case 'ArrowLeft':
					moveFocus({
						x: -1,
						y: 0,
					});
					break;
				case 'ArrowRight':
					moveFocus({ x: 1, y: 0 });
					break;
				case ' ':
				case 'Tab':
					handleTab();
					break;
				case 'Backspace':
				case 'Delete': {
					updateProgress({ ...currentCell, value: '' });
					if (key === 'Backspace') {
						if (direction === 'across') {
							moveFocus({
								x: -1,
								y: 0,
							});
						}
						if (direction === 'down') {
							moveFocus({
								x: 0,
								y: -1,
							});
						}
					}
					break;
				}
				default: {
					const upperCaseKey = key.toUpperCase();
					if (/^[A-Z]$/.test(upperCaseKey)) {
						updateProgress({ ...currentCell, value: upperCaseKey });
						if (direction === 'across') {
							moveFocus({ x: 1, y: 0 });
						}
						if (direction === 'down') {
							moveFocus({ x: 0, y: 1 });
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

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div {...props}>
			<Grid
				setCurrentCell={setCurrentCell}
				setCurrentEntryId={setCurrentEntryId}
				cells={cells}
				theme={theme}
				progress={progress}
				currentCell={currentCell}
				currentEntryId={currentEntryId}
				dimensions={props.data.dimensions}
			/>
			{JSON.stringify(focus)}
		</div>
	);
};
