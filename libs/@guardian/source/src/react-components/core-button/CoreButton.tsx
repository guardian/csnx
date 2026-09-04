import { Global } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { pulse } from '../../foundations';
import { button } from './styles';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- prototype component has no additional props yet
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Buttons enable users to make choices or perform actions.
 */
export const CoreButton = ({ children, ...props }: ButtonProps) => (
	<>
		<Global styles={pulse} />
		<button css={button} {...props}>
			{children}
		</button>
	</>
);
