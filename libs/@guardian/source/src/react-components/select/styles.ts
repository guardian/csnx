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

const initial = (theme: ThemeSelect): SerializedStyles => css`
	color: ${theme.textUserInput};
	border-width: 1px;
	border-color: ${theme.border};
`;

const success = (theme: ThemeSelect): SerializedStyles => css`
	color: ${theme.textSuccess};
	border-width: 2px;
	border-color: ${theme.borderSuccess};
`;

const error = (theme: ThemeSelect): SerializedStyles => css`
	color: ${theme.textError};
	border-width: 2px;
	border-color: ${theme.borderError};
`;

export const state = {
	default: (theme: ThemeSelect): SerializedStyles => css`
		${initial(theme)};

		&:invalid {
			${error(theme)};
		}

		@supports selector(:user-invalid) {
			&:invalid {
				${initial(theme)};
			}

			&:user-invalid {
				${error(theme)};
			}
		}

		&:valid {
			${success(theme)};
		}

		@supports selector(:user-valid) {
			&:valid {
				${initial(theme)};
			}

			&:user-valid {
				${success(theme)};
			}
		}
	`,
	error: (theme: ThemeSelect): SerializedStyles => css`
		&,
			/* When select is in an error state, we want the border to remain the
			same whatever the browser validation state. */
		&:active,
		&:invalid,
		&:valid,
		&:user-invalid,
		&:user-valid {
			${error(theme)};
		}
	`,
	success: (theme: ThemeSelect): SerializedStyles => css`
		&,
			/* When select is in a success state, we want the border to remain the
			same whatever the browser validation state. */
		&:active,
		&:invalid,
		&:valid,
		&:user-invalid,
		&:user-valid {
			${success(theme)};
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
	border-style: solid;
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
