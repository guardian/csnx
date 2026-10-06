import { css } from '@emotion/react';
import { type ComponentType, type ReactNode, useMemo } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Progress, Theme } from '../@types/crossword';
import type { LayoutProps } from '../@types/Layout';
import { ContextProvider } from '../context/ContextProvider';
import { type ProgressChange, useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { ScreenLayout } from '../layouts/ScreenLayout';
import { defaultTheme } from '../theme';
import { AnagramHelper } from './AnagramHelper';
import { Clues } from './Clues';
import { Controls } from './Controls';
import { FocusedClue } from './FocusedClue';
import { Grid } from './Grid';

export type CrosswordProps = {
	data: CAPICrossword;
	progress?: Progress;
	/**
	 * Called each time the reader changes the grid (typing, deleting, clearing,
	 * revealing). Not called when saved progress is restored on load.
	 */
	onProgressChange?: (change: ProgressChange) => void;
	children?: ReactNode;
	Layout?: ComponentType<LayoutProps>;
	MobileBannerAd?: ComponentType;
} & Partial<Theme>;

const SavedMessage = () => {
	const { isStored } = useProgress();
	const { textColor } = useTheme();

	return (
		<p
			css={css`
				color: ${textColor};
			`}
		>
			{isStored
				? 'Crosswords are saved automatically.'
				: 'Crossword will not be saved.'}
		</p>
	);
};

const layoutComponents: Omit<LayoutProps, 'gridWidth' | 'MobileBannerAd'> = {
	Grid,
	Controls,
	AnagramHelper,
	FocusedClue,
	Clues,
	SavedMessage,
};

export const Crossword = ({
	children,
	data,
	progress,
	onProgressChange,
	Layout,
	MobileBannerAd,
	...userTheme
}: CrosswordProps) => {
	const LayoutComponent = Layout ?? ScreenLayout;

	const theme = useMemo<Theme>(
		() => ({ ...defaultTheme, ...userTheme }),
		[userTheme],
	);

	const gridWidth = useMemo(() => {
		const gridDefaultWidth =
			(theme.gridCellSize + theme.gridGutterSize) * data.dimensions.cols +
			theme.gridGutterSize;
		return Math.max(gridDefaultWidth, theme.gridMinWidth);
	}, [
		theme.gridCellSize,
		theme.gridGutterSize,
		theme.gridMinWidth,
		data.dimensions.cols,
	]);

	return (
		<ContextProvider
			theme={theme}
			data={data}
			userProgress={progress}
			onProgressChange={onProgressChange}
		>
			<div
				data-link-name="Crosswords"
				css={css`
					*,
					*::before,
					*::after {
						box-sizing: border-box;
						padding: 0;
						margin: 0;
					}

					height: 100%;
					width: 100%;
					container-type: inline-size;
					position: relative;
				`}
			>
				{children ?? (
					<LayoutComponent
						{...layoutComponents}
						gridWidth={gridWidth}
						MobileBannerAd={MobileBannerAd}
					/>
				)}
			</div>
		</ContextProvider>
	);
};
