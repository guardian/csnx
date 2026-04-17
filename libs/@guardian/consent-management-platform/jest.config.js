import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	displayName: '@guardian/consent-management-platform', // TODO: change this to the actual package name
	testEnvironment: './jest.testEnvironment.js',
	testMatch: ['<rootDir>/src/**/*.(spec|test).[jt]s?(x)'],
};

export default config;
