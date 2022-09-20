const srcExports = require('.');
const bundleExports = require('../../../dist/libs/@guardian/tsconfig');

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
