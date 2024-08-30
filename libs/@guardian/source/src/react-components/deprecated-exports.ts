/**
 * DEPRECATED EXPORTS
 *
 * To be removed from the public interface in the next major version.
 */

import type { SourceComponentProps as InternalPropsType } from './@types/SourceComponentProps';

/**
 * @deprecated This is for internal use only.
 * It was previously exported so the v3 `src-*` modules could use it
 * but will be removed in the next major version.
 */
export type Props = InternalPropsType;

export {
	/** @deprecated Use `SvgAlertRound` instead. */
	SvgAlertTriangle,
} from './__generated__/icons/SvgAlertTriangle';

export {
	/** @deprecated Use `SvgFilterOutlinedWeb` instead. */
	SvgFilter,
} from './__generated__/icons/SvgFilter';

export {
	/** @deprecated Use `SvgShareWeb` instead. */
	SvgShareCallout,
} from './__generated__/icons/SvgShareCallout';

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
