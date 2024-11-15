import { isUndefined } from '@guardian/libs';
import { memo, useContext } from 'react';
import type { Cell as CellType } from '../@types/crossword';
import { ThemeContext } from '../context/ThemeContext';

export type CellProps = {
	data: CellType;
	x: number;
	y: number;
	guess?: string;
	/** is the cell receiving input? */
	isFocused?: boolean;
	/** is the cell related to the active clue? */
	isRelated?: boolean;
	/** is the cell for the active clue? */
	isActive?: boolean;
};

export const CellComponent = ({
	data,
	x,
	y,
	guess = '',
	isFocused,
	isRelated,
	isActive,
}: CellProps) => {
	const theme = useContext(ThemeContext);

	let border = {};
	if (isFocused) {
		// set rect stroke and stroke-width
		border = {
			stroke: theme.focus,
			strokeWidth: 2,
			rx: 2,
			ry: 2,
		};
	}

	const backgroundColor = isUndefined(data.group)
		? 'transparent'
		: isRelated
			? isActive
				? theme.active
				: theme.highlight
			: theme.foreground;

	return (
		<g data-x={data.x} data-y={data.y}>
			<rect
				x={x}
				y={y}
				width={theme.cellSize}
				height={theme.cellSize}
				fill={backgroundColor}
				{...border}
			/>
			{data.number && (
				<text
					x={x}
					y={y}
					dy={8}
					height={theme.cellSize}
					width={theme.cellSize}
					fill={theme.text}
					style={{ fontSize: 10 }}
				>
					{data.number}
				</text>
			)}
			<text
				x={x}
				y={y}
				dx={theme.cellSize / 2}
				dy={theme.cellSize / 1.7}
				textAnchor="middle"
				dominantBaseline="middle"
				style={{ fontSize: theme.cellSize * 0.7 }}
			>
				{guess}
			</text>
		</g>
	);
};

export const Cell = memo(CellComponent);
