import { brand, brandAlt, neutral } from '@guardian/source-foundations';
import type { ButtonTheme } from './Button';

const text = {
	readerRevenue: {
		ctaPrimary: brand[400],
		ctaTertiary: brand[400],
	},
	readerRevenueBrand: {
		ctaPrimary: brand[400],
		ctaTertiary: brandAlt[400],
	},
	readerRevenueBrandAlt: {
		ctaPrimary: neutral[100],
		ctaTertiary: neutral[7],
	},
};
const background = {
	readerRevenue: {
		ctaPrimary: brandAlt[400],
		ctaPrimaryHover: '#FFD213',
		ctaTertiaryHover: '#E5E5E5',
	},
	readerRevenueBrand: {
		ctaPrimary: brandAlt[400],
		ctaPrimaryHover: '#FFD213',
		ctaTertiaryHover: brand[300],
	},
	readerRevenueBrandAlt: {
		ctaPrimary: neutral[7],
		ctaPrimaryHover: '#454545',
		ctaTertiaryHover: '#FFD213',
	},
};
const border = {
	readerRevenue: {
		ctaTertiary: brand[400],
	},
	readerRevenueBrand: {
		ctaTertiary: brandAlt[400],
	},
	readerRevenueBrandAlt: {
		ctaTertiary: neutral[7],
	},
};

export const buttonReaderRevenueTheme: ButtonTheme = {
	textPrimary: text.readerRevenue.ctaPrimary,
	backgroundPrimary: background.readerRevenue.ctaPrimary,
	backgroundPrimaryHover: background.readerRevenue.ctaPrimaryHover,
	textTertiary: text.readerRevenue.ctaTertiary,
	backgroundTertiaryHover: background.readerRevenue.ctaTertiaryHover,
	borderTertiary: border.readerRevenue.ctaTertiary,
};
export const buttonReaderRevenueBrandTheme: ButtonTheme = {
	textPrimary: text.readerRevenueBrand.ctaPrimary,
	backgroundPrimary: background.readerRevenueBrand.ctaPrimary,
	backgroundPrimaryHover: background.readerRevenueBrand.ctaPrimaryHover,
	textTertiary: text.readerRevenueBrand.ctaTertiary,
	backgroundTertiaryHover: background.readerRevenueBrand.ctaTertiaryHover,
	borderTertiary: border.readerRevenueBrand.ctaTertiary,
};

export const buttonReaderRevenueBrandAltTheme: ButtonTheme = {
	textPrimary: text.readerRevenueBrandAlt.ctaPrimary,
	backgroundPrimary: background.readerRevenueBrandAlt.ctaPrimary,
	backgroundPrimaryHover: background.readerRevenueBrandAlt.ctaPrimaryHover,
	textTertiary: text.readerRevenueBrandAlt.ctaTertiary,
	backgroundTertiaryHover: background.readerRevenueBrandAlt.ctaTertiaryHover,
	borderTertiary: border.readerRevenueBrandAlt.ctaTertiary,
};

/** @deprecated Use `buttonReaderRevenueTheme` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeReaderRevenue: { button: ButtonTheme } = {
	button: buttonReaderRevenueTheme,
};
/** @deprecated Use `buttonReaderRevenueBrandTheme` and component `theme` prop instead of emotion's `ThemeProvider` */

export const buttonThemeReaderRevenueBrand: { button: ButtonTheme } = {
	button: buttonReaderRevenueBrandTheme,
};
/** @deprecated Use `buttonReaderRevenueBrandAltTheme` and component `theme` prop instead of emotion's `ThemeProvider` */

export const buttonThemeReaderRevenueBrandAlt: { button: ButtonTheme } = {
	button: buttonReaderRevenueBrandAltTheme,
};
