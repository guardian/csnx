import { palette } from '@guardian/source-foundations';

/** @deprecated Use Partial<ThemeButton> instead */
export type ButtonTheme = {
	textPrimary: string;
	backgroundPrimary: string;
	backgroundPrimaryHover: string;
	textSecondary?: string;
	backgroundSecondary?: string;
	backgroundSecondaryHover?: string;
	textTertiary?: string;
	backgroundTertiary?: string;
	backgroundTertiaryHover?: string;
	borderTertiary?: string;
	textSubdued?: string;
};

export type ThemeButton = {
	textPrimary: string;
	backgroundPrimary: string;
	backgroundPrimaryHover: string;
	textSecondary: string;
	backgroundSecondary: string;
	backgroundSecondaryHover: string;
	textTertiary: string;
	backgroundTertiary: string;
	backgroundTertiaryHover: string;
	borderTertiary: string;
	textSubdued: string;
};

/** @deprecated Use `themeButton` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeDefault: { button: ButtonTheme } = {
	button: {
		textPrimary: palette.neutral[100],
		backgroundPrimary: palette.brand[400],
		backgroundPrimaryHover: '#234B8A', // One-off colour variant generated from palette.brand[400]
		textSecondary: palette.brand[400],
		backgroundSecondary: palette.brand[800],
		backgroundSecondaryHover: '#ACC9F7', // One-off colour variant generated from palette.brand[800]
		textTertiary: palette.neutral[100],
		backgroundTertiary: palette.neutral[100],
		backgroundTertiaryHover: '#E5E5E5', // One-off colour variant
		borderTertiary: palette.brand[400],
		textSubdued: palette.brand[400],
	},
};

/** @deprecated Use `themeButtonBrand` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeBrand: { button: ButtonTheme } = {
	button: {
		textPrimary: palette.brand[400],
		backgroundPrimary: palette.neutral[100],
		backgroundPrimaryHover: '#E0E0E0', // One-off colour variant generated from palette.neutral[100]
		textSecondary: palette.neutral[100],
		backgroundSecondary: palette.brand[600],
		backgroundSecondaryHover: '#234B8A', // One-off colour variant generated from palette.brand[600]
		textTertiary: palette.neutral[100],
		backgroundTertiaryHover: palette.brand[300],
		borderTertiary: palette.neutral[100],
		textSubdued: palette.neutral[100],
	},
};

/** @deprecated Use `themeButtonBrandAlt` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeBrandAlt: { button: ButtonTheme } = {
	button: {
		textPrimary: palette.neutral[100],
		backgroundPrimary: palette.neutral[7],
		backgroundPrimaryHover: '#454545', // One-off colour variant generated from palette.neutral[7]
		textSecondary: palette.neutral[7],
		backgroundSecondary: palette.brandAlt[200],
		backgroundSecondaryHover: '#F2AE00', // One-off colour variant generated from palette.brandAlt[200]
		textTertiary: palette.neutral[0],
		backgroundTertiaryHover: '#FFD213', // One-off colour variant
		borderTertiary: palette.neutral[7],
		textSubdued: palette.neutral[7],
	},
};

export const themeButton: ThemeButton = {
	textPrimary: palette.neutral[100],
	backgroundPrimary: palette.brand[400],
	backgroundPrimaryHover: '#234B8A', // One-off colour variant generated from palette.brand[400]
	textSecondary: palette.brand[400],
	backgroundSecondary: palette.brand[800],
	backgroundSecondaryHover: '#ACC9F7', // One-off colour variant generated from palette.brand[800]
	textTertiary: palette.brand[400],
	backgroundTertiary:  'transparent',
	backgroundTertiaryHover: '#E5E5E5', // One-off colour variant
	borderTertiary: palette.brand[400],
	textSubdued: palette.brand[400],
} as const;

export const themeButtonBrand: ThemeButton = {
	textPrimary: palette.brand[400],
	backgroundPrimary: palette.neutral[100],
	backgroundPrimaryHover: '#E0E0E0', // One-off colour variant generated from palette.neutral[100]
	textSecondary: palette.neutral[100],
	backgroundSecondary: palette.brand[600],
	backgroundSecondaryHover: '#234B8A', // One-off colour variant generated from palette.brand[600]
	textTertiary: palette.neutral[100],
	backgroundTertiary: 'transparent',
	backgroundTertiaryHover: palette.brand[300],
	borderTertiary: palette.neutral[100],
	textSubdued: palette.neutral[100],
} as const;

export const themeButtonBrandAlt: ThemeButton = {
	textPrimary: palette.neutral[100],
	backgroundPrimary: palette.neutral[7],
	backgroundPrimaryHover: '#454545', // One-off colour variant generated from palette.neutral[7]
	textSecondary: palette.neutral[7],
	backgroundSecondary: palette.brandAlt[200],
	backgroundSecondaryHover: '#F2AE00', // One-off colour variant generated from palette.brandAlt[200]
	textTertiary: palette.neutral[0],
	backgroundTertiary: 'transparent',
	backgroundTertiaryHover: '#FFD213', // One-off colour variant
	borderTertiary: palette.neutral[7],
	textSubdued: palette.neutral[7],
} as const;
