import { css } from '@emotion/react';
import { useContext } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { ThemeContext } from '../context/ThemeContext';

interface Props {
	entry: CAPIEntry;
	isHighlighted?: boolean;
	isActive?: boolean;
	isComplete?: boolean;
}

export const Clue = ({ entry, isHighlighted, isActive, isComplete }: Props) => {
	const theme = useContext(ThemeContext);

	return (
		<div
			tabIndex={-1}
			id={entry.id}
			role="option"
			aria-selected={isHighlighted}
			css={css`
				display: table-row;
				background-color: ${isActive
					? theme.active
					: isHighlighted
						? theme.highlight
						: 'transparent'};
				cursor: ${isHighlighted ? 'default' : 'pointer'};
				opacity: ${isComplete ? 0.5 : 1};
			`}
		>
			<span
				css={css`
					font-weight: bold;
					display: table-cell;
					width: 1.25rem;
					padding-right: 0.625rem;
				`}
			>
				{entry.humanNumber}.
			</span>
			<span
				css={css`
					display: table-cell;
				`}
				dangerouslySetInnerHTML={{ __html: entry.clue }}
			></span>
		</div>
	);
};
