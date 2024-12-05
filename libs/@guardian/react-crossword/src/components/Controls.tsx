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
import { useUIState } from '../context/UI';
import { useValidAnswers } from '../context/ValidAnswers';
import { useClearUserInput } from '../hooks/useClearUserInput';
import { useUpdateCell } from '../hooks/useUpdateCell';
import { Button } from './Button';

const controlStyles = css`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: ${space[1]}px;
	padding: ${space[1]}px 0;
`;

const ClueControls = ({ currentEntryId }: { currentEntryId: EntryID }) => {
	const theme = useTheme();
	const { cells, solutionAvailable } = useData();
	const { toggleAnagramHelper } = useUIState();
	const { progress } = useProgress();
	const { setValidAnswers } = useValidAnswers();
	const { updateCell } = useUpdateCell();

	const crosswordButtonTheme: Partial<ThemeButton> = {
		backgroundPrimary: theme.buttonBackground,
		backgroundPrimaryHover: theme.buttonBackgroundHover,
	};

	const revealEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (cell.group?.includes(currentEntryId)) {
				updateCell({
					x: cell.x,
					y: cell.y,
					value: cell.solution ?? '',
				});
			}
		}
	}, [cells, currentEntryId, updateCell]);

	const clearEntry = useCallback(() => {
		for (const cell of cells.values()) {
			if (cell.group?.includes(currentEntryId)) {
				updateCell({
					x: cell.x,
					y: cell.y,
					value: '',
				});
			}
		}
	}, [cells, currentEntryId, updateCell]);

	const checkCell = useCallback(
		(cell: Cell) => {
			const currentProgress = progress[cell.x]?.[cell.y];
			return !!(currentProgress && currentProgress === cell.solution);
		},
		[progress],
	);

	const checkEntry = useCallback(() => {
		let entryIsCorrect = true;
		for (const cell of cells.values()) {
			if (cell.group?.includes(currentEntryId)) {
				if (!checkCell(cell)) {
					updateCell({
						x: cell.x,
						y: cell.y,
						value: '',
					});
					entryIsCorrect = false;
				}
			}
		}
		if (entryIsCorrect) {
			setValidAnswers((prev) => {
				const newValidAnswers = new Set(prev);
				return newValidAnswers.add(currentEntryId);
			});
		}
	}, [cells, checkCell, currentEntryId, updateCell, setValidAnswers]);

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

			<Button onSuccess={toggleAnagramHelper} theme={crosswordButtonTheme}>
				Anagram Helper
			</Button>
		</div>
	);
};

const GridControls = () => {
	const { cells, solutionAvailable, entries } = useData();
	const { progress, setProgress } = useProgress();
	const { setValidAnswers } = useValidAnswers();
	const { clearUserInput } = useClearUserInput();
	const { updateCell } = useUpdateCell();
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
			return !!(currentProgress && currentProgress === cell.solution);
		},
		[progress],
	);

	const checkGrid = useCallback(() => {
		const allEntries = entries.keys();
		const invalidAnswers: Set<EntryID> = new Set();
		for (const cell of cells.values()) {
			if (!cell.group) {
				continue;
			}
			if (!checkCell(cell)) {
				updateCell({
					x: cell.x,
					y: cell.y,
					value: '',
				});
				for (const entryId of cell.group) {
					invalidAnswers.add(entryId);
				}
			}
		}
		const validAnswers = new Set<EntryID>(
			[...allEntries].filter((x) => !invalidAnswers.has(x)),
		);
		setValidAnswers(validAnswers);
	}, [cells, checkCell, entries, updateCell, setValidAnswers]);

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
			<Button onSuccess={clearUserInput} requireConfirmation={true}>
				Clear All
			</Button>
		</div>
	);
};

export const Controls = () => {
	const { currentEntryId } = useCurrentClue();

	return (
		<>
			{currentEntryId && <ClueControls currentEntryId={currentEntryId} />}
			<GridControls />
		</>
	);
};
