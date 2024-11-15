import { css } from '@emotion/react';
import type { Entries, Theme } from '../@types/crossword';
import type { EntryID } from '../@types/Entry';
import { Clue } from './Clue';

const stickyClue = css`
	position: sticky;
	top: 0;
	background: white;
	padding: 5px;
`;

export const StickyClue = ({
	entries,
	currentEntryId,
	theme,
}: {
	entries: Entries;
	currentEntryId: EntryID;
	theme: Theme;
}) => {
	const entry = entries.get(currentEntryId);
	if (!entry) {
		return null;
	}
	return (
		<div css={stickyClue}>
			<Clue entry={entry} theme={theme} />
		</div>
	);
};
