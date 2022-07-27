import { privateLib } from './private-lib';

describe('privateLib', () => {
	it('should work', () => {
		expect(privateLib()).toEqual('no-build-lib private-lib');
	});
});
