import { type ButtonHTMLAttributes } from 'react';
import { type ButtonStyleProps, buttonStyles } from './styles';

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
}: ButtonProps) => {
	return (
		<button css={buttonStyles({ style, priority })} {...props}>
			{children}
		</button>
	);
};
