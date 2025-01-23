import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans15 } from '@guardian/source/foundations';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { Clue } from './Clue';

type StickyClueProps = {
	styles?: SerializedStyles;
};

export const StickyClue = forwardRef(
	(props: StickyClueProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
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
			${textSans15};
			background: white;
		`;

		return (
			<div
				aria-hidden={true}
				css={[props.styles, stickyClue]}
				ref={forwardedRef}
			>
				{entry && (
					<Clue
						entry={entry}
						css={css`
							margin: 0 5px;
						`}
					/>
				)}
			</div>
		);
	},
);
