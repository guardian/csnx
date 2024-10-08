// @ts-check

const rootPixelFontSize = 16;

/** @param {number} n */
export const numberToRem = (n) => n / rootPixelFontSize + 'rem';

/** @param {number} n */
export const numberToRemNumber = (n) => n / rootPixelFontSize;

/** @param {string} px */
export const pxStringToRem = (px) => numberToRem(pxStringToNumber(px));

/** @param {string} px */
export const pxStringToNumber = (px) => Number(px.slice(0, -2));

/** @param {string[]} fonts */
export const fontArrayToString = (fonts) =>
	fonts.map((name) => (name.includes(' ') ? `"${name}"` : name)).join(', ');
