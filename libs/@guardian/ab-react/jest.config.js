import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	displayName: '@guardian/ab-react',
	testEnvironment: 'jest-environment-jsdom',
};

export default config;
