/* eslint-disable import/no-default-export -- that's what jest likes */
// eslint-disable-next-line @nx/enforce-module-boundaries -- nx!
import { config } from '../../../configs/jest.config';

export default {
	...config,
	displayName: '@guardian/source-foundations',
	testEnvironment: 'node',
	setupFilesAfterEnv: [
		'./lib/jest-matchers/toBeValidCSS.ts',
		'./lib/jest-matchers/toMatchCSS.ts',
	],
};
