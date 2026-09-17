import { css } from '@emotion/react';
import { focusHaloSpaced } from '../../foundations';

export const button = css`
	box-sizing: border-box;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	appearance: none;
	color: var(--mode-color-text-primary);
	background-color: var(--mode-color-fill-primary);
	font: var(--label-sans-bold-m);
	letter-spacing: var(--label-sans-bold-m-letter-spacing);
	padding: var(--padding-vertical-m) var(--padding-horizontal-l);
	border-radius: var(--radius-round);
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
		background-color: hsl(from var(--mode-color-fill-primary) h s calc(l - 5));
	}
`;
