import type { ThemeButton } from '@guardian/source/react-components';
import { useCallback } from 'react';
import type { Cell, Progress } from '../@types/crossword';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { Button } from './Button';

const ClueControls = () => {
	const theme = useTheme();
	const { cells, solutionAvailable } = useData();
	const { progress, setCellProgress, clearProgress } = useProgress();
	const { currentEntryId } = useCurrentClue();

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

	return (
		<>
			{currentEntryId && (
				<>
					<Button onSuccess={clearEntry} theme={crosswordButtonTheme}>
						Clear Word
					</Button>
					{solutionAvailable && (
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
		</>
	);
};

const GridControls = () => {
	const { cells, solutionAvailable } = useData();
	const { progress, setProgress, setCellProgress, clearProgress } =
		useProgress();

	const revealGrid = useCallback(() => {
		const newProgress: Progress = [];

		for (const cell of cells.values()) {
			const column = (newProgress[cell.x] ||= []);
			column[cell.y] = cell.solution ?? '';
		}

		setProgress(newProgress);
	}, [cells, setProgress]);

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

	const checkGrid = useCallback(() => {
		for (const cell of cells.values()) {
			checkCell(cell);
		}
	}, [cells, checkCell]);

	return (
		<>
			{solutionAvailable && (
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
		</>
	);
};

export const Controls = () => {
	return (
		<>
			<ClueControls />
			<GridControls />
		</>
	);
};

Controls.Clues = ClueControls;
Controls.Grid = GridControls;
