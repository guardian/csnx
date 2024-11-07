import type { MouseEventHandler } from 'react';
import { useCallback, useRef } from 'react';
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
	setFocus: (focus: Focus) => void;
	focus?: Focus;
};

export const Grid = ({
	cellsMap,
	theme,
	progress,
	rows,
	cols,
	focus,
	setFocus = () => {},
}: GridProps) => {
	const gridRef = useRef<SVGSVGElement>(null);
	const cellSize = 32;
	const SVGHeight = cellSize * rows + theme.gutter * (rows + 1);
	const SVGWidth = cellSize * cols + theme.gutter * (cols + 1);

	const getClickRef: MouseEventHandler<SVGSVGElement> = useCallback(
		(event) => {
			if (gridRef.current) {
				const clickX =
					event.clientX - gridRef.current.getBoundingClientRect().left;
				const clickY =
					event.clientY - gridRef.current.getBoundingClientRect().top;
				const cellX = Math.floor(clickX / (cellSize + theme.gutter));
				const cellY = Math.floor(clickY / (cellSize + theme.gutter));
				const entryIds = cellsMap.get(`x${cellX}y${cellY}`)?.group;
				const entryId =
					entryIds?.length === 1
						? entryIds[0]
						: entryIds?.find((id) => id !== focus?.entryId);
				setFocus({ x: cellX, y: cellY, entryId });
			}
		},
		[cellsMap, focus, setFocus, theme.gutter],
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
			onClick={getClickRef}
		>
			{Array.from(cellsMap.values()).map((cell) => {
				const x = cell.x * (cellSize + theme.gutter) + theme.gutter;
				const y = cell.y * (cellSize + theme.gutter) + theme.gutter;
				const guess = progress[cell.x]?.[cell.y];
				return (
					<Cell
						key={`x${cell.x}y${cell.y}`}
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
