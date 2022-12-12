import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	focusHalo,
	remHeight,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { fileInputThemeDefault } from './theme';

export const customUpload = (
	fileInput = fileInputThemeDefault.fileInput,
): SerializedStyles => css`
	background: red;
	${textSans.small()};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease-in-out 0s;
	text-decoration: none;
	white-space: nowrap;
	height: ${remHeight.ctaXsmall}rem;
	min-height: ${remHeight.ctaXsmall}rem;
	padding: ${remSpace[3]};
	margin: ${remSpace[3]} ${remSpace[1]};
	border-radius: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'medium' })};
	color: ${fileInput.primary};
	border: 1px solid ${fileInput.primary};

	&:focus-within,
	&:focus {
		${focusHalo};
	}
`;
