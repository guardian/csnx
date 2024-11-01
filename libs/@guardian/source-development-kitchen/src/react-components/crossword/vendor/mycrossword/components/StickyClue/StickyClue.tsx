// @ts-nocheck

import { css } from '@emotion/react';

// Define styling constants
const gridSize = 10;
const pageBackground = '#fff';
const gridBackground = '#000';
const borderRadius = 2;

// Emotion styles
const stickyClueStyle = css`
	display: flex;
	align-items: center;
	position: sticky;
	top: 0;
	padding: ${gridSize}px 0;
	background-color: ${pageBackground};
	border-bottom: 1px solid ${gridBackground};
	height: ${gridSize * 3}px;
	max-height: ${gridSize * 3}px;
	line-height: 1.3;
	z-index: 1;
`;

const innerStyle = css`
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	flex-grow: 1;
	padding: 0 ${gridSize * 0.5}px;
`;

const numStyle = css`
	font-weight: bold;
	margin-right: ${gridSize}px;
`;

const buttonStyle = css`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background: none;
	border: none;
	cursor: pointer;
	margin: 0;
	padding: 0 ${gridSize * 0.5}px;
	border-radius: ${borderRadius}px;

	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

interface ChevronIconProps {
	className?: string;
}

function ChevronLeftIcon({ className }: ChevronIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			className={className}
			viewBox="0 0 16 16"
		>
			<path
				fillRule="evenodd"
				d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
			/>
		</svg>
	);
}

function ChevronRightIcon({ className }: ChevronIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			className={className}
			viewBox="0 0 16 16"
		>
			<path
				fillRule="evenodd"
				d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
			/>
		</svg>
	);
}

interface StickyClueProps {
	allowedHtmlTags: string[];
	num?: string;
	onMoveNext: () => void;
	onMovePrev: () => void;
	text?: string;
}

export default function StickyClue({
	allowedHtmlTags,
	num,
	onMoveNext,
	onMovePrev,
	text,
}: StickyClueProps) {
	return (
		<div css={stickyClueStyle}>
			{text !== undefined && num !== undefined ? (
				<>
					<button
						aria-label="Previous clue"
						css={buttonStyle}
						onClick={onMovePrev}
						type="button"
					>
						<ChevronLeftIcon />
					</button>
					<div css={innerStyle}>
						<span>
							<span css={numStyle}>{num}</span>
							<span
								dangerouslySetInnerHTML={{
									__html: text,
								}}
							/>
						</span>
					</div>
					<button
						aria-label="Next clue"
						css={buttonStyle}
						onClick={onMoveNext}
						type="button"
					>
						<ChevronRightIcon />
					</button>
				</>
			) : null}
		</div>
	);
}
