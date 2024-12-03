import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import { useCallback } from 'react';
import type { Cell, Progress } from '../@types/crossword';
import type { EntryID } from '../@types/Entry';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { Button } from './Button';

const controlStyles = css`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: ${space[1]}px;
	padding: ${space[1]}px 0;
`;
const ClueControls = ({
	toggleAnagramHelper,
	currentEntryId,
}: {
	toggleAnagramHelper?: () => void;
	currentEntryId: EntryID;
}) => {
	const theme = useTheme();
	const { cells, solutionAvailable } = useData();
	const { progress, setCellProgress } = useProgress();

	const crosswordButtonTheme: Partial<ThemeButton> = {
		backgroundPrimary: theme.buttonBackground,
		backgroundPrimaryHover: theme.buttonBackgroundHover,
	};

	const revealEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (cell.group?.includes(currentEntryId)) {
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
			if (cell.group?.includes(currentEntryId)) {
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
			if (cell.group?.includes(currentEntryId)) {
				checkCell(cell);
			}
		}
	}, [cells, checkCell, currentEntryId]);

	return (
		<div css={controlStyles}>
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
			{toggleAnagramHelper && (
				<Button onSuccess={toggleAnagramHelper} theme={crosswordButtonTheme}>
					Anagram Helper
				</Button>
			)}
		</div>
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
		<div css={controlStyles}>
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
		</div>
	);
};

export const Controls = ({
	toggleAnagramHelper,
}: {
	toggleAnagramHelper?: () => void;
}) => {
	const { currentEntryId } = useCurrentClue();
	return (
		<>
			{currentEntryId && (
				<ClueControls
					toggleAnagramHelper={toggleAnagramHelper}
					currentEntryId={currentEntryId}
				/>
			)}
			<GridControls />
		</>
	);
};
