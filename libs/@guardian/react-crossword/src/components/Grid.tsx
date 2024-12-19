import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
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
		return `${additionalEntry ? 'Also, letter' : 'Letter'} ${cell.x + 1 - entry.position.x} of ${entry.id}. ${entry.clue.replace(/\)$/gm, ' letters).')}`;
	} else {
		return `${additionalEntry ? 'Also, letter' : 'Letter'} ${cell.y + 1 - entry.position.y} of ${entry.id}. ${entry.clue.replace(/\)$/gm, ' letters).')}`;
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
	const gridWrapperRef = useRef<HTMLDivElement>(null);
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
	const currentCellProgress = currentCell
		? progress[currentCell.x]?.[currentCell.y]
		: undefined;

	const additionalEntries =
		currentCell?.group
			?.map((entryId) => {
				if (entryId !== currentEntryId) {
					return entries.get(entryId);
				}
				return undefined;
			})
			.filter((entry) => !isUndefined(entry)) ?? [];

	const currentCellLabel = currentCell
		? `` +
			// ('Column 1, row 1')
			`Column ${currentCell.x + 1}, row ${currentCell.y + 1}. ` +
			// ('A.') | ('Empty.')
			`${currentCellProgress ? `${currentCellProgress}. ` : 'Empty. '}` +
			// ('Letter 2 of 4-across: Life is in a mess (5 letters).) | ('Blank cell.')
			`${currentEntry ? `${getReadableLabelForCellAndEntry({ entry: currentEntry, cell: currentCell })}. ` : 'Blank. '}` +
			// ('Empty, A, Empty, Empty.')
			`${currentEntry ? `${getProgressForEntry(currentEntry)}. ` : ''}` +
			// (Also, letter 1 of 5-down Life is always in a mess (2 letters).)
			`${additionalEntries.map((entry) => getReadableLabelForCellAndEntry({ entry, cell: currentCell, additionalEntry: true })).join('. ')}`
		: '';

	const moveFocus = useCallback(
		({ delta, isTyping = false }: { delta: Coords; isTyping?: boolean }) => {
			if (!currentCell) {
				return;
			}
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

			// If we're typing, we only want to move focus if the new cell is an entry square
			if (
				isTyping &&
				((!possibleDown && !possibleAcross) || isUndefined(currentCell.group))
			) {
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

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (isUndefined(currentCell)) {
				return;
			}
			const direction = currentEntryId?.includes('across') ? 'across' : 'down';
			const key = event.target.value.toUpperCase();
			const value = cheatMode
				? cells.getByCoords({ x: currentCell.x, y: currentCell.y })?.solution
				: keyDownRegex.test(key) && key.toUpperCase();

			if (value) {
				// This mimics moving to a new input cell after typing a letter.
				// This is needed for a quirk in the Android keyboard.
				// It stores typed text even if it is cleared by react
				// and the backspace key does not work as expected.
				inputRef.current?.blur();
				inputRef.current?.focus();

				updateCell({
					x: currentCell.x,
					y: currentCell.y,
					value,
				});
				if (direction === 'across') {
					moveFocus({ delta: { x: 1, y: 0 }, isTyping: true });
				}
				if (direction === 'down') {
					moveFocus({ delta: { x: 0, y: 1 }, isTyping: true });
				}
			}
			setInputValue('');
		},
		[cells, cheatMode, currentCell, currentEntryId, moveFocus, updateCell],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>): void => {
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
							moveFocus({ delta: { x: -1, y: 0 }, isTyping: true });
						}
						if (direction === 'down') {
							moveFocus({ delta: { x: 0, y: -1 }, isTyping: true });
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
		[currentCell, currentEntryId, moveFocus, updateCell],
	);

	const selectClickedCell = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
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
			const clickedCell = cells.getByCoords({
				x: clickedCellX,
				y: clickedCellY,
			});

			const entryIdsForCell = clickedCell?.group;
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

	const height =
		theme.gridCellSize * dimensions.rows +
		theme.gridGutterSize * (dimensions.rows + 1);
	const width =
		theme.gridCellSize * dimensions.cols +
		theme.gridGutterSize * (dimensions.cols + 1);

	const focusInput = useCallback(() => {
		inputRef.current?.focus();
	}, []);

	const onFocus = useCallback(() => {
		if (!currentCell) {
			setCurrentCell((prevCell) => {
				if (prevCell) {
					return prevCell;
				}
				if (currentEntryId) {
					const entry = entries.get(currentEntryId);
					if (entry) {
						return cells.getByCoords(entry.position);
					}
				}
				return cells.getByCoords({ x: 0, y: 0 });
			});
		}
		setFocused(true);
	}, [cells, currentCell, currentEntryId, entries, setCurrentCell]);

	useEffect(() => {
		const gridWrapper = gridWrapperRef.current;
		gridWrapper?.addEventListener('focusin', focusInput);

		return () => {
			gridWrapper?.removeEventListener('focusin', focusInput);
		};
	}, [focusInput]);

	return (
		<div
			ref={gridWrapperRef}
			role={'grid'}
			aria-colcount={dimensions.cols}
			aria-rowcount={dimensions.rows}
			css={css`
				position: relative;
				cursor: pointer;
				width: 100%;
				max-width: ${width}px;
				max-height: ${height}px;
				// This is to prevent the default blue highlight on click on android
				-webkit-tap-highlight-color: transparent;
			`}
			onClick={selectClickedCell}
			tabIndex={-1}
		>
			<svg
				css={[
					css`
						background: ${theme.gridBackgroundColor};
					`,
					cheatStyles,
				]}
				id={getId('crossword-grid')}
				ref={gridRef}
				viewBox={`0 0 ${width} ${height}`}
				tabIndex={-1}
				role={'none'}
				aria-hidden={true}
			>
				{
					/* Render the cells */
					Array.from(cells.values()).map((cell) => {
						const x = getCellPosition(cell.x, theme);
						const y = getCellPosition(cell.y, theme);

						const guess = progress[cell.x]?.[cell.y];

						const currentGroup =
							currentEntryId && entries.get(currentEntryId)?.group;

						const isHighlighted = currentGroup?.some((entryId) =>
							cell.group?.includes(entryId),
						);

						const isActive = currentEntryId
							? cell.group?.includes(currentEntryId)
							: false;

						return (
							<Cell
								key={`x${cell.x}y${cell.y}`}
								data={cell}
								x={x}
								y={y}
								guess={guess}
								isActive={isActive}
								isHighlighted={isHighlighted}
							/>
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
				{currentCell && focused && <FocusIndicator currentCell={currentCell} />}
			</svg>
			<div
				role={'row'}
				css={css`
					pointer-events: none;
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
				`}
			>
				<input
					ref={inputRef}
					value={inputValue}
					role="grid-cell"
					aria-colindex={currentCell?.x}
					aria-rowindex={currentCell?.y}
					autoCapitalize={'none'}
					id={getId('	crossword-input')}
					aria-readonly={!currentCell?.group}
					type="text"
					pattern={'^[A-Za-zÀ-ÿ0-9]$'}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={() => setFocused(false)}
					tabIndex={0}
					css={css`
						position: absolute;
						pointer-events: none;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
					`}
					autoComplete="off"
					spellCheck="false"
					autoCorrect="off"
					aria-hidden="false"
					aria-live="polite"
					aria-label={currentCellLabel}
				/>
			</div>
		</div>
	);
};
