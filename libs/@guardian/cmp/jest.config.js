import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	displayName: '@guardian/cmp',
	testEnvironment: './jest.testEnvironment.js',
	testMatch: ['<rootDir>/src/**/*.(spec|test).[jt]s?(x)'],
};

export default config;
