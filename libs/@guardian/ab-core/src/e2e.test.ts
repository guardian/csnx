import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual(['AB', 'default']);
	});
});

// test that type exports have not been removed.
// won't catch new types but I don't know how we can?
export type {
	ABTest,
	ABTestAPI,
	AbTestConfig,
	CoreAPIConfig,
	Participations,
	Runnable,
	Variant,
} from './index';

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';
