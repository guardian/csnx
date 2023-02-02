/**
 * This file makes sure no exports have been accidentally removed from the
 * package.
 */

import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual(['AB']);
	});
});

// test that type exports have not been removed.
// won't catch new types but can anything?
export type {
	ABTest,
	ABTestAPI,
	AbTestConfig,
	Participations,
	Runnable,
	Variant,
} from './index';

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';
