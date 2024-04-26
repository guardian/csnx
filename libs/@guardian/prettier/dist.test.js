const bundleExports = require('../../../dist/libs/@guardian/prettier');
const srcExports = require('.');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
