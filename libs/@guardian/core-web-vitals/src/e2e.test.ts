import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual([
			'_',
			'bypassCoreWebVitalsSampling',
			'default',
			'initCoreWebVitals',
		]);
	});
});
