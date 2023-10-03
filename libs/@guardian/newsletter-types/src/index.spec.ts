import { testValidate } from './index';

describe('testValidate', () => {
	it('fails green', () => {
		expect(testValidate('green')).toBe(false);
	});
	it('passes red', () => {
		expect(testValidate('red')).toBe(true);
	});
});
