import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { textSans14 } from '@guardian/source/foundations';
import { defaultDisclaimerTheme, type DisclaimerTheme } from './theme';

export const disclaimerStyles = (
	themeOverrides?: Partial<DisclaimerTheme>,
): SerializedStyles => {
	const theme = { ...defaultDisclaimerTheme, ...themeOverrides };
	return css`
		${textSans14};
		width: 100%;
		padding: 8px 10px 10px 10px;
		background-color: ${theme.backgroundPrimary};
		color: ${theme.textPrimary};

		a {
			color: ${theme.linkPrimary};
		}
	`;
};
