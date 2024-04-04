import { tokens } from '@guardian/design-tokens';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_palette--palette) •
 * [Design System](https://theguardian.design/2a1e5182b/p/492a30-light-palette)
 *
 * Colour palette organised by type e.g. 'error', or pillar e.g. 'opinion'
 */
export const palette = {
	brand: tokens.palette.brand,
	brandAlt: tokens.palette.brandAlt,
	neutral: tokens.palette.neutral,
	error: tokens.palette.error,
	success: tokens.palette.success,
	news: tokens.palette.news,
	opinion: tokens.palette.opinion,
	sport: tokens.palette.sport,
	culture: tokens.palette.culture,
	lifestyle: tokens.palette.lifestyle,
	labs: tokens.palette.labs,
	specialReport: tokens.palette.specialReport,
	specialReportAlt: tokens.palette.specialReportAlt,
	focus: tokens.palette.focus,
} as const;
