const srcExports = require('./index');
const bundleExports = require('../../../dist/libs/@guardian/prettier');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
