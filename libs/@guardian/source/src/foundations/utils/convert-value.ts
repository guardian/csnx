export const rootPixelFontSize = 16;

export const pxToRem = (px: number): `${number}rem` =>
	`${px / rootPixelFontSize}rem`;
