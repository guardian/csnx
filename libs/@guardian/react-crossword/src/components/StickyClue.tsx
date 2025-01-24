import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
import { memo } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';

type StickyClueProps = {
	styles?: SerializedStyles;
};

export const StickyClueComponent = (props: StickyClueProps) => {
	const { entries } = useData();
	const { currentEntryId } = useCurrentClue();
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
		background: white;
	`;

	return (
		<div aria-hidden={true} css={[props.styles, stickyClue]}>
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
						css={css``}
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
