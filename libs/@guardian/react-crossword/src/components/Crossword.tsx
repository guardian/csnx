import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import type { ThemeButton } from '@guardian/source/react-components';
import { Button } from '@guardian/source/react-components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type {
	Cell,
	CurrentCell,
	CurrentEntryId,
	Progress,
	Theme,
} from '../@types/crossword';
import type { Direction } from '../@types/Direction';
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

	const workingDirectionRef = useRef<Direction>('across');

	const applicationRef = useRef<HTMLDivElement | null>(null);

	const theme = { ...defaultTheme, ...userTheme };

	const crosswordButtonTheme: Partial<ThemeButton> = {
		backgroundPrimary: theme.buttonBackground,
		backgroundPrimaryHover: theme.buttonBackgroundHover,
	};

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

	const revealEntry = () => {
		Array.from(cells.values())
			.filter((cell) => currentEntryId && cell.group?.includes(currentEntryId))
			.forEach((cell) =>
				updateProgress({
					x: cell.x,
					y: cell.y,
					value: cell.solution ?? '',
				}),
			);
	};

	const revealGrid = () => {
		Array.from(cells.values()).map((cell) =>
			updateProgress({
				x: cell.x,
				y: cell.y,
				value: cell.solution ?? '',
			}),
		);
	};

	const clearGrid = () => {
		setProgress(getEmptyProgress(dimensions));
	};

	const clearEntry = () => {
		cells.forEach((cell) => {
			if (currentEntryId && cell.group?.includes(currentEntryId)) {
				updateProgress({
					x: cell.x,
					y: cell.y,
					value: '',
				});
			}
		});
	};

	const checkWord = () => {
		Array.from(cells.values())
			.filter((cell) => currentEntryId && cell.group?.includes(currentEntryId))
			.forEach((cell) => {
				checkCell(cell);
			});
	};

	const checkGrid = () => {
		Array.from(cells.values()).forEach((cell) => {
			checkCell(cell);
		});
	};

	const checkCell = (cell: Cell) => {
		const currentProgress = progress[cell.x]?.[cell.y];
		const isCorrect = currentProgress && currentProgress === cell.solution;
		if (!isCorrect) {
			updateProgress({
				x: cell.x,
				y: cell.y,
				value: '',
			});
		}
	};

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

	const selectClickedCell = useCallback(
		(event: MouseEvent) => {
			// The 'g' elements in the grid SVG are the cells, and we have set
			// data-x and data-y attributes on them to represent their position
			// in the grid.
			//
			// _Note that this is not same as the x and y attributes of the SVG
			// element itself, which are the position of the top left corner of
			// the element._
			//
			// We can use the event target to find the closest 'g' element, and
			// then get the data-x and data-y attributes to determine which cell
			// was clicked.

			const { target } = event;

			if (!(target instanceof Element)) {
				return;
			}
			const g = target.closest('[data-x][data-y]');

			if (!g) {
				return;
			}

			const clickedCellX = Number(g.getAttribute('data-x'));
			const clickedCellY = Number(g.getAttribute('data-y'));

			// We may need to update the current entry based on the cell that
			// was clicked. We'll start by assuming that the current entry still
			// applies:
			let newEntryId = currentEntryId;

			// Get the entry IDs that apply to the clicked cell:
			const entryIdsForCell = cells.get(
				`x${clickedCellX}y${clickedCellY}`,
			)?.group;

			// If there are no entries for this cell (i.e. it's a black one),
			// set the selected entry to undefined
			if (isUndefined(entryIdsForCell)) {
				newEntryId = undefined;
			}

			// This is not a black cell, so we should check if we need to do
			// anything about the currently selected entry...

			// If there is only one entry for this cell, select it:
			else if (entryIdsForCell.length === 1) {
				newEntryId = entryIdsForCell[0];
			}

			// There are multiple entries for this cell, so we need to decide
			// which one to select...

			// If we clicked the cell we were already on, switch to the next
			// entry for the this cell, if there is one (i.e. toggle between up
			// and down entries):
			else if (
				currentCell?.x === clickedCellX &&
				currentCell.y === clickedCellY
			) {
				const alternateEntryId = entryIdsForCell.find(
					(id) => id !== currentEntryId,
				);

				if (alternateEntryId) {
					newEntryId = alternateEntryId;
				}
			}

			// We're in a new cell...

			// If we don't have a current entry to worry about, or if the
			// current entry does not apply to the new cell, get a new new
			// entry. We'll try to keep the same direction, if possible:
			else if (!currentEntryId || !entryIdsForCell.includes(currentEntryId)) {
				const currentDirection = workingDirectionRef.current;
				const newEntryIdOfCurrentDirection = entryIdsForCell.find((id) =>
					id.endsWith(currentDirection),
				);
				newEntryId = newEntryIdOfCurrentDirection ?? entryIdsForCell[0];
			}

			// We're done.

			// Save the direction of the final entry, if there is one:
			const newEntryDirection = newEntryId?.split('-')[1];
			if (newEntryDirection === 'across' || newEntryDirection === 'down') {
				workingDirectionRef.current = newEntryDirection;
			}

			// Set the new current cell and entry:
			setCurrentCell({ x: clickedCellX, y: clickedCellY });
			setCurrentEntryId(newEntryId);
		},
		[cells, currentCell, currentEntryId, setCurrentCell, setCurrentEntryId],
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
		application?.addEventListener('click', selectClickedCell);

		return () => {
			application?.removeEventListener('keydown', handleKeyDown);
			application?.removeEventListener('click', handleClueClick);
			application?.removeEventListener('click', selectClickedCell);
		};
	}, [handleKeyDown, handleClueClick, selectClickedCell]);

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
				<div
					css={css`
						display: flex;
						flex-wrap: wrap;
						gap: 4px 2px;
						> button {
							flex: 0 1 120px;
						}
					`}
				>
					<Button onClick={checkGrid} size="xsmall">
						Check All
					</Button>
					<Button onClick={revealGrid} size="xsmall">
						Reveal All
					</Button>
					<Button onClick={clearGrid} size="xsmall">
						Clear All
					</Button>
					<Button onClick={clearGrid} size="xsmall">
						Anagram Helper
					</Button>
					<Button
						onClick={checkWord}
						size="xsmall"
						theme={crosswordButtonTheme}
					>
						Check Word
					</Button>
					<Button
						onClick={revealEntry}
						size="xsmall"
						theme={crosswordButtonTheme}
					>
						Reveal Word
					</Button>
					<Button
						onClick={clearEntry}
						size="xsmall"
						theme={crosswordButtonTheme}
					>
						Clear Word
					</Button>
				</div>
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
		</div>
	);
};
