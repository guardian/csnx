/* eslint-disable import/no-default-export -- that's what jest likes */

import { config as baseConfig } from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	displayName: '@guardian/source-react-components',
	testEnvironment: 'node',
};

export default config;
