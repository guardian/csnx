import * as bundleExports from '../../../../dist/libs/@guardian/eslint-plugin-source-react-components/cjs';
import * as srcExports from '.';

describe('The bundle', () => {
	it('exports everything it should', () => {
		expect(srcExports).toEqual(bundleExports);
	});
});
