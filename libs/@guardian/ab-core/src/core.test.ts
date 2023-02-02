import type { ABTest, Runnable, Variant } from './@types';
import { initCore } from './core';
import { genAbTest, genVariant } from './fixture';

const DummyTest = genAbTest({ id: 'DummyTest' });
const initCoreDefaultConfig = {
	mvtMaxValue: 1000000,
	mvtId: 1234,
	pageIsSensitive: false,
	abTestSwitches: {
		abDummyTest: true,
		abDummyTestException: true,
		abFirstRunnable: true,
		abSecondRunnable: true,
	},
	arrayOfTestObjects: [DummyTest],
};

const abTestLibDefault = initCore(initCoreDefaultConfig);

describe('A/B test core', () => {
	beforeEach(() => {
		window.location.hash = '';
	});

	describe('runnableTest', () => {
		test('should return null for an expired test', () => {
			const expiredTest = genAbTest({
				id: 'DummyTest',
				canRun: true,
				expiry: '2000-01-01',
			});
			expect(abTestLibDefault.runnableTest(expiredTest)).toEqual(null);
		});

		test('should return null for a test which is switched off', () => {
			const test = genAbTest({ id: 'DummyTest', canRun: false });
			const rt = abTestLibDefault.runnableTest(test);
			expect(rt).toBeNull();
		});

		test('should return null if the test cannot be run', () => {
			const test = genAbTest({ id: 'DummyTest', canRun: false });
			expect(abTestLibDefault.runnableTest(test)).toBeNull();
		});

		test('should return null if the test can be run but the variant cannot', () => {
			const test = genAbTest({
				id: 'DummyTest',
				canRun: true,
				expiry: '9999-12-12',
				variants: [genVariant({ id: 'control', canRun: false })],
			});
			expect(abTestLibDefault.runnableTest(test)).toBeNull();
		});

		test('should return null if the mvtId is not in the audience offset', () => {
			const test = genAbTest({
				id: 'DummyTest',
				canRun: true,
				audienceOffset: 0.5,
			});
			expect(abTestLibDefault.runnableTest(test)).toBeNull();
		});

		test('should return true if the mvtId is in the audience offset', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					mvtId: 600000,
				},
			});
			const test = genAbTest({
				id: 'DummyTest',
				canRun: true,
				audienceOffset: 0.5,
			});
			expect(abTestLib.runnableTest(test)).not.toBeNull();
		});

		test('should return the forced variant on matching test', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					forcedTestVariants: {
						DummyTest: {
							variant: 'variant',
						},
					},
				},
			});
			const test = genAbTest({ id: 'DummyTest', canRun: true });
			const rt = abTestLib.runnableTest(test);
			expect(rt).not.toBeNull();
			if (rt) {
				expect(rt.variantToRun).toHaveProperty('id', 'variant');
			}
		});

		test('should fall back to normal variant if forcedTestVariants does not match', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					forcedTestVariants: {
						DummyTest: {
							variant: 'variantDoesNotExist',
						},
					},
				},
			});
			const test = genAbTest({ id: 'DummyTest', canRun: true });
			const rt = abTestLib.runnableTest(test);
			expect(rt).not.toBeNull();
			if (rt) {
				expect(rt.variantToRun).toHaveProperty('id', 'control');
			}
		});

		test('should return undefined if no forced variants', () => {
			const test = genAbTest({ id: 'DummyTest', audience: 0.1 });

			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					forcedTestVariants: {},
					mvtId: 999999, // Not in the test
					arrayOfTestObjects: [test],
				},
			});

			const rt = abTestLib.runnableTest(test);
			expect(rt).toBeNull();
		});

		test('should return the forced variants when there are multiple matching', () => {
			const DummyTest2 = genAbTest({
				id: 'DummyTest2',
				variants: [
					genVariant({
						id: 'variant',
						canRun: true,
					}),
				],
			});
			const DummyTest3 = genAbTest({
				id: 'DummyTest3',
				variants: [
					genVariant({
						id: 'variant',
						canRun: false,
					}),
				],
			});
			const DummyTest4 = genAbTest({
				id: 'DummyTest4',
				variants: [
					genVariant({
						id: 'variant',
						canRun: true,
					}),
				],
			});
			const DummyTest5 = genAbTest({
				id: 'DummyTest5',
				canRun: false,
				variants: [
					genVariant({
						id: 'variant',
						canRun: true,
					}),
				],
			});
			const DummyTest6 = genAbTest({
				id: 'DummyTest6',
				audience: 0.1,
				variants: [
					genVariant({
						id: 'variant',
						canRun: true,
					}),
				],
			});

			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					mvtId: 500000,
					abTestSwitches: {
						abDummyTest2: true,
						abDummyTest3: true,
						abDummyTest4: true,
						abDummyTest5: true,
						abDummyTest6: true,
					},
					arrayOfTestObjects: [
						DummyTest2,
						DummyTest3,
						DummyTest4,
						DummyTest5,
						DummyTest6,
					],
					forcedTestVariants: {
						DummyTest2: {
							variant: 'variant',
						},
						DummyTest4: {
							variant: 'variant',
						},
						DummyTest5: {
							variant: 'variant',
						},
						DummyTest6: {
							variant: 'variant',
						},
					},
				},
			});

			const runnableWithVariant = (
				test: Runnable<
					ABTest & {
						variantToRun: Variant;
					}
				> | null,
			) => {
				expect(test).not.toBeNull();
				if (test) {
					expect(test.variantToRun).toHaveProperty('id', 'variant');
				}
			};

			// Forced Test: canRun: false in the AB Test
			const test2 = genAbTest({ id: 'DummyTest2', canRun: true });
			runnableWithVariant(abTestLib.runnableTest(test2));

			// Non-Forced Test: canRun: false in the variant
			const test3 = genAbTest({
				id: 'DummyTest3',
				canRun: true,
				variants: [genVariant({ id: 'variant', canRun: false })],
			});
			const rt3 = abTestLib.runnableTest(test3);
			expect(rt3).toBeNull();

			// Forced Test: canRun: false in the variant
			const test4 = genAbTest({
				id: 'DummyTest4',
				canRun: true,
				variants: [genVariant({ id: 'variant', canRun: false })],
			});
			runnableWithVariant(abTestLib.runnableTest(test4));

			// Forced Test: canRun: false in the AB Test
			const test5 = genAbTest({
				id: 'DummyTest5',
				canRun: false,
				variants: [genVariant({ id: 'variant', canRun: true })],
			});
			runnableWithVariant(abTestLib.runnableTest(test5));

			// Forced Test: Test not in the mvtId range
			const test6 = genAbTest({
				id: 'DummyTest6',
				canRun: false,
				variants: [genVariant({ id: 'variant', canRun: true })],
			});
			runnableWithVariant(abTestLib.runnableTest(test6));
		});

		test('should return the variantToRun specified by the mvtId, if the test is not the runnableTest param', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					forcedTestVariants: {
						NotDummyTest: {
							variant: 'variant123',
						},
					},
				},
			});
			const test = genAbTest({
				id: 'DummyTest',
				canRun: true,
				variants: [
					genVariant({ id: 'control234', canRun: true }),
					genVariant({ id: 'variant234', canRun: true }),
				],
			});
			const rt = abTestLib.runnableTest(test);
			expect(rt).not.toBeNull();
			if (rt) {
				expect(rt.variantToRun).toHaveProperty('id', 'control234');
			}
		});

		test('should return the variantToRun specified by the mvtId, if forced variant is absent (odd mvtId)', () => {
			const test = genAbTest({
				id: 'DummyTest',
				canRun: true,
				variants: [
					genVariant({ id: 'control456', canRun: true }),
					genVariant({ id: 'variant456', canRun: true }),
				],
			});
			const rt = abTestLibDefault.runnableTest(test);
			expect(rt).not.toBeNull();
			if (rt) {
				expect(rt.variantToRun).toHaveProperty('id', 'control456');
			}
		});

		test('should return the variantToRun specified by the mvtId, if forced variant is absent (even mvtId)', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					mvtId: 1245,
				},
			});
			const test = genAbTest({
				id: 'DummyTest',
				canRun: true,
				variants: [
					genVariant({ id: 'control789', canRun: true }),
					genVariant({ id: 'variant789', canRun: true }),
				],
			});
			const rt = abTestLib.runnableTest(test);
			expect(rt).not.toBeNull();
			if (rt) {
				expect(rt.variantToRun).toHaveProperty('id', 'variant789');
			}
		});

		test('when forcedTestException is set, it should return null for matching tests and not null for other tests', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{ forcedTestException: 'DummyTestException' },
			});

			const test = genAbTest({ id: 'DummyTest', canRun: true });
			const rt = abTestLib.runnableTest(test);
			expect(rt).not.toBeNull();

			const testException = genAbTest({ id: 'DummyTestException' });
			const rtException = abTestLib.runnableTest(testException);
			expect(rtException).toBeNull();
		});
	});

	describe('isUserInVariant', () => {
		test('Returns correct boolean values when user is in one variant', () => {
			// The user mvtId is 1234, which puts them into the 'control' bucket
			// with two variants, as it is an even number
			expect(
				abTestLibDefault.isUserInVariant(DummyTest.id, 'control'),
			).toBeTruthy();
			expect(
				abTestLibDefault.isUserInVariant(DummyTest.id, 'variant'),
			).toBeFalsy();
		});

		test('Returns correct boolean values when user is in the other variant', () => {
			const DummyTest = genAbTest({
				id: 'DummyTest',
			});
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{ arrayOfTestObjects: [DummyTest], mvtId: 1235 },
			});
			// The user mvtId is 1235
			// so the user should not in the variant bucket
			expect(abTestLib.isUserInVariant(DummyTest.id, 'control')).toBeFalsy();
			expect(abTestLib.isUserInVariant(DummyTest.id, 'variant')).toBeTruthy();
		});

		test('Returns false when user is in no variant', () => {
			const DummyTest = genAbTest({
				id: 'DummyTest',
				audience: 0.1,
				audienceOffset: 0.9,
			});
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{ arrayOfTestObjects: [DummyTest] },
			});
			// The user mvtId is 1234, and the test audience is 90-100%
			// so the user should not be in any variants
			expect(abTestLib.isUserInVariant(DummyTest.id, 'control')).toBeFalsy();
			expect(abTestLib.isUserInVariant(DummyTest.id, 'variant')).toBeFalsy();
		});

		test("Returns false when test can't run", () => {
			const DummyTest = genAbTest({
				id: 'DummyTest',
				canRun: false,
			});
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{ arrayOfTestObjects: [DummyTest] },
			});
			expect(abTestLib.isUserInVariant(DummyTest.id, 'control')).toBeFalsy();
			expect(abTestLib.isUserInVariant(DummyTest.id, 'variant')).toBeFalsy();
		});
	});

	describe('firstRunnableTest', () => {
		test('should return first runnable test from array', () => {
			const firstRunnable = genAbTest({
				id: 'FirstRunnable',
				canRun: true,
			});

			const secondRunnable = genAbTest({
				id: 'SecondRunnable',
				canRun: true,
			});

			expect(
				abTestLibDefault.firstRunnableTest([firstRunnable, secondRunnable]),
			).toHaveProperty('id', 'FirstRunnable');
		});

		test('should return null if no runnable tests', () => {
			const firstRunnable = genAbTest({
				id: 'FirstRunnable',
				canRun: false,
			});

			const secondRunnable = genAbTest({
				id: 'SecondRunnable',
				canRun: false,
			});

			expect(
				abTestLibDefault.firstRunnableTest([firstRunnable, secondRunnable]),
			).toBe(null);
		});

		test('should return runnable test if later in the array', () => {
			const firstRunnable = genAbTest({
				id: 'FirstRunnable',
				canRun: false,
			});

			const secondRunnable = genAbTest({
				id: 'SecondRunnable',
				canRun: true,
			});

			expect(
				abTestLibDefault.firstRunnableTest([firstRunnable, secondRunnable]),
			).toHaveProperty('id', 'SecondRunnable');
		});

		test('should return runnable test if one runnable variant', () => {
			const firstRunnable = genAbTest({
				id: 'FirstRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'RunnableVariant', canRun: true }),
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
				],
			});

			const secondRunnable = genAbTest({
				id: 'SecondRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
				],
			});

			expect(
				abTestLibDefault.firstRunnableTest([firstRunnable, secondRunnable]),
			).toHaveProperty('variantToRun.id', 'RunnableVariant');
		});

		test('Should Return null if not tests or variants runnable', () => {
			const firstRunnable = genAbTest({
				id: 'FirstRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
				],
			});

			const secondRunnable = genAbTest({
				id: 'SecondRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
				],
			});

			expect(
				abTestLibDefault.firstRunnableTest([firstRunnable, secondRunnable]),
			).toBe(null);
		});

		test('should return runnable if runnable test variants are only in a test later in the array falling into the correct mvtId bucket', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					mvtId: 1235,
				},
			});
			const firstRunnable = genAbTest({
				id: 'FirstRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
				],
			});

			const secondRunnable = genAbTest({
				id: 'SecondRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'UnRunnableVariant', canRun: false }),
					genVariant({ id: 'RunnableVariant2', canRun: true }),
				],
			});

			expect(
				abTestLib.firstRunnableTest([firstRunnable, secondRunnable]),
			).toHaveProperty('variantToRun.id', 'RunnableVariant2');
		});

		test('Returns expected first runnable test when all tests and variants are runnable', () => {
			const abTestLib = initCore({
				...initCoreDefaultConfig,
				...{
					mvtId: 1235,
				},
			});
			const firstRunnable = genAbTest({
				id: 'FirstRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'FirstRunnableVariant', canRun: true }),
					genVariant({ id: 'FirstRunnableVariant2', canRun: true }),
				],
			});

			const secondRunnable = genAbTest({
				id: 'SecondRunnable',
				canRun: true,
				variants: [
					genVariant({ id: 'SecondRunnableVariant', canRun: true }),
					genVariant({ id: 'SecondRunnableVariant2', canRun: true }),
				],
			});

			expect(
				abTestLib.firstRunnableTest([firstRunnable, secondRunnable]),
			).toHaveProperty('variantToRun.id', 'FirstRunnableVariant2');
		});
	});

	// TODO
});
