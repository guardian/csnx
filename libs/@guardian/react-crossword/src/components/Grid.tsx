import type { MouseEventHandler } from 'react';
import { useCallback, useRef } from 'react';
import type { Cells, Focus, Progress, Theme } from '../@types/crossword';
import { Cell } from './Cell';

export type GridProps = {
	cells: Cells;
	theme: Theme;
	progress: Progress;
	rows: number;
	cols: number;
	setFocus: (focus: Focus) => void;
	focus?: Focus;
};

export const Grid = ({
	cells,
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
				const entryIds = cells.get(`x${cellX}y${cellY}`)?.group;
				let entryId;
				if (entryIds?.length === 1) {
					entryId = entryIds[0];
				} else {
					const newEntryId = entryIds?.find((id) => id !== focus?.entryId);
					// if you are not already on an entry stay on it unless the new cell has a different entry or you haven't moved cell
					if (
						(cellX !== focus?.x || cellY !== focus.y) &&
						focus?.entryId &&
						entryIds?.includes(focus.entryId)
					) {
						entryId = focus.entryId;
					} else {
						entryId = newEntryId;
					}
				}
				setFocus({ x: cellX, y: cellY, entryId });
			}
		},
		[cells, focus, setFocus, theme.gutter],
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
			{Array.from(cells.values()).map((cell) => {
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
