import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
import { memo } from 'react';
import type { Cell as CellType } from '../@types/crossword';
import { useTheme } from '../context/Theme';

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
	const theme = useTheme();

	const backgroundColor = isUndefined(data.group)
		? 'transparent'
		: isHighlighted
			? isActive
				? theme.selectedColor
				: theme.relatedColor
			: theme.gridForegroundColor;

	return (
		<g data-x={data.x} data-y={data.y}>
			<rect
				x={x}
				y={y}
				width={theme.gridCellSize}
				height={theme.gridCellSize}
				fill={backgroundColor}
			/>
			{data.number && (
				<text
					x={x}
					y={y}
					dx={Math.max(1, theme.gridCellSize * 0.05)}
					dy={Math.max(9, theme.gridCellSize * 0.22)}
					fill={theme.textColor}
					css={css`
						${textSans12};
						font-size: ${Math.max(9, Math.round(theme.gridCellSize * 0.2))}px;
					`}
				>
					{data.number}
				</text>
			)}
			<text
				x={x + theme.gridCellSize / 2}
				y={y + theme.gridCellSize / 2}
				dy={theme.gridCellSize * 0.07}
				textAnchor="middle"
				dominantBaseline="middle"
				fill={theme.textColor}
				css={css`
					${textSans12};
					font-size: ${theme.gridCellSize * 0.6}px;
				`}
			>
				{guess}
			</text>
		</g>
	);
};

export const Cell = memo(CellComponent);
