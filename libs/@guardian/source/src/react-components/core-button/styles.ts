import { css } from '@emotion/react';
import { focusHaloSpaced } from '../../foundations';

export const button = css`
	box-sizing: border-box;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	appearance: none;
	color: var(--button-color-text);
	background-color: var(--button-color-fill);
	font: var(--button-label);
	letter-spacing: var(--button-letter-spacing);
	padding: var(--button-padding-vertical) var(--button-padding-horizontal);
	border-radius: var(--button-radius);
	border: none;
	cursor: pointer;
	text-decoration: none;
	white-space: nowrap;
	vertical-align: middle;

	:disabled {
		cursor: not-allowed;
	}

	&:focus {
		${focusHaloSpaced};
	}

	&:hover {
		background-color: hsl(from var(--button-color-fill) h s calc(l - 5));
	}
`;
