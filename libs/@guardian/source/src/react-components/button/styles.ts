import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	focusHaloSpaced,
	height,
	space,
	textSansBold14,
	textSansBold17,
	transitions,
	width,
} from '../../foundations';
import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import type {
	ButtonPriority,
	IconSide,
	SharedButtonProps,
	Size,
} from './@types/SharedButtonProps';
import { calculateHoverColour } from './hoverColour';
import type { ThemeButton } from './theme';
import { themeButton as defaultTheme } from './theme';

const button = css`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	border: none;
	background: transparent;
	cursor: pointer;
	transition: ${transitions.medium};
	text-decoration: none;
	white-space: nowrap;
	vertical-align: middle;

	:disabled {
		cursor: not-allowed;
	}

	&:focus {
		${focusHaloSpaced};
	}
`;

// Width of the loading spinner in pixels for each button size.
const loadingSpinnerSizes: Record<Size, number> = {
	xsmall: 16,
	small: 20,
	default: 24,
};

const applyButtonStylesToLoadingSpinner = (size: Size) => {
	return css`
		svg {
			/*
		 * The loading spinner width has been specified as 24px in the design
		 * which falls outside of the icon sizes in foundations, so we
		 * override the width here.
		 */
			width: ${loadingSpinnerSizes[size]}px;
		}
	`;
};

const primary = (button: ThemeButton): SerializedStyles => css`
	background-color: ${button.backgroundPrimary};
	color: ${button.textPrimary};

	&:hover {
		background-color: ${button.backgroundPrimaryHover ??
		calculateHoverColour(button.backgroundPrimary)};
	}
`;

const secondary = (button: ThemeButton): SerializedStyles => css`
	background-color: ${button.backgroundSecondary};
	color: ${button.textSecondary};

	&:hover {
		background-color: ${button.backgroundSecondaryHover ??
		calculateHoverColour(button.backgroundSecondary)};
	}
`;

const tertiary = (button: ThemeButton): SerializedStyles => css`
	background-color: ${button.backgroundTertiary};
	color: ${button.textTertiary};
	border: 1px solid ${button.borderTertiary};

	&:hover {
		background-color: ${button.backgroundTertiaryHover ??
		calculateHoverColour(button.backgroundTertiary, button.borderTertiary)};
	}
`;

const subdued = (button: ThemeButton): SerializedStyles => css`
	padding: 0;
	background-color: transparent;
	color: ${button.textSubdued};
	text-decoration: underline;
	text-underline-offset: 4px;

	&:hover {
		text-decoration-thickness: 4px;
	}

	/* Why is this zero? Because the default is to have rounded corners but here, when
	   there is only text, it is more natural to show a rectangle for the focus halo */
	border-radius: 0;
`;

/*
	Guardian Text Sans appears to be encoded with slightly more space above the lettering
	than below. We add a small amount of padding to the bottom of the button to ensure
	the button label is vertically centred visually.
	TODO: find a more scalable solution to this (see https://css-tricks.com/how-to-tame-line-height-in-css/)
*/
const defaultSize = css`
	${textSansBold17};
	height: ${height.ctaMedium}px;
	min-height: ${height.ctaMedium}px;
	padding: 0 ${space[5]}px;
	border-radius: ${height.ctaMedium}px;
	padding-bottom: 2px;
`;

const smallSize = css`
	${textSansBold17};
	height: ${height.ctaSmall}px;
	min-height: ${height.ctaSmall}px;
	padding: 0 ${space[4]}px;
	border-radius: ${height.ctaSmall}px;
	padding-bottom: 2px;
`;

const xsmallSize = css`
	${textSansBold14};
	height: ${height.ctaXsmall}px;
	min-height: ${height.ctaXsmall}px;
	padding: 0 ${space[3]}px;
	border-radius: ${height.ctaXsmall}px;
	padding-bottom: 1px;
`;

const iconDefault = css`
	svg {
		flex: 0 0 auto;
		display: block;
		fill: currentColor;
		position: relative;
		width: ${width.iconMedium}px;
		height: auto;
	}
	.src-button-space {
		width: ${space[3]}px;
	}
`;

const iconSmall = css`
	svg {
		flex: 0 0 auto;
		display: block;
		fill: currentColor;
		position: relative;
		width: ${width.iconSmall}px;
		height: auto;
	}
	.src-button-space {
		width: ${space[2]}px;
	}
`;

const iconXsmall = css`
	svg {
		flex: 0 0 auto;
		display: block;
		fill: currentColor;
		position: relative;
		width: ${width.iconXsmall}px;
		height: auto;
	}
	.src-button-space {
		width: ${space[1]}px;
	}
`;

/* TODO: we add some negative margin to icons to account for
 the extra space encoded into the SVG. We should consider removing
 or significantly reducing this space
 */
const pullIconTowardEdge = -space[1];

const iconLeft = css`
	flex-direction: row-reverse;
	svg {
		margin-left: ${pullIconTowardEdge}px;
	}
`;
const iconRight = css`
	svg {
		margin-right: ${pullIconTowardEdge}px;
	}
`;

const iconOnly = css`
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

const priorities: Record<
	ButtonPriority,
	(button: ThemeButton) => SerializedStyles
> = {
	primary,
	secondary,
	tertiary,
	subdued,
};

const iconSides: Record<IconSide, SerializedStyles> = {
	right: iconRight,
	left: iconLeft,
};

const sizes: Record<Size, SerializedStyles> = {
	default: defaultSize,
	small: smallSize,
	xsmall: xsmallSize,
};
const iconSizes: Record<Size, SerializedStyles> = {
	default: iconDefault,
	small: iconSmall,
	xsmall: iconXsmall,
};
const iconOnlySizes: Record<Size, SerializedStyles> = {
	default: iconOnlyDefault,
	small: iconOnlySmall,
	xsmall: iconOnlyXsmall,
};

const mergedTheme = (
	providerTheme: Theme['button'],
	theme?: Partial<ThemeButton>,
) =>
	mergeThemes<ThemeButton, Theme['button']>(defaultTheme, theme, providerTheme);
export const buttonStyles =
	({
		priority = 'primary',
		size = 'default',
		icon: iconSvg,
		hideLabel,
		iconSide = 'left',
		nudgeIcon,
		cssOverrides,
		isLoading,
		theme,
	}: SharedButtonProps) =>
	(
		providerTheme: Theme,
	): Array<string | SerializedStyles | SerializedStyles[] | undefined> => [
		button,
		sizes[size],
		priorities[priority](mergedTheme(providerTheme.button, theme)),
		(iconSvg ?? isLoading) ? iconSizes[size] : '',
		(iconSvg ?? isLoading) && !hideLabel ? iconSides[iconSide] : '',
		nudgeIcon ? iconNudgeAnimation : '',
		hideLabel ? iconOnlySizes[size] : '',
		isLoading ? applyButtonStylesToLoadingSpinner(size) : undefined,
		cssOverrides,
	];
