import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { ButtonProps } from '@guardian/source/react-components';
import type { ReactElement } from 'react';
import {
	Children,
	cloneElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
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
		<ClueButton
			onClick={clear}
			disabled={isUndefined(currentEntryId)}
			{...props}
		>
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
		<ClueButton
			onClick={check}
			disabled={isUndefined(currentEntryId)}
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
			disabled={isUndefined(currentEntryId)}
			{...props}
		>
			Reveal Word
		</ClueButton>
	);
};

const AnagramHelper = (props: ButtonProps) => {
	const { toggleAnagramHelper } = useUIState();
	const { currentEntryId } = useCurrentClue();

	return (
		<ClueButton
			onClick={toggleAnagramHelper}
			disabled={isUndefined(currentEntryId)}
			{...props}
		>
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

const ControlsGroup = ({
	children,
}: {
	children: Array<ReactElement | false>;
}) => {
	const [focusedIndex, setFocusedIndex] = useState(0);
	const groupRef = useRef<HTMLDivElement | null>(null);

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowDown':
				case 'ArrowRight':
					setFocusedIndex((prev) => Math.min(prev + 1, children.length - 1));
					event.preventDefault();
					break;
				case 'ArrowUp':
				case 'ArrowLeft':
					setFocusedIndex((prev) => Math.max(prev - 1, 0));
					event.preventDefault();
					break;
				case 'Home':
					setFocusedIndex(0);
					event.preventDefault();
					break;
				case 'End':
					setFocusedIndex(children.length - 1);
					event.preventDefault();
					break;
				default:
					return;
			}
		},
		[children.length],
	);

	useEffect(() => {
		groupRef.current?.querySelectorAll('button')[focusedIndex]?.focus();
	}, [focusedIndex]);

	useEffect(() => {
		const controls = groupRef.current;

		if (!controls) {
			return;
		}

		controls.addEventListener('keydown', onKeyDown);

		return () => {
			controls.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return (
		<div
			role="toolbar"
			tabIndex={-1}
			ref={groupRef}
			css={css`
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				gap: ${space[1]}px;
				padding: ${space[1]}px 0;
			`}
		>
			{Children.map(children, (child, index) => {
				if (child) {
					return cloneElement(child, {
						tabIndex: index === focusedIndex ? 0 : -1,
						key: index,
						'data-index': index,
					});
				}
				return null;
			})}
		</div>
	);
};

export const Controls = () => {
	const { solutionAvailable } = useData();

	return (
		<>
			<ControlsGroup aria-label="Clue controls">
				<ClearClue />
				{solutionAvailable && <CheckClue />}
				{solutionAvailable && <RevealClue />}
				<AnagramHelper>Anagram Helper</AnagramHelper>
			</ControlsGroup>
			<ControlsGroup aria-label="Grid controls">
				<ClearGrid />
				{solutionAvailable && <CheckGrid />}
				{solutionAvailable && <RevealGrid />}
			</ControlsGroup>
		</>
	);
};
