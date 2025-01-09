/**
 * What's going on here?
 *
 * In order provide maximum layout flexibility to consumers, the Crossword component
 * includes subcomponents for the various parts of the crossword UI (Crossword.Grid etc.).
 *
 * These need access to the crossword data, application state etc.
 *
 * Since these component can be used in consumer code, we cannot prop-drill
 * data down to them. Instead, we use React's context API to provide the data
 * to these components.
 *
 * This ContextProvider component wraps the entire crossword, and provides
 * the data to the context providers for the subcomponents.
 *
 * It's broken up into multiple context providers so that components can
 * subscribe to only the data they need, and not have to re-render when
 * unrelated data changes.
 */

import type { ReactNode } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Progress, Theme } from '../@types/crossword';
import type { EntryID } from '../@types/Entry';
import { CurrentCellProvider } from './CurrentCell';
import { CurrentClueProvider } from './CurrentClue';
import { DataProvider } from './Data';
import { ProgressProvider } from './Progress';
import { ShowAnagramHelperProvider } from './ShowAnagramHelper';
import { ThemeProvider } from './Theme';
import { ValidAnswersProvider } from './ValidAnswers';

export const ContextProvider = ({
	data,
	selectedEntryId,
	userProgress,
	theme,
	children,
}: {
	data: CAPICrossword;
	selectedEntryId?: EntryID;
	userProgress?: Progress;
	theme: Theme;
	children: ReactNode;
}) => {
	const { entries, dimensions, solutionAvailable, id } = data;

	return (
		<ThemeProvider theme={theme}>
			<ShowAnagramHelperProvider>
				<DataProvider
					entries={entries}
					solutionAvailable={solutionAvailable}
					dimensions={dimensions}
					id={id}
				>
					<ProgressProvider
						id={id}
						dimensions={dimensions}
						progress={userProgress}
					>
						<CurrentCellProvider>
							<CurrentClueProvider selectedEntryId={selectedEntryId}>
								<ValidAnswersProvider>{children}</ValidAnswersProvider>
							</CurrentClueProvider>
						</CurrentCellProvider>
					</ProgressProvider>
				</DataProvider>
			</ShowAnagramHelperProvider>
		</ThemeProvider>
	);
};
