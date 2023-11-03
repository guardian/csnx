import { pxToRem } from '../utils/px-to-rem';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/05f835-space)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 *
 ** `space[1]` -> 4px
 ** `space[2]` -> 8px
 ** `space[3]` -> 12px
 ** `space[4]` -> 16px
 ** `space[5]` -> 20px
 ** `space[6]` -> 24px
 ** `space[9]` -> 36px
 ** `space[12]` -> 48px
 ** `space[24]` -> 96px
 */
export const space = {
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	5: 20,
	6: 24,
	9: 36,
	12: 48,
	24: 96,
} as const;

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/05f835-space)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 *
 ** `remSpace[1]` -> 0.25rem
 ** `remSpace[2]` -> 0.5rem
 ** `remSpace[3]` -> 0.75rem
 ** `remSpace[4]` -> 1rem
 ** `remSpace[5]` -> 1.25rem
 ** `remSpace[6]` -> 1.5rem
 ** `remSpace[9]` -> 2.25rem
 ** `remSpace[12]` -> 3rem
 ** `remSpace[24]` -> 6rem
 */
export const remSpace: { [K in keyof typeof space]: string } = {
	1: `${pxToRem(space[1])}rem`,
	2: `${pxToRem(space[2])}rem`,
	3: `${pxToRem(space[3])}rem`,
	4: `${pxToRem(space[4])}rem`,
	5: `${pxToRem(space[5])}rem`,
	6: `${pxToRem(space[6])}rem`,
	9: `${pxToRem(space[9])}rem`,
	12: `${pxToRem(space[12])}rem`,
	24: `${pxToRem(space[24])}rem`,
};

/* TODO: this should be exposed as a number instead of a string,
   so consumers can perform calculations on it */

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System(https://theguardian.design/2a1e5182b/p/912e85-spacing/b/084803)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 *
 ** `space[1]` -> `spacing030`
 ** `space[2]` -> `spacing040`
 ** `space[3]` -> `spacing050`
 ** `space[4]` -> `spacing060`
 ** `space[5]` -> `spacing070`
 ** `space[6]` -> `spacing080`
 ** `space[9]` -> `spacing100`
 ** `space[12]` -> `spacing120`
 ** `space[24]` -> `spacing160`
 */
export const spacing010 = 0;
export const spacing020 = 2;
export const spacing030 = 4;
export const spacing040 = 8;
export const spacing050 = 12;
export const spacing060 = 16;
export const spacing070 = 20;
export const spacing080 = 24;
export const spacing090 = 32;
export const spacing100 = 36;
export const spacing110 = 40;
export const spacing120 = 48;
export const spacing130 = 56;
export const spacing140 = 64;
export const spacing150 = 72;
export const spacing160 = 96;
