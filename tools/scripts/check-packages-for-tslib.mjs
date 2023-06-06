/**
 * We've set `"importHelpers": true,` in `tsconfig.base.json`. This means that
 * when `@csnx/npm-package` bundles our NPM libraries, anything that ends up
 * needing a helper from `tslib` will import it from `tslib`, rather than it
 * being inlined into the bundle.
 *
 * This helps consumers keep their bundles smaller, but it means that we need to
 * make sure that all of our libraries have (a valid) `tslib` as a peer
 * dependency.
 *
 * This script makes sure they do.
 */

import { getPackages } from '@manypkg/get-packages';
import { dim, red } from 'colorette';
import { pathFromRoot } from './project-paths.mjs';

const { packages } = await getPackages(pathFromRoot('.'));
const tslibVersion = packages.find(
	(pkg) => pkg.packageJson.name === '@guardian/libs',
)?.packageJson.peerDependencies.tslib;

const excludedPackages = ['@guardian/tsconfig'];

const missing = packages
	.filter((pkg) => !excludedPackages.includes(pkg.packageJson.name))
	.filter((pkg) => pathFromRoot(pkg.dir).startsWith('libs/'))
	.filter(
		(pkg) =>
			!Object.keys(pkg.packageJson.peerDependencies ?? {}).includes('tslib'),
	);

if (missing.length === 0) {
	process.exit(0);
}

missing.forEach((pkg) => {
	console.log(
		pkg.packageJson.name +
			red(` is missing tslib@${tslibVersion} in its peerDependencies.`) +
			'\n' +
			dim(
				`Please add it and make sure it also includes tslib@${tslibVersion.replace(
					'^',
					'',
				)} in its devDependencies`,
			),
	);
});

process.exit(1);
