import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import { forwardRef, memo } from 'react';
import type { Cell as CellType } from '../@types/crossword';
import { useTheme } from '../context/Theme';

export type CellProps = {
	data: CellType;
	x: number;
	y: number;
	guess?: string;
	isBlackCell: boolean;
	/** is the cell connected in any way to the active clue? */
	isConnected?: boolean;
	/** is the cell for the selected clue? */
	isSelected?: boolean;
} & React.SVGProps<SVGGElement>;

const CellComponent = forwardRef<SVGGElement, CellProps>(
	(
		{
			data,
			x,
			y,
			guess = '',
			isBlackCell,
			isConnected,
			isSelected,
			children,
			...props
		},
		ref,
	) => {
		const theme = useTheme();

		const backgroundColor = isBlackCell
			? 'transparent'
			: isConnected
				? isSelected
					? theme.selectedColor
					: theme.connectedColor
				: theme.gridForegroundColor;

		return (
			<g {...props} ref={ref}>
				<rect
					x={x}
					y={y}
					width={theme.gridCellSize}
					height={theme.gridCellSize}
					fill={backgroundColor}
					aria-hidden="true"
					role="presentation"
				/>
				{!isBlackCell && (
					<>
						{data.number && (
							<text
								x={x}
								y={y}
								dx={Math.max(1, theme.gridCellSize * 0.05)}
								dy={Math.max(9, theme.gridCellSize * 0.22)}
								fill={theme.textColor}
								css={css`
									${textSans12};
									font-size: ${Math.max(
										9,
										Math.round(theme.gridCellSize * 0.2),
									)}px;
								`}
								aria-hidden="true"
								role="presentation"
							>
								{data.number}
							</text>
						)}

						{children ?? (
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
								aria-hidden="true"
								role="presentation"
							>
								{guess}
							</text>
						)}

						{children && (
							<foreignObject
								x={x}
								y={y}
								width={theme.gridCellSize}
								height={theme.gridCellSize}
								css={css`
									position: relative;
								`}
							>
								{children}
							</foreignObject>
						)}
					</>
				)}
			</g>
		);
	},
);

export const Cell = memo(CellComponent);
