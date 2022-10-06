/* eslint-disable @typescript-eslint/no-var-requires -- we're loading json files for NPM */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { isObject } from '@guardian/libs';
import type { RollupExecutorOptions } from '@nrwl/rollup/src/executors/rollup/schema';
import sortPkgJson from 'sort-package-json';
import type { PackOptions } from '../pack/executor';

/**
 * Sets some useful package default fields, and removes unnecessary ones
 */
export const setPkgDefaults = async (
	options: PackOptions | RollupExecutorOptions,
) => {
	const projectPath = path.dirname(options.project);
	const pkgPath = path.resolve(options.outputPath, 'package.json');

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- we test it manually
	const pkg = require(pkgPath);

	if (isObject(pkg)) {
		delete pkg.pnpm;
		delete pkg.packageManager;
		delete pkg.scripts;
		delete pkg.devDependencies;

		pkg.license = 'MIT';
		pkg.readme = 'README.md';
		pkg.homepage = `https://github.com/guardian/csnx/tree/main/${projectPath}#readme`;
		pkg.bugs = {
			url: 'https://github.com/guardian/csnx/issues',
		};
		pkg.repository = {
			type: 'git',
			url: 'git+https://github.com/guardian/csnx.git',
			directory: projectPath,
		};

		if (!pkg.private) {
			pkg.publishConfig = {
				access: 'public',
			};
		}

		await writeFile(pkgPath, JSON.stringify(sortPkgJson(pkg), null, 2));
	}
};
