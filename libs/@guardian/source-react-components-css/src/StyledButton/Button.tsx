import type { ButtonHTMLAttributes } from 'react';

import './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
	type = 'button',
	children,
	...props
}: ButtonProps) => (
	<button type={type} {...props} data-gu-src="button">
		{children}
	</button>
);
