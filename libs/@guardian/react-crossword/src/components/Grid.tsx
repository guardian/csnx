import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { memo, useCallback, useEffect, useRef } from 'react';
import type { Coords, Separator, Theme } from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import { useCurrentCell } from '../context/CurrentCell';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { useCheatMode } from '../hooks/useCheatMode';
import { keyDownRegex } from '../utils/keydownRegex';
import { Cell } from './Cell';

const getCellPosition = (index: number, { cellSize, gutter }: Theme) =>
	index * (cellSize + gutter) + gutter;

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

		const { cellSize, gutter } = theme;

		// if this is a 'down' entry, we'll rotate the separator 90 degrees
		// around the center of the cell
		const transform: Partial<Record<Direction, string>> = {
			down: `rotate(90 ${x + cellSize / 2} ${y + cellSize / 2})`,
		};

		return type === '-' ? (
			// draws a dash (-) that bisects the border with the next cell
			<line
				x1={x + cellSize - 3}
				y1={y + cellSize / 2}
				x2={x + cellSize + 4}
				y2={y + cellSize / 2}
				strokeWidth={gutter}
				stroke={theme.background}
				transform={transform[direction]}
				{...props}
			/>
		) : (
			// draws a thicker border with the next cell
			<line
				x1={x + cellSize + gutter / 2}
				y1={y}
				x2={x + cellSize + gutter / 2}
				y2={y + cellSize}
				strokeWidth={gutter * 2}
				stroke={theme.background}
				transform={transform[direction]}
				{...props}
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
			x={currentCell.x * (theme.cellSize + theme.gutter) + theme.gutter * 0.5}
			y={currentCell.y * (theme.cellSize + theme.gutter) + theme.gutter * 0.5}
			width={theme.cellSize + theme.gutter}
			height={theme.cellSize + theme.gutter}
			stroke={theme.focus}
			strokeWidth={2}
			fill="none"
			rx={2}
			ry={2}
		/>
	);
};

export const Grid = () => {
	const theme = useTheme();
	const { cells, separators, entries, dimensions } = useData();
	const { progress, setCellProgress } = useProgress();
	const { currentCell, setCurrentCell } = useCurrentCell();
	const { currentEntryId, setCurrentEntryId } = useCurrentClue();

	const gridRef = useRef<SVGSVGElement>(null);
	const workingDirectionRef = useRef<Direction>('across');

	const [cheatMode, cheatStyles] = useCheatMode(gridRef);

	// keep workingDirectionRef.current up to date with the current entry
	useEffect(() => {
		if (currentEntryId) {
			workingDirectionRef.current =
				entries.get(currentEntryId)?.direction ?? workingDirectionRef.current;
		}
	}, [currentEntryId, entries]);

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
		[currentCell, cells, setCurrentCell, setCurrentEntryId],
	);

	const handleTab = useCallback(() => {
		return;
	}, []);

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
					setCellProgress({ ...currentCell, value: '' });
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
					if (currentEntryId) {
						const value = cheatMode
							? cells.getByCoords({ x: currentCell.x, y: currentCell.y })
									?.solution
							: keyDownRegex.test(key) && key.toUpperCase();

						if (value) {
							setCellProgress({ ...currentCell, value });
							if (direction === 'across') {
								moveFocus({ delta: { x: 1, y: 0 }, isTyping: true });
							}
							if (direction === 'down') {
								moveFocus({ delta: { x: 0, y: 1 }, isTyping: true });
							}
						} else {
							preventDefault = false;
						}
					}
					break;
				}
			}

			if (preventDefault) {
				event.preventDefault();
			}
		},
		[
			currentCell,
			currentEntryId,
			moveFocus,
			handleTab,
			setCellProgress,
			cheatMode,
			cells,
		],
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
			const entryIdsForCell = cells.getByCoords({
				x: clickedCellX,
				y: clickedCellY,
			})?.group;

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
			setCurrentCell({ x: clickedCellX, y: clickedCellY });
			setCurrentEntryId(newEntryId);
		},
		[cells, currentCell, currentEntryId, setCurrentCell, setCurrentEntryId],
	);

	useEffect(() => {
		const grid = gridRef.current;

		grid?.addEventListener('click', selectClickedCell);
		grid?.addEventListener('keydown', handleKeyDown);

		return () => {
			grid?.removeEventListener('click', selectClickedCell);
			grid?.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown, selectClickedCell]);

	const height =
		theme.cellSize * dimensions.rows + theme.gutter * (dimensions.rows + 1);
	const width =
		theme.cellSize * dimensions.cols + theme.gutter * (dimensions.cols + 1);

	return (
		<svg
			css={[
				css`
					background: ${theme.background};
					width: 100%;
					max-width: ${width};
				`,
				cheatStyles,
			]}
			ref={gridRef}
			viewBox={`0 0 ${width} ${height}`}
			tabIndex={-1}
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
			{currentCell && <FocusIndicator currentCell={currentCell} />}
		</svg>
	);
};
