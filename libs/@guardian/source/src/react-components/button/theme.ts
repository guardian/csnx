import { palette } from '../../foundations';

export type ThemeButton = {
	textPrimary: string;
	backgroundPrimary: string;
	backgroundPrimaryHover?: string;
	textSecondary: string;
	backgroundSecondary: string;
	backgroundSecondaryHover?: string;
	textTertiary: string;
	backgroundTertiary: string;
	backgroundTertiaryHover?: string;
	borderTertiary: string;
	textSubdued: string;
};

export const themeButton: ThemeButton = {
	textPrimary: 'var(--primitives-color-neutral-980)',
	backgroundPrimary: 'var(--primitives-color-brand-blue-400)',
	textSecondary: 'var(--primitives-color-brand-blue-400)',
	backgroundSecondary: 'var(--primitives-color-brand-blue-800)',
	textTertiary: 'var(--primitives-color-brand-blue-400)',
	backgroundTertiary: 'transparent',
	borderTertiary: 'var(--primitives-color-brand-blue-400)',
	textSubdued: 'var(--primitives-color-brand-blue-400)',
} as const;

export const themeButtonBrand: ThemeButton = {
	textPrimary: 'var(--primitives-color-brand-blue-400)',
	backgroundPrimary: 'var(--primitives-color-neutral-980)',
	textSecondary: 'var(--primitives-color-neutral-980)',
	backgroundSecondary: 'var(--primitives-color-brand-blue-600)',
	textTertiary: 'var(--primitives-color-neutral-980)',
	backgroundTertiary: 'transparent',
	backgroundTertiaryHover: 'var(--primitives-color-brand-blue-300)',
	borderTertiary: 'var(--primitives-color-neutral-980)',
	textSubdued: 'var(--primitives-color-neutral-980)',
} as const;

export const themeButtonBrandAlt: ThemeButton = {
	textPrimary: 'var(--primitives-color-neutral-980)',
	backgroundPrimary: 'var(--primitives-color-neutral-50)',
	textSecondary: 'var(--primitives-color-neutral-50)',
	backgroundSecondary: 'var(--primitives-color-brand-yellow-200)',
	textTertiary: 'var(--primitives-color-neutral-0)',
	backgroundTertiary: 'transparent',
	borderTertiary: 'var(--primitives-color-neutral-50)',
	textSubdued: 'var(--primitives-color-neutral-50)',
} as const;

/** @deprecated Use Partial<ThemeButton> instead */
export type ButtonTheme = {
	textPrimary: string;
	backgroundPrimary: string;
	backgroundPrimaryHover?: string;
	textSecondary?: string;
	backgroundSecondary?: string;
	backgroundSecondaryHover?: string;
	textTertiary?: string;
	backgroundTertiaryHover?: string;
	borderTertiary?: string;
	textSubdued?: string;
};

/** @deprecated Use `themeButton` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeDefault: { button: ButtonTheme } = {
	button: {
		textPrimary: palette.neutral[100],
		backgroundPrimary: palette.brand[400],
		textSecondary: palette.brand[400],
		backgroundSecondary: palette.brand[800],
		textTertiary: palette.brand[400],
		borderTertiary: palette.brand[400],
		textSubdued: palette.brand[400],
	},
};

/** @deprecated Use `themeButtonBrand` and component `theme` prop instead of emotion's `ThemeProvider` */
export const buttonThemeBrand: { button: ButtonTheme } = {
	button: {
		textPrimary: palette.brand[400],
		backgroundPrimary: palette.neutral[100],
		textSecondary: palette.neutral[100],
		backgroundSecondary: palette.brand[600],
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
		textSecondary: palette.neutral[7],
		backgroundSecondary: palette.brandAlt[200],
		textTertiary: palette.neutral[0],
		borderTertiary: palette.neutral[7],
		textSubdued: palette.neutral[7],
	},
};
