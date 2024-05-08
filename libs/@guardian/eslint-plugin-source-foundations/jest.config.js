/* eslint-disable import/no-default-export -- that's what jest likes */

import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	displayName: '@guardian/eslint-plugin-source-foundations',
	testEnvironment: 'node',
};

export default config;
