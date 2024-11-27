import { css } from '@emotion/react';
import { headlineBold17 } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';
import type { Direction } from '../@types/Direction';
import type { EntryID } from '../@types/Entry';
import { useCurrentCell } from '../context/CurrentCell';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useTheme } from '../context/Theme';
import { Clue } from './Clue';

const ClueHeader = memo(({ direction }: { direction: string }) => {
	const theme = useTheme();
	const { generateId } = useData();
	console.log('ClueHeader');
	return (
		<label
			css={css`
				display: block;
				text-transform: capitalize;
				${headlineBold17};
				color: currentColor;
				border-top: 1px solid ${theme.border};
				border-bottom: 1px dotted ${theme.border};
				height: 2em;
				margin-bottom: 0.5em;
			`}
			id={generateId(`${direction}-label`)}
			htmlFor={generateId(`${direction}-hints`)}
		>
			{direction}
		</label>
	);
});

type Props = {
	direction: Direction;
	header?: ReactNode;
};

export const Clues = ({ direction, header }: Props) => {
	const { entries, generateId } = useData();
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

	return (
		<div ref={cluesRef}>
			{header ?? <ClueHeader direction={direction} />}
			<div
				tabIndex={0}
				id={generateId(`${direction}-hints`)}
				role="listbox"
				aria-labelledby={generateId(`${direction}-label`)}
				aria-activedescendant={currentEntryId && generateId(currentEntryId)}
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
