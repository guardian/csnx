import { css } from '@emotion/react';
import { focusHaloSpaced } from '../../foundations';
import { ButtonStyleProps } from './PulseButton';

export const buttonStyles = ({
	style = 'default',
	priority = 'primary',
}: ButtonStyleProps) => {
	const colorVariant = `${priority}${style === 'inverse' ? '-inverse' : ''}`;
	return css`
		box-sizing: border-box;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		appearance: none;
		font: var(--fixed-label-sans-bold-m);
		padding: var(--padding-125) var(--padding-250);
		letter-spacing: var(--fixed-label-sans-bold-m-letter-spacing);
		color: var(--color-text-button-${colorVariant});
		background-color: var(--color-fill-button-${colorVariant});
		border: var(--border-button-${colorVariant});
		border-radius: var(--radius-round);
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
};
