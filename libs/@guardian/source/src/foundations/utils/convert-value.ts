export type RemString<N extends number = number> = `${N}rem`;
export type PxString<N extends number = number> = `${N}px`;

export const rootPixelFontSize = 16;

export const pxToRem = (px: number): RemString =>
	`${px / rootPixelFontSize}rem`;

export const pxStringToRem = (px: PxString): RemString =>
	pxToRem(pxStringToNumber(px));

export const pxStringToNumber = <N extends number>(px: PxString<N>): N =>
	Number(px.slice(0, -2)) as N;

export const fontArrayToString = (fonts: readonly string[]): string =>
	fonts.map((name) => (name.includes(' ') ? `"${name}"` : name)).join(', ');
