import path from 'node:path';
import type * as ReadPackage from 'read-pkg';
import type * as SortPkgJson from 'sort-package-json';
import type { JsonObject } from 'type-fest';
import type * as WritePackage from 'write-pkg';
import type { BuildExecutorOptions } from './schema';
import type { Exports } from './index';

/**
 * THIS IS KLUDGE #ES_NODE_MODULES
 *
 * lifted from https://github.com/nrwl/nx/pull/10414
 *
 * @TODO once Nx allows esm imports, it should be removed
 */
// eslint-disable-next-line @typescript-eslint/no-implied-eval -- this is a kludge
const esmModuleImport = new Function('specifier', 'return import(specifier)');

/**
 * Sets some defaults in the package.json and removes things we
 * don't want to publish.
 */
export const setPackageDefaults = async (
	options: BuildExecutorOptions,
	packageExports: Exports | undefined,
) => {
	const { readPackage } = (await esmModuleImport(
		'read-pkg',
	)) as typeof ReadPackage;
	const { writePackage } = (await esmModuleImport(
		'write-pkg',
	)) as typeof WritePackage;

	const pkg = (await readPackage({ cwd: options.outputPath })) as Record<
		string,
		unknown
	>;

	delete pkg.pnpm;
	delete pkg.packageManager;
	delete pkg.scripts;
	delete pkg.devDependencies;

	const pkgDefaults: Record<string, unknown> = {
		license: 'MIT',
		readme: 'README.md',
		homepage: `https://github.com/guardian/csnx/tree/main/${options.pkgRoot}#readme`,
		bugs: {
			url: 'https://github.com/guardian/csnx/issues',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/guardian/csnx.git',
		},
	};

	if (!pkg.private) {
		pkg.publishConfig = {
			access: 'public',
		};
	}

	if (packageExports) {
		if (Object.keys(packageExports).length > 1) {
			pkg.exports = packageExports;
		} else {
			pkg.main = packageExports['.']?.require;
			pkg.module = packageExports['.']?.import;
		}
	} else if (!pkg.main) {
		throw new Error(
			"You must add a 'main' field to your package.json, or pass an 'entry' option to the build executor",
		);
	}

	const { default: sortPkgJson } = (await esmModuleImport(
		'sort-package-json',
	)) as typeof SortPkgJson;

	const sortedPkg = sortPkgJson({
		...pkgDefaults,
		...pkg,
	}) as JsonObject;

	await writePackage(path.join(options.outputPath, 'package.json'), sortedPkg);
};
