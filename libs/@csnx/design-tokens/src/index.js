import { tokens } from './build';

const space = {};
const remSpace = {};

// Convert px spacing tokens to unitless numeric values and rems
// to match existing format in Source Foundations
Object.keys(tokens.space).forEach((key) => {
	// Strip 'px' unit from token and convert to a numeric value
	const value = Number(tokens.space[key].slice(0, -2));
	space[key] = value;
	remSpace[key] = `${value / 16}rem`;
});

export { tokens, space, remSpace };
