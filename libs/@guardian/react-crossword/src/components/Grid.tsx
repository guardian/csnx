import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type {
	ChangeEvent,
	FocusEvent,
	FocusEventHandler,
	KeyboardEvent,
	MouseEvent,
} from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type {
	Cell as CellType,
	Coords,
	Separator,
	Theme,
} from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import { useCurrentCell } from '../context/CurrentCell';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { useCheatMode } from '../hooks/useCheatMode';
import { useUpdateCell } from '../hooks/useUpdateCell';
import { formatClueForScreenReader } from '../utils/formatClueForScreenReader';
import { keyDownRegex } from '../utils/keydownRegex';
import { Cell } from './Cell';

const getReadableLabelForCellAndEntry = ({
	entry,
	cell,
	additionalEntry = false,
}: {
	entry: CAPIEntry;
	cell: CellType;
	additionalEntry?: boolean;
}): string => {
	if (entry.direction === 'across') {
		return `${additionalEntry ? 'Also, letter' : 'Letter'} ${cell.x + 1 - entry.position.x} of ${entry.id}. ${formatClueForScreenReader(entry.clue)}`;
	} else {
		return `${additionalEntry ? 'Also, letter' : 'Letter'} ${cell.y + 1 - entry.position.y} of ${entry.id}. ${formatClueForScreenReader(entry.clue)}`;
	}
};

const getCellPosition = (
	index: number,
	{ gridCellSize, gridGutterSize }: Theme,
) => index * (gridCellSize + gridGutterSize) + gridGutterSize;

const Separator = memo(
	({
		position,
		direction,
		type,
		...props
	}: {
		type: Separator;
		position: Coords;
		direction: Direction;
	}) => {
		const theme = useTheme();

		const x = getCellPosition(position.x, theme);
		const y = getCellPosition(position.y, theme);

		const { gridCellSize, gridGutterSize } = theme;

		// if this is a 'down' entry, we'll rotate the separator 90 degrees
		// around the center of the cell
		const transform: Partial<Record<Direction, string>> = {
			down: `rotate(90 ${x + gridCellSize / 2} ${y + gridCellSize / 2})`,
		};

		return type === '-' ? (
			// draws a dash (-) that bisects the border with the next cell
			<line
				x1={x + gridCellSize - 3}
				y1={y + gridCellSize / 2}
				x2={x + gridCellSize + 4}
				y2={y + gridCellSize / 2}
				strokeWidth={gridGutterSize}
				stroke={theme.gridBackgroundColor}
				transform={transform[direction]}
				{...props}
				pointerEvents={'none'}
			/>
		) : (
			// draws a thicker border with the next cell
			<line
				x1={x + gridCellSize + gridGutterSize / 2}
				y1={y}
				x2={x + gridCellSize + gridGutterSize / 2}
				y2={y + gridCellSize}
				strokeWidth={gridGutterSize * 2}
				stroke={theme.gridBackgroundColor}
				transform={transform[direction]}
				{...props}
				pointerEvents={'none'}
			/>
		);
	},
);

const FocusIndicator = ({
	currentCell,
}: {
	currentCell: NonNullable<Coords>;
}) => {
	const theme = useTheme();

	return (
		<rect
			x={
				currentCell.x * (theme.gridCellSize + theme.gridGutterSize) +
				theme.gridGutterSize * 0.5
			}
			y={
				currentCell.y * (theme.gridCellSize + theme.gridGutterSize) +
				theme.gridGutterSize * 0.5
			}
			width={theme.gridCellSize + theme.gridGutterSize}
			height={theme.gridCellSize + theme.gridGutterSize}
			stroke={theme.focusColor}
			strokeWidth={2}
			fill="none"
			rx={2}
			ry={2}
		/>
	);
};

const getCellLabel = (cell: CellType, guess?: string) => {
	return `${cell.group ? 'Cell' : 'Black cell'}. ${guess ? `Guess: ${guess}.` : ''}`;
};

export const Grid = () => {
	const theme = useTheme();
	const { cells, separators, entries, dimensions, getId } = useData();
	const { progress } = useProgress();
	const { updateCell } = useUpdateCell();
	const { currentCell, setCurrentCell } = useCurrentCell();
	const { currentEntryId, setCurrentEntryId } = useCurrentClue();
	const [focused, setFocused] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const gridRef = useRef<SVGSVGElement>(null);
	const currentCellRef = useRef<SVGGElement>(null);
	const workingDirectionRef = useRef<Direction>('across');
	const inputRef = useRef<HTMLInputElement>(null);

	const [cheatMode, cheatStyles] = useCheatMode(gridRef);

	// keep workingDirectionRef.current up to date with the current entry
	useEffect(() => {
		if (currentEntryId) {
			workingDirectionRef.current =
				entries.get(currentEntryId)?.direction ?? workingDirectionRef.current;
		}
	}, [currentEntryId, entries]);

	const getProgressForEntry = useCallback(
		(entry: CAPIEntry): string => {
			const progressForEntry: string[] = [];

			for (let i = 0; i < entry.length; i++) {
				const x =
					entry.direction === 'across'
						? entry.position.x + i
						: entry.position.x;
				const y =
					entry.direction === 'down' ? entry.position.y + i : entry.position.y;
				const cellProgress = progress[x]?.[y];
				if (!isUndefined(cellProgress)) {
					progressForEntry.push(cellProgress !== '' ? cellProgress : 'Empty');
				}
			}

			return progressForEntry.join(', ');
		},
		[progress],
	);

	const currentEntry = currentEntryId ? entries.get(currentEntryId) : undefined;
	const currentCellProgress = progress[currentCell.x]?.[currentCell.y];

	const additionalEntries =
		currentCell.group
			?.map((entryId) => {
				if (entryId !== currentEntryId) {
					return entries.get(entryId);
				}
				return undefined;
			})
			.filter((entry) => !isUndefined(entry)) ?? [];

	const currentCellLabel =
		`` +
		// ('Column 1, row 1')
		`Column ${currentCell.x + 1}, row ${currentCell.y + 1}. ` +
		// ('A.') | ('Empty.')
		`${currentCellProgress ? `${currentCellProgress}. ` : 'Empty. '}` +
		// ('Letter 2 of 4-across: Life is in a mess (5 letters).) | ('Blank cell.')
		`${currentEntry ? `${getReadableLabelForCellAndEntry({ entry: currentEntry, cell: currentCell })}. ` : 'Blank. '}` +
		// ('Empty, A, Empty, Empty.')
		`${currentEntry ? `${getProgressForEntry(currentEntry)}. ` : ''}` +
		// (Also, letter 1 of 5-down Life is always in a mess (2 letters).)
		`${additionalEntries.map((entry) => getReadableLabelForCellAndEntry({ entry, cell: currentCell, additionalEntry: true })).join('. ')}`;

	const updateCurrentCell = useCallback(
		({ delta, isTyping = false }: { delta: Coords; isTyping?: boolean }) => {
			const newX = currentCell.x + delta.x;
			const newY = currentCell.y + delta.y;
			const newCell = cells.getByCoords({ x: newX, y: newY });

			if (!newCell) {
				return;
			}

			// maybe we can refactor this out into a shared function?
			const possibleAcross = newCell.group?.find((group) =>
				group.includes('across'),
			);
			const possibleDown = newCell.group?.find((group) =>
				group.includes('down'),
			);

			//if we are typing in a cell without a group do not move focus
			if (isTyping && isUndefined(currentCell.group)) {
				return;
			}

			if (delta.x !== 0) {
				setCurrentCell(newCell);
				setCurrentEntryId(possibleAcross ?? possibleDown);
				return;
			}

			if (delta.y !== 0) {
				setCurrentCell(newCell);
				setCurrentEntryId(possibleDown ?? possibleAcross);
				return;
			}
		},
		[currentCell, cells, setCurrentCell, setCurrentEntryId],
	);

	const updateGuess = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const direction = currentEntryId?.includes('across') ? 'across' : 'down';
			const key = event.target.value.toUpperCase();
			const value = cheatMode
				? cells.getByCoords({ x: currentCell.x, y: currentCell.y })?.solution
				: keyDownRegex.test(key) && key.toUpperCase();

			if (value) {
				updateCell({
					x: currentCell.x,
					y: currentCell.y,
					value,
				});
				if (direction === 'across') {
					updateCurrentCell({ delta: { x: 1, y: 0 }, isTyping: true });
				}
				if (direction === 'down') {
					updateCurrentCell({ delta: { x: 0, y: 1 }, isTyping: true });
				}
			}
			setInputValue('');
		},
		[
			cells,
			cheatMode,
			currentCell,
			currentEntryId,
			updateCurrentCell,
			updateCell,
		],
	);

	const navigateGrid = useCallback(
		(event: KeyboardEvent<SVGGElement>): void => {
			const direction = currentEntryId?.includes('across') ? 'across' : 'down';

			let preventDefault = true;

			const { key } = event;

			switch (key) {
				case 'ArrowUp':
					updateCurrentCell({ delta: { x: 0, y: -1 } });
					break;
				case 'ArrowDown':
					updateCurrentCell({ delta: { x: 0, y: 1 } });
					break;
				case 'ArrowLeft':
					updateCurrentCell({ delta: { x: -1, y: 0 } });
					break;
				case 'ArrowRight':
					updateCurrentCell({ delta: { x: 1, y: 0 } });
					break;
				case 'Backspace':
				case 'Delete': {
					if (!currentEntryId) {
						return;
					}
					updateCell({
						x: currentCell.x,
						y: currentCell.y,
						value: '',
					});
					if (key === 'Backspace') {
						if (direction === 'across') {
							updateCurrentCell({ delta: { x: -1, y: 0 }, isTyping: true });
						}
						if (direction === 'down') {
							updateCurrentCell({ delta: { x: 0, y: -1 }, isTyping: true });
						}
					}
					break;
				}
				default:
					preventDefault = false;
					break;
			}

			if (preventDefault) {
				event.preventDefault();
			}
		},
		[currentCell, currentEntryId, updateCurrentCell, updateCell],
	);

	const handleCellClick = useCallback(
		(event: MouseEvent<SVGGElement>) => {
			const target = event.currentTarget as SVGElement | null;

			if (!target) {
				return;
			}

			// The 'g' elements in the grid SVG are the cells, and they have
			// aria-colindex and aria-rowindex attributes that represent their position
			// in the grid.
			//
			// We can use the event target to find the closest 'g' element, and
			// then get the aria-colindex and aria-rowindex attributes to determine which cell
			// was clicked.

			const clickedCellX = Number(target.dataset.x);
			const clickedCellY = Number(target.dataset.y);

			// We may need to update the current entry based on the cell that
			// was clicked. We'll start by assuming that the current entry still
			// applies:
			let newEntryId = currentEntryId;

			// Get the entry IDs that apply to the clicked cell:
			const clickedCell = cells.getByCoords({
				x: clickedCellX,
				y: clickedCellY,
			});

			if (!clickedCell) {
				throw new Error(
					`Could not find cell for x: ${clickedCellX}, y: ${clickedCellY}`,
				);
			}

			const entryIdsForCell = clickedCell.group;

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
			// entry for this cell, if there is one (i.e. toggle between up
			// and down entries):
			else if (
				currentCell.x === clickedCellX &&
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
			// current entry does not apply to the new cell, get a new
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
			setCurrentCell(clickedCell);
			setCurrentEntryId(newEntryId);
		},
		[cells, currentCell, currentEntryId, setCurrentCell, setCurrentEntryId],
	);

	const maxHeight =
		theme.gridCellSize * dimensions.rows +
		theme.gridGutterSize * (dimensions.rows + 1);

	const maxWidth =
		theme.gridCellSize * dimensions.cols +
		theme.gridGutterSize * (dimensions.cols + 1);

	const onGridFocus = useCallback(() => setFocused(true), []);
	const onGridBlur = useCallback(
		({ relatedTarget }: FocusEvent<SVGSVGElement>) =>
			setFocused(
				gridRef.current?.contains(relatedTarget as Node | null) ?? false,
			),
		[],
	);

	useEffect(() => {
		if (focused) {
			if (inputRef.current) {
				inputRef.current.focus();
			} else {
				currentCellRef.current?.focus();
			}
		}
	}, [currentCell, focused]);

	return (
		<svg
			css={[
				css`
					background: ${theme.gridBackgroundColor};
					position: relative;
					cursor: pointer;
					width: 100%;
					max-width: ${maxWidth}px;
					max-height: ${maxHeight}px;

					// This is to prevent the default blue highlight on click on android
					-webkit-tap-highlight-color: transparent;

					*:focus {
						outline: none;
					}
				`,
				cheatStyles,
			]}
			id={getId('crossword-grid')}
			ref={gridRef}
			viewBox={`0 0 ${maxWidth} ${maxHeight}`}
			tabIndex={-1}
			role={'grid'}
			onKeyDown={navigateGrid}
			onFocus={onGridFocus}
			onBlur={onGridBlur}
		>
			{
				/* Render the cells */
				Array.from({ length: dimensions.rows }).map((_, rowIndex) => {
					return (
						<g role="row" key={rowIndex}>
							{Array.from({ length: dimensions.cols }).map((_, colIndex) => {
								const cell = cells.getByCoords({ x: colIndex, y: rowIndex });

								if (!cell) {
									throw new Error(
										`Could not find cell x:${colIndex}, y:${rowIndex}`,
									);
								}

								const x = getCellPosition(cell.x, theme);
								const y = getCellPosition(cell.y, theme);

								const guess = progress[cell.x]?.[cell.y];

								const isCurrentCell =
									currentCell.x === cell.x && currentCell.y === cell.y;

								const isBlackCell = isUndefined(cell.group);

								const currentGroup =
									currentEntryId && entries.get(currentEntryId)?.group;

								const isConnected = currentGroup?.some((entryId) =>
									cell.group?.includes(entryId),
								);

								const isSelected = currentEntryId
									? cell.group?.includes(currentEntryId)
									: false;

								return (
									<Cell
										key={`x${cell.x}y${cell.y}`}
										data={cell}
										x={x}
										y={y}
										guess={guess}
										isSelected={isSelected}
										isConnected={isConnected}
										isBlackCell={isBlackCell}
										role="cell"
										onFocus={() => setCurrentCell(cell)}
										data-x={cell.x}
										data-y={cell.y}
										tabIndex={isCurrentCell ? 0 : -1}
										aria-label={getCellLabel(cell, guess)}
										onClick={handleCellClick}
										ref={isCurrentCell ? currentCellRef : undefined}
									>
										{!isBlackCell && isCurrentCell && (
											<input
												ref={inputRef}
												value={guess}
												autoCapitalize={'none'}
												type="text"
												pattern={'^[A-Za-zÀ-ÿ0-9]$'}
												onChange={updateGuess}
												tabIndex={-1}
												css={css`
													position: absolute;
													top: 0;
													left: 0;
													width: 100%;
													height: 100%;
													background: transparent;
													border: none;
													${textSans12};
													font-size: ${theme.gridCellSize * 0.6}px;
													text-align: center;
												`}
												autoComplete="off"
												spellCheck="false"
												autoCorrect="off"
											/>
										)}
									</Cell>
								);
							})}
						</g>
					);
				})
			}

			{
				/* Render the separators between cells */
				separators.map(({ type, position, direction }) => (
					<Separator
						type={type}
						position={position}
						direction={direction}
						key={`${type}${position.x}${position.y}${direction}`}
					/>
				))
			}
			{focused && <FocusIndicator currentCell={currentCell} />}
		</svg>
	);
};
