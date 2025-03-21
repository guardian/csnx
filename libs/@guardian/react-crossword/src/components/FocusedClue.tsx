import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans14 } from '@guardian/source/foundations';
import { memo } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';

type StickyClueProps = {
	additionalCss?: SerializedStyles;
};

export const FocusedClueComponent = ({ additionalCss }: StickyClueProps) => {
	const { entries } = useData();
	const { currentEntryId } = useCurrentClue();
	const theme = useTheme();
	const entry = !isUndefined(currentEntryId)
		? entries.get(currentEntryId)
		: undefined;

	const stickyClue = css`
		top: 0;
		display: flex;
		min-height: 2em;
		${textSans14};
		background: ${theme.focusedClueBackgroundColor};
		@media print {
			display: none;
		}
	`;

	return (
		<div aria-hidden="true" css={[additionalCss, stickyClue]}>
			{entry && (
				<>
					<span
						aria-hidden="true"
						css={css`
							flex: 0 0 auto;
							font-weight: bold;
							padding-right: 0.625em;
							text-transform: capitalize;
						`}
					>
						{entry.id.split('-').join(' ')}
					</span>
					<span
						aria-hidden="true"
						dangerouslySetInnerHTML={{
							__html: entry.clue,
						}}
					></span>
				</>
			)}
		</div>
	);
};

export const FocusedClue = memo(FocusedClueComponent);
