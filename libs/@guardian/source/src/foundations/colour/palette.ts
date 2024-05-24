import { palette as tokens } from '@guardian/design-tokens';

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-palette--palette) •
 * [Design System](https://theguardian.design/2a1e5182b/p/492a30-light-palette)
 *
 * Colour palette organised by type e.g. 'error', or pillar e.g. 'opinion'
 */
export const palette = {
	brand: tokens.brand,
	brandAlt: tokens.brandAlt,
	neutral: tokens.neutral,
	error: tokens.error,
	success: tokens.success,
	news: tokens.news,
	opinion: tokens.opinion,
	sport: tokens.sport,
	culture: tokens.culture,
	lifestyle: tokens.lifestyle,
	labs: tokens.labs,
	specialReport: tokens.specialReport,
	specialReportAlt: tokens.specialReportAlt,
	focus: tokens.focus,
} as const;
