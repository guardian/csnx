import { isUndefined } from '@guardian/libs';
import type { MouseEventHandler } from 'react';
import { useCallback, useRef } from 'react';
import type {
	Cells,
	CurrentCell,
	CurrentEntryId,
	Dimensions,
	Progress,
	Theme,
} from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import { Cell } from './Cell';

export type GridProps = {
	cells: Cells;
	theme: Theme;
	progress: Progress;
	dimensions: Dimensions;
	setCurrentCell: React.Dispatch<React.SetStateAction<CurrentCell | undefined>>;
	setCurrentEntryId: React.Dispatch<
		React.SetStateAction<CurrentEntryId | undefined>
	>;
	currentCell?: CurrentCell;
	currentEntryId?: CurrentEntryId;
};

export const Grid = ({
	cells,
	theme,
	progress,
	dimensions,
	currentCell,
	currentEntryId,
	setCurrentCell,
	setCurrentEntryId,
}: GridProps) => {
	const gridRef = useRef<SVGSVGElement>(null);
	const workingDirectionRef = useRef<Direction>('across');

	const SVGHeight =
		theme.cellSize * dimensions.rows + theme.gutter * (dimensions.rows + 1);
	const SVGWidth =
		theme.cellSize * dimensions.cols + theme.gutter * (dimensions.cols + 1);

	const selectClickedCell: MouseEventHandler<SVGSVGElement> = useCallback(
		(event) => {
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

	return (
		<svg
			style={{
				backgroundColor: theme.background,
				width: SVGWidth,
				height: SVGHeight,
			}}
			ref={gridRef}
			viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
			onClick={selectClickedCell}
		>
			{Array.from(cells.values()).map((cell) => {
				const x = cell.x * (theme.cellSize + theme.gutter) + theme.gutter;
				const y = cell.y * (theme.cellSize + theme.gutter) + theme.gutter;
				const guess = progress[cell.x]?.[cell.y];
				const isFocused = currentCell?.x === cell.x && currentCell.y === cell.y;
				const isHighlighted = currentEntryId
					? cell.group?.includes(currentEntryId)
					: false;
				return (
					<Cell
						key={`x${cell.x}y${cell.y}`}
						data={cell}
						x={x}
						y={y}
						theme={theme}
						guess={guess}
						isFocused={isFocused}
						isHighlighted={isHighlighted}
					/>
				);
			})}
		</svg>
	);
};
