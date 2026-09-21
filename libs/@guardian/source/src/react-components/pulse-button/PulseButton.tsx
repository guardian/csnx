// import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { button } from './styles';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- prototype component has no additional props yet
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Buttons enable users to make choices or perform actions.
 */
export const PulseButton = ({ children, ...props }: ButtonProps) => (
	<button css={button} {...props}>
		{children}
	</button>
);
