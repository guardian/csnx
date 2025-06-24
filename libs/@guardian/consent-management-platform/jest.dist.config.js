/* eslint-disable import/no-default-export -- it's what jest likes */

import devConfig from './jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...devConfig,
	// only run tests in the src root in e2e mode
	testMatch: ['<rootDir>/src/?(*.)+(spec|test).[jt]s?(x)'],
};

export default config;
