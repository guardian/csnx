import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { transitions } from '@guardian/source-foundations';
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

export const buttonStyles =
	({ size = 'default', hideLabel, nudgeIcon, isLoading }: SharedButtonProps) =>
	(): Array<string | SerializedStyles | SerializedStyles[] | undefined> => [
		isLoading ? applyButtonStylesToLoadingSpinner(size) : undefined,
	];
