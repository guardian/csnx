import { getPackages } from '@manypkg/get-packages';
import { dim, red } from 'colorette';
import { pathFromRoot } from './project-paths.mjs';

const { packages } = await getPackages();
const tslibVersion = packages.find(
	(pkg) => pkg.packageJson.name === '@guardian/libs',
)?.packageJson.peerDependencies.tslib;

const missing = packages
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
