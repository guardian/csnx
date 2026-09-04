import '@guardian/pulse/pulse.css';
import type { ButtonHTMLAttributes } from 'react';
import { button } from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Buttons enable users to make choices or perform actions.
 */
export const CoreButton = ({ children, ...props }: ButtonProps) => (
	<button css={button} {...props}>
		{children}
	</button>
);
