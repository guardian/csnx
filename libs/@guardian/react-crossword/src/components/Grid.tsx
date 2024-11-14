import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type {
	Axis,
	Cells,
	CurrentCell,
	CurrentEntryId,
	Dimensions,
	Entries,
	Progress,
	Separator,
	Theme,
} from '../@types/crossword';
import { Cell } from './Cell';

const getCellPosition = (index: number, theme: Theme) =>
	index * (theme.cellSize + theme.gutter) + theme.gutter;

const Separator = ({
	theme,
	entry,
	location,
	type,
	...props
}: {
	type: Separator;
	entry: CAPIEntry;
	location: number;
	theme: Theme;
	index: string;
}) => {
	const from: Axis = entry.direction === 'across' ? 'x' : 'y';
	const to: Axis = entry.direction === 'across' ? 'y' : 'x';

	const fromPosition = getCellPosition(
		entry.position[from] + location - 1,
		theme,
	);
	const toPosition = getCellPosition(entry.position[to], theme);

	const coords: Record<Separator, Record<`${Axis}${number}`, number>> = {
		'-': {
			[`${from}1`]: fromPosition + theme.cellSize - 3,
			[`${to}1`]: toPosition + theme.cellSize / 2,
			[`${from}2`]: fromPosition + theme.cellSize + 4,
			[`${to}2`]: toPosition + theme.cellSize / 2,
		},
		',': {
			[`${from}1`]: fromPosition + theme.cellSize + theme.gutter / 2,
			[`${to}1`]: toPosition,
			[`${from}2`]: fromPosition + theme.cellSize + theme.gutter / 2,
			[`${to}2`]: toPosition + theme.cellSize,
		},
	};

	const strokeWidth: Record<Separator, number> = {
		'-': theme.gutter,
		',': theme.gutter * 2,
	};

	return (
		<line
			{...coords[type]}
			stroke={theme.background}
			strokeWidth={strokeWidth[type]}
			{...props}
		/>
	);
};

export type GridProps = {
	cells: Cells;
	entries: Entries;
	theme: Theme;
	progress: Progress;
	dimensions: Dimensions;
	setCurrentCell: Dispatch<SetStateAction<CurrentCell | undefined>>;
	setCurrentEntryId: Dispatch<SetStateAction<CurrentEntryId | undefined>>;
	currentCell?: CurrentCell;
	currentEntryId?: CurrentEntryId;
};

export const Grid = ({
	cells,
	entries,
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
				Array.from(entries.values()).map((entry) =>
					Object.entries(entry.separatorLocations).map(([type, locations]) =>
						locations.map((location) => {
							return (
								<Separator
									type={type as Separator}
									theme={theme}
									entry={entry}
									location={location}
									index={`${type}${location}`}
								/>
							);
						}),
					),
				)
			}
		</svg>
	);
};
