const srcExports = require('.');
const bundleExports = require('../../../dist/libs/@guardian/browserslist-config');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
