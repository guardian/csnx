import { breakpoint } from '@guardian/design-tokens';
import { pxStringToNumber } from '../utils/convert-value';

export type Breakpoint = keyof typeof breakpoint;

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
