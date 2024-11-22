import { css } from '@emotion/react';
import { textSans14 } from '@guardian/source/foundations';
import { memo, useContext } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import type { GetID } from '../@types/crossword';
import { ThemeContext } from '../context/ThemeContext';

interface Props {
	entry: CAPIEntry;
	isHighlighted?: boolean;
	isActive?: boolean;
	isComplete?: boolean;
	getId: GetID;
}

const ClueComponent = ({
	entry,
	isHighlighted,
	isActive,
	isComplete,
	getId,
}: Props) => {
	const theme = useContext(ThemeContext);

	return (
		<div
			tabIndex={-1}
			id={getId(`${entry.id}`)}
			role="option"
			aria-selected={isHighlighted}
			css={css`
				background-color: ${isActive
					? theme.active
					: isHighlighted
						? theme.highlight
						: 'transparent'};
				cursor: ${isHighlighted ? 'default' : 'pointer'};
				opacity: ${isComplete ? 0.5 : 1};
				${textSans14};
				padding: 0.5rem 0;
				color: currentColor;
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
				{entry.humanNumber}
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

export const Clue = memo(ClueComponent);
