import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	focusHalo,
	height,
	space,
	textSans,
} from '@guardian/source-foundations';
import type { InputSize } from '../@types/InputSize';
import { textInputThemeDefault } from './theme';

const inputSizeMediun = css`
	${textSans.medium()};
	height: ${height.inputMedium}px;
`;

const inputSizeSmall = css`
	${textSans.xsmall()};
	height: ${height.ctaSmall}px; // TODO: Add height.inputSmall token
`;

const inputSize: {
	[key in InputSize]: SerializedStyles;
} = {
	medium: inputSizeMediun,
	small: inputSizeSmall,
};

export const errorInput = (
	textInput = textInputThemeDefault.textInput,
): SerializedStyles => css`
	border: 2px solid ${textInput.borderError};
	border-radius: 4px;
	color: ${textInput.textError};
	margin-top: 0;
`;

export const successInput = (
	textInput = textInputThemeDefault.textInput,
): SerializedStyles => css`
	border: 2px solid ${textInput.borderSuccess};
	border-radius: 4px;
	color: ${textInput.textSuccess};
	margin-top: 0;
`;

export const textInput = (
	textInput = textInputThemeDefault.textInput,
	size: InputSize,
): SerializedStyles => css`
	box-sizing: border-box;
	${inputSize[size]};
	color: ${textInput.textUserInput};
	background-color: ${textInput.backgroundInput};
	border: 1px solid ${textInput.border};
	border-radius: 4px;
	padding: 0 ${space[2]}px;

	&:focus {
		${focusHalo}
	}

	&:invalid {
		/* Remove styling of invalid input elements that gets applied in Firefox */
		box-shadow: none;

		/*
			We automatically apply error styling to fields in an invalid state,
			but stop short of applying it to empty required fields.
			*/
		&[value]:not([value='']) {
			${errorInput(textInput)};
		}
	}
`;

export const labelMargin = css`
	margin-top: ${space[1]}px;
`;

export const supportingTextMargin = css`
	margin-top: 6px;
`;

export const inlineMessageMargin = css`
	margin-top: 2px;
`;

export const widthFluid = css`
	width: 100%;
`;

export const width30 = css`
	width: 40ex;
	max-width: 100%; /* prevent overflow on narrow viewports */
`;

export const width10 = css`
	width: 18ex;
`;

export const width4 = css`
	width: 9ex;
`;
