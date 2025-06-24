import { disable, enable, isDisabled } from './disable.ts';

describe('Disabling consent management', () => {
	it('should be enabled by default', () => {
		expect(isDisabled()).toBe(false);
	});
	it('should disable consent management', () => {
		disable();
		enable();
		disable();
		expect(isDisabled()).toBe(true);
	});
	it('should enable consent management', () => {
		enable();
		disable();
		enable();
		expect(isDisabled()).toBe(false);
	});
});
