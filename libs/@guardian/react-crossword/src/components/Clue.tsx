import { css } from '@emotion/react';
import type { CrosswordEntry, Theme } from '../@types/crossword';

interface Props {
	entry: CrosswordEntry;
	selected?: boolean;
	theme: Theme;
}

export const Clue = ({ entry, selected, theme }: Props) => {
	return (
		<div
			tabIndex={-1}
			id={entry.id}
			role="option"
			aria-selected={selected}
			css={css`
				display: table-row;
				background-color: ${selected ? theme.focus : 'transparent'};
				cursor: ${selected ? 'default' : 'pointer'};
			`}
		>
			<span
				css={css`
					font-weight: bold;
					display: table-cell;
					min-width: 1.25rem;
					padding-right: 0.625rem;
				`}
			>
				{entry.number}.
			</span>
			<span
				css={css`
					display: table-cell;
				`}
			>
				{entry.clue}
			</span>
		</div>
	);
};
