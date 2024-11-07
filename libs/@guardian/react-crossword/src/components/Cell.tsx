import { isUndefined } from '@guardian/libs';
import type { Cell as CellType, Focus, Theme } from '../@types/crossword';

export type CellProps = {
	data: CellType;
	x: number;
	y: number;
	cellSize: number;
	guess?: string;
	theme: Theme;
	focus?: Focus;
};

export const Cell = ({
	data,
	x,
	y,
	cellSize = 16,
	guess = '',
	theme,
	focus,
}: CellProps) => {
	const isFocused = focus?.entryId && data.group?.includes(focus.entryId);
	let border = {};
	if (isFocused && focus.y === data.y && focus.x === data.x) {
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
		: isFocused
			? theme.focus
			: theme.foreground;
	return (
		<g>
			<rect
				x={x}
				y={y}
				width={cellSize}
				height={cellSize}
				fill={backgroundColor}
				{...border}
			/>
			{data.number && (
				<text
					x={x}
					y={y}
					dy={8}
					height={cellSize}
					width={cellSize}
					fill={theme.text}
					style={{ fontSize: 10 }}
				>
					{data.number}
				</text>
			)}
			<text
				x={x}
				y={y}
				dx={cellSize / 2}
				dy={cellSize / 1.7}
				textAnchor="middle"
				dominantBaseline="middle"
				style={{ fontSize: cellSize * 0.7 }}
			>
				{guess}
			</text>
		</g>
	);
};
