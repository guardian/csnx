import { css } from '@emotion/react';
import type { ComponentType, ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CrosswordEntry } from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import { useCurrentCell } from '../context/CurrentCell';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { useValidAnswers } from '../context/ValidAnswers';
import { Clue } from './Clue';

type Props = {
	direction: Direction;
	scrollToSelected?: boolean;
	/** Use this to provide a custom header component for the list of clues. If
	 * undefined, the word 'across' or 'down' will be displayed, unstyled. */
	Header?: ComponentType<{
		/** If you use a custom clues header, it must accept children so that we
		 * can provide a properly marked up `label` element, for the sake of
		 * a11y... */
		children: ReactNode;
	}>;
};

const Label = memo(({ direction }: { direction: Direction }) => {
	const { getId } = useData();
	const { textColor } = useTheme();

	return (
		<label
			css={css`
				color: ${textColor};
			`}
			id={getId(`${direction}-label`)}
			htmlFor={getId(`${direction}-hints`)}
		>
			{direction}
		</label>
	);
});
Label.displayName = 'Label';

export const Clues = ({ direction, scrollToSelected, Header }: Props) => {
	const { entries, getId, cells } = useData();
	const { progress } = useProgress();
	const { currentEntryId, setCurrentEntryId } = useCurrentClue();
	const { setCurrentCell } = useCurrentCell();
	const { validAnswers } = useValidAnswers();

	const cluesEntries = useMemo(() => {
		const cluesEntries: CrosswordEntry[] = [];

		for (const entry of entries.values()) {
			if (entry.direction === direction) {
				cluesEntries.push(entry);
			}
		}

		return cluesEntries;
	}, [entries, direction]);

	const [currentCluesEntriesIndex, setCurrentCluesEntriesIndex] = useState(
		cluesEntries.findIndex((entry) => entry.id === currentEntryId),
	);

	const cluesRef = useRef<HTMLDivElement | null>(null);

	const selectClue = useCallback(
		(entry: CrosswordEntry) => {
			setCurrentEntryId(entry.id);
			const newCell = cells.getByCoords({
				x: entry.position.x,
				y: entry.position.y,
			});
			if (newCell) {
				setCurrentCell(newCell);
			}
		},
		[cells, setCurrentCell, setCurrentEntryId],
	);

	/**
	 * Resets `setCurrentCluesEntriesIndex` when the clues list gets focus.
	 *
	 * If `currentEntryId` matches a clue in `cluesEntries`, the index is set
	 * that clue's index.
	 *
	 * If not, it's set to -1 pressing the down arrow key will select the first
	 * clue in the list.
	 */
	const handleFocus = useCallback(() => {
		setCurrentCluesEntriesIndex(
			cluesEntries.findIndex((entry) => entry.id === currentEntryId),
		);
	}, [currentEntryId, cluesEntries]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case ' ':
				case 'Enter':
					{
						const entry = cluesEntries[currentCluesEntriesIndex];
						if (entry) {
							selectClue(entry);
						}
					}
					break;
				case 'ArrowDown':
					setCurrentCluesEntriesIndex((prev) =>
						Math.min(prev + 1, cluesEntries.length - 1),
					);
					event.preventDefault();
					break;
				case 'ArrowUp':
					setCurrentCluesEntriesIndex((prev) => Math.max(prev - 1, 0));
					event.preventDefault();
					break;
				case 'Home':
					setCurrentCluesEntriesIndex(0);
					event.preventDefault();
					break;
				case 'End':
					setCurrentCluesEntriesIndex(cluesEntries.length - 1);
					event.preventDefault();
					break;
			}
		},
		[cluesEntries, currentCluesEntriesIndex, selectClue],
	);

	// Call `setCurrentEntryId` if `currentCluesEntriesIndex` changes
	useEffect(() => {
		const entry = cluesEntries[currentCluesEntriesIndex];
		if (entry) {
			const clue = document.getElementById(getId(entry.id));
			clue?.focus();
		}
	}, [currentCluesEntriesIndex, cluesEntries, setCurrentEntryId, getId]);

	// Add event listeners
	useEffect(() => {
		const clues = cluesRef.current;

		clues?.addEventListener('keydown', handleKeyDown);
		clues?.addEventListener('focus', handleFocus);

		return () => {
			clues?.removeEventListener('keydown', handleKeyDown);
			clues?.removeEventListener('focus', handleFocus);
		};
	}, [handleKeyDown, handleFocus]);

	const currentGroupSet = useMemo(() => {
		if (currentEntryId) {
			const group = entries.get(currentEntryId)?.group ?? undefined;
			return group ? new Set(group) : undefined;
		}
		return undefined;
	}, [currentEntryId, entries]);

	return (
		<div>
			{Header ? (
				<Header>
					<Label direction={direction} />
				</Header>
			) : (
				<Label direction={direction} />
			)}

			<div
				tabIndex={0}
				id={getId(`${direction}-hints`)}
				role="listbox"
				aria-labelledby={getId(`${direction}-label`)}
				aria-activedescendant={
					// this must be undefined or match the format used for
					// Clue#id in loop below
					cluesEntries[currentCluesEntriesIndex] &&
					getId(cluesEntries[currentCluesEntriesIndex].id)
				}
				ref={cluesRef}
			>
				{cluesEntries
					.sort((a, b) => a.number - b.number)
					.map((entry) => {
						const cell = { ...entry.position };
						const axis = direction === 'across' ? 'x' : 'y';
						const end = cell[axis] + entry.length;

						let complete = true;

						while (cell[axis] < end) {
							if (!progress[cell.x]?.[cell.y]) {
								complete = false;
								break;
							}
							cell[axis]++;
						}

						const isConnected = !!currentGroupSet?.has(entry.id);
						const isSelected = currentEntryId === entry.id;
						const isValid = validAnswers.has(entry.id);

						return (
							<Clue
								entry={entry}
								isConnected={isConnected}
								isSelected={isSelected}
								isComplete={complete}
								isValid={isValid}
								scrollToSelected={scrollToSelected}
								key={entry.id}
								id={getId(entry.id)}
								tabIndex={-1}
								role="option"
								aria-selected={isSelected}
								selectClue={selectClue}
							/>
						);
					})}
			</div>
		</div>
	);
};
