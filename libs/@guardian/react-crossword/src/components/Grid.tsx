import type { ContextType, Dispatch, SetStateAction } from 'react';
import { memo, useContext, useRef } from 'react';
import type {
	Cells,
	Coords,
	Dimensions,
	Entries,
	Separator,
	Separators,
} from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import type { EntryID } from '../@types/Entry';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { Cell } from './Cell';

const getCellPosition = (
	index: number,
	{ cellSize, gutter }: ContextType<typeof ThemeContext>,
) => index * (cellSize + gutter) + gutter;

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
		const theme = useContext(ThemeContext);

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

export type GridProps = {
	cells: Cells;
	entries: Entries;
	separators: Separators;
	dimensions: Dimensions;
	setCurrentCell: Dispatch<SetStateAction<Coords | undefined>>;
	setCurrentEntryId: Dispatch<SetStateAction<EntryID | undefined>>;
	currentCell?: Coords;
	currentEntryId?: EntryID;
};

export const Grid = ({
	cells,
	entries,
	separators,
	dimensions,
	currentCell,
	currentEntryId,
}: GridProps) => {
	const { progress } = useContext(ProgressContext);
	const theme = useContext(ThemeContext);

	const gridRef = useRef<SVGSVGElement>(null);

	const height =
		theme.cellSize * dimensions.rows + theme.gutter * (dimensions.rows + 1);
	const width =
		theme.cellSize * dimensions.cols + theme.gutter * (dimensions.cols + 1);

	return (
		<svg
			style={{
				backgroundColor: theme.background,
				width: '100%',
				maxWidth: width,
			}}
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

					const isFocused =
						currentCell?.x === cell.x && currentCell.y === cell.y;

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
							isFocused={isFocused}
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
		</svg>
	);
};
