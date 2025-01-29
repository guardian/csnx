import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import type { FormEvent, KeyboardEvent, SVGProps } from 'react';
import { memo } from 'react';
import type { Cell as CellType } from '../@types/crossword';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';

export type BaseCellProps = {
	data: CellType;
	x: number;
	y: number;
	guess?: string;
	isBlackCell: boolean;
	/** is the cell connected in any way to the active clue? */
	isConnected?: boolean;
	/** is the cell for the selected clue? */
	isSelected?: boolean;
	/** is the cell the current cell? */
	isCurrentCell?: boolean;
	/** callback for keydown event */
	handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** callback for input event */
	handleInput: (event: FormEvent<HTMLInputElement>) => void;
};

export type CellProps = BaseCellProps & SVGProps<SVGGElement>;

const CellComponent = ({
	data,
	x,
	y,
	guess = '',
	isBlackCell,
	isConnected,
	isSelected,
	isCurrentCell,
	handleKeyDown,
	handleInput,
	...props
}: CellProps) => {
	const theme = useTheme();
	const { getId } = useData();

	const backgroundColor = isBlackCell
		? 'transparent'
		: isConnected
			? isSelected
				? theme.selectedColor
				: theme.connectedColor
			: theme.gridForegroundColor;

	return (
		<g {...props} tabIndex={isCurrentCell && isBlackCell ? 0 : -1}>
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
					<foreignObject
						x={x}
						y={y}
						width={theme.gridCellSize}
						height={theme.gridCellSize}
						css={css`
							position: relative;
						`}
					>
						<input
							value={guess}
							autoCapitalize={'none'}
							type="text"
							pattern={'^[A-Za-zÀ-ÿ0-9]$'}
							onKeyDown={handleKeyDown}
							id={getId(`cell-input-${data.x}-${data.y}`)}
							onInput={handleInput}
							tabIndex={isCurrentCell ? 0 : -1}
							aria-label="Crossword cell"
							aria-description={data.description ?? ''}
							css={css`
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								background: transparent;
								border: none;
								${textSans12};
								font-size: ${theme.gridCellSize * 0.6}px;
								text-align: center;
							`}
							autoComplete="off"
							spellCheck="false"
							autoCorrect="off"
						/>
					</foreignObject>
				</>
			)}
		</g>
	);
};

export const Cell = memo(CellComponent);
