// @ts-nocheck

import { css } from '@emotion/react';

interface GridErrorProps {
	message: string;
}

// Define styles
const gridSize = 10;
const gridBackground = '#000';
const gridForeground = '#fff';

const gridErrorStyle = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 481px;
	height: 481px;
	padding: ${gridSize * 2}px;
	background-color: ${gridBackground};
	color: ${gridForeground};
	text-align: center;

	@media (max-width: 576px) {
		// Mobile breakpoint as per $breakpoint-xs
		width: auto;
	}
`;

const titleStyle = css`
	font-weight: normal;
	margin: 0;
`;

const subTitleStyle = css`
	font-family: monospace;
`;

export default function GridError({ message }: GridErrorProps) {
	return (
		<div css={gridErrorStyle}>
			<div role="alert">
				<h1 css={titleStyle}>Something went wrong</h1>
				<p css={subTitleStyle}>{message}</p>
			</div>
		</div>
	);
}
