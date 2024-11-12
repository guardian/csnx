import { useRef } from 'react';
import type {
	Cells,
	CurrentCell,
	CurrentEntryId,
	Dimensions,
	Progress,
	Theme,
} from '../@types/crossword';
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
}: GridProps) => {
	const gridRef = useRef<SVGSVGElement>(null);

	const SVGHeight =
		theme.cellSize * dimensions.rows + theme.gutter * (dimensions.rows + 1);
	const SVGWidth =
		theme.cellSize * dimensions.cols + theme.gutter * (dimensions.cols + 1);

	const cellSpace = theme.cellSize + theme.gutter + theme.gutter;

	return (
		<svg
			style={{
				backgroundColor: theme.background,
				width: '100%',
				maxWidth: SVGWidth,
			}}
			ref={gridRef}
			viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
			tabIndex={-1}
		>
			{Array.from(cells.values()).map((cell) => {
				const x = cell.x * cellSpace;
				const y = cell.y * cellSpace;

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
