import { css, type SerializedStyles } from '@emotion/react';
import { breakpoints, palette } from '@guardian/source/foundations';
import type { LineCount } from './Lines';

const dotRadius = 1;
const gridSize = 3;
const maxWidth = breakpoints.wide;

export const getHeight = (count: LineCount): number => gridSize * count;

const pattern = css`
	max-width: ${maxWidth}px;
	background-size: ${gridSize}px ${gridSize}px;
	background-position: top center;
	background-image: radial-gradient(
		currentColor,
		currentColor ${dotRadius}px,
		transparent ${dotRadius}px
	);
`;

export const DottedLines = ({
	count = 4,
	color = palette.neutral[86],
	cssOverrides,
}: {
	count?: LineCount;
	color?: string;
	cssOverrides?: SerializedStyles | SerializedStyles[];
}) => (
	<div
		style={{ height: `${getHeight(count)}px`, color }}
		css={[pattern, cssOverrides]}
	/>
);
