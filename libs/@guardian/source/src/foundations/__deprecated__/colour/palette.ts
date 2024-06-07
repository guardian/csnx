import { palette } from '../../colour/palette';

/** @deprecated Colours should now be imported from the `palette` object */
export const {
	brand,
	brandAlt,
	neutral,
	error,
	success,
	news,
	opinion,
	sport,
	culture,
	lifestyle,
	labs,
	specialReport,
	focus,
} = palette;

/**
 * Default theme background colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const background = {
	primary: palette.neutral[100],
	secondary: palette.neutral[97],
	inverse: palette.neutral[10],
	ctaPrimary: palette.brand[400],
	ctaPrimaryHover: '#234B8A',
	ctaSecondary: palette.brand[800],
	ctaSecondaryHover: '#ACC9F7',
	ctaTertiaryHover: '#E5E5E5',
	input: palette.neutral[100],
	inputChecked: palette.brand[500],
} as const;

/**
 * Brand theme background colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandBackground = {
	primary: palette.brand[400],
	inputChecked: palette.neutral[100],
	ctaPrimary: palette.neutral[100],
	ctaPrimaryHover: '#E0E0E0',
	ctaSecondary: palette.brand[600],
	ctaSecondaryHover: '#234B8A',
	ctaTertiaryHover: palette.brand[300],
} as const;

/**
 * Alternative brand theme background colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandAltBackground = {
	primary: palette.brandAlt[400],
	ctaPrimary: palette.neutral[7],
	ctaPrimaryHover: '#454545',
	ctaSecondary: palette.brandAlt[200],
	ctaSecondaryHover: '#F2AE00',
	ctaTertiaryHover: '#FFD213',
} as const;

/**
 * Default theme border colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const border = {
	primary: palette.neutral[60],
	secondary: palette.neutral[86],
	success: palette.success[400],
	error: palette.error[400],
	ctaTertiary: palette.brand[400],
	input: palette.neutral[60],
	inputChecked: palette.brand[500],
	inputHover: palette.brand[500],
	inputActive: palette.brand[500],
	focusHalo: palette.focus[400],
};

/**
 * Brand theme border colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandBorder = {
	primary: palette.brand[600],
	secondary: palette.brand[600],
	success: palette.success[500],
	error: palette.error[500],
	ctaTertiary: palette.neutral[100],
	input: palette.brand[800],
	inputChecked: palette.neutral[100],
	inputHover: palette.neutral[100],
};

/**
 * Alternative brand theme border colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandAltBorder = {
	ctaTertiary: palette.neutral[7],
};

/**
 * Default theme line colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const line = {
	primary: palette.neutral[86],
};

/**
 * Brand theme line colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandLine = {
	primary: palette.brand[600],
};

/**
 * Alternative brand theme line colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandAltLine = {
	primary: palette.neutral[7],
};

/**
 * Default theme text colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const text = {
	primary: palette.neutral[7],
	supporting: palette.neutral[46],
	success: palette.success[400],
	error: palette.error[400],
	ctaPrimary: palette.neutral[100],
	ctaSecondary: palette.brand[400],
	ctaTertiary: palette.brand[400],
	anchorPrimary: palette.brand[500],
	anchorSecondary: palette.neutral[7],
	userInput: palette.neutral[7],
	inputLabel: palette.neutral[7],
	inputError: palette.neutral[7],
	inputLabelSupporting: palette.neutral[46],
	inputChecked: palette.brand[400], //choice card only
	inputHover: palette.brand[400], //choice card only
	groupLabel: palette.neutral[7],
	groupLabelSupporting: palette.neutral[46],
	newsInverse: palette.news[550],
};

/**
 * Brand theme text colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandText = {
	primary: palette.neutral[100],
	supporting: palette.brand[800],
	success: palette.success[500],
	error: palette.error[500],
	ctaPrimary: palette.brand[400],
	ctaSecondary: palette.neutral[100],
	ctaTertiary: palette.neutral[100],
	anchorPrimary: palette.neutral[100],
	anchorPrimaryHover: palette.brandAlt[400],
	userInput: palette.neutral[100],
	inputLabel: palette.neutral[100],
	inputLabelSupporting: palette.brand[800],
};

/**
 * Alternative brand theme text colours
 *
 * @deprecated Colours should now be imported from the `palette` object
 */
export const brandAltText = {
	primary: palette.neutral[7],
	supporting: palette.neutral[60],
	ctaPrimary: palette.neutral[100],
	ctaSecondary: palette.neutral[7],
	ctaTertiary: palette.neutral[7],
	anchorPrimary: palette.neutral[7],
};
