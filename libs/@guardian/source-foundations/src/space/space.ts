import { pxToRem } from '../utils/px-to-rem';
import { tokens } from '@csnx/design-tokens';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/05f835-space)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 */

export const space = tokens.space;

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/05f835-space)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 *
 ** `remSpace[0]` -> 0.125rem
 ** `remSpace[1]` -> 0.25rem
 ** `remSpace[2]` -> 0.5rem
 ** `remSpace[3]` -> 0.75rem
 ** `remSpace[4]` -> 1rem
 ** `remSpace[5]` -> 1.25rem
 ** `remSpace[6]` -> 1.5rem
 ** `remSpace[8]` -> 2rem
 ** `remSpace[9]` -> 2.25rem
 ** `remSpace[10]` -> 2.5rem
 ** `remSpace[12]` -> 3rem
 ** `remSpace[14]` -> 3.5rem
 ** `remSpace[16]` -> 4rem
 ** `remSpace[18]` -> 4.5rem
 ** `remSpace[24]` -> 6rem
 */
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

/* TODO: this should be exposed as a number instead of a string,
   so consumers can perform calculations on it */
