import { css } from '@emotion/react';
import { memo } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';

interface Props {
	entry: CAPIEntry;
	isHighlighted?: boolean;
	isActive?: boolean;
	isComplete?: boolean;
}

const ClueComponent = ({
	entry,
	isHighlighted,
	isActive,
	isComplete,
}: Props) => {
	const theme = useTheme();
	const { generateId } = useData();

	return (
		<div
			tabIndex={-1}
			id={generateId(`${entry.id}`)}
			data-entry-id={entry.id}
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

				padding: 0.5em 0;
				color: currentColor;
			`}
		>
			<span
				css={css`
					font-weight: bold;
					display: table-cell;
					width: 1.25em;
					padding-right: 0.625em;
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
