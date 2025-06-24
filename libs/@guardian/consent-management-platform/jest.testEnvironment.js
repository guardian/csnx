/* eslint-disable import/no-default-export -- it's what JSDOM env does */

// https://stackoverflow.com/questions/74945569/cannot-access-built-in-node-js-fetch-function-from-jest-tests

import { TestEnvironment } from 'jest-environment-jsdom';

export default class FixJSDOMEnvironment extends TestEnvironment {
	constructor(...args) {
		super(...args);
		this.global.fetch = fetch;
		this.global.Request = Request;
		this.global.Response = Response;
		// And any other missing globals
	}
}
