import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	size,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';

export const wrapperStyles = (color: string): SerializedStyles => css`
	border: 2px solid ${color};
	border-radius: 4px;
	padding: ${space[1]}px;
	display: flex;
`;

export const iconStyles = (color: string): SerializedStyles => css`
	display: flex;
	flex: 0 1 auto;
	margin-top: 1px;
	svg {
		fill: ${color};
		height: ${size.xsmall}px;
		width: ${size.xsmall}px;
	}
`;

export const messageStyles = (
	color: string,
	isBold = true,
): SerializedStyles => css`
	${isBold ? textSansBold17 : textSans17};
	line-height: 1.4;
	color: ${color};
`;

export const messageWrapperStyles = css`
	margin-left: ${space[1]}px;
`;

export const contextStyles = css`
	${textSans17};
`;
