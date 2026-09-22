// import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { buttonStyles } from './styles';

export type ButtonStyleProps = {
	style?: 'default' | 'inverse';
	priority?: 'primary' | 'secondary' | 'tertiary';
};

export interface ButtonProps
	extends
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'>,
		ButtonStyleProps {}

/**
 * Buttons enable users to make choices or perform actions.
 */
export const PulseButton = ({
	style,
	priority,
	children,
	...props
}: ButtonProps) => (
	<button css={buttonStyles({ style, priority })} {...props}>
		{children}
	</button>
);
