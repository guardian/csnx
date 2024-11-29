import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Progress, Theme } from '../@types/crossword';
import { ContextProvider } from '../context/ContextProvider';
import { useProgress } from '../context/Progress';
import { AnagramHelper } from './AnagramHelper';
import { Clues } from './Clues';
import { Controls } from './Controls';
import { Grid } from './Grid';
import { Layout } from './Layout';

export type CrosswordProps = {
	data: CAPICrossword;
	progress?: Progress;
	children?: ReactNode;
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

export const Crossword = ({
	children,
	data,
	progress,
	...userTheme
}: CrosswordProps) => {
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
				{children ?? (
					<Layout.Wrapper>
						<Layout.Grid>
							<Layout.AnagramHelper>
								<AnagramHelper />
								<Grid />
							</Layout.AnagramHelper>
							<Layout.Controls>
								<Controls.Clues />
							</Layout.Controls>
							<Layout.Controls>
								<Controls.Grid />
							</Layout.Controls>
							<Layout.SavedMessage>
								<SavedMessage />
							</Layout.SavedMessage>
						</Layout.Grid>
						<Layout.Clues>
							<Clues
								direction="across"
								header={<Layout.CluesHeader direction="across" />}
							/>
							<Clues
								direction="down"
								header={<Layout.CluesHeader direction="down" />}
							/>
						</Layout.Clues>
					</Layout.Wrapper>
				)}
			</div>
		</ContextProvider>
	);
};

Crossword.Grid = Grid;
Crossword.AnagramHelper = AnagramHelper;
Crossword.Clues = Clues;
Crossword.Controls = Controls;
Crossword.SavedMessage = SavedMessage;
