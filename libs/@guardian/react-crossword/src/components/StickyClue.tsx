import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { textSans12 } from '@guardian/source/foundations';
import { memo, useEffect, useRef, useState } from 'react';
import { useCurrentClue } from '../context/CurrentClue';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';

type StickyClueProps = {
	additionalCss?: SerializedStyles;
};

export const StickyClueComponent = ({ additionalCss }: StickyClueProps) => {
	const stickyClueRef = useRef<HTMLDivElement>(null);
	const [stickyClueBottom, setStickyClueBottom] = useState(false);
	const { entries } = useData();
	const { currentEntryId } = useCurrentClue();
	const theme = useTheme();
	const entry = !isUndefined(currentEntryId)
		? entries.get(currentEntryId)
		: undefined;

	useEffect(() => {
		const stickyClueElement = stickyClueRef.current;
		if (!stickyClueElement) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry) {
					setStickyClueBottom(entry.intersectionRatio < 1);
				}
			},
			{ threshold: [1] },
		);

		observer.observe(stickyClueRef.current);

		return () => {
			observer.disconnect();
		};
	}, [stickyClueRef]);

	const placeholder = css`
		position: absolute;
		top: 0;
		min-height: calc(0.75rem * 3.5);
		width: 100%;
	`;

	const stickyClue = css`
		position: absolute;
		display: flex;
		top: 0;
		min-height: 3.5em;
		align-items: start;
		${textSans12};
		background: ${theme.stickyClueBackgroundColour};
		${stickyClueBottom &&
		css`
			top: auto;
			bottom: 0;
		`};
		@media print {
			display: none;
		}
	`;

	return (
		<>
			<div css={placeholder} ref={stickyClueRef}></div>
			<div aria-hidden="true" css={[stickyClue, additionalCss]}>
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
		</>
	);
};

export const StickyClue = memo(StickyClueComponent);
