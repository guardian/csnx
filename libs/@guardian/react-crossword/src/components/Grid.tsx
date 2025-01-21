import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type {
	Cell as CellType,
	Coords,
	Entries,
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

const noop = () => {};

const getCellDescription = (cell: CellType, entries: Entries) => {
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
	cell: CellType;
	additionalEntry?: boolean;
}): string => {
	const cellPosition =
		entry.direction === 'across'
			? String(cell.x + 1 - entry.position.x)
			: String(cell.y + 1 - entry.position.y);
	return `${additionalEntry ? 'Also, letter' : 'Letter'} ${cellPosition} of ${entry.length}. ${entry.id}. ${formatClueForScreenReader(entry.clue)}`;
};

const getCellPosition = (
	index: number,
	{ gridCellSize, gridGutterSize }: Theme,
) => index * (gridCellSize + gridGutterSize) + gridGutterSize;

const getCurrentEntryForCell = (cell: CellType, direction: Direction) =>
	cell.group?.find((id) => id.endsWith(direction)) ?? cell.group?.[0];

/** Renders a separator (e.g. a hyphen or solid bar) between cells */
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
				pointerEvents={'none'}
				{...props}
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
				pointerEvents={'none'}
				{...props}
			/>
		);
	},
);

/** Renders a focus indicator over the current cell */
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

export const Grid = () => {
	const theme = useTheme();
	const { cells, separators, entries, dimensions, getId } = useData();
	const { progress } = useProgress();
	const { updateCell } = useUpdateCell();
	const { currentCell, setCurrentCell } = useCurrentCell();
	const { currentEntryId, setCurrentEntryId } = useCurrentClue();
	const [focused, setFocused] = useState(false);

	const gridRef = useRef<SVGSVGElement>(null);
	const workingDirectionRef = useRef<Direction>('across');

	const [cheatMode, cheatStyles] = useCheatMode(gridRef);

	const handleCurrentCellClick = useCallback(
		(cell: CellType) => {
			if (
				cell.x === currentCell.x &&
				cell.y === currentCell.y &&
				cell.group?.length
			) {
				const otherEntry = cell.group.find(
					(entryId) => entryId !== currentEntryId,
				);
				if (otherEntry) {
					setCurrentEntryId(otherEntry);
					return;
				}
			}
		},
		[currentCell, currentEntryId, setCurrentEntryId],
	);

	const updateCellFocus = useCallback(
		(cell: CellType) => {
			const clickedCellInput = document.getElementById(
				getId(`cell-input-${cell.x}-${cell.y}`),
			);
			const clickedCellGroup = document.getElementById(
				getId(`cell-group-${cell.x}-${cell.y}`),
			);

			if (clickedCellInput) {
				clickedCellInput.focus();
			} else {
				clickedCellGroup?.focus();
			}
			setCurrentCell(cell);
			setCurrentEntryId(
				getCurrentEntryForCell(cell, workingDirectionRef.current),
			);
		},
		[getId, setCurrentCell, setCurrentEntryId],
	);

	const moveCurrentCell = useCallback(
		({ delta, isTyping = false }: { delta: Coords; isTyping?: boolean }) => {
			const newX = currentCell.x + delta.x;
			const newY = currentCell.y + delta.y;

			const newCell = cells.getByCoords({ x: newX, y: newY });
			if (!newCell) {
				return;
			}

			//if we are typing in a cell without a group do not move focus
			if (
				isTyping &&
				(isUndefined(currentCell.group) || isUndefined(newCell.group))
			) {
				return;
			}

			if (delta.x !== 0) {
				updateCellFocus(newCell);
				return;
			}

			if (delta.y !== 0) {
				updateCellFocus(newCell);
				return;
			}
		},
		[currentCell.x, currentCell.y, currentCell.group, cells, updateCellFocus],
	);

	const handleInputKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Backspace' || event.key === 'Delete') {
				event.preventDefault();

				if ('value' in event.target) {
					if (event.target.value === '') {
						if (workingDirectionRef.current === 'across') {
							moveCurrentCell({ delta: { x: -1, y: 0 }, isTyping: true });
						} else {
							moveCurrentCell({ delta: { x: 0, y: -1 }, isTyping: true });
						}
					} else {
						updateCell({
							x: currentCell.x,
							y: currentCell.y,
							value: '',
						});
					}
				}
			} else {
				const value = cheatMode
					? cells.getByCoords({
							x: currentCell.x,
							y: currentCell.y,
						})?.solution
					: keyDownRegex.test(event.key) && event.key.toUpperCase();

				if (value) {
					event.preventDefault();
					updateCell({
						x: currentCell.x,
						y: currentCell.y,
						value,
					});

					if (workingDirectionRef.current === 'across') {
						moveCurrentCell({ delta: { x: 1, y: 0 }, isTyping: true });
					} else {
						moveCurrentCell({ delta: { x: 0, y: 1 }, isTyping: true });
					}
				}
			}
		},
		[
			cells,
			cheatMode,
			currentCell.x,
			currentCell.y,
			updateCell,
			moveCurrentCell,
		],
	);

	const navigateGrid = useCallback(
		(event: KeyboardEvent): void => {
			let preventDefault = true;

			switch (event.key) {
				case 'ArrowUp':
					moveCurrentCell({ delta: { x: 0, y: -1 } });
					break;
				case 'ArrowDown':
					moveCurrentCell({ delta: { x: 0, y: 1 } });
					break;
				case 'ArrowLeft':
					moveCurrentCell({ delta: { x: -1, y: 0 } });
					break;
				case 'ArrowRight':
					moveCurrentCell({ delta: { x: 1, y: 0 } });
					break;
				default:
					preventDefault = false;
					break;
			}

			if (preventDefault) {
				event.preventDefault();
			}
		},
		[moveCurrentCell],
	);

	const handleCellFocus = useCallback(
		(event: FocusEvent<SVGGElement>) => {
			const target = event.currentTarget as SVGElement | null;

			if (!target) {
				return;
			}

			// The 'g' elements in the grid SVG are the cells, and they have
			// data-x and data-y attributes that represent their position in the
			// grid.
			const clickedCellX = Number(target.dataset.x);
			const clickedCellY = Number(target.dataset.y);

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

			// Set the new current cell and entry:
			updateCellFocus(clickedCell);
		},
		[cells, updateCellFocus],
	);

	const maxHeight =
		theme.gridCellSize * dimensions.rows +
		theme.gridGutterSize * (dimensions.rows + 1);

	const maxWidth =
		theme.gridCellSize * dimensions.cols +
		theme.gridGutterSize * (dimensions.cols + 1);

	// keep track of whether the grid (or a child) is the current focus
	const handleGridFocus = useCallback(() => setFocused(true), []);
	const handleGridBlur = useCallback(
		({ relatedTarget }: FocusEvent<SVGSVGElement>) =>
			setFocused(
				gridRef.current?.contains(relatedTarget as Node | null) ?? false,
			),
		[],
	);

	// keep workingDirectionRef.current up to date with the current entry
	useEffect(() => {
		if (currentEntryId) {
			workingDirectionRef.current =
				entries.get(currentEntryId)?.direction ?? workingDirectionRef.current;
		}
	}, [currentEntryId, entries]);

	// focus the first cell if the current entry changes
	useEffect(() => {
		if (!gridRef.current?.contains(document.activeElement) && currentEntryId) {
			const entry = entries.get(currentEntryId);
			const cell = entry ? cells.getByCoords(entry.position) : undefined;
			if (cell) {
				updateCellFocus(cell);
			}
		}
	}, [cells, currentEntryId, entries, updateCellFocus]);

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

					// This is to prevent the default blue highlight on click on
					// android
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
			onFocus={handleGridFocus}
			onBlur={handleGridBlur}
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
										data-x={cell.x}
										data-y={cell.y}
										tabIndex={isCurrentCell ? 0 : -1}
										id={getId(`cell-group-${cell.x}-${cell.y}`)}
										onFocus={handleCellFocus}
										onPointerDown={
											isCurrentCell ? () => handleCurrentCellClick(cell) : noop
										}
									>
										<input
											value={guess}
											autoCapitalize={'none'}
											type="text"
											pattern={'^[A-Za-zÀ-ÿ0-9]$'}
											onKeyDown={handleInputKeyDown}
											id={getId(`cell-input-${cell.x}-${cell.y}`)}
											onChange={
												/**
												 * keep react happy (it wants a change handler)
												 *
												 * we have to use keydown
												 * because we don't want
												 * more than one char ever
												 * in the input, but we
												 * still need to respond to
												 * new chars being typed
												 * */
												noop
											}
											tabIndex={-1}
											aria-label="Crossword cell"
											aria-description={getCellDescription(cell, entries)}
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
