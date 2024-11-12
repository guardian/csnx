import { css } from '@emotion/react';
import type {
	CrosswordEntry,
	CurrentEntryId,
	Theme,
} from '../@types/crossword';
import type { Direction } from '../@types/Direction';
import { Clue } from './Clue';

const title = css`
	text-transform: capitalize;
`;

type Props = {
	direction: Direction;
	entries: CrosswordEntry[];
	currentEntryId?: CurrentEntryId;
	theme: Theme;
};

export const Clues = ({ direction, entries, currentEntryId, theme }: Props) => {
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
				{entries
					.filter((entry) => entry.direction === direction)
					.sort((a, b) => a.number - b.number)
					.map((entry) => (
						<Clue
							theme={theme}
							entry={entry}
							selected={currentEntryId === entry.id}
							key={entry.id}
						/>
					))}
			</div>
		</>
	);
};
