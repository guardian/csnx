import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { focusHalo, space } from '@guardian/source-foundations';
import { textInputThemeDefault } from '@guardian/source-react-components';
import { errorInput, inputBase } from './sharedStyles';
import { Size } from 'libs/@guardian/source-react-components/src/label/types';

export const inputWrapper = css`
	display: flex;
	width: 100%;
	/* Ensures the focus halo matches the shape of the border */
	border-radius: 4px;
	/* Encloses the prefix and suffix when the input element is focused */
	&:focus-within {
		${focusHalo};
	}
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

export const textInput = (
	textInput = textInputThemeDefault.textInput,
	size: Size,
): SerializedStyles => css`
	${inputBase(textInput, size)}
	max-width: 100%;
	flex-grow: 1;

	&:active {
		border: 2px solid ${textInput.borderActive};
	}

	&:focus {
		/* Focus outline is provided on the wrapper */
		outline: none;
	}

	&:invalid {
		/*
			We automatically apply error styling to fields in an invalid state,
			but stop short of applying it to empty required fields.
			*/
		&[value]:not([value='']) {
			${errorInput(textInput)};
		}
	}
`;

export const hasExtensions = (prefix?: string, suffix?: string) => css`
	${prefix &&
	'border-left: none; margin-left: 0; border-radius: 0px 4px 4px 0px;'}
	${suffix &&
	'border-right: none; margin-right: 0; border-radius: 4px 0px 0px 4px;'}
	${prefix && suffix && 'border-radius: 0;'}
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
