const bundleExports = require('../../../dist/libs/@guardian/browserslist-config');
const srcExports = require('.');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
