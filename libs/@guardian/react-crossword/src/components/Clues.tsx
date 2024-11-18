import { css } from '@emotion/react';
import { useContext } from 'react';
import type { Entries } from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import type { EntryID } from '../@types/Entry';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { Clue } from './Clue';

const title = css`
	text-transform: capitalize;
`;

type Props = {
	direction: Direction;
	entries: Entries;
	currentEntryId?: EntryID;
};

export const Clues = ({ direction, entries, currentEntryId }: Props) => {
	const { progress } = useContext(ProgressContext);
	const theme = useContext(ThemeContext);
	const entriesForClues = [];

	for (const entry of entries.values()) {
		if (entry.direction === direction) {
			entriesForClues.push(entry);
		}
	}

	return (
		<div
			css={css`
				min-width: ${theme.clueMinWidthRem}rem;
				max-width: ${theme.clueMaxWidthRem}rem;
			`}
		>
			<label
				css={title}
				id={`${direction}-label`}
				htmlFor={`${direction}-hints`}
			>
				{direction}
			</label>
			<div
				tabIndex={0}
				id={`${direction}-hints`}
				role="listbox"
				aria-labelledby={`${direction}-label`}
				aria-activedescendant={currentEntryId}
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
