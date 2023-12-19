import { pxStringToNumber, pxToRem, rootPixelFontSize } from './convert-value';

describe('pxToRem', () => {
	it('should calculate a rem equivalent of a pixel value', () => {
		const value = 17;
		const result = pxToRem(value);
		expect(result).toBe(value / rootPixelFontSize);
	});
});

describe('pxStringToNumber', () => {
	it('should convert a value with a px unit to a unitless number', () => {
		const value = '16px';
		const result = pxStringToNumber(value);
		expect(result).toBe(16);
		expect(typeof result).toBe('number');
	});
});
