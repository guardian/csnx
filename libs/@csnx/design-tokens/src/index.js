import { tokens } from './build';

const palette = tokens.palette;
const space = {};
const remSpace = {};

/**
 * Convert `px` spacing tokens to unitless numeric values and `rem` equivalent
 * to match existing Source Foundation spacing token structure
 */
Object.keys(tokens.space).forEach((key) => {
	// Strip `px` unit from token and convert to numeric value
	const value = Number(tokens.space[key].slice(0, -2));
	space[key] = value;
	remSpace[key] = `${value / 16}rem`;
});

export { palette, space, remSpace };
