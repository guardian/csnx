import { css } from '@emotion/react';
import type { ComponentType, ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import type { Direction } from '../@types/Direction';
import type { EntryID } from '../@types/Entry';
import { useCurrentCell } from '../context/CurrentCell';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
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

export const Clues = ({ direction, Header }: Props) => {
	const { entries, getId } = useData();
	const { progress } = useProgress();
	const { currentEntryId, setCurrentEntryId } = useCurrentClue();
	const { setCurrentCell } = useCurrentCell();

	const cluesRef = useRef<HTMLDivElement | null>(null);

	const handleClueClick = useCallback(
		(event: MouseEvent) => {
			const target = event.target as HTMLElement;

			const entry = entries.get(
				target
					.closest('[role="option"][data-entry-id]')
					?.getAttribute('data-entry-id') as EntryID,
			);

			if (entry) {
				setCurrentEntryId(entry.id);
				setCurrentCell({ x: entry.position.x, y: entry.position.y });
			}
		},
		[entries, setCurrentCell, setCurrentEntryId],
	);

	useEffect(() => {
		const clues = cluesRef.current;

		clues?.addEventListener('click', handleClueClick);

		return () => {
			clues?.removeEventListener('click', handleClueClick);
		};
	}, [handleClueClick]);

	const entriesForClues = [];

	for (const entry of entries.values()) {
		if (entry.direction === direction) {
			entriesForClues.push(entry);
		}
	}

	const label = (
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

	return (
		<div ref={cluesRef}>
			{Header ? <Header>{label}</Header> : label}

			<div
				tabIndex={0}
				id={getId(`${direction}-hints`)}
				role="listbox"
				aria-labelledby={getId(`${direction}-label`)}
				aria-activedescendant={
					// this must be undefined or match the format used for id in
					// ./Clue.tsx
					currentEntryId && getId(currentEntryId)
				}
			>
				{entriesForClues
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

						const isHighlighted =
							currentEntryId &&
							entries.get(currentEntryId)?.group.includes(entry.id);

						const isActive = currentEntryId === entry.id;

						return (
							<Clue
								entry={entry}
								isHighlighted={isHighlighted}
								isActive={isActive}
								key={entry.id}
								isComplete={complete}
							/>
						);
					})}
			</div>
		</div>
	);
};
