import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
import { memo } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';

type StickyClueProps = {
	additionalCss?: SerializedStyles;
};

export const StickyClueComponent = ({ additionalCss }: StickyClueProps) => {
	const { entries } = useData();
	const { currentEntryId } = useCurrentClue();
	const theme = useTheme();
	const entry = !isUndefined(currentEntryId)
		? entries.get(currentEntryId)
		: undefined;

	const stickyClue = css`
		top: 0;
		position: sticky;
		display: flex;
		z-index: 1;
		min-height: 3.5em;
		align-items: start;
		${textSans12};
		background: ${theme.stickyClueBackgroundColour};
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

export const StickyClue = memo(StickyClueComponent);
