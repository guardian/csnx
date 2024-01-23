import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual([
			'getCookie',
			'removeCookie',
			'setCookie',
			'setSessionCookie',
			'storage',
		]);
	});
});

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';
