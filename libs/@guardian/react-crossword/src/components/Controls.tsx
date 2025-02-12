import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { ButtonProps } from '@guardian/source/react-components';
import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
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
		<ClueButton
			onClick={clear}
			aria-label={`Clear ${currentEntryId ? currentEntryId.split('-').join(' ') : 'word'}`}
			data-link-name="Clear this"
			aria-live={'off'}
			role={'menuitem'}
			{...props}
		>
			Clear Word
		</ClueButton>
	);
};

const CheckClue = (props: ButtonProps) => {
	const { cells } = useData();
	const { progress } = useProgress();
	const { setValidAnswers, setInvalidCellAnswers } = useValidAnswers();
	const { currentEntryId } = useCurrentClue();

	const check = useCallback(() => {
		if (!currentEntryId) {
			return;
		}
		let entryIsCorrect = true;
		for (const cell of cells.values()) {
			const currentProgress = progress[cell.x]?.[cell.y];
			if (
				cell.group?.includes(currentEntryId) &&
				currentProgress &&
				currentProgress !== cell.solution
			) {
				if (currentProgress !== '') {
					setInvalidCellAnswers((prevState) => {
						const newInvalidCellAnswers = new Set(prevState);
						newInvalidCellAnswers.add(`x${cell.x}y${cell.y}`);
						return newInvalidCellAnswers;
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
	}, [currentEntryId, cells, progress, setInvalidCellAnswers, setValidAnswers]);

	return (
		<ClueButton
			aria-live="off"
			onClick={check}
			data-link-name="Check this"
			role={'menuitem'}
			aria-label={`Check ${currentEntryId ? currentEntryId.split('-').join(' ') : 'word'}`}
			{...props}
		>
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
		<ClueButton
			onClick={reveal}
			aria-live="off"
			role={'menuitem'}
			aria-label={`Reveal ${currentEntryId ? currentEntryId.split('-').join(' ') : 'word'}`}
			data-link-name="Reveal this"
			{...props}
		>
			Reveal Word
		</ClueButton>
	);
};

const AnagramHelper = (props: ButtonProps) => {
	const { toggleAnagramHelper } = useShowAnagramHelper();

	return (
		<ClueButton
			onClick={toggleAnagramHelper}
			data-link-name="Show anagram helper"
			{...props}
			role="presentation"
			aria-hidden="true"
		>
			Anagram Helper
		</ClueButton>
	);
};

const CheckGrid = (props: ButtonProps) => {
	const { progress } = useProgress();
	const { cells, entries } = useData();
	const { setValidAnswers, setInvalidCellAnswers } = useValidAnswers();

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
					setInvalidCellAnswers((prevState) => {
						const newInvalidCellAnswers = new Set(prevState);
						newInvalidCellAnswers.add(`x${cell.x}y${cell.y}`);
						return newInvalidCellAnswers;
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
	}, [entries, setValidAnswers, cells, progress, setInvalidCellAnswers]);

	return (
		<CrosswordButton onClick={check} data-link-name="Check all" {...props}>
			Check All
		</CrosswordButton>
	);
};

const RevealGrid = (props: ButtonProps) => {
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
			{...props}
		>
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
			data-link-name="Clear all"
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

	// We need to know how many controls are in each group, so we can manage the
	// focused index. To to this, we store them here to two arrays and filter out
	// any that do not apply. The arrays are then mapped over, below, to render
	// the controls.

	const cluesControls = [
		solutionAvailable && <CheckClue />,
		solutionAvailable && <RevealClue />,
		<ClearClue />,
		<AnagramHelper>Anagram Helper</AnagramHelper>,
	].filter(Boolean);

	const gridControls = [
		solutionAvailable && <CheckGrid />,
		solutionAvailable && <RevealGrid />,
		<ClearGrid />,
	].filter(Boolean);

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
		[
			cluesControls.length,
			gridControls.length,
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
				{cluesControls.map((child, index) => {
					if (child) {
						const isTabTarget =
							focusedGroup === 'clues' && focusedClueControlIndex === index;

						return cloneElement(child, {
							key: index,
							disabled: disableClueControls,
							tabIndex: isTabTarget ? 0 : -1,
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
							focusedGroup === 'grid' && focusedGridControlIndex === index;
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
