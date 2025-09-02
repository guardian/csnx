import { getErrorMessage } from './getErrorMessage';

function throwCatchAndReturnErrorMessage(error: unknown): string {
	try {
		throw error;
	} catch (e) {
		return getErrorMessage(e);
	}
}

describe('getErrorMessage', () => {
	it('should return the error message from an Error object', () => {
		const error = new Error('This is an error');
		expect(getErrorMessage(error)).toBe('This is an error');

		expect(throwCatchAndReturnErrorMessage(error)).toBe('This is an error');
	});

	it('should return the message from an object with a message property', () => {
		const error = { message: 'This is a custom error message' };
		expect(getErrorMessage(error)).toBe('This is a custom error message');
	});

	it('should handle non-error objects by stringifying them', () => {
		const error = { foo: 'bar' };
		expect(getErrorMessage(error)).toBe('{"foo":"bar"}');
	});

	it('should handle circular references somewhat gracefully', () => {
		const circularObj = {};
		// @ts-expect-error -- we haven't specified a type for circularObj but we want to test circular references
		circularObj.self = circularObj;
		expect(getErrorMessage(circularObj)).toBe('[object Object]');
	});

	it("should handle the various things you can (but almost certainly shouldn't) throw in JavaScript", () => {
		expect(throwCatchAndReturnErrorMessage('string error')).toBe(
			'string error',
		);
		expect(throwCatchAndReturnErrorMessage(42)).toBe('42');
		expect(throwCatchAndReturnErrorMessage(true)).toBe('true');
		expect(throwCatchAndReturnErrorMessage(null)).toBe('null');
		expect(throwCatchAndReturnErrorMessage(undefined)).toBe('');
		expect(throwCatchAndReturnErrorMessage(Symbol('A'))).toBe('');
		expect(throwCatchAndReturnErrorMessage({})).toBe('{}');
		expect(throwCatchAndReturnErrorMessage([])).toBe('[]');

		const date = new Date();
		expect(throwCatchAndReturnErrorMessage(date)).toBe(JSON.stringify(date));
	});
});
