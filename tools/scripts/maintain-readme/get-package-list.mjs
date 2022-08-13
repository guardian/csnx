import { getPackages } from '@manypkg/get-packages';
import { pathFromRoot } from '../project-paths.mjs';

export const getPackageList = async () => {
	const { packages } = await getPackages();

	const markdown = packages
		.filter((pkg) => pkg.packageJson.private !== true)
		.filter((pkg) => pkg.packageJson.name.startsWith('@guardian/'))
		.map((pkg) => `- [${pkg.packageJson.name}](${pathFromRoot(pkg.dir)})`)
		.join('\n');

	return markdown;
};
