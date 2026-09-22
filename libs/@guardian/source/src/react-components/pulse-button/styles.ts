import { css } from '@emotion/react';
import { focusHaloSpaced } from '../../foundations';
import { ButtonStyleProps } from './PulseButton';

const button = css`
	box-sizing: border-box;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	appearance: none;
	font: var(--fixed-label-sans-bold-m);
	letter-spacing: var(--fixed-label-sans-bold-m-letter-spacing);
	padding: var(--padding-125) var(--padding-250);
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

const defaultStyle = css`
	color: var(--color-text-button-primary);
	background-color: var(--color-fill-button-primary);
	border: var(--border-button-primary);
`;

const inverseStyle = css`
	color: var(--color-text-button-primary-inverse);
	background-color: var(--color-fill-button-primary-inverse);
	border: var(--border-button-primary-inverse);
`;

const styles = {
	default: defaultStyle,
	inverse: inverseStyle,
};

const priorities = {
	primary: null,
	secondary: null,
	tertiary: null,
};

export const buttonStyles = ({
	style = 'default',
	priority = 'primary',
}: ButtonStyleProps) => [button, styles[style], priorities[priority]];
