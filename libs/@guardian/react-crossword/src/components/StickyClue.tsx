import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans15 } from '@guardian/source/foundations';
import { memo } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { Clue } from './Clue';

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
		justify-content: center;
		align-items: start;
		${textSans15};
		background: white;
	`;

	return (
		<div aria-hidden={true} css={[props.styles, stickyClue]}>
			{entry && (
				<Clue
					entry={entry}
					css={css`
						margin: 0 5px;
						padding: 0;
					`}
				/>
			)}
		</div>
	);
};

export const StickyClue = memo(StickyClueComponent);
