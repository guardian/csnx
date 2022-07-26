import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	from,
	palette,
	textSans,
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
	${isSmall ? textSans.xxsmall() : textSans.medium()};
	color: ${palette.neutral[7]};
	background-color: ${palette.brandAlt[400]};
	display: inline-block;

	> strong {
		font-weight: bold;
	}

	padding: ${isSmall ? '3px 5px' : '6px 10px'};

	${from.mobileLandscape} {
		padding-left: ${isSmall ? '6px' : '12px'};
	}

	${from.leftCol} {
		padding-left: ${isSmall ? '5px' : '10px'};
	}

	${darkModeCss(supportsDarkMode)`
		background-color: ${palette.brandAlt[200]};
    `}
`;

const ageWarningScreenReader = css`
	${visuallyHidden};
`;

const prefixStyle = css`
	padding-left: 2px;
`;

const ensureOldText = (age: string): string =>
	age.endsWith('old') ? age : `${age} old`;

export const AgeWarning = ({
	age,
	isScreenReader,
	size = 'medium',
	warningPrefix = 'This article is more than ',
	supportsDarkMode = false,
}: AgeWarningProps): EmotionJSX.Element => {
	const isSmall = size === 'small';
	const ageOld = ensureOldText(age);

	if (isScreenReader) {
		return <div css={ageWarningScreenReader}>{warningPrefix + age}</div>;
	}

	return (
		<div css={ageWarningStyles(isSmall, supportsDarkMode)} aria-hidden="true">
			<svg width="11" height="11" viewBox="0 0 11 11">
				<path d="M5.4 0C2.4 0 0 2.4 0 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4S8.4 0 5.4 0zm3 6.8H4.7V1.7h.7L6 5.4l2.4.6v.8z"></path>
			</svg>
			<span css={prefixStyle}>{warningPrefix}</span>
			<strong>{ageOld}</strong>
		</div>
	);
};
