import type {
	ABTest,
	CoreAPI,
	CoreAPIConfig,
	Runnable,
	Variant,
} from './@types';
import { isExpired } from './time';

export const initCore = ({
	mvtMaxValue = 1_000_000,
	mvtId,
	pageIsSensitive,
	abTestSwitches,
	forcedTestVariants,
	forcedTestException,
	arrayOfTestObjects = [],
}: CoreAPIConfig): CoreAPI => {
	/**
	 * We only take account of a variant's canRun function if it's defined.
	 * If it's not, assume the variant can be run.
	 */
	const variantCanBeRun = (variant: Variant): boolean => {
		const isInTest = variant.id !== 'notintest';
		if (variant.canRun) {
			return variant.canRun() && isInTest;
		} else {
			return isInTest;
		}
	};

	const testCanBeRun = (test: ABTest): boolean => {
		const expired = isExpired(test.expiry);
		const testShouldShowForSensitive = !!test.showForSensitive;
		const isTestOn =
			abTestSwitches[`ab${test.id}`] && !!abTestSwitches[`ab${test.id}`];
		const canTestBeRun = test.canRun();

		return (
			(pageIsSensitive ? testShouldShowForSensitive : true) &&
			!!isTestOn &&
			!expired &&
			canTestBeRun
		);
	};

	/**
	 *
	 * Determine whether the user is in the test or not
	 * and return the associated variant ID, based on the MVT id segmentation.
	 *
	 * The test population is just a subset of MVT ids. A test population must
	 * begin from a specific value. Overlapping test ranges are permitted.
	 */
	const computeVariantFromMvtCookie = (test: ABTest): Variant | null => {
		const smallestTestId = mvtMaxValue * test.audienceOffset;
		const largestTestId = smallestTestId + mvtMaxValue * test.audience;

		if (mvtId && mvtId > smallestTestId && mvtId <= largestTestId) {
			// This mvt test id is in the test range, so allocate it to a test variant.
			return test.variants[mvtId % test.variants.length] ?? null;
		}

		// We return null if there is no variant that matches the test and variant fot the mvtId
		return null;
	};

	const getForcedTestVariant = (
		test: ABTest,
		forcedTestVariants: CoreAPIConfig['forcedTestVariants'],
	): Variant | false => {
		const testId = test.id;

		const getVariantFromIds = (test: ABTest, variantId: string) =>
			test.variants.find((variant) => variant.id === variantId) ?? false;

		const forcedTest = forcedTestVariants?.[testId]?.variant;

		return forcedTest ? getVariantFromIds(test, forcedTest) : false;
	};

	/**
	 * This is the heart of the A/B testing framework.
	 * It turns an `ABTest` into a `Runnable<ABTest>`,
	 * if indeed the test actually has a variant which could run
	 * on this page view.
	 *
	 * This function can be called at any time,
	 * it should always give the same result for a given page view.
	 */
	const runnableTest: CoreAPI['runnableTest'] = (test) => {
		const fromCookie = computeVariantFromMvtCookie(test);
		const variantFromForcedTest = getForcedTestVariant(
			test,
			forcedTestVariants,
		);
		const forcedOutOfTest = forcedTestException === test.id;
		const variantToRun = variantFromForcedTest || fromCookie;

		if (
			!forcedOutOfTest &&
			(variantFromForcedTest || testCanBeRun(test)) && // We ignore the test's canRun if the test is forced
			variantToRun &&
			(variantFromForcedTest || variantCanBeRun(variantToRun)) // We ignore the variant canRun if the test is forced
		) {
			return {
				...test,
				variantToRun,
			};
		}

		// The test and variant isn't runnable, sorry
		return null;
	};

	const allRunnableTests: CoreAPI['allRunnableTests'] = (tests) =>
		tests.reduce<Array<Runnable<ABTest>>>((prev, currentValue) => {
			const rt = runnableTest(currentValue);
			return rt ? [...prev, rt] : prev;
		}, []);

	const firstRunnableTest: CoreAPI['firstRunnableTest'] = (tests) =>
		tests
			.map((test: ABTest) => runnableTest(test))
			.find((rt: Runnable<ABTest> | null) => rt !== null) ?? null;

	const isUserInVariant: CoreAPI['isUserInVariant'] = (testId, variantId) =>
		allRunnableTests(arrayOfTestObjects).some(
			(runnableTest: ABTest & { variantToRun: Variant }) => {
				return (
					runnableTest.id === testId &&
					runnableTest.variantToRun.id === variantId
				);
			},
		);

	return {
		allRunnableTests,
		runnableTest,
		firstRunnableTest,
		isUserInVariant,
	};
};
