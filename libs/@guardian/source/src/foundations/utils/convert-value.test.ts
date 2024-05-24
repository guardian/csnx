import {
	fontArrayToString,
	pxStringToNumber,
	pxStringToRem,
	pxToRem,
} from './convert-value';

describe('pxToRem', () => {
	it('should calculate a rem equivalent of a pixel value', () => {
		const value = 17;
		const result = pxToRem(value);
		expect(result).toBe(1.0625);
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

describe('pxStringToRem', () => {
	it('should convert a value with a px unit to rem equivalent', () => {
		const value = '20px';
		const result = pxStringToRem(value);
		expect(result).toBe(1.25);
		expect(typeof result).toBe('number');
	});
});

describe('fontArrayToString', () => {
	it('should convert an array of font names to a valid `font-family` value', () => {
		const value = ['GuardianTextEgyptian', 'Georgia', 'serif'];
		const result = fontArrayToString(value);
		expect(result).toBe('GuardianTextEgyptian, Georgia, serif');
	});

	it('should quote any font names containing spaces', () => {
		const value = [
			'GuardianTextSans',
			'Helvetica Neue',
			'Helvetica',
			'Arial',
			'Lucida Grande',
			'sans-serif',
		];
		const result = fontArrayToString(value);
		expect(result).toBe(
			'GuardianTextSans, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
		);
	});
});
