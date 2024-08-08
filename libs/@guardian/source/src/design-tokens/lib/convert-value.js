/** @param {number} px */
export const pxToRem = (px) => px / 16;

/** @param {string} px */
export const pxStringToRem = (px) => pxToRem(pxStringToNumber(px));

/** @param {string} px */
export const pxStringToNumber = (px) => Number(px.slice(0, -2));

/** @param {string[]} px */
export const fontArrayToString = (fonts) =>
	fonts.map((name) => (name.includes(' ') ? `"${name}"` : name)).join(', ');
