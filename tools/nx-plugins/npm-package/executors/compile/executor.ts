import path from 'node:path';
import type { ExecutorContext } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';
import { rollupExecutor } from '@nrwl/rollup';
import type { RollupExecutorOptions } from '@nrwl/rollup/src/executors/rollup/schema';
import { setPkgDefaults } from '../utils/set-pkg-defaults';

/**
 * Compiles source code into an NPM package for publishing.
 * Wraps @nrwl/rollup:rollup executor with some defaults set by us.
 */
export default async function (
	options: RollupExecutorOptions,
	context: ExecutorContext,
) {
	try {
		// get some default from a rollup config
		// it's a bit weird we have to do this, but this is how the original executor works
		options.rollupConfig = path.resolve(__dirname, 'rollup.config.js');

		// set some defaults
		options.updateBuildableProjectDepsInPackageJson = true;
		options.format = ['esm', 'cjs'];
		options.generateExportsField = true;
		options.compiler = 'tsc';
		options.skipTypeField = true;

		// we need to wait for the promises returned from the generator to resolve
		// https://github.com/nrwl/nx/blob/master/packages/rollup/src/executors/rollup/rollup.impl.ts
		for await (const i of rollupExecutor(options, context)) {
			void i;
		}

		await setPkgDefaults(options);

		return { success: true };
	} catch (e) {
		logger.fatal(e);
		return { success: false };
	}
}
