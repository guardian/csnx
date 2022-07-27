import { publicLib } from './public-lib';

describe('publicLib', () => {
	it('should work', () => {
		expect(publicLib()).toEqual('no-build-lib private-lib public-lib');
	});
});
