import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import type { FormEvent, KeyboardEvent, SVGProps } from 'react';
import { useEffect, useRef } from 'react';
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
	/** is the cell checked and incorrect */
	isIncorrect?: boolean;
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
	isIncorrect = false,
	isSelected,
	isCurrentCell,
	handleKeyDown,
	handleInput,
	...props
}: CellProps) => {
	const theme = useTheme();
	const { getId } = useData();
	const cellRef = useRef<null | SVGGElement>(null);
	const cellDescription = data.description
		? (isIncorrect ? 'Incorrect letter. ' : '') + data.description
		: '';

	const backgroundColor = isBlackCell
		? 'transparent'
		: isConnected
			? isSelected
				? theme.selectedColor
				: theme.connectedColor
			: theme.gridForegroundColor;

	const cellStyles = css`
		fill: ${backgroundColor};
		@media print {
			fill: ${isBlackCell ? 'transparent' : theme.gridForegroundColor};
		}
	`;

	/**
	 * Have to do this in a useEffect because there is an issue with preact
	 * not normalising tabIndex attribute: https://github.com/preactjs/preact/issues/1061
	 */
	useEffect(() => {
		const currentRef = cellRef.current;
		if (currentRef) {
			const tabIndex = isCurrentCell && isBlackCell ? '0' : '-1';
			currentRef.setAttribute('tabindex', tabIndex);
		}
	}, [isBlackCell, isCurrentCell]);

	return (
		<g ref={cellRef} {...props}>
			<rect
				x={x}
				y={y}
				width={theme.gridCellSize}
				height={theme.gridCellSize}
				aria-hidden="true"
				role="presentation"
				css={cellStyles}
			/>
			{isIncorrect && (
				<line
					x1={x}
					y1={y}
					x2={x + theme.gridCellSize}
					y2={y + theme.gridCellSize}
					strokeWidth="2"
					stroke={theme.gridCellStrikeThrough}
				/>
			)}
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
							aria-description={cellDescription}
							css={css`
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
