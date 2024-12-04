import { css } from '@emotion/react';
import { SvgTickRound } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
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
	header?: ReactNode;
};

export const Clues = ({ direction, header }: Props) => {
	const { entries, getId } = useData();
	const { progress, correctEntries } = useProgress();
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
				setCurrentCell({
					x: entry.position.x,
					y: entry.position.y,
					group: entry.group,
				});
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

	return (
		<div ref={cluesRef}>
			<label
				css={css`
					display: block;
					color: currentColor;
					text-transform: capitalize;
				`}
				id={getId(`${direction}-label`)}
				htmlFor={getId(`${direction}-hints`)}
			>
				{header ?? direction}
			</label>
			<div
				tabIndex={0}
				id={getId(`${direction}-hints`)}
				role="listbox"
				aria-labelledby={getId(`${direction}-label`)}
				aria-activedescendant={
					// this must be undefined or match the format used for id in ./Clue.tsx
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
							<div
								css={css`
									display: flex;
								`}
							>
								<Clue
									entry={entry}
									isHighlighted={isHighlighted}
									isActive={isActive}
									key={entry.id}
									isComplete={complete}
								/>
								<span
									css={css`
										min-width: 1.25em;
										display: flex;
									`}
								>
									{correctEntries.has(entry.id) && <SvgTickRound />}
								</span>
							</div>
						);
					})}
			</div>
		</div>
	);
};
