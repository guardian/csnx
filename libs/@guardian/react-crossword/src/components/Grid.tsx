import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { memo, useRef } from 'react';
import type {
	Cells,
	Coords,
	CurrentEntryId,
	Dimensions,
	Progress,
	Separator,
	Separators,
	Theme,
} from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import { Cell } from './Cell';

const getCellPosition = (index: number, { cellSize, gutter }: Theme) =>
	index * (cellSize + gutter) + gutter;

const Separator = memo(
	({
		theme,
		position,
		direction,
		type,
		...props
	}: {
		type: Separator;
		position: Coords;
		direction: Direction;
		theme: Theme;
	}) => {
		const x = getCellPosition(position.x, theme);
		const y = getCellPosition(position.y, theme);

		const { cellSize, gutter } = theme;

		const transform: Partial<Record<Direction, string>> = {
			// rotate the separator 90 degrees around the center of the cell
			down: `rotate(90 ${x + cellSize / 2} ${y + cellSize / 2})`,
		};

		const attrs: Record<Separator, ReactNode> = {
			// draws a dash that bisects the border with the next cell
			'-': (
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
			),
			// draws a thicker border with the next cell
			',': (
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
			),
		};

		return attrs[type];
	},
);

export type GridProps = {
	cells: Cells;
	separators: Separators;
	theme: Theme;
	progress: Progress;
	dimensions: Dimensions;
	setCurrentCell: Dispatch<SetStateAction<Coords | undefined>>;
	setCurrentEntryId: Dispatch<SetStateAction<CurrentEntryId | undefined>>;
	currentCell?: Coords;
	currentEntryId?: CurrentEntryId;
};

export const Grid = ({
	cells,
	separators,
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
			{
				/* Render the cells */
				Array.from(cells.values()).map((cell) => {
					const x = getCellPosition(cell.x, theme);
					const y = getCellPosition(cell.y, theme);
					const guess = progress[cell.x]?.[cell.y];
					const isFocused =
						currentCell?.x === cell.x && currentCell.y === cell.y;
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
				})
			}
			{
				/* Render the separators between cells */
				separators.map(({ type, position, direction }) => (
					<Separator
						type={type}
						theme={theme}
						position={position}
						direction={direction}
						key={`${type}${position.x}${position.y}${direction}`}
					/>
				))
			}
		</svg>
	);
};
