import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	focusHalo,
	fontWeights,
	height,
	remHeight,
	remSpace,
	space,
	textSans,
} from '@guardian/source-foundations';
import { fileInputThemeDefault } from './theme';
import type { Size as SizeType } from './types';

export const fileName = (
	fileInput = fileInputThemeDefault.fileInput,
): SerializedStyles => css`
	color: ${fileInput.supporting};
`;

const defaultUpload = css`
	padding: ${remSpace[3]};
	border-radius: ${height.ctaMedium}px;
	font-weight: ${fontWeights.bold};
`;
const smallUpload = css`
	padding: ${remSpace[3]};
	border-radius: ${height.ctaSmall}px;
	font-weight: ${fontWeights.bold};
`;

const xsmallUpload = css`
	padding: 0 ${space[3]}px;
	padding: ${remSpace[3]};
	border-radius: ${height.ctaXsmall}px;
	font-weight: ${fontWeights.bold};
`;

export const uploadSizes: {
	[key in SizeType]: SerializedStyles;
} = {
	default: defaultUpload,
	small: smallUpload,
	xsmall: xsmallUpload,
};

export const fontSizes: {
	[key in SizeType]: SerializedStyles;
} = {
	default: css`
		${textSans.medium()};
	`,
	small: css`
		${textSans.small()};
	`,
	xsmall: css`
		${textSans.xsmall()};
	`,
};

export const customUpload = (
	fileInput = fileInputThemeDefault.fileInput,
	hasError = false,
): SerializedStyles => css`
	color: ${fileInput.text};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	background: transparent;
	cursor: pointer;
	text-decoration: none;
	white-space: nowrap;
	margin: ${remSpace[2]} ${remSpace[2]} ${remSpace[2]} 0;
	height: ${remHeight.ctaXsmall}rem;
	min-height: ${remHeight.ctaXsmall}rem;
	border-radius: ${remHeight.ctaMedium}rem;
	color: ${fileInput.primary};
	border: ${hasError
		? `2px solid ${fileInput.error}`
		: `1px solid ${fileInput.primary}`};

	&:focus-within,
	&:focus {
		${focusHalo};
	}
	&:hover {
		color: ${fileInput.textHover};
		background-color: ${fileInput.backgroundHover};
	}
`;
