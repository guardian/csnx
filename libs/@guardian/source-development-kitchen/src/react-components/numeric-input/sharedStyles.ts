import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	size,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import { textInputThemeDefault } from '@guardian/source/react-components';
import type { InputSize } from '@guardian/source/react-components';

const inputSizeDefault = css`
	${textSans17};
	height: ${size.medium}px;
`;

const inputSizeSmall = css`
	${textSans14};
	height: ${size.small}px;
`;

const inputSize: {
	[key in InputSize]: SerializedStyles;
} = {
	medium: inputSizeDefault,
	small: inputSizeSmall,
};

export const inputBase = (
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

export const errorInput = (
	textInput = textInputThemeDefault.textInput,
): SerializedStyles => css`
	border: 2px solid ${textInput.borderError};
	color: ${textInput.textError};
	margin-top: 0;
	/* When input is active and in an error state, we want the border to remain the same. */
	&:active {
		border: 2px solid ${textInput.borderError};
	}
`;

export const successInput = (
	textInput = textInputThemeDefault.textInput,
): SerializedStyles => css`
	border: 2px solid ${textInput.borderSuccess};
	color: ${textInput.textSuccess};
	margin-top: 0;
	/* When input is active and in a success state, we want the border to remain the same. */
	&:active {
		border: 2px solid ${textInput.borderSuccess};
	}
`;
