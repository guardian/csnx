import type { ButtonHTMLAttributes } from 'react';

import './button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
	type = 'button',
	children,
	...props
}: ButtonProps) => (
	<button type={type} {...props} gu-src="button">
		{children}
	</button>
);
