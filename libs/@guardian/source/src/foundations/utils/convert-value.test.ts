import { pxToRem } from './convert-value';

describe('pxToRem', () => {
	it('should calculate a value with a rem unit from a pixel value', () => {
		const value = 17;
		const result = pxToRem(value);
		expect(result).toBe('1.0625rem');
	});
});
