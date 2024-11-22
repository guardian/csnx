import { css } from '@emotion/react';
import type { ThemeButton } from '@guardian/source/react-components';
import { useCallback, useContext } from 'react';
import type { Cell, Cells, Progress } from '../@types/crossword';
import type { EntryID } from '../@types/Entry';
import { ThemeContext } from '../context/ThemeContext';
import type { UseProgress } from '../hooks/useProgress';
import { Button } from './Button';

type ControlProps = {
	solutionsAvailable: boolean;
	cells: Cells;
	currentEntryId?: EntryID;
	progress: Progress;
	setProgress: UseProgress[1];
	setCellProgress: UseProgress[2];
	clearProgress: UseProgress[3];
};

export const Controls = ({
	solutionsAvailable,
	cells,
	currentEntryId,
	progress,
	setProgress,
	setCellProgress,
	clearProgress,
}: ControlProps) => {
	const theme = useContext(ThemeContext);

	const crosswordButtonTheme: Partial<ThemeButton> = {
		backgroundPrimary: theme.buttonBackground,
		backgroundPrimaryHover: theme.buttonBackgroundHover,
	};

	const revealEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (currentEntryId && cell.group?.includes(currentEntryId)) {
				setCellProgress({
					x: cell.x,
					y: cell.y,
					value: cell.solution ?? '',
				});
			}
		}
	}, [cells, currentEntryId, setCellProgress]);

	const revealGrid = useCallback(() => {
		const newProgress: Progress = [];

		for (const cell of cells.values()) {
			const column = (newProgress[cell.x] ||= []);
			column[cell.y] = cell.solution ?? '';
		}

		setProgress(newProgress);
	}, [cells, setProgress]);

	const clearEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (currentEntryId && cell.group?.includes(currentEntryId)) {
				setCellProgress({
					x: cell.x,
					y: cell.y,
					value: '',
				});
			}
		}
	}, [cells, currentEntryId, setCellProgress]);

	const checkCell = useCallback(
		(cell: Cell) => {
			const currentProgress = progress[cell.x]?.[cell.y];
			const isCorrect = currentProgress && currentProgress === cell.solution;
			if (!isCorrect) {
				setCellProgress({
					x: cell.x,
					y: cell.y,
					value: '',
				});
			}
		},
		[progress, setCellProgress],
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
