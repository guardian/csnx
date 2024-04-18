/* eslint-disable @nx/enforce-module-boundaries -- out root config lives in the root */
/* eslint-disable import/no-default-export -- that's what jest likes */

import type { Config } from 'jest';
import { config as baseConfig } from '../../../configs/jest.config';

const config: Config = {
	...baseConfig,
	displayName: '@guardian/source-react-components-development-kitchen',
	testEnvironment: 'node',
};

export default config;
