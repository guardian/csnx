import { tokens } from '@csnx/design-tokens';
import { pxToRem } from '../utils/px-to-rem';
/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/05f835-space)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 *
 ** `space[0]` -> 2px
 ** `space[1]` -> 4px
 ** `space[2]` -> 8px
 ** `space[3]` -> 12px
 ** `space[4]` -> 16px
 ** `space[5]` -> 20px
 ** `space[6]` -> 24px
 ** `space[8]` -> 32px
 ** `space[9]` -> 36px
 ** `space[10]` -> 40px
 ** `space[12]` -> 48px
 ** `space[14]` -> 56px
 ** `space[16]` -> 64px
 ** `space[18]` -> 72px
 ** `space[24]` -> 96px
 */

type SpaceTokenKey = keyof typeof tokens.space;

const space = {} as { [K in SpaceTokenKey]: number };
const remSpace = {} as { [K in SpaceTokenKey]: string };

Object.keys(tokens.space).forEach((key) => {
	// Strip 'px' unit from token and convert to a numeric value
	const value = Number(tokens.space[key as SpaceTokenKey].slice(0, -2));

	space[key as SpaceTokenKey] = value;
	remSpace[key as SpaceTokenKey] = `${pxToRem(value)}rem`;
});

export { space, remSpace };
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

/* TODO: this should be exposed as a number instead of a string,
   so consumers can perform calculations on it */
