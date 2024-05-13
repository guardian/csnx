/**
 * DEPRECATED EXPORTS
 *
 * To be removed from the public interface in the next major version.
 */

import type { Props as InternalPropsType } from './@types/Props';
import { SvgCrossedOutCloud } from './__generated__/icons/SvgCrossedOutCloud';
import { SvgExclamation } from './__generated__/icons/SvgExclamation';
import { SvgFacebookMessenger } from './__generated__/icons/SvgFacebookMessenger';
import { SvgInfoRound } from './__generated__/icons/SvgInfoRound';
import { SvgMediaControlsPlay } from './__generated__/icons/SvgMediaControlsPlay';
import { SvgPayPalBrand } from './__generated__/icons/SvgPayPalBrand';

/**
 * @deprecated This is for internal use only.
 * It was previously exported so the v3 `src-*` modules could use it
 * but will be removed in the next major version.
 */
export type Props = InternalPropsType;

/** @deprecated Use `SvgCrossedOutCloud` instead. */
export const SvgOfflineCloud = SvgCrossedOutCloud;

/** @deprecated Use `SvgExclamation` instead. */
export const SvgAlert = SvgExclamation;

/** @deprecated Use `SvgFacebookMessenger` instead. */
export const SvgMessenger = SvgFacebookMessenger;

/** @deprecated Use `SvgInfoRound` instead. */
export const SvgInfo = SvgInfoRound;

/** @deprecated Use `SvgMediaControlsPlay` instead. */
export const SvgPlay = SvgMediaControlsPlay;

/** @deprecated Use `SvgPayPalBrand` instead. */
export const SvgPayPal = SvgPayPalBrand;

export type { ButtonTheme } from './button/theme';

export { accordionThemeDefault } from './accordion/theme';

export {
	buttonThemeReaderRevenue,
	buttonThemeReaderRevenueBrand,
	buttonThemeReaderRevenueBrandAlt,
} from './button/theme-reader-revenue';

export {
	buttonThemeBrand,
	buttonThemeBrandAlt,
	buttonThemeDefault,
} from './button/theme';

export { checkboxThemeBrand, checkboxThemeDefault } from './checkbox/theme';

export { choiceCardThemeDefault } from './choice-card/theme';
export { labelThemeDefault, labelThemeBrand } from './label/theme';

export {
	linkThemeDefault,
	linkThemeBrand,
	linkThemeBrandAlt,
} from './link/theme';

export { radioThemeBrand, radioThemeDefault } from './radio/theme';

export { selectThemeDefault } from './select/theme';
export { textInputThemeDefault } from './text-input/theme';

export {
	userFeedbackThemeBrand,
	userFeedbackThemeDefault,
} from './user-feedback/theme';
