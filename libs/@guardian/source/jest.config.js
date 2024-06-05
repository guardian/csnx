/* eslint-disable import/no-default-export -- that's what jest likes */

import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	displayName: '@guardian/source',
	testEnvironment: 'node',
	setupFilesAfterEnv: [
		'./lib/jest-matchers/toBeValidCSS.ts',
		'./lib/jest-matchers/toMatchCSS.ts',
	],
};

export default config;
