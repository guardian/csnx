import { css } from '@emotion/react';
import { isString, isUndefined } from '@guardian/libs';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { FocusEvent, FormEvent, KeyboardEvent } from 'react';
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
import { useValidAnswers } from '../context/ValidAnswers';
import { useCheatMode } from '../hooks/useCheatMode';
import { useUpdateCell } from '../hooks/useUpdateCell';
import { keyDownRegex } from '../utils/keydownRegex';
import { Cell } from './Cell';

const noop = () => {};

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
	const size = theme.gridCellSize + theme.gridGutterSize;
	const x = currentCell.x * size;
	const y = currentCell.y * size;

	return (
		<>
			<rect
				x={x - 1 + theme.gridGutterSize * 0.5}
				y={y - 1 + theme.gridGutterSize * 0.5}
				width={size + 2}
				height={size + 2}
				stroke={theme.gridForegroundColor}
				strokeWidth={2}
				fill="none"
				rx={4}
				ry={4}
			/>
			<rect
				x={x + theme.gridGutterSize * 0.5}
				y={y + theme.gridGutterSize * 0.5}
				width={size}
				height={size}
				stroke={theme.focusColor}
				strokeWidth={2}
				fill="none"
				rx={4}
				ry={4}
			/>
		</>
	);
};

export const Grid = () => {
	const theme = useTheme();
	const { invalidCellAnswers } = useValidAnswers();
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
				const otherEntryId = cell.group.find(
					(entryId) => entryId !== currentEntryId,
				);
				if (otherEntryId) {
					setCurrentEntryId(otherEntryId);
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
		},
		[getId, setCurrentCell],
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

	const deleteLetter = useCallback(
		(value: string) => {
			if (value === '') {
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
		},
		[currentCell.x, currentCell.y, moveCurrentCell, updateCell],
	);

	const typeLetter = useCallback(
		(value: string) => {
			const letter = cheatMode
				? cells.getByCoords({
						x: currentCell.x,
						y: currentCell.y,
					})?.solution
				: keyDownRegex.test(value) && value.toUpperCase();
			if (letter) {
				updateCell({
					x: currentCell.x,
					y: currentCell.y,
					value: letter,
				});
				if (workingDirectionRef.current === 'across') {
					moveCurrentCell({ delta: { x: 1, y: 0 }, isTyping: true });
				} else {
					moveCurrentCell({ delta: { x: 0, y: 1 }, isTyping: true });
				}
			}
		},
		[
			cells,
			cheatMode,
			currentCell.x,
			currentCell.y,
			moveCurrentCell,
			updateCell,
		],
	);

	/**
	 * This function is used to handle keyboard input in the crossword grid.
	 * It works for devices with a physical keyboard, for mobile devices that use IMEs we use the onInput event.
	 */
	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Backspace' || event.key === 'Delete') {
				if ('value' in event.target && isString(event.target.value)) {
					event.preventDefault();
					deleteLetter(event.target.value);
				}
			} else {
				if (event.key && event.key.length === 1) {
					event.preventDefault();
					typeLetter(event.key);
				}
			}
		},
		[deleteLetter, typeLetter],
	);

	/**
	 * This function is used to handle input events in the crossword grid when the user is typing with an IME.
	 * If using a physical keyboard the onKeydown event is used instead.
	 * The main place this is needed is on android devices.
	 * This is because the onKeyDown event gives 299 "unidentified" when using native keyboard on android.
	 * https://clark.engineering/input-on-android-229-unidentified-1d92105b9a04
	 */
	const handleInput = useCallback(
		(event: FormEvent, guess?: string) => {
			const nativeEvent = event.nativeEvent;

			if (nativeEvent instanceof InputEvent) {
				const { inputType, data } = nativeEvent;
				event.preventDefault();

				switch (inputType) {
					case 'deleteContentBackward':
						deleteLetter(guess ?? '');
						break;

					case 'insertText':
					case 'insertCompositionText':
						if (data) {
							typeLetter(data.slice(-1));
						}
						break;
				}
			}
		},
		[deleteLetter, typeLetter],
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

	// Handle changes to the current cell
	useEffect(() => {
		// If the current cell changes, we need to update the current entry ID
		setCurrentEntryId(
			getCurrentEntryForCell(currentCell, workingDirectionRef.current),
		);
	}, [currentCell, focused, setCurrentEntryId]);

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

					// This is to prevent the default blue highlight on click on Android
					-webkit-tap-highlight-color: transparent;

					/**
					 * Request that the browser respects background colours when printing
					 * so that the crossword grid and cells are visible. Emotion uses
					 * Stylis to apply prefixes which only supports the deprecated
					 * color-adjust property, hence using the prefixed version here.
					 */
					-webkit-print-color-adjust: exact;

					*:focus {
						outline: none;
					}

					@media print {
						background: ${theme.gridPrintBackgroundColor};
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
										isCurrentCell={isCurrentCell}
										isIncorrect={invalidCellAnswers.has(`x${cell.x}y${cell.y}`)}
										role="cell"
										data-x={cell.x}
										data-y={cell.y}
										id={getId(`cell-group-${cell.x}-${cell.y}`)}
										onFocus={handleCellFocus}
										onPointerDown={
											isCurrentCell ? () => handleCurrentCellClick(cell) : noop
										}
										handleKeyDown={handleKeyDown}
										handleInput={(event: FormEvent<HTMLInputElement>) =>
											handleInput(event, guess)
										}
									/>
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
