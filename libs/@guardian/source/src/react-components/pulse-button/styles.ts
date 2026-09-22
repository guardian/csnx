import { css } from '@emotion/react';
import { focusHaloSpaced } from '../../foundations';

export const button = css`
	box-sizing: border-box;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	appearance: none;
	color: var(--color-text-button-primary);
	background-color: var(--color-fill-button-primary);
	font: var(--fixed-label-sans-bold-m);
	letter-spacing: var(--fixed-label-sans-bold-m-letter-spacing);
	padding: var(--padding-125) var(--padding-250);
	border: var(--border-button-primary);
	border-radius: var(--radius-round);
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
`;
