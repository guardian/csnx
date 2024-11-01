// @ts-nocheck

import { css } from '@emotion/react';
import * as React from 'react';
import { Clue } from '../index';
import { CellFocus, Clue as ClueInterface } from '../../interfaces';

const gridUnit = 10;

const cluesContainerStyle = css`
	display: flex;
	flex-grow: 1;

	@media (min-width: 768px) and (max-width: 992px) {
		flex-direction: column;
		overflow-y: auto;
		border-bottom: 1px dotted #ccc;
		margin: 0 ${gridUnit}px;
		scrollbar-width: thin;
	}

	@media (max-width: 576px) {
		flex-direction: column;
		margin-top: ${gridUnit}px;
	}

	@media (min-width: 993px) {
		flex-direction: row;
	}
`;

const cluesListStyle = css`
	display: flex;
	flex-direction: column;
	margin: 0 ${gridUnit}px;
	width: 50%;

	@media (min-width: 768px) and (max-width: 992px) {
		width: 100%;
		margin: 0;
	}

	@media (max-width: 576px) {
		width: 100%;
	}
`;

const cluesListBodyStyle = css`
	overflow-y: auto;
	border-bottom: 1px dotted #ccc;
	scrollbar-width: thin;
	flex-grow: 1;
`;

const listDownMarginTop = css`
	margin-top: ${2 * gridUnit}px;
`;

const cluesListHeaderStyle = css`
	border-bottom: 1px dotted #ccc;
	margin-top: 0;
	padding-bottom: ${gridUnit * 0.4}px;
	margin-bottom: 0;
	position: sticky;
	top: 0;
	background: #fff;
	z-index: 1;

	@media (min-width: 768px) and (max-width: 992px) {
		top: -1px;
	}
`;

interface CluesProps {
	allowedHtmlTags: string[];
	breakpoint: string;
	entries: ClueInterface[];
	inputRef?: React.RefObject<HTMLInputElement>;
	onCellFocus?: (cellFocus: CellFocus) => void;
	selectedClueId?: string;
	style?: React.CSSProperties;
}

export default function Clues({
	allowedHtmlTags,
	breakpoint,
	entries,
	inputRef,
	onCellFocus,
	selectedClueId,
	style,
}: CluesProps) {
	const cluesContainerRef = React.useRef<HTMLDivElement>(null);
	const acrossContainerRef = React.useRef<HTMLDivElement>(null);
	const downContainerRef = React.useRef<HTMLDivElement>(null);

	const across = entries
		.filter((entry) => entry.direction === 'across')
		.sort((a, b) => a.number - b.number);
	const down = entries
		.filter((entry) => entry.direction === 'down')
		.sort((a, b) => a.number - b.number);

	const isHighlighted = (thisEntry: ClueInterface) => {
		if (selectedClueId === undefined) {
			return false;
		}
		const selectedClue = entries.find((entry) => entry.id === selectedClueId);
		return selectedClue?.group.includes(thisEntry.id) ?? false;
	};

	const scrollTo = (entry: ClueInterface) =>
		['md', 'lg', 'xl', 'xxl'].includes(breakpoint) &&
		selectedClueId !== undefined &&
		entry.group.includes(selectedClueId) &&
		entry.id === entry.group[0];

	return (
		<div css={cluesContainerStyle} ref={cluesContainerRef} style={style}>
			<div css={cluesListStyle} ref={acrossContainerRef}>
				<h3 css={cluesListHeaderStyle}>Across</h3>
				<div css={cluesListBodyStyle}>
					{across.map((entry) => (
						<Clue
							allowedHtmlTags={allowedHtmlTags}
							answered={entry.answered}
							breakpoint={breakpoint}
							col={entry.position.x}
							containerRef={
								breakpoint === 'md' ? cluesContainerRef : acrossContainerRef
							}
							id={entry.id}
							inputRef={inputRef}
							isHighlighted={isHighlighted(entry)}
							key={entry.id}
							num={entry.humanNumber}
							onCellFocus={onCellFocus}
							row={entry.position.y}
							scrollTo={scrollTo(entry)}
							text={entry.clue}
						/>
					))}
				</div>
			</div>
			<div css={[cluesListStyle, listDownMarginTop]} ref={downContainerRef}>
				<h3 css={cluesListHeaderStyle}>Down</h3>
				<div css={cluesListBodyStyle}>
					{down.map((entry) => (
						<Clue
							allowedHtmlTags={allowedHtmlTags}
							answered={entry.answered}
							breakpoint={breakpoint}
							col={entry.position.x}
							containerRef={
								breakpoint === 'md' ? cluesContainerRef : downContainerRef
							}
							id={entry.id}
							inputRef={inputRef}
							isHighlighted={isHighlighted(entry)}
							key={entry.id}
							num={entry.humanNumber}
							onCellFocus={onCellFocus}
							row={entry.position.y}
							scrollTo={scrollTo(entry)}
							text={entry.clue}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
