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
import { useCurrentCell } from '../context/CurrentCell';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { Clue } from './Clue';

type StickyClueProps = {
	styles?: SerializedStyles;
};

export const StickyClue = forwardRef(
	(props: StickyClueProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
		const { entries, cells } = useData();
		const { currentEntryId, setCurrentEntryId } = useCurrentClue();
		const { setCurrentCell } = useCurrentCell();
		const entry = !isUndefined(currentEntryId)
			? entries.get(currentEntryId)
			: undefined;

		const handleClick = (direction: 'prev' | 'next') => {
			if (!entry) {
				return;
			}
			const newEntryId =
				direction === 'prev' ? entry.prevEntryID : entry.nextEntryID;
			const newEntry = entries.get(newEntryId);
			if (newEntry) {
				setCurrentCell(cells.getByCoords(newEntry.position));
				setCurrentEntryId(newEntryId);
			}
		};

		const stickyClue = css`
			top: 0;
			position: sticky;
			display: flex;
			z-index: 1;
			min-height: 3.5em;
			justify-content: space-between;
			background: white;
		`;

		return (
			<div
				aria-hidden={true}
				css={[props.styles, stickyClue]}
				ref={forwardedRef}
			>
				{entry && (
					<>
						{' '}
						<Button
							aria-hidden={true}
							priority={'tertiary'}
							onClick={() => handleClick('prev')}
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
							aria-hidden={true}
							tabIndex={-1}
							priority={'tertiary'}
							onClick={() => handleClick('next')}
						>
							<SvgChevronRightSingle size="small" />
						</Button>
					</>
				)}
			</div>
		);
	},
);
