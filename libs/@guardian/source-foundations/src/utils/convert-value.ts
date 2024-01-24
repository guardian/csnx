export const rootPixelFontSize = 16;
export const pxToRem = (px: number): number => px / rootPixelFontSize;
export const pxStringToNumber = (px: string): number => Number(px.slice(0, -2));
export const fontArrayToString = (
	fonts: readonly string[],
): string =>
	fonts.map((name) => (name.includes(' ') ? `"${name}"` : name)).join(', ');
