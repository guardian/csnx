import type { ABTest, Runnable, Variant } from './@types';

type GenVariantConfig = {
	id: string;
	canRun?: boolean;
	success?: (complete: () => void) => void;
	impression?: (track: () => void) => void;
};
export const genVariant = (genVariantConfig: GenVariantConfig): Variant => {
	const { id, canRun, success, impression } = genVariantConfig;
	return {
		id,
		test: (): undefined => undefined,
		...(canRun != null ? { canRun: (): boolean => !!canRun } : {}),
		success: success ?? undefined,
		impression: impression ?? undefined,
	};
};

type GenAbConfig = {
	id: string;
	canRun?: boolean;
	expiry?: string;
	variants?: Variant[];
	audience?: number;
	audienceOffset?: number;
};
export const genAbTest = (genAbConfig: GenAbConfig): ABTest => {
	const {
		id,
		canRun,
		expiry = '9999-12-12',
		variants,
		audience = 1,
		audienceOffset = 0,
	} = genAbConfig;

	return {
		id,
		audienceCriteria: 'n/a',
		audienceOffset,
		audience,
		author: 'n/a',
		canRun: (): boolean => {
			if (canRun !== undefined) return !!canRun;
			return true;
		},
		description: 'n/a',
		start: '0001-01-01',
		expiry,
		successMeasure: 'n/a',
		variants: variants ?? [
			genVariant({ id: 'control' }),
			genVariant({ id: 'variant' }),
		],
	};
};

export const genRunnableAbTestWhereControlIsRunnable = (
	id: string,
	canRun?: boolean,
	variants?: Variant[],
): Runnable<ABTest> => {
	const abTest = genAbTest({ id, canRun, variants });

	const variantToRun = abTest.variants[0];
	if (!variantToRun) throw new Error('Invalid variant to run');

	return {
		...abTest,
		variantToRun,
	};
};

export const genRunnableAbTestWhereVariantIsRunnable = (
	id: string,
	canRun?: boolean,
): Runnable<ABTest> => {
	const abTest = genAbTest({ id, canRun });

	const variantToRun = abTest.variants[1];
	if (!variantToRun) throw new Error('Invalid variant to run');

	return {
		...abTest,
		variantToRun,
	};
};
