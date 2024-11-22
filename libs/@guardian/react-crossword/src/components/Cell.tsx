import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
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
	/** is the cell connected in any way to the active clue? */
	isHighlighted?: boolean;
	/** is the cell for the active clue? */
	isActive?: boolean;
};

const CellComponent = ({
	data,
	x,
	y,
	guess = '',
	isHighlighted,
	isActive,
}: CellProps) => {
	const theme = useContext(ThemeContext);

	const backgroundColor = isUndefined(data.group)
		? 'transparent'
		: isHighlighted
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
			/>
			{data.number && (
				<text
					x={x}
					y={y}
					dx={Math.max(1, theme.cellSize * 0.05)}
					dy={Math.max(9, theme.cellSize * 0.22)}
					fill={theme.text}
					css={css`
						color: currentcolor;
						${textSans12};
						font-size: ${Math.max(9, Math.round(theme.cellSize * 0.2))}px;
					`}
				>
					{data.number}
				</text>
			)}
			<text
				x={x + theme.cellSize / 2}
				y={y + theme.cellSize / 2}
				dy={theme.cellSize * 0.07}
				textAnchor="middle"
				dominantBaseline="middle"
				css={css`
					color: currentcolor;
					${textSans12};
					font-size: ${theme.cellSize * 0.6}px;
				`}
			>
				{guess}
			</text>
		</g>
	);
};

export const Cell = memo(CellComponent);
