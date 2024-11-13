import { css } from '@emotion/react';
import type {
	CurrentEntryId,
	Entries,
	Progress,
	Theme,
} from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import { Clue } from './Clue';

const title = css`
	text-transform: capitalize;
`;

type Props = {
	direction: Direction;
	entries: Entries;
	currentEntryId?: CurrentEntryId;
	theme: Theme;
	progress: Progress;
};

export const Clues = ({
	direction,
	entries,
	currentEntryId,
	theme,
	progress,
}: Props) => {
	const entriesForClues = [];

	for (const entry of entries.values()) {
		if (entry.direction === direction) {
			entriesForClues.push(entry);
		}
	}

	return (
		<>
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
				css={css`
					margin: 0;
					padding: 0;
					list-style: none;
				`}
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

						return (
							<Clue
								theme={theme}
								entry={entry}
								selected={currentEntryId === entry.id}
								key={entry.id}
								complete={complete}
							/>
						);
					})}
			</div>
		</>
	);
};
