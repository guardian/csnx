const bundleExports = require('../../../dist/libs/@guardian/eslint-config');
const srcExports = require('.');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
