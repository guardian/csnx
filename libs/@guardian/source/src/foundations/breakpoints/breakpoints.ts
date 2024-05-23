import { breakpoint } from '@guardian/design-tokens';
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
	mobile: pxStringToNumber(breakpoint.mobile),
	mobileMedium: pxStringToNumber(breakpoint.mobileMedium),
	mobileLandscape: pxStringToNumber(breakpoint.mobileLandscape),
	phablet: pxStringToNumber(breakpoint.phablet),
	tablet: pxStringToNumber(breakpoint.tablet),
	desktop: pxStringToNumber(breakpoint.desktop),
	leftCol: pxStringToNumber(breakpoint.leftCol),
	wide: pxStringToNumber(breakpoint.wide),
} as const;
