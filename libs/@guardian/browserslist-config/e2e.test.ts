/**
 * This file makes sure no exports have been accidentally removed from the
 * package.
 */

const bundleExports = require('.');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(bundleExports).toEqual([
			'supports es6-module and >= 0.01% in @guardian/browserslist-config stats',
		]);
	});
});
