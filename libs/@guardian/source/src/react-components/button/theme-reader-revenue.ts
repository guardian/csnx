import { brand, brandAlt, neutral } from '../../foundations';
import type { ButtonTheme, ThemeButton } from './theme';

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

export const themeButtonReaderRevenue: Partial<ThemeButton> = {
	textPrimary: text.readerRevenue.ctaPrimary,
	backgroundPrimary: background.readerRevenue.ctaPrimary,
	backgroundPrimaryHover: background.readerRevenue.ctaPrimaryHover,
	textTertiary: text.readerRevenue.ctaTertiary,
	backgroundTertiaryHover: background.readerRevenue.ctaTertiaryHover,
	borderTertiary: border.readerRevenue.ctaTertiary,
} as const;
export const themeButtonReaderRevenueBrand: Partial<ThemeButton> = {
	textPrimary: text.readerRevenueBrand.ctaPrimary,
	backgroundPrimary: background.readerRevenueBrand.ctaPrimary,
	backgroundPrimaryHover: background.readerRevenueBrand.ctaPrimaryHover,
	textTertiary: text.readerRevenueBrand.ctaTertiary,
	backgroundTertiaryHover: background.readerRevenueBrand.ctaTertiaryHover,
	borderTertiary: border.readerRevenueBrand.ctaTertiary,
} as const;

export const themeButtonReaderRevenueBrandAlt: Partial<ThemeButton> = {
	textPrimary: text.readerRevenueBrandAlt.ctaPrimary,
	backgroundPrimary: background.readerRevenueBrandAlt.ctaPrimary,
	backgroundPrimaryHover: background.readerRevenueBrandAlt.ctaPrimaryHover,
	textTertiary: text.readerRevenueBrandAlt.ctaTertiary,
	backgroundTertiaryHover: background.readerRevenueBrandAlt.ctaTertiaryHover,
	borderTertiary: border.readerRevenueBrandAlt.ctaTertiary,
} as const;

/** @deprecated Use `themeButtonReaderRevenue` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeReaderRevenue: { button: Partial<ButtonTheme> } = {
	button: themeButtonReaderRevenue,
};

/** @deprecated Use `themeButtonReaderRevenueBrand` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeReaderRevenueBrand: { button: Partial<ButtonTheme> } = {
	button: themeButtonReaderRevenueBrand,
};

/** @deprecated Use `themeButtonReaderRevenueBrandAlt` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeReaderRevenueBrandAlt: {
	button: Partial<ButtonTheme>;
} = {
	button: themeButtonReaderRevenueBrandAlt,
};
