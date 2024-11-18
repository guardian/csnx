import { isUndefined } from '@guardian/libs';
import { memo } from 'react';
import type { Cell as CellType, Theme } from '../@types/crossword';

export type CellProps = {
	data: CellType;
	x: number;
	y: number;
	guess?: string;
	theme: Theme;
	isFocused?: boolean;
	isHighlighted?: boolean;
};

export const Cell = memo(
	({ data, x, y, guess = '', theme, isFocused, isHighlighted }: CellProps) => {
		let border = {};
		if (isFocused) {
			// set rect stroke and stroke-width
			border = {
				stroke: theme.focusBorder,
				strokeWidth: 2,
				rx: 2,
				ry: 2,
			};
		}

		const backgroundColor = isUndefined(data.group)
			? 'transparent'
			: isHighlighted
				? theme.focus
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
	},
);
