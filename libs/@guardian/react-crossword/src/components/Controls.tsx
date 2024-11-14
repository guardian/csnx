import { css } from '@emotion/react';
import type { ThemeButton } from '@guardian/source/react-components';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type {
	Cell,
	Cells,
	CurrentEntryId,
	Dimensions,
	Progress,
	Theme,
} from '../@types/crossword';
import { getEmptyProgress, saveProgress } from '../utils/progress';
import { Button } from './Button';

type ControlProps = {
	id: CAPICrossword['id'];
	solutionsAvailable: boolean;
	cells: Cells;
	currentEntryId?: CurrentEntryId;
	updateProgress: (props: { x: number; y: number; value: string }) => void;
	setProgress: Dispatch<SetStateAction<Progress>>;
	progress: Progress;
	dimensions: Dimensions;
	theme: Theme;
};

export const Controls = ({
	id,
	solutionsAvailable,
	updateProgress,
	cells,
	currentEntryId,
	dimensions,
	setProgress,
	progress,
	theme,
}: ControlProps) => {
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

	const clearGrid = useCallback(() => {
		const emptyProgress = getEmptyProgress(dimensions);
		setProgress(emptyProgress);
		saveProgress({ id, progress: emptyProgress });
	}, [dimensions, id, setProgress]);

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
				grid-area: controls;
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
			<Button onSuccess={clearGrid} theme={crosswordButtonTheme}>
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
			<Button onSuccess={clearGrid} requireConfirmation={true}>
				Clear All
			</Button>
		</div>
	);
};
