import { helloWorld } from './hello-world';

describe('helloWorld', () => {
	it('should work', () => {
		expect(helloWorld()).toEqual('Hello world!');
	});
});
