// Top Level Config and APIs

export type CoreAPIConfig = {
	mvtMaxValue?: number;
	mvtId: number;
	pageIsSensitive: boolean;
	// abTestSwitches start with ab with test ID: abTestIAmRunning
	abTestSwitches: Record<string, boolean>;
	forcedTestVariants?: Participations;
	forcedTestException?: ABTest['id'];
	arrayOfTestObjects: ABTest[];
};

export type CoreAPI = {
	allRunnableTests: (
		tests: readonly ABTest[],
	) => ReadonlyArray<Runnable<ABTest>> | [];
	runnableTest: (
		test: ABTest,
	) => Runnable<ABTest & { variantToRun: Variant }> | null;
	firstRunnableTest: (tests: readonly ABTest[]) => Runnable<ABTest> | null;
	isUserInVariant: (testId: ABTest['id'], variantId?: Variant['id']) => boolean;
};

export type OphanAPIConfig = {
	serverSideTests: ServerSideTests;
	errorReporter: ErrorReporterFunc;
	ophanRecord: OphanRecordFunction;
};

export type OphanAPI = {
	registerCompleteEvents: (tests: ReadonlyArray<Runnable<ABTest>>) => void;
	registerImpressionEvents: (tests: ReadonlyArray<Runnable<ABTest>>) => void;
	trackABTests: (tests: ReadonlyArray<Runnable<ABTest>>) => void;
};

export type ABTestAPI = CoreAPI & OphanAPI;
export type AbTestConfig = CoreAPIConfig & OphanAPIConfig;

// Internal

export type OphanProduct =
	| 'CONTRIBUTION'
	| 'RECURRING_CONTRIBUTION'
	| 'MEMBERSHIP_SUPPORTER'
	| 'MEMBERSHIP_PATRON'
	| 'MEMBERSHIP_PARTNER'
	| 'DIGITAL_SUBSCRIPTION'
	| 'PRINT_SUBSCRIPTION';

export interface OphanABEvent {
	variantName: string;
	complete: string | boolean;
	campaignCodes?: readonly string[];
}

export type OphanABPayload = Record<string, OphanABEvent>;

export type OphanRecordFunction = (
	send: Record<string, OphanABPayload>,
) => void;

type ListenerFunction = (f: () => void) => void;

export interface Variant {
	id: string;
	test: (x: Record<string, unknown>) => void;
	campaignCode?: string;
	canRun?: () => boolean;
	impression?: ListenerFunction;
	success?: ListenerFunction;
}

export interface ABTest {
	id: string;
	start: string;
	expiry: string;
	author: string;
	description: string;
	audience: number;
	audienceOffset: number;
	successMeasure: string;
	audienceCriteria: string;
	showForSensitive?: boolean;
	idealOutcome?: string;
	dataLinkNames?: string;
	variants: readonly Variant[];
	canRun: () => boolean;
	notInTest?: () => void;
}

export type Participations = Record<string, { variant: string }>;

export type Runnable<ABTest> = ABTest & {
	variantToRun: Variant;
};

export type ServerSideTests = Record<string, string>;

/**
 * Anything can be throw in JS, so you might want to narrow your return type
 * with `error instanceof Error`
 */
export type ErrorReporterFunc = (error: unknown) => void;
