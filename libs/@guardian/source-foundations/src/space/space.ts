import { tokens } from '@guardian/design-tokens';
import { pxStringToNumber, pxToRem } from '../utils/convert-value';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/05f835-space)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 *
 */
export const space = {
	0: pxStringToNumber(tokens.space[0]),
	1: pxStringToNumber(tokens.space[1]),
	2: pxStringToNumber(tokens.space[2]),
	3: pxStringToNumber(tokens.space[3]),
	4: pxStringToNumber(tokens.space[4]),
	5: pxStringToNumber(tokens.space[5]),
	6: pxStringToNumber(tokens.space[6]),
	8: pxStringToNumber(tokens.space[8]),
	9: pxStringToNumber(tokens.space[9]),
	10: pxStringToNumber(tokens.space[10]),
	12: pxStringToNumber(tokens.space[12]),
	14: pxStringToNumber(tokens.space[14]),
	16: pxStringToNumber(tokens.space[16]),
	18: pxStringToNumber(tokens.space[18]),
	24: pxStringToNumber(tokens.space[24]),
} as const;

export const remSpace: { [K in keyof typeof space]: string } = {
	0: `${pxToRem(space[0])}rem`,
	1: `${pxToRem(space[1])}rem`,
	2: `${pxToRem(space[2])}rem`,
	3: `${pxToRem(space[3])}rem`,
	4: `${pxToRem(space[4])}rem`,
	5: `${pxToRem(space[5])}rem`,
	6: `${pxToRem(space[6])}rem`,
	8: `${pxToRem(space[8])}rem`,
	9: `${pxToRem(space[9])}rem`,
	10: `${pxToRem(space[10])}rem`,
	12: `${pxToRem(space[12])}rem`,
	14: `${pxToRem(space[14])}rem`,
	16: `${pxToRem(space[16])}rem`,
	18: `${pxToRem(space[18])}rem`,
	24: `${pxToRem(space[24])}rem`,
};
