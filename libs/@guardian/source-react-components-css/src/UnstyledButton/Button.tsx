import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
	type = 'button',
	children,
	...props
}: ButtonProps) => (
	<button type={type} {...props}>
		{children}
	</button>
);

export const ButtonStyle = {
	color: 'black',
	backgroundColor: 'red',
	border: 'none',
	padding: '10px',
	borderRadius: '1000px',
};
