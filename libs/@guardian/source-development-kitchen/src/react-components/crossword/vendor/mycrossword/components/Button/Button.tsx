// @ts-nocheck

import { css } from '@emotion/react';
import * as React from 'react';

interface ButtonProps {
	ariaLabel?: string;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	id?: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
	variant?: 'filled' | 'outlined';
}

const getBackgroundColor = (variant: 'filled' | 'outlined') => {
	switch (variant) {
		case 'filled':
			return '#1976d2';
		case 'outlined':
			return 'rgba(0, 0, 0, 0.04)';
		default:
			return 'transparent';
	}
};

const getBackgroundColorHover = (variant: 'filled' | 'outlined') => {
	switch (variant) {
		case 'filled':
			return '#115293';
		case 'outlined':
			return 'rgba(0, 0, 0, 0.08)';
		default:
			return 'transparent';
	}
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			ariaLabel,
			children,
			className,
			disabled,
			id,
			onClick,
			onKeyDown,
			variant = 'filled',
		},
		ref,
	) => (
		<button
			aria-label={ariaLabel}
			css={css`
				padding: 8px 12px;
				border-radius: 2px;
				border: none;
				margin: 5px;
				font-weight: bold;
				cursor: pointer;
				background-color: ${getBackgroundColor(variant)};
				color: ${variant === 'filled' ? 'white' : 'rgba(0, 0, 0, 0.87)'};
				border: ${variant === 'outlined'
					? '1px solid rgba(0, 0, 0, 0.23);'
					: 'none'};

				&:not(:disabled):hover {
					background-color: ${getBackgroundColorHover(variant)};
				}

				&:disabled {
					cursor: default;
					opacity: 0.5;
				}
			`}
			className={className}
			disabled={disabled}
			id={id}
			onClick={onClick}
			onKeyDown={onKeyDown}
			ref={ref}
			type="button"
		>
			{children}
		</button>
	),
);

export default Button;
