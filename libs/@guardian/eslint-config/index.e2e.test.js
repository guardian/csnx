const srcExports = require('.');
const bundleExports = require('../../../dist/libs/@guardian/eslint-config');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
