const bundleExports = require('../../../dist/libs/@guardian/eslint-config-typescript');
const srcExports = require('.');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
