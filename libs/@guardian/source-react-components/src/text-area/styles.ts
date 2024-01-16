import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	focusHalo,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import type { InputSize } from '../@types/InputSize';

const textAreaSize: {
	[key in InputSize]: string;
} = {
	medium: textSans.medium(),
	small: textSans.xsmall(),
};

export const errorInput = css`
	border: 2px solid ${palette.error[400]};
	border-radius: 4px;
	color: ${palette.neutral[7]};
	margin-top: 0;
`;

export const successInput = css`
	border: 2px solid ${palette.success[400]};
	border-radius: 4px;
	color: ${palette.success[400]};
	margin-top: 0;
`;

export const textArea = (size: InputSize): SerializedStyles => css`
	box-sizing: border-box;
	${textAreaSize[size]};
	color: ${palette.neutral[7]};
	background-color: ${palette.neutral[100]};
	border: 1px solid ${palette.neutral[46]};
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
			${errorInput}
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
