import { css } from '@emotion/react';
import type { ComponentType, ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { Direction } from '../@types/Direction';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useFocus } from '../context/Focus';
import { useProgress } from '../context/Progress';
import { Clue } from './Clue';

type Props = {
	direction: Direction;
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

	return (
		<label
			css={css`
				color: currentColor;
			`}
			id={getId(`${direction}-label`)}
			htmlFor={getId(`${direction}-hints`)}
		>
			{direction}
		</label>
	);
});

export const Clues = ({ direction, Header }: Props) => {
	const { entries, getId } = useData();
	const { progress } = useProgress();
	const { currentFocus, focusOn } = useFocus();
	const { currentEntryId, setCurrentEntryId } = useCurrentClue();

	const cluesEntries = useMemo(() => {
		const cluesEntries: CAPIEntry[] = [];

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

	const handleClick = useCallback(
		(entry: CAPIEntry) => {
			if (!(currentFocus === 'grid') && entry.id === currentEntryId) {
				focusOn('grid');
			}
			setCurrentEntryId(entry.id);
		},
		[currentFocus, currentEntryId, setCurrentEntryId, focusOn],
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
				case 'Enter':
				case ' ':
					if (cluesEntries[currentCluesEntriesIndex]) {
						handleClick(cluesEntries[currentCluesEntriesIndex]);
					}
					event.preventDefault();
					break;
			}
		},
		[cluesEntries, currentCluesEntriesIndex, handleClick],
	);

	// Call `setCurrentEntryId` if `currentCluesEntriesIndex` changes
	useEffect(() => {
		const entry = cluesEntries[currentCluesEntriesIndex];
		if (entry) {
			setCurrentEntryId(entry.id);
		}
	}, [currentCluesEntriesIndex, cluesEntries, setCurrentEntryId]);

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

	useEffect(() => {
		if (currentFocus === direction) {
			cluesRef.current?.focus();
		}
	}, [currentFocus, direction]);

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
				tabIndex={-1}
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

						const isConnected =
							currentEntryId &&
							entries.get(currentEntryId)?.group.includes(entry.id);

						const isSelected = currentEntryId === entry.id;

						return (
							<Clue
								entry={entry}
								isConnected={isConnected}
								isSelected={isSelected}
								isComplete={complete}
								key={entry.id}
								id={getId(entry.id)}
								tabIndex={-1}
								role="option"
								aria-selected={isSelected}
								onClick={(event) => {
									event.preventDefault();
									focusOn(direction);
									handleClick(entry);
								}}
							/>
						);
					})}
			</div>
		</div>
	);
};
