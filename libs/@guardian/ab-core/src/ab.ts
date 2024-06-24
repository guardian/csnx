import type { ABTestAPI, AbTestConfig, CoreAPI, OphanAPI } from './@types';
import { initCore } from './core';
import { initOphan } from './ophan';

export class AB implements ABTestAPI {
	private readonly _core: CoreAPI;
	private readonly _ophan: OphanAPI;

	constructor({
		abTestSwitches,
		arrayOfTestObjects,
		errorReporter,
		forcedTestException,
		forcedTestVariants,
		mvtId,
		mvtMaxValue,
		ophanRecord,
		pageIsSensitive,
		serverSideTests,
	}: AbTestConfig) {
		this._core = initCore({
			abTestSwitches,
			arrayOfTestObjects,
			forcedTestException,
			forcedTestVariants,
			mvtId,
			mvtMaxValue,
			pageIsSensitive,
		});
		this._ophan = initOphan({
			errorReporter,
			ophanRecord,
			serverSideTests,
		});
	}

	// CoreAPI
	get allRunnableTests() {
		return this._core.allRunnableTests;
	}
	get firstRunnableTest() {
		return this._core.firstRunnableTest;
	}
	get runnableTest() {
		return this._core.runnableTest;
	}
	get isUserInVariant() {
		return this._core.isUserInVariant;
	}

	// OphanAPI
	get registerCompleteEvents() {
		return this._ophan.registerCompleteEvents;
	}
	get registerImpressionEvents() {
		return this._ophan.registerImpressionEvents;
	}
	get trackABTests() {
		return this._ophan.trackABTests;
	}
}
