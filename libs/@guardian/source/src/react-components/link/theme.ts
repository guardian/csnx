import { palette } from '@guardian/source-foundations';

export type ThemeLink = {
	textPrimary: string;
	textPrimaryHover: string;
	textSecondary: string;
	textSecondaryHover: string;
};

/** @deprecated Use `Partial<ThemeLink>` and component `theme` prop instead of `LinkTheme` */
export type LinkTheme = {
	textPrimary: string;
	textPrimaryHover: string;
	textSecondary?: string;
	textSecondaryHover?: string;
};

/** @deprecated Use `themeLink` and component `theme` prop instead of emotion's `ThemeProvider` */
export const linkThemeDefault: { link: LinkTheme } = {
	link: {
		textPrimary: palette.brand[500],
		textPrimaryHover: palette.brand[500],
		textSecondary: palette.neutral[7],
		textSecondaryHover: palette.neutral[7],
	},
};

/** @deprecated Use `themeLinkBrand` and component `theme` prop instead of emotion's `ThemeProvider` */
export const linkThemeBrand: { link: LinkTheme } = {
	link: {
		textPrimary: palette.neutral[100],
		textPrimaryHover: palette.neutral[100],
	},
};

/** @deprecated Use `themeLinkBrandAlt` and component `theme` prop instead of emotion's `ThemeProvider` */
export const linkThemeBrandAlt: { link: LinkTheme } = {
	link: {
		textPrimary: palette.neutral[7],
		textPrimaryHover: palette.neutral[7],
	},
};

export const themeLink: ThemeLink = {
	textPrimary: palette.brand[500],
	textPrimaryHover: palette.brand[500],
	textSecondary: palette.neutral[7],
	textSecondaryHover: palette.neutral[7],
} as const;

export const themeLinkBrand: Partial<ThemeLink> = {
	textPrimary: palette.neutral[100],
	textPrimaryHover: palette.neutral[100],
} as const;

export const themeLinkBrandAlt: Partial<ThemeLink> = {
	textPrimary: palette.neutral[7],
	textPrimaryHover: palette.neutral[7],
} as const;
