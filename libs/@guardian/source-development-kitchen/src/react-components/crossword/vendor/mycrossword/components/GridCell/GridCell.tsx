// @ts-nocheck

import { css } from '@emotion/react';
import * as React from 'react';
import { useCellsContext } from '../../context/CellsContext';
import { useCluesContext } from '../../context/CluesContext';
import type { CellFocus, CellPosition, Char } from '../../interfaces';

export const cellSize = 31;

export const getDimensions = (cellPos: CellPosition) => {
	const xRect = 1 + (cellSize + 1) * cellPos.col;
	const yRect = 1 + (cellSize + 1) * cellPos.row;
	const xNum = xRect + 1;
	const yNum = yRect + 9;
	const xText = xRect + cellSize * 0.5;
	const yText = yRect + cellSize * 0.675;

	return { xRect, yRect, xNum, yNum, xText, yText };
};

// Define base colors and styles
const gridColor = '#000';
const gridForeground = '#fff';
const fontSizeSmall = '12px';
const fontSizeLarge = '16px';
const themeBlue100 = '#bbdefb';
const themeBlue700 = '#1976d2';

// Emotion styles
const baseCellStyle = css`
	fill: ${gridColor};
	user-select: none;
`;

const rectBaseStyle = css`
	cursor: pointer;
	fill: ${gridForeground};
`;

const textBaseStyle = css`
	font-size: ${fontSizeLarge};
	cursor: text;
	text-anchor: middle;
`;

const numberBaseStyle = css`
	font-size: ${fontSizeSmall};
	cursor: pointer;
`;

const selectedTextStyle = css`
	font-weight: bold;
	fill: ${gridForeground};
`;

const highlightedStyle = css`
	fill: ${themeBlue100};
`;

const selectedStyle = css`
	fill: ${themeBlue700};
`;

interface GridCellProps {
	clueIds: string[];
	guess?: Char;
	inputRef?: React.RefObject<HTMLInputElement>;
	isHighlighted: boolean;
	isSelected: boolean;
	num?: number;
	onCellFocus?: (cellFocus: CellFocus) => void;
	pos: CellPosition;
	selectedClueIndex: number;
}

function GridCell({
	clueIds,
	guess,
	inputRef,
	isHighlighted,
	isSelected,
	num,
	onCellFocus,
	pos,
	selectedClueIndex,
}: GridCellProps) {
	if (clueIds.length !== 1 && clueIds.length !== 2) {
		throw new Error(
			'Crossword data error: cell does not have 1 or 2 directions',
		);
	}

	const { select: cellsActionSelect } = useCellsContext();
	const { select: cluesActionSelect } = useCluesContext();
	const { xRect, yRect, xNum, yNum, xText, yText } = getDimensions(pos);

	const cellFocus = (cellPos: CellPosition, clueId: string) => {
		onCellFocus?.({ pos: cellPos, clueId });
	};

	const updateSelectedCell = () => {
		let index = selectedClueIndex === -1 ? 0 : selectedClueIndex;
		if (clueIds.length === 2 && isSelected) {
			index = selectedClueIndex === 0 ? 1 : 0;
		}

		const clueId = clueIds[index];
		if (clueId) {
			cluesActionSelect(clueId);

			if (!isSelected) {
				cellsActionSelect(pos);
			}

			if (!isSelected || clueIds.length === 2) {
				cellFocus(pos, clueId);
			}
		}

		inputRef?.current?.focus({ preventScroll: true });
	};

	return (
		<g css={[baseCellStyle]} onClick={updateSelectedCell}>
			<rect
				css={[
					rectBaseStyle,
					isHighlighted && highlightedStyle,
					isSelected && selectedStyle,
				]}
				x={xRect}
				y={yRect}
				width={cellSize}
				height={cellSize}
			/>
			{num && (
				<text
					css={[numberBaseStyle, isSelected && selectedTextStyle]}
					x={xNum}
					y={yNum}
				>
					{num}
				</text>
			)}
			<text
				css={[textBaseStyle, isSelected && selectedTextStyle]}
				x={xText}
				y={yText}
			>
				{guess}
			</text>
		</g>
	);
}

export default React.memo(GridCell);
