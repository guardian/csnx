import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
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
		const { currentEntryId, setCurrentEntryId } = useCurrentClue();
		const entry = !isUndefined(currentEntryId)
			? entries.get(currentEntryId)
			: undefined;

		const stickyClue = css`
			top: 0;
			position: sticky;
			display: flex;
			z-index: 1;
			min-height: 3.125em;
			justify-content: space-between;
			background: white;
		`;

		if (!entry) {
			return null;
		}
		return (
			<div css={props.styles ?? stickyClue} ref={forwardedRef}>
				<Button
					priority={'tertiary'}
					onClick={() => setCurrentEntryId(entry.prevEntryID)}
					tabIndex={-1}
				>
					<SvgChevronLeftSingle size="small" />
				</Button>
				<Clue
					entry={entry}
					css={css`
						margin: 0 5px;
					`}
				/>
				<Button
					tabIndex={-1}
					priority={'tertiary'}
					onClick={() => setCurrentEntryId(entry.nextEntryID)}
				>
					<SvgChevronRightSingle size="small" />
				</Button>
			</div>
		);
	},
);
