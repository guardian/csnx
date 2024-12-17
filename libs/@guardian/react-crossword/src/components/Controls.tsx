import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { ButtonProps } from '@guardian/source/react-components';
import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
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
import type { CrosswordButtonProps } from './CrosswordButton';
import { CrosswordButton } from './CrosswordButton';

const ClueButton = (props: CrosswordButtonProps) => {
	const theme = useTheme();

	return (
		<CrosswordButton
			theme={{
				backgroundPrimary: theme.buttonBackgroundColor,
				backgroundPrimaryHover: theme.buttonBackgroundHoverColor,
			}}
			cssOverrides={css`
				:disabled {
					cursor: not-allowed;
					opacity: 0.25;

					&:hover {
						background-color: ${theme.buttonBackgroundColor};
					}
				}
			`}
			{...props}
		/>
	);
};

const ClearClue = (props: ButtonProps) => {
	const { cells } = useData();
	const { updateCell } = useUpdateCell();
	const { currentEntryId } = useCurrentClue();

	const clear = useCallback(() => {
		if (!currentEntryId) {
			return;
		}
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

	return (
		<ClueButton onClick={clear} {...props}>
			Clear Word
		</ClueButton>
	);
};

const CheckClue = (props: ButtonProps) => {
	const { cells } = useData();
	const { progress } = useProgress();
	const { updateCell } = useUpdateCell();
	const { setValidAnswers } = useValidAnswers();
	const { currentEntryId } = useCurrentClue();

	const checkCell = useCallback(
		(cell: Cell) => {
			const currentProgress = progress[cell.x]?.[cell.y];
			return !!(currentProgress && currentProgress === cell.solution);
		},
		[progress],
	);

	const check = useCallback(() => {
		if (!currentEntryId) {
			return;
		}
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
		<ClueButton onClick={check} {...props}>
			Check Word
		</ClueButton>
	);
};

const RevealClue = (props: ButtonProps) => {
	const { cells } = useData();
	const { updateCell } = useUpdateCell();
	const { currentEntryId } = useCurrentClue();

	const reveal = useCallback(() => {
		if (!currentEntryId) {
			return;
		}
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

	return (
		<ClueButton onClick={reveal} {...props}>
			Reveal Word
		</ClueButton>
	);
};

const AnagramHelper = (props: ButtonProps) => {
	const { toggleAnagramHelper } = useUIState();

	return (
		<ClueButton onClick={toggleAnagramHelper} {...props}>
			Anagram Helper
		</ClueButton>
	);
};

const CheckGrid = (props: ButtonProps) => {
	const { progress } = useProgress();
	const { cells, entries } = useData();
	const { updateCell } = useUpdateCell();
	const { setValidAnswers } = useValidAnswers();

	const checkCell = useCallback(
		(cell: Cell) => {
			const currentProgress = progress[cell.x]?.[cell.y];
			return !!(currentProgress && currentProgress === cell.solution);
		},
		[progress],
	);

	const check = useCallback(() => {
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
		<CrosswordButton onClick={check} {...props}>
			Check All
		</CrosswordButton>
	);
};

const RevealGrid = (props: ButtonProps) => {
	const { cells } = useData();
	const { setProgress } = useProgress();

	const reveal = useCallback(() => {
		const newProgress: Progress = [];

		for (const cell of cells.values()) {
			const column = (newProgress[cell.x] ||= []);
			column[cell.y] = cell.solution ?? '';
		}

		setProgress(newProgress);
	}, [cells, setProgress]);
	return (
		<CrosswordButton onClick={reveal} requireConfirmation={true} {...props}>
			Reveal All
		</CrosswordButton>
	);
};

const ClearGrid = (props: ButtonProps) => {
	const { clearUserInput } = useClearUserInput();
	return (
		<CrosswordButton
			onClick={clearUserInput}
			requireConfirmation={true}
			{...props}
		>
			Clear All
		</CrosswordButton>
	);
};

const controlsGroupStyle = css`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: ${space[1]}px;
	padding: ${space[1]}px 0;
`;

export const Controls = () => {
	const { solutionAvailable } = useData();
	const { currentEntryId } = useCurrentClue();

	const disableClueControls = isUndefined(currentEntryId);

	const [group, setGroup] = useState<'clues' | 'grid'>(
		disableClueControls ? 'grid' : 'clues',
	);
	const [focusedClueControlIndex, setFocusedClueControlIndex] = useState(0);
	const [focusedGridControlIndex, setFocusedGridControlIndex] = useState(0);
	const [shouldFocus, setShouldFocus] = useState(false);
	const controlsRef = useRef<HTMLDivElement | null>(null);

	const cluesControls = [
		<ClearClue />,
		solutionAvailable && <CheckClue />,
		solutionAvailable && <RevealClue />,
		<AnagramHelper>Anagram Helper</AnagramHelper>,
	];

	const gridControls = [
		<ClearGrid />,
		solutionAvailable && <CheckGrid />,
		solutionAvailable && <RevealGrid />,
	];

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			setShouldFocus(true);

			switch (event.key) {
				case 'ArrowLeft':
					if (group === 'clues') {
						setFocusedClueControlIndex((prev = 0) => Math.max(prev - 1, 0));
					} else {
						setFocusedGridControlIndex((prev = 0) => Math.max(prev - 1, 0));
					}
					event.preventDefault();
					break;
				case 'ArrowRight':
					if (group === 'clues') {
						setFocusedClueControlIndex((prev = 0) =>
							Math.min(prev + 1, cluesControls.length - 1),
						);
					} else {
						setFocusedGridControlIndex((prev = 0) =>
							Math.min(prev + 1, gridControls.length - 1),
						);
					}
					event.preventDefault();
					break;
				case 'ArrowDown':
					setGroup('grid');
					event.preventDefault();
					break;
				case 'ArrowUp':
					if (!disableClueControls) {
						setGroup('clues');
					}
					event.preventDefault();
					break;
				case 'Home':
					if (group === 'clues') {
						setFocusedClueControlIndex(0);
					} else {
						setFocusedGridControlIndex(0);
					}
					event.preventDefault();
					break;
				case 'End':
					if (group === 'clues') {
						setFocusedClueControlIndex(cluesControls.length - 1);
					} else {
						setFocusedGridControlIndex(gridControls.length - 1);
					}
					event.preventDefault();
					break;
				default:
					return;
			}
		},
		[cluesControls.length, gridControls.length, disableClueControls, group],
	);

	useEffect(() => {
		// We only want to focus the a control after user input
		if (shouldFocus) {
			(
				controlsRef.current?.querySelector(
					'[tabindex="0"]',
				) as HTMLElement | null
			)?.focus();
		}
	}, [shouldFocus, group, focusedClueControlIndex, focusedGridControlIndex]);

	useEffect(() => {
		const controls = controlsRef.current;

		if (!controls) {
			return;
		}

		controls.addEventListener('keydown', onKeyDown);

		return () => {
			controls.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return (
		<div role="menu" ref={controlsRef} aria-label="Crossword controls">
			<div
				aria-label="Clue controls"
				role="group"
				tabIndex={-1}
				css={controlsGroupStyle}
			>
				{cluesControls.map((child, index) => {
					if (child) {
						const isTabTarget =
							group === 'clues' && focusedClueControlIndex === index;

						return cloneElement(child, {
							key: index,
							disabled: disableClueControls,
							tabIndex: isTabTarget ? 0 : -1,
							role: 'menuitem',
						});
					}
					return null;
				})}
			</div>
			<div
				aria-label="Grid controls"
				role="group"
				tabIndex={-1}
				css={controlsGroupStyle}
			>
				{gridControls.map((child, index) => {
					if (child) {
						const isTabTarget =
							group === 'grid' && focusedGridControlIndex === index;
						return cloneElement(child, {
							key: index,
							tabIndex: isTabTarget ? 0 : -1,
							role: 'menuitem',
						});
					}
					return null;
				})}
			</div>
		</div>
	);
};
