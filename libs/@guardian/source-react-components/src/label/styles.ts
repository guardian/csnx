import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { resets, textSans } from '@guardian/source-foundations';
import type { InputSize } from '../@types/InputSize';
import type { ThemeLabel } from './theme';

const textSize: {
	[key in InputSize]: string;
} = {
	medium: textSans.medium({ fontWeight: 'bold' }),
	small: textSans.xsmall({ fontWeight: 'bold' }),
};

export const legend = css`
	${resets.legend};
`;

export const labelText = (
	label: ThemeLabel,
	size: InputSize,
): SerializedStyles => css`
	${textSize[size]};
	color: ${label.textLabel};
`;

export const optionalText = (label: ThemeLabel): SerializedStyles => css`
	${textSans.xsmall()};
	color: ${label.textOptional};
	font-style: italic;
`;

export const supportingText = (label: ThemeLabel): SerializedStyles => css`
	${textSans.xsmall()};
	color: ${label.textSupporting};
	margin: 2px 0 0;
`;
