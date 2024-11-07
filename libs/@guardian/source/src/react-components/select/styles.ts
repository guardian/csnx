import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	appearance,
	focusHalo,
	height,
	space,
	textSans17,
	width,
} from '../../foundations';
import type { ThemeSelect } from './theme';

export const state = {
	initial: (theme: ThemeSelect): SerializedStyles => css`
		color: ${theme.textUserInput};
		border: 1px solid ${theme.border};
	`,
	error: (theme: ThemeSelect): SerializedStyles => css`
		color: ${theme.textError};

		&,
		/* When select is active and in an error state, we want the border to remain the same. */
		&:active {
			border-width: 2px;
			border-color: ${theme.borderError};
		}
	`,
	success: (theme: ThemeSelect): SerializedStyles => css`
		color: ${theme.textSuccess};

		&,
		/* When select is active and in an success state, we want the border to remain the same. */
		&:active {
			border-width: 2px;
			border-color: ${theme.borderSuccess};
		}
	`,
};

export const errorChevron = (select: ThemeSelect): SerializedStyles => css`
	svg {
		fill: ${select.textError};
	}
`;

export const successChevron = (select: ThemeSelect): SerializedStyles => css`
	svg {
		fill: ${select.textSuccess};
	}
`;

export const selectWrapper = (select: ThemeSelect): SerializedStyles => css`
	position: relative;

	svg {
		display: none;
		position: absolute;
		right: ${space[3]}px;
		top: ${space[2]}px;
		width: ${width.iconMedium}px;
		height: ${height.iconMedium}px;
		fill: ${select.textUserInput};
		pointer-events: none;
	}
`;

export const select = (theme: ThemeSelect): SerializedStyles => css`
	${state.initial(theme)};
	box-sizing: border-box;
	height: ${height.inputMedium}px;
	width: 100%;
	${textSans17};
	background-color: ${theme.backgroundInput};
	border-radius: 4px;
	padding-left: ${space[2]}px;

	@supports (${appearance}) {
		appearance: none;
		padding-right: ${space[2]}px;

		& ~ svg {
			display: block;
		}
	}

	&:focus {
		${focusHalo};
	}

	&:invalid {
		${state.error(theme)};
	}

	@supports selector(:user-invalid) {
		&:invalid {
			${state.initial(theme)};
		}
	}

	&:user-invalid {
		${state.error(theme)};
	}
`;

export const labelMargin = css`
	margin-top: ${space[1]}px;
`;

export const supportingTextMargin = css`
	margin-top: 6px;
`;

export const inlineMessageMargin = css`
	margin-top: ${space[1]}px;
`;
