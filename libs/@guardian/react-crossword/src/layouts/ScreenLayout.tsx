import { css } from '@emotion/react';
import { headlineBold17, space } from '@guardian/source/foundations';
import { textSans12, textSans14 } from '@guardian/source/foundations';
import { memo } from 'react';
import type { Direction } from '../@types/Direction';
import type { LayoutProps } from '../@types/Layout';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';
import { useUIState } from '../context/UI';

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

const Layout = ({
	Controls,
	Grid,
	AnagramHelper,
	Clues,
	SavedMessage,
}: LayoutProps) => {
	const { text, clueMinWidth, clueMaxWidth } = useTheme();

	const { showAnagramHelper } = useUIState();
	const theme = useTheme();

	const { gutter, cellSize } = useTheme();
	const { dimensions } = useData();

	const gridWidth = Math.max(
		(cellSize + gutter) * dimensions.cols + gutter,
		300,
	);
	const oneColWidth = gridWidth + clueMinWidth;
	const twoColWidth = gridWidth + clueMinWidth * 2;

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

				@container (min-width: ${oneColWidth}px) {
					flex-direction: row;
				}
			`}
		>
			<div
				css={css`
					@container (min-width: ${oneColWidth}px) {
						max-height: 100%;
						overflow: auto;
						flex-basis: ${gridWidth}px;
					}
				`}
			>
				{showAnagramHelper ? <AnagramHelper /> : <Grid />}
				<Controls />
				<div
					css={css`
						${textSans12};
						font-style: italic;
						color: ${theme.text};
					`}
				>
					<SavedMessage />
				</div>
			</div>

			<div
				css={css`
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: ${space[4]}px;
					${textSans14};
					height: 100%;

					> * {
						max-width: ${Math.max(clueMaxWidth, gridWidth)}px;
						flex: 1;
					}

					@container (min-width: ${oneColWidth}px) {
						overflow: auto;
					}

					@container (min-width: ${twoColWidth}px) {
						flex-direction: row;
						overflow: auto;
						min-height: 100%;

						> * {
							overflow: auto;
						}
					}
				`}
			>
				<Clues direction="across" Header={CluesHeader} />
				<Clues direction="down" Header={CluesHeader} />
			</div>
		</div>
	);
};

export const ScreenLayout = memo(Layout);
