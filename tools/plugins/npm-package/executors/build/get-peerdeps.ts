import { isObject } from '@guardian/libs';

export const getPeerDeps = async (pkgPath: string) => {
	/* eslint-disable
	/* eslint-disable @typescript-eslint/no-unsafe-assignment --
		json is an any
	*/
	const { peerDependencies } = await import(pkgPath, {
		assert: { type: 'json' },
	});

	let peerDeps: string[] = [];

	if (isObject(peerDependencies)) {
		peerDeps = Object.keys(peerDependencies);
	}
	/* eslint-enable @typescript-eslint/no-unsafe-assignment  */

	return peerDeps;
};
