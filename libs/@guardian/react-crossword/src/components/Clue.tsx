import { css } from '@emotion/react';
import { SvgTickRound } from '@guardian/source/react-components';
import { memo } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';
import { useValidAnswers } from '../context/ValidAnswers';

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
	const { getId } = useData();
	const { validAnswers } = useValidAnswers();

	return (
		<div
			tabIndex={-1}
			id={
				// this must match the format used for aria-activedescendant in ./Clues.tsx
				getId(`${entry.id}`)
			}
			data-entry-id={entry.id}
			role="option"
			aria-selected={isHighlighted}
			css={css`
				background-color: ${isActive
					? theme.selectedColor
					: isHighlighted
						? theme.relatedColor
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
			{validAnswers.has(entry.id) && (
				<span
					css={css`
						display: table-cell;
						min-width: 1.25em;
						vertical-align: middle;
					`}
				>
					<SvgTickRound />
				</span>
			)}
		</div>
	);
};

export const Clue = memo(ClueComponent);
