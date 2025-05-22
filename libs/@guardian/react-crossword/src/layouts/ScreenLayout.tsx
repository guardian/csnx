import { css } from '@emotion/react';
import {
	headlineBold17,
	space,
	textSans14,
	textSansItalic12,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { memo } from 'react';
import type { LayoutProps } from '../@types/Layout';
import { FocusedClue } from '../components/FocusedClue';
import { useTheme } from '../context/Theme';

const CluesHeader = memo(({ children }: { children: ReactNode }) => {
	const theme = useTheme();

	return (
		<div
			css={css`
				${headlineBold17};
				border-top: 1px solid ${theme.clueListBorderColor};
				border-bottom: 1px dotted ${theme.borderColor};
				height: 2em;
				margin-bottom: 0.5em;
				text-transform: capitalize;

				@media print {
					border-top: none;
				}
			`}
		>
			{children}
		</div>
	);
});
CluesHeader.displayName = 'CluesHeader';

const Layout = ({
	Controls,
	Grid,
	AnagramHelper,
	Clues,
	SavedMessage,
	gridWidth: actualGridWidth,
}: LayoutProps) => {
	const { clueMinWidth, clueMaxWidth } = useTheme();

	const gridWidth = Math.max(actualGridWidth, 300);
	const oneColWidth = gridWidth + clueMinWidth;
	const twoColWidth = gridWidth + clueMinWidth * 2;

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: ${space[4]}px;
				max-width: ${gridWidth + clueMaxWidth * 2}px;
				height: 100%;
				overflow: auto;

				@container (min-width: ${oneColWidth}px) {
					flex-direction: row;
				}

				@media print {
					flex-direction: column;
				}
			`}
		>
			<AnagramHelper />
			<div
				css={css`
					@container (min-width: ${oneColWidth}px) {
						max-height: 100%;
						overflow: auto;
						flex-basis: ${gridWidth}px;
					}
				`}
			>
				<FocusedClue
					additionalCss={css`
						max-width: ${gridWidth}px;
						@container (min-width: ${oneColWidth}px) {
							display: none;
						}
					`}
				/>
				<Grid />
				<FocusedClue
					additionalCss={css`
						max-width: ${gridWidth}px;
						@container (min-width: ${oneColWidth}px) {
							display: none;
						}
					`}
				/>
				<div
					css={css`
						margin-top: ${space[1]}px;
						@media print {
							display: none;
						}
					`}
				>
					<Controls />
				</div>
				<div
					css={css`
						${textSansItalic12};
						@media print {
							display: none;
						}
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

					@media print {
						flex-direction: row;
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
