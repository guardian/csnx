import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space, transitions, width } from '@guardian/source-foundations';
import type { SharedButtonProps, Size } from './@types/SharedButtonProps';

// Width of the loading spinner in pixels for each button size.
const loadingSpinnerSizes: Record<Size, number> = {
	xsmall: 16,
	small: 20,
	default: 24,
};

const applyButtonStylesToLoadingSpinner = (size: Size) => {
	return css`
		path,
		circle {
			transition: stroke ${transitions.medium};
			stroke: transparent;
		}
		path {
			stroke: currentColor;
		}
		svg {
			/*
		 * The loading spinner width has been specified as 24px in the design
		 * which falls outside of the icon sizes in source-foundations, so we
		 * override the width here.
		 */
			width: ${loadingSpinnerSizes[size]}px;
		}
	`;
};
const iconOnly = css`
	justify-content: center;
	padding: 0;
`;

const iconOnlyDefault = css`
	${iconOnly};
	width: ${width.ctaMedium}px;
`;

const iconOnlySmall = css`
	${iconOnly};
	width: ${width.ctaSmall}px;
`;

const iconOnlyXsmall = css`
	${iconOnly};
	width: ${width.ctaXsmall}px;
`;

const iconNudgeAnimation = css`
	svg {
		transform: translate(0, 0);
		transition: ${transitions.short};
	}
	&:hover,
	&:focus {
		svg {
			transform: translate(${space[1] / 2}px, 0);
		}
	}
`;

const iconOnlySizes: {
	[key in Size]: SerializedStyles;
} = {
	default: iconOnlyDefault,
	small: iconOnlySmall,
	xsmall: iconOnlyXsmall,
};

export const buttonStyles =
	({ size = 'default', hideLabel, nudgeIcon, isLoading }: SharedButtonProps) =>
	(): Array<string | SerializedStyles | SerializedStyles[] | undefined> => [
		nudgeIcon ? iconNudgeAnimation : '',
		hideLabel ? iconOnlySizes[size] : '',
		isLoading ? applyButtonStylesToLoadingSpinner(size) : undefined,
	];
