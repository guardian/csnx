import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { focusHalo, size, space, textSans } from '@guardian/source-foundations';
import type { InputSize } from '../@types/InputSize';
import type { ThemeTextInput } from './theme';

const inputSizeMedium = css`
	${textSans.medium()};
	height: ${size.medium}px;
`;

const inputSizeSmall = css`
	${textSans.xsmall()};
	height: ${size.small}px;
`;

const inputSize: {
	[key in InputSize]: SerializedStyles;
} = {
	medium: inputSizeMedium,
	small: inputSizeSmall,
};

export const errorInput = (textInput: ThemeTextInput): SerializedStyles => css`
	border: 2px solid ${textInput.borderError};
	border-radius: 4px;
	color: ${textInput.textError};
	margin-top: 0;
`;

export const successInput = (
	textInput: ThemeTextInput,
): SerializedStyles => css`
	border: 2px solid ${textInput.borderSuccess};
	border-radius: 4px;
	color: ${textInput.textSuccess};
	margin-top: 0;
`;

export const textInput = (
	textInput: ThemeTextInput,
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
