import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	appearance,
	focusHalo,
	height,
	space,
	textSans,
	width,
} from '@guardian/source-foundations';
import type { ThemeSelect } from './theme';

export const errorInput = (select: ThemeSelect): SerializedStyles => css`
	border: 2px solid ${select.borderError};
	border-radius: 4px;
	color: ${select.textError};
	/* When select is active and in an error state, we want the border to remain the same. */
	&:active {
		border: 2px solid ${select.borderError};
	}
`;

export const successInput = (select: ThemeSelect): SerializedStyles => css`
	border: 2px solid ${select.borderSuccess};
	border-radius: 4px;
	color: ${select.textSuccess};
	/* When select is active and in an success state, we want the border to remain the same. */
	&:active {
		border: 2px solid ${select.borderSuccess};
	}
`;

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
		fill: ${select.iconFill};
		pointer-events: none;
	}
`;

export const select = (select: ThemeSelect): SerializedStyles => css`
	color: ${select.textUserInput};
	box-sizing: border-box;
	height: ${height.inputMedium}px;
	width: 100%;
	${textSans.medium()};
	background-color: ${select.backgroundInput};
	border: 1px solid ${select.border};
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
		${errorInput(select)};
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
