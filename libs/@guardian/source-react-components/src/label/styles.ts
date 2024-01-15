import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { resets, textSans } from '@guardian/source-foundations';
import { labelThemeDefault } from './theme';
import type { Size } from './types';

const textSize: {
	[key in Size]: string;
} = {
	default: textSans.medium({ fontWeight: 'bold' }),
	small: textSans.xsmall({ fontWeight: 'bold' }),
};

export const legend = css`
	${resets.legend};
`;

export const labelText = (
	label = labelThemeDefault.label,
	size: Size,
): SerializedStyles => css`
	${textSize[size]};
	color: ${label.textLabel};
`;

export const optionalText = (
	label = labelThemeDefault.label,
): SerializedStyles => css`
	${textSans.small()};
	color: ${label.textOptional};
	font-style: italic;
`;

export const supportingText = (
	label = labelThemeDefault.label,
): SerializedStyles => css`
	${textSans.small()};
	color: ${label.textSupporting};
	margin: 2px 0 0;
`;
