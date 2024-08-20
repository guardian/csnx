import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remHeight, remWidth, textSans14, textSans17 } from '../../foundations';
import type { InputSize } from '../@types/InputSize';
import type { ThemeUserFeedback } from './theme';

const inlineMessage = css`
	display: flex;
	align-items: flex-start;

	svg {
		fill: currentColor;
		/* we don't want the SVG to change size depending on available space */
		flex: none;

		/*
		a visual kick to vertically align the icon with the top row of text
		and horizontally pull it to the beginning of the row
		 */
		transform: translate(-4px, -4px);
	}
`;

const inlineMessageSmall = css`
	${textSans14};
	svg {
		width: ${remWidth.iconSmall};
		height: ${remHeight.iconSmall};
	}
`;

const inlineMessageMedium = css`
	${textSans17};
	svg {
		width: ${remWidth.iconMedium};
		height: ${remHeight.iconMedium};
	}
`;

const inlineMessageSize: {
	[key in InputSize]: SerializedStyles;
} = {
	small: inlineMessageSmall,
	medium: inlineMessageMedium,
};

export const inlineError = (
	userFeedback: ThemeUserFeedback,
	size: InputSize,
): SerializedStyles => css`
	${inlineMessage};
	${inlineMessageSize[size]};
	color: ${userFeedback.textError};
`;

export const inlineSuccess = (
	userFeedback: ThemeUserFeedback,
	size: InputSize,
): SerializedStyles => css`
	${inlineMessage};
	${inlineMessageSize[size]};
	color: ${userFeedback.textSuccess};
`;
