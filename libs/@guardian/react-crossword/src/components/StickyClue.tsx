import { css } from '@emotion/react';
import type { Entries } from '../@types/crossword';
import type { EntryID } from '../@types/Entry';

const stickyClue = css`
	position: sticky;
	top: 0;
	background: white;
	padding: 5px;
`;

export const StickyClue = (props: {
	clues: Entries;
	currentEntryId?: EntryID;
}) => {
	if (!props.currentEntryId) {
		return null;
	}
	return (
		<div css={stickyClue}>{props.clues.get(props.currentEntryId)?.clue}</div>
	);
};
