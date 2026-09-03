import { css } from '@emotion/react';
import '@guardian/pulse/pulse.css';
import type { ButtonHTMLAttributes } from 'react';
import { focusHaloSpaced } from '../../foundations';

const styles = css`
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
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Buttons enable users to make choices or perform actions.
 */
export const CoreButton = ({ children, ...props }: ButtonProps) => (
	<button css={styles} {...props}>
		{children}
	</button>
);
