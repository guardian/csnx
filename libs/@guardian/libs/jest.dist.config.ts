/* eslint-disable import/no-default-export -- it's what jest likes */
import config from './jest.config';

export default {
	...config,
	// only run tests in the src root in e2e mode
	testMatch: ['<rootDir>/src/?(*.)+(spec|test).[jt]s?(x)'],
};
