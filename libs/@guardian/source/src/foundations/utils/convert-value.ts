export type RemString<N extends number = number> = `${N}rem`;
export type PxString<N extends number = number> = `${N}px`;

export const rootPixelFontSize = 16;

export const pxToRem = (px: number): RemString =>
	`${px / rootPixelFontSize}rem`;
