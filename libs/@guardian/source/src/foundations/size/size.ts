import { size as tokens } from '@guardian/design-tokens';
import { pxStringToNumber, pxToRem } from '../utils/convert-value';

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-size--page#global-size-values) •
 * [Design System](https://theguardian.design/2a1e5182b/p/24a3ec-size/t/329aef)
 *
 * May be used for call to action buttons and user input fields.
 */
export const size = {
	xsmall: pxStringToNumber(tokens.xSmall),
	small: pxStringToNumber(tokens.small),
	medium: pxStringToNumber(tokens.medium), // meets WCAG 2.1 AAA compliance for touch targets.
} as const;

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-size--page#global-size-values) •
 * [Design System](https://theguardian.design/2a1e5182b/p/24a3ec-size/t/329aef)
 *
 * May be used for call to action buttons and user input fields.
 */
const remSize = {
	xsmall: pxToRem(size.xsmall),
	small: pxToRem(size.small),
	medium: pxToRem(size.medium),
} as const;

/*
   We attempt to use these values for icons within Source components.
   They are analogous with component heights defined by the size values
   above. They are based on the size of icons used within the button
   component.
*/
export const iconSize = {
	xsmall: pxStringToNumber(tokens.icon.xSmall),
	small: pxStringToNumber(tokens.icon.small),
	medium: pxStringToNumber(tokens.icon.medium),
} as const;

const remIconSize = {
	xsmall: pxToRem(iconSize.xsmall),
	small: pxToRem(iconSize.small),
	medium: pxToRem(iconSize.medium),
} as const;

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-size--page#tokens) •
 * [Design System](https://theguardian.design/2a1e5182b/p/24a3ec-size/t/329aef)
 *
 * Height tokens expressed in px
 *
 ** `height.ctaMedium`: call to action buttons and links
 ** `height.ctaSmall`: secondary calls to action
 ** `height.ctaXsmall`: calls to action where there is very limited space
 ** `height.inputMedium`: text input fields, radio and checkbox labels
 ** `height.inputXsmall`: checkables such as checkboxes or radio buttons
 ** `height.iconMedium`
 ** `height.iconSmall`
 ** `height.iconXsmall`
 */
export const height = {
	ctaMedium: size.medium,
	ctaSmall: size.small,
	ctaXsmall: size.xsmall,
	inputMedium: size.medium,
	inputXsmall: size.xsmall,
	iconMedium: iconSize.medium,
	iconSmall: iconSize.small,
	iconXsmall: iconSize.xsmall,
} as const;

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-size--page#tokens) •
 * [Design System](https://theguardian.design/2a1e5182b/p/24a3ec-size/t/329aef)
 *
 * Height tokens expressed in rem
 *
 ** `remHeight.ctaMedium`: call to action buttons and links
 ** `remHeight.ctaSmall`: secondary calls to action
 ** `remHeight.ctaXsmall`: calls to action where there is very limited space
 ** `remHeight.inputMedium`: text input fields, radio and checkbox labels
 ** `remHeight.inputXsmall`: checkables such as checkboxes or radio buttons
 ** `remHeight.iconMedium`
 ** `remHeight.iconSmall`
 ** `remHeight.iconXsmall`
 */
export const remHeight = {
	ctaMedium: remSize.medium,
	ctaSmall: remSize.small,
	ctaXsmall: remSize.xsmall,
	inputMedium: remSize.medium,
	inputXsmall: remSize.xsmall,
	iconMedium: remIconSize.medium,
	iconSmall: remIconSize.small,
	iconXsmall: remIconSize.xsmall,
} as const;

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-size--page#tokens) •
 * [Design System](https://theguardian.design/2a1e5182b/p/00ddcb-tokens/t/797660)
 *
 * Width tokens expressed in px
 *
 ** `width.ctaMedium`: medium height call to action buttons and links
 ** `width.ctaSmall`: small height call to action buttons and links
 ** `width.ctaXsmall`: xsmall height call to action buttons and links
 ** `width.inputXsmall`: checkables such as checkboxes or radio buttons
 ** `width.iconMedium`
 ** `width.iconSmall`
 ** `width.iconXsmall`
 */
export const width = {
	ctaMedium: size.medium,
	ctaSmall: size.small,
	ctaXsmall: size.xsmall,
	inputXsmall: size.xsmall,
	iconMedium: iconSize.medium,
	iconSmall: iconSize.small,
	iconXsmall: iconSize.xsmall,
} as const;

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-size--page#tokens) •
 * [Design System](https://theguardian.design/2a1e5182b/p/00ddcb-tokens/t/797660)
 *
 * Width tokens expressed in rem
 *
 ** `remWidth.ctaMedium`: medium height call to action buttons and links
 ** `remWidth.ctaSmall`: small height call to action buttons and links
 ** `remWidth.ctaXsmall`: xsmall height call to action buttons and links
 ** `remWidth.inputXsmall`: checkables such as checkboxes or radio buttons
 ** `remWidth.iconMedium`
 ** `remWidth.iconSmall`
 ** `remWidth.iconXsmall`
 */
export const remWidth = {
	ctaMedium: remSize.medium,
	ctaSmall: remSize.small,
	ctaXsmall: remSize.xsmall,
	inputXsmall: remSize.xsmall,
	iconMedium: remIconSize.medium,
	iconSmall: remIconSize.small,
	iconXsmall: remIconSize.xsmall,
} as const;
