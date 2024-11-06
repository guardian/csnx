import { isUndefined } from '@guardian/libs';
import type { Cell as CellType, Focus, Theme } from '../@types/crossword';

export type CellProps = {
	data: CellType;
	x: number;
	y: number;
	cellSize?: number;
	guess?: string;
	theme: Theme;
	focus: Focus;
};

export const Cell = ({
	data,
	x,
	y,
	cellSize,
	guess = '',
	theme,
	focus,
}: CellProps) => {
	const isFocused = focus.x === data.x && focus.y === data.y;

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
				aria-disabled={isFocused}
				width={cellSize}
				height={cellSize}
				fill={backgroundColor}
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
			<text x={x} y={y} dy={13} dx={2} style={{ fontSize: 16 }}>
				{guess}
			</text>
		</g>
	);
};
