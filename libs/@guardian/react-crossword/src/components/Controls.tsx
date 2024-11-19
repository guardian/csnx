import { css } from '@emotion/react';
import type { ThemeButton } from '@guardian/source/react-components';
import { useCallback, useContext } from 'react';
import type { Cell, Cells } from '../@types/crossword';
import type { EntryID } from '../@types/Entry';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { Button } from './Button';

type ControlProps = {
	solutionsAvailable: boolean;
	cells: Cells;
	currentEntryId?: EntryID;
};

export const Controls = ({
	solutionsAvailable,
	cells,
	currentEntryId,
}: ControlProps) => {
	const { progress, updateProgress, clearProgress } =
		useContext(ProgressContext);
	const theme = useContext(ThemeContext);

	const crosswordButtonTheme: Partial<ThemeButton> = {
		backgroundPrimary: theme.buttonBackground,
		backgroundPrimaryHover: theme.buttonBackgroundHover,
	};

	const revealEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (currentEntryId && cell.group?.includes(currentEntryId)) {
				updateProgress({
					x: cell.x,
					y: cell.y,
					value: cell.solution ?? '',
				});
			}
		}
	}, [cells, currentEntryId, updateProgress]);

	const revealGrid = useCallback(() => {
		for (const cell of cells.values()) {
			updateProgress({
				x: cell.x,
				y: cell.y,
				value: cell.solution ?? '',
			});
		}
	}, [cells, updateProgress]);

	const clearEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (currentEntryId && cell.group?.includes(currentEntryId)) {
				updateProgress({
					x: cell.x,
					y: cell.y,
					value: '',
				});
			}
		}
	}, [cells, currentEntryId, updateProgress]);

	const checkCell = useCallback(
		(cell: Cell) => {
			const currentProgress = progress[cell.x]?.[cell.y];
			const isCorrect = currentProgress && currentProgress === cell.solution;
			if (!isCorrect) {
				updateProgress({
					x: cell.x,
					y: cell.y,
					value: '',
				});
			}
		},
		[progress, updateProgress],
	);

	const checkEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (currentEntryId && cell.group?.includes(currentEntryId)) {
				checkCell(cell);
			}
		}
	}, [cells, checkCell, currentEntryId]);

	const checkGrid = useCallback(() => {
		for (const cell of cells.values()) {
			checkCell(cell);
		}
	}, [cells, checkCell]);

	return (
		<div
			css={css`
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				gap: 4px;
				* {
					height: 30px;
					flex: 1;
					min-width: 115px;
					max-width: 200px;
				}
			`}
		>
			{currentEntryId && (
				<>
					<Button onSuccess={clearEntry} theme={crosswordButtonTheme}>
						Clear Word
					</Button>
					{solutionsAvailable && (
						<>
							<Button onSuccess={checkEntry} theme={crosswordButtonTheme}>
								Check Word
							</Button>
							<Button onSuccess={revealEntry} theme={crosswordButtonTheme}>
								Reveal Word
							</Button>
						</>
					)}
				</>
			)}
			<Button onSuccess={clearProgress} theme={crosswordButtonTheme}>
				Anagram Helper
			</Button>
			{solutionsAvailable && (
				<>
					<Button onSuccess={checkGrid} requireConfirmation={true}>
						Check All
					</Button>
					<Button onSuccess={revealGrid} requireConfirmation={true}>
						Reveal All
					</Button>
				</>
			)}
			<Button onSuccess={clearProgress} requireConfirmation={true}>
				Clear All
			</Button>
		</div>
	);
};
