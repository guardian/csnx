import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { ButtonProps } from '@guardian/source/react-components';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { Progress } from '../@types/crossword';
import type { EntryID } from '../@types/Entry';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useShowAnagramHelper } from '../context/ShowAnagramHelper';
import { useTheme } from '../context/Theme';
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

const ClearClue = memo((props: ButtonProps) => {
	const { cells } = useData();
	const { updateCell } = useUpdateCell();
	const { currentEntryId } = useCurrentClue();
	const { progress } = useProgress();

	const clear = useCallback(() => {
		if (!currentEntryId) {
			return;
		}

		const isClueCompletelyFilled = (clueId: EntryID) => {
			for (const cell of cells.values()) {
				if (cell.group?.includes(clueId)) {
					const cellProgress = progress[cell.x]?.[cell.y];
					if (cellProgress === undefined || cellProgress === '') {
						return false;
					}
				}
			}
			return true;
		};

		for (const cell of cells.values()) {
			if (cell.group?.includes(currentEntryId)) {
				const otherClues = cell.group.filter((id) => id !== currentEntryId);
				const hasCompletedIntersectingClue = otherClues.some(
					isClueCompletelyFilled,
				);
				if (!hasCompletedIntersectingClue) {
					updateCell({
						x: cell.x,
						y: cell.y,
						value: '',
					});
				}
			}
		}
	}, [cells, currentEntryId, updateCell, progress]);

	return (
		<ClueButton
			onClick={clear}
			aria-label={`Clear ${currentEntryId ? currentEntryId.split('-').join(' ') : 'word'}`}
			data-link-name="Clear this"
			data-testid="clear-this"
			aria-live={'off'}
			{...props}
		>
			Clear Word
		</ClueButton>
	);
});

const CheckClue = memo((props: ButtonProps) => {
	const { cells } = useData();
	const { progress } = useProgress();
	const { setValidAnswers } = useValidAnswers();
	const { currentEntryId } = useCurrentClue();
	const { updateCell } = useUpdateCell();

	const check = useCallback(() => {
		if (!currentEntryId) {
			return;
		}
		let entryIsCorrect = true;
		for (const cell of cells.values()) {
			const currentProgress = progress[cell.x]?.[cell.y];
			if (
				cell.group?.includes(currentEntryId) &&
				!isUndefined(currentProgress) &&
				currentProgress !== cell.solution
			) {
				if (currentProgress !== '') {
					updateCell({
						x: cell.x,
						y: cell.y,
						value: '',
					});
				}
				entryIsCorrect = false;
			}
		}
		if (entryIsCorrect) {
			setValidAnswers((prev) => {
				const newValidAnswers = new Set(prev);
				return newValidAnswers.add(currentEntryId);
			});
		}
	}, [currentEntryId, cells, progress, updateCell, setValidAnswers]);

	return (
		<ClueButton
			aria-live="off"
			onClick={check}
			data-link-name="Check this"
			data-testid="check-this"
			aria-label={`Check and remove incorrect letters from ${currentEntryId ? currentEntryId.split('-').join(' ') : 'word'}`}
			{...props}
		>
			Check Word
		</ClueButton>
	);
});

const RevealClue = memo((props: ButtonProps) => {
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
		<ClueButton
			onClick={reveal}
			aria-live="off"
			aria-label={`Reveal ${currentEntryId ? currentEntryId.split('-').join(' ') : 'word'}`}
			data-link-name="Reveal this"
			data-testid="reveal-this"
			{...props}
		>
			Reveal Word
		</ClueButton>
	);
});

const AnagramHelper = memo((props: ButtonProps) => {
	const { toggleAnagramHelper } = useShowAnagramHelper();

	return (
		<ClueButton
			onClick={toggleAnagramHelper}
			data-link-name="Show anagram helper"
			data-testid="show-anagram-helper"
			{...props}
		>
			Anagram Helper
		</ClueButton>
	);
});

const CheckGrid = memo((props: ButtonProps) => {
	const { progress } = useProgress();
	const { cells, entries } = useData();
	const { setValidAnswers } = useValidAnswers();
	const { updateCell } = useUpdateCell();

	const check = useCallback(() => {
		const allEntries = entries.keys();
		const invalidAnswers: Set<EntryID> = new Set();
		for (const cell of cells.values()) {
			const currentProgress = progress[cell.x]?.[cell.y];
			if (!cell.group) {
				continue;
			}

			if (!isUndefined(currentProgress) && currentProgress !== cell.solution) {
				if (currentProgress !== '') {
					updateCell({
						x: cell.x,
						y: cell.y,
						value: '',
					});
				}
				for (const entryId of cell.group) {
					invalidAnswers.add(entryId);
				}
			}
		}
		const validAnswers = new Set<EntryID>(
			[...allEntries].filter((x) => !invalidAnswers.has(x)),
		);
		setValidAnswers(validAnswers);
	}, [entries, setValidAnswers, cells, progress, updateCell]);

	return (
		<CrosswordButton
			onClick={check}
			data-link-name="Check all"
			data-testid="check-all"
			requireConfirmation={true}
			{...props}
			aria-label="Check and remove all incorrect letters"
		>
			Check All
		</CrosswordButton>
	);
});

const RevealGrid = memo((props: ButtonProps) => {
	const { cells } = useData();
	const { updateProgress } = useProgress();

	const reveal = useCallback(() => {
		const newProgress: Progress = [];

		for (const cell of cells.values()) {
			const column = (newProgress[cell.x] ||= []);
			column[cell.y] = cell.solution ?? '';
		}

		updateProgress(newProgress);
	}, [cells, updateProgress]);

	return (
		<CrosswordButton
			onClick={reveal}
			requireConfirmation={true}
			data-link-name="Reveal all"
			data-testid="reveal-all"
			{...props}
		>
			Reveal All
		</CrosswordButton>
	);
});

const ClearGrid = memo((props: ButtonProps) => {
	const { clearUserInput } = useClearUserInput();
	return (
		<CrosswordButton
			onClick={clearUserInput}
			requireConfirmation={true}
			data-link-name="Clear all"
			data-testid="clear-all"
			{...props}
		>
			Clear All
		</CrosswordButton>
	);
});

const controlsGroupStyle = css`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: ${space[1]}px;
	padding: ${space[1]}px 0;
`;

export const Controls = memo(() => {
	const { solutionAvailable } = useData();
	const { currentEntryId } = useCurrentClue();

	// Controls is a div[role=menu], split into two div[role=group]s containing
	// clue and grid controls. Each group contains a selection of
	// button[role=menuitem]s.
	const controlsRef = useRef<HTMLDivElement | null>(null);

	// If there is no current clue, we disable the clue controls.
	const disableClueControls = isUndefined(currentEntryId);

	// At any one time, one [role=menuitem] of [role=menu] has a tabindex of 0,
	// and the rest have a tabindex of -1. This means when you tab to the
	// controls, the you tab directly to a [role=menuitem].
	//
	// The user can navigate between the [role=group]s using the up and down
	// arrow keys, and within a [role=group] using the left and right arrow
	// keys.
	//
	// We store the index of the focusable [role=menuitem] for each group, so
	// that when you move between [role=group]s, the focus is restored to the
	// previously selected [role=menuitem].

	const [focusedClueControlIndex, setFocusedClueControlIndex] = useState(0);
	const [focusedGridControlIndex, setFocusedGridControlIndex] = useState(0);

	// We store the current group the user is navigating, so that we can manage
	// moving focus between its menuitems
	const [focusedGroup, setFocusedGroup] = useState<'clues' | 'grid'>(
		disableClueControls ? 'grid' : 'clues',
	);

	// We manually manage focus within the [role=menu].
	//
	// This is done by a `useEffect` that runs when the focused index/group changes.
	//
	// However, we only want to focus a control after user input (i.e. not when the
	// component first renders), so we set this to true when the user first navigates
	// using the arrow keys.
	const [shouldSetFocus, setShouldSetFocus] = useState(false);

	// We need to know how many controls are currently visible in each group so we
	// can manage the focused index.
	const cluesControlsVisible = solutionAvailable ? 4 : 2;
	const gridControlsVisible = solutionAvailable ? 3 : 1;

	const getTabIndex = (group: 'clues' | 'grid', index: number) => {
		const focusedControlIndex =
			focusedGroup === 'clues'
				? focusedClueControlIndex
				: focusedGridControlIndex;
		return focusedGroup === group && focusedControlIndex === index ? 0 : -1;
	};

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			setShouldSetFocus(true);

			switch (event.key) {
				case 'ArrowLeft':
					if (focusedGroup === 'clues') {
						setFocusedClueControlIndex((prev = 0) => Math.max(prev - 1, 0));
					} else {
						setFocusedGridControlIndex((prev = 0) => Math.max(prev - 1, 0));
					}
					event.preventDefault();
					break;
				case 'ArrowRight':
					if (focusedGroup === 'clues') {
						setFocusedClueControlIndex((prev = 0) =>
							Math.min(prev + 1, cluesControlsVisible - 1),
						);
					} else {
						setFocusedGridControlIndex((prev = 0) =>
							Math.min(prev + 1, gridControlsVisible - 1),
						);
					}
					event.preventDefault();
					break;
				case 'ArrowDown':
					setFocusedGroup('grid');
					event.preventDefault();
					break;
				case 'ArrowUp':
					if (!disableClueControls) {
						setFocusedGroup('clues');
					}
					event.preventDefault();
					break;
				case 'Home':
					if (focusedGroup === 'clues') {
						setFocusedClueControlIndex(0);
					} else {
						setFocusedGridControlIndex(0);
					}
					event.preventDefault();
					break;
				case 'End':
					if (focusedGroup === 'clues') {
						setFocusedClueControlIndex(cluesControlsVisible - 1);
					} else {
						setFocusedGridControlIndex(gridControlsVisible - 1);
					}
					event.preventDefault();
					break;
				default:
					return;
			}
		},
		[
			cluesControlsVisible,
			gridControlsVisible,
			disableClueControls,
			focusedGroup,
		],
	);

	useEffect(() => {
		// Only set focus after user input
		if (shouldSetFocus) {
			(
				controlsRef.current?.querySelector(
					'[tabindex="0"]',
				) as HTMLElement | null
			)?.focus();
		}
	}, [
		shouldSetFocus,
		focusedGroup,
		focusedClueControlIndex,
		focusedGridControlIndex,
	]);

	useEffect(() => {
		const controls = controlsRef.current;

		if (!controls) {
			return;
		}

		controls.addEventListener('keydown', handleKeyDown);

		return () => {
			controls.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div role="menu" ref={controlsRef} aria-label="Crossword controls">
			<div
				aria-label="Clue controls"
				role="group"
				tabIndex={-1}
				css={controlsGroupStyle}
			>
				{solutionAvailable && (
					<>
						<CheckClue
							disabled={disableClueControls}
							tabIndex={getTabIndex('clues', 0)}
							role="menuItem"
						/>
						<RevealClue
							disabled={disableClueControls}
							tabIndex={getTabIndex('clues', 1)}
							role="menuItem"
						/>
					</>
				)}
				<ClearClue
					disabled={disableClueControls}
					tabIndex={getTabIndex('clues', solutionAvailable ? 2 : 0)}
					role="menuItem"
				/>
				<AnagramHelper
					disabled={disableClueControls}
					tabIndex={getTabIndex('clues', solutionAvailable ? 3 : 1)}
					role="menuItem"
				/>
			</div>
			<div
				aria-label="Grid controls"
				role="group"
				tabIndex={-1}
				css={controlsGroupStyle}
			>
				{solutionAvailable && (
					<>
						<CheckGrid tabIndex={getTabIndex('grid', 0)} role="menuItem" />
						<RevealGrid tabIndex={getTabIndex('grid', 1)} role="menuItem" />
					</>
				)}
				<ClearGrid
					tabIndex={getTabIndex('grid', solutionAvailable ? 2 : 0)}
					role="menuItem"
				/>
			</div>
		</div>
	);
});
