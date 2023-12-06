export const removePx = (tokens) => {
	const tokensWithNumberValues = {};
	Object.keys(tokens).forEach((key) => {
		// Strip `px` unit from token and convert to numeric value
		tokensWithNumberValues[key] = Number(tokens[key].slice(0, -2));
	});
	return tokensWithNumberValues;
};

export const addRem = (tokens) => {
	const tokensWithRem = {};
	Object.keys(tokens).forEach((key) => {
		// Add `rem` unit to token
		tokensWithRem[key] = `${tokens[key] / 16}rem`;
	});
	return tokensWithRem;
};
