import { isObject } from '@guardian/libs';

export const getDeps = async (pkgPath: string) => {
	/* eslint-disable @typescript-eslint/no-unsafe-assignment --
		json is an any
	*/
	const { dependencies, peerDependencies } = await import(pkgPath, {
		assert: { type: 'json' },
	});

	const deps: string[] = [];

	if (isObject(dependencies)) {
		deps.push(...Object.keys(dependencies));
	}

	if (isObject(peerDependencies)) {
		deps.push(...Object.keys(peerDependencies));
	}
	/* eslint-enable @typescript-eslint/no-unsafe-assignment  */

	return deps;
};
