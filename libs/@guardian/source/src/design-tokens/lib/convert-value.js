// @ts-check

/** @param {number} n */
export const numberToRem = (n) => n / 16 + 'rem';

/** @param {number} n */
export const numberToRemNumber = (n) => n / 16;

/** @param {string} px */
export const pxStringToRem = (px) => numberToRem(pxStringToNumber(px));

/** @param {string} px */
export const pxStringToNumber = (px) => Number(px.slice(0, -2));

/** @param {string[]} fonts */
export const fontArrayToString = (fonts) =>
	fonts.map((name) => (name.includes(' ') ? `"${name}"` : name)).join(', ');
