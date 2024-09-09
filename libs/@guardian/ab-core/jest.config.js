import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	displayName: '@guardian/ab-core',
	testEnvironment: 'jest-environment-jsdom',
};

export default config;
