import { tokens } from '@guardian/design-tokens';
import { pxStringToNumber } from '../utils/convert-value';

export type Breakpoint =
	| 'mobile'
	| 'mobileMedium'
	| 'mobileLandscape'
	| 'phablet'
	| 'tablet'
	| 'desktop'
	| 'leftCol'
	| 'wide';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_media-queries--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/41be19-grids)
 */
export const breakpoints = {
	mobile: pxStringToNumber(tokens.breakpoint.mobile),
	mobileMedium: pxStringToNumber(tokens.breakpoint.mobileMedium),
	mobileLandscape: pxStringToNumber(tokens.breakpoint.mobileLandscape),
	phablet: pxStringToNumber(tokens.breakpoint.phablet),
	tablet: pxStringToNumber(tokens.breakpoint.tablet),
	desktop: pxStringToNumber(tokens.breakpoint.desktop),
	leftCol: pxStringToNumber(tokens.breakpoint.leftCol),
	wide: pxStringToNumber(tokens.breakpoint.wide),
} as const;
