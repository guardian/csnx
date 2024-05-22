import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	focusHalo,
	space,
	textSans14,
	textSans17,
} from '@guardian/source-foundations';
import type { InputSize } from '../@types/InputSize';
import type { ThemeTextArea } from './theme';

const textAreaSize: {
	[key in InputSize]: string;
} = {
	medium: textSans17,
	small: textSans14,
};

export const errorInput = (textArea: ThemeTextArea): SerializedStyles => css`
	border: 2px solid ${textArea.borderError};
	border-radius: 4px;
	color: ${textArea.textError};
	margin-top: 0;
`;

export const successInput = (textArea: ThemeTextArea): SerializedStyles => css`
	border: 2px solid ${textArea.borderSuccess};
	border-radius: 4px;
	color: ${textArea.textSuccess};
	margin-top: 0;
`;

export const textArea = (
	textArea: ThemeTextArea,
	size: InputSize,
): SerializedStyles => css`
	box-sizing: border-box;
	${textAreaSize[size]};
	color: ${textArea.textUserInput};
	background-color: ${textArea.backgroundInput};
	border: 1px solid ${textArea.border};
	border-radius: 4px;
	padding: ${space[2]}px ${space[2]}px 0 ${space[2]}px;

	&:focus {
		${focusHalo};
	}

	&:invalid {
		/* Remove styling of invalid input elements that gets applied in Firefox */
		box-shadow: none;

		/*
		We automatically apply error styling to fields in an invalid state,
		but stop short of applying it to empty required fields.

		Note: the following class will only be applied to a controlled
		component: https://reactjs.org/docs/forms.html#controlled-components
		*/
		.src-has-value {
			${errorInput(textArea)}
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
