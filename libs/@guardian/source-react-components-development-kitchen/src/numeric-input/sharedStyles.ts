import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { height, space, textSans } from '@guardian/source-foundations';
import { textInputThemeDefault } from '@guardian/source-react-components';

export const inputBase = (
	textInput = textInputThemeDefault.textInput,
): SerializedStyles =>
	css`
		box-sizing: border-box;
		height: ${height.inputMedium}px;
		${textSans.medium()};
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
