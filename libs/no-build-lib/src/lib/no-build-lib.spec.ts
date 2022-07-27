import { noBuildLib } from './no-build-lib';

describe('noBuildLib', () => {
	it('should work', () => {
		expect(noBuildLib()).toEqual('no-build-lib');
	});
});
