import type { ABTestAPI } from './@types';
import { AB } from './ab';

const DEFAULT_CONFIG = {
	mvtMaxValue: 1_000_000,
	mvtId: 1234,
	pageIsSensitive: false,
	abTestSwitches: {},
	serverSideTests: {},
	errorReporter: () => null,
	ophanRecord: () => null,
	forcedTestVariants: undefined,
	forcedTestException: undefined,
	arrayOfTestObjects: [],
};

describe('A/B Initialisation', () => {
	test('Initialisation returns API', () => {
		const myAB: ABTestAPI = new AB(DEFAULT_CONFIG);
		expect(myAB).not.toBeUndefined();
		expect(myAB.isUserInVariant).not.toBeUndefined();
		expect(myAB.firstRunnableTest).not.toBeUndefined();
		expect(myAB.trackABTests).not.toBeUndefined();
		expect(myAB.registerCompleteEvents).not.toBeUndefined();
	});
});
