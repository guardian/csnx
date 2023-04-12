/**
 * @param {number} value
 * @param {number} [precision] number of significant digits
 */
export const roundWithDecimals = (value, precision = 6) => {
	const power = Math.pow(10, precision);
	return Math.round(value * power) / power;
};
