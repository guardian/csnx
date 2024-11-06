import type {
	Cell as CellType,
	Focus,
	Progress,
	Theme,
} from '../@types/crossword';
import { Cell } from './Cell';

export type GridProps = {
	cellsMap: Map<string, CellType>;
	theme: Theme;
	progress: Progress;
	rows: number;
	cols: number;
	focus: Focus;
};

export const Grid = ({
	cellsMap,
	theme,
	progress,
	rows,
	cols,
	focus,
}: GridProps) => {
	//for each cell add a cell component to the grid
	const cellSize = 16;
	const SVGHeight = cellSize * rows + theme.gutter * (rows + 1);
	const SVGWidth = cellSize * cols + theme.gutter * (cols + 1);

	return (
		<svg
			style={{
				backgroundColor: theme.background,
				width: SVGWidth,
				height: SVGHeight,
			}}
			viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
		>
			{Array.from(cellsMap.values()).map((cell) => {
				const x = cell.x * (cellSize + theme.gutter) + theme.gutter;
				const y = cell.y * (cellSize + theme.gutter) + theme.gutter;
				const guess = progress[cell.x]?.[cell.y];
				return (
					<Cell
						data={cell}
						x={x}
						y={y}
						cellSize={cellSize}
						theme={theme}
						guess={guess}
						focus={focus}
					/>
				);
			})}
		</svg>
	);
};
