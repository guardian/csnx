import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	testEnvironment: 'jsdom',
	displayName: '@guardian/stand',
	setupFilesAfterEnv: ['<rootDir>/jest-setup-after-env.ts'],
};

export default config;
