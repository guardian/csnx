import { css } from '@emotion/react';
import { headlineBold17, space } from '@guardian/source/foundations';
import { textSans12, textSans14 } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { memo } from 'react';
import type { Direction } from '../@types/Direction';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';

export const useGridWidth = () => {
	const { gutter, cellSize } = useTheme();
	const { dimensions } = useData();

	return useMemo(
		() => Math.max((cellSize + gutter) * dimensions.cols + gutter, 300),
		[cellSize, gutter, dimensions.cols],
	);
};

export const useWidthForCols = (cols: number) => {
	const gridWidth = useGridWidth();
	const { clueMinWidth } = useTheme();

	return gridWidth + clueMinWidth * cols + 'px';
};

export const Wrapper = memo(({ children }: { children: ReactNode }) => {
	const { text, clueMaxWidth } = useTheme();
	const gridWidth = useGridWidth();

	return (
		<div
			css={css`
				color: ${text};
				display: flex;
				flex-direction: column;
				gap: ${space[4]}px;
				max-width: ${gridWidth + clueMaxWidth * 2}px;
				height: 100%;
				overflow: auto;

				@container (min-width: ${useWidthForCols(1)}) {
					flex-direction: row;
				}
			`}
		>
			{children}
		</div>
	);
});

const Grid = memo(({ children }: { children: ReactNode }) => {
	const gridWidth = useGridWidth();

	return (
		<div
			css={css`
				@container (min-width: ${useWidthForCols(1)}) {
					max-height: 100%;
					overflow: auto;
					flex-basis: ${gridWidth}px;
				}
			`}
		>
			{' '}
			{children}
		</div>
	);
});

const Clues = memo(({ children }: { children: ReactNode }) => {
	const { clueMaxWidth } = useTheme();

	return (
		<div
			css={css`
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: ${space[4]}px;
				${textSans14};
				height: 100%;

				> * {
					max-width: ${Math.max(clueMaxWidth, useGridWidth())}px;
					flex: 1;
				}

				@container (min-width: ${useWidthForCols(1)}) {
					overflow: auto;
				}

				@container (min-width: ${useWidthForCols(2)}) {
					flex-direction: row;
					overflow: auto;
					min-height: 100%;

					> * {
						overflow: auto;
					}
				}
			`}
		>
			{children}
		</div>
	);
});

const CluesHeader = memo(({ direction }: { direction: Direction }) => {
	const theme = useTheme();

	return (
		<div
			css={css`
				${headlineBold17};
				border-top: 1px solid ${theme.border};
				border-bottom: 1px dotted ${theme.border};
				height: 2em;
				margin-bottom: 0.5em;
			`}
		>
			{direction}
		</div>
	);
});

const SavedMessage = memo(({ children }: { children: ReactNode }) => {
	const theme = useTheme();

	return (
		<div
			css={css`
				${textSans12};
				font-style: italic;
				color: ${theme.text};
			`}
		>
			{children}
		</div>
	);
});

export const Layout = {
	Wrapper,
	Grid,
	Clues,
	CluesHeader,
	SavedMessage,
};
