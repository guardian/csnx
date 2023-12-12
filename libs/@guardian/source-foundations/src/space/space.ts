import { tokens } from '@csnx/design-tokens';
import { pxToRem } from '../utils/px-to-rem';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_space--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/05f835-space)
 *
 * Can be applied to margin or padding properties, vertically or horizontally.
 *
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
