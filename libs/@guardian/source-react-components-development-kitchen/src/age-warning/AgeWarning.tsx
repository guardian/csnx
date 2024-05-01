import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { JSX } from '@emotion/react/jsx-runtime';
import {
	palette,
	space,
	textSans12,
	textSans17,
	visuallyHidden,
} from '@guardian/source-foundations';
import { darkModeCss } from './styles';

export interface AgeWarningProps {
	/**
	 * the age to be shown in the warning. e.g. 5 years
	 */
	age: string;
	/**
	 * hiding the warning from sight while still being available to screen readers.
	 */
	isScreenReader?: boolean;
	/**
	 * size of the yellow warning banner
	 */
	size?: 'small' | 'medium';
	/**
	 * the message to be shown before the age. default is 'This article is more than '
	 */
	warningPrefix?: string;
	/**
	 * use this if platform supports dark mode
	 */
	supportsDarkMode: boolean;
}

const ageWarningStyles = (
	isSmall: boolean,
	supportsDarkMode: boolean,
): SerializedStyles => css`
	${isSmall ? textSans12 : textSans17}
	color: ${palette.neutral[7]};
	background-color: ${palette.brandAlt[400]};
	display: inline-block;

	> strong {
		font-weight: bold;
	}

	padding: ${isSmall ? `3px ${space[1]}px` : `6px ${space[2]}px`};

	${darkModeCss(supportsDarkMode)`
		background-color: ${palette.brandAlt[200]};
	`}
`;

const iconStyles = (isSmall: boolean): SerializedStyles => css`
	position: relative;
	top: 1px;
	width: ${isSmall ? '11px' : '14px'};
	height: auto;
`;

const ageWarningScreenReader = css`
	${visuallyHidden};
`;

const prefixStyle = css`
	padding-left: ${space[1]}px;
`;

const ensureOldText = (age: string): string =>
	age.endsWith('old') ? age : `${age} old`;

export const AgeWarning = ({
	age,
	isScreenReader,
	size = 'medium',
	warningPrefix = 'This article is more than ',
	supportsDarkMode = false,
}: AgeWarningProps): JSX.Element => {
	const isSmall = size === 'small';
	const ageOld = ensureOldText(age);

	if (isScreenReader) {
		return <div css={ageWarningScreenReader}>{warningPrefix + age}</div>;
	}

	return (
		<div css={ageWarningStyles(isSmall, supportsDarkMode)} aria-hidden="true">
			<svg css={iconStyles(isSmall)} viewBox="0 0 11 11">
				<path d="M5.4 0C2.4 0 0 2.4 0 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4S8.4 0 5.4 0zm3 6.8H4.7V1.7h.7L6 5.4l2.4.6v.8z"></path>
			</svg>
			<span css={prefixStyle}>{warningPrefix}</span>
			<strong>{ageOld}</strong>
		</div>
	);
};
