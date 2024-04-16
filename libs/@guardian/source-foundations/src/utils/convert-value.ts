export const rootPixelFontSize = 16;

export const pxToRem = (px: number): number => px / rootPixelFontSize;
export const pxStringToRem = (px: `${number}px`): number =>
	pxToRem(pxStringToNumber(px));
export const pxStringToNumber = <N extends number>(px: `${N}px`): N =>
	Number(px.slice(0, -2)) as N;
export const fontArrayToString = (fonts: readonly string[]): string =>
	fonts.map((name) => (name.includes(' ') ? `"${name}"` : name)).join(', ');
