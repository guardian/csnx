import { css } from '@emotion/react';
import type { ComponentType, ReactNode } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Progress, Theme } from '../@types/crossword';
import type { LayoutProps } from '../@types/Layout';
import { ContextProvider } from '../context/ContextProvider';
import { useProgress } from '../context/Progress';
import { ScreenLayout } from '../layouts/ScreenLayout';
import { AnagramHelper } from './AnagramHelper';
import { Clues } from './Clues';
import { Controls } from './Controls';
import { Grid } from './Grid';

export type CrosswordProps = {
	data: CAPICrossword;
	progress?: Progress;
	children?: ReactNode;
	Layout?: ComponentType<LayoutProps>;
} & Partial<Theme>;

const SavedMessage = () => {
	const { isStored } = useProgress();

	return (
		<p>
			{isStored
				? 'Crosswords are saved automatically.'
				: 'Crossword will not be saved.'}
		</p>
	);
};

const layoutProps: LayoutProps = {
	Grid,
	Controls,
	AnagramHelper,
	Clues,
	SavedMessage,
};

export const Crossword = ({
	children,
	data,
	progress,
	Layout,
	...userTheme
}: CrosswordProps) => {
	const LayoutComponent = Layout ?? ScreenLayout;

	return (
		<ContextProvider
			userTheme={userTheme}
			data={data}
			userProgress={progress}
			selectedEntryId={data.entries[0].id}
		>
			<div
				role="application"
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
				`}
			>
				{children ?? <LayoutComponent {...layoutProps} />}
			</div>
		</ContextProvider>
	);
};
