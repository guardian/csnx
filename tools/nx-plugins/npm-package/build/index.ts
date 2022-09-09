import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import type { ExecutorContext } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type Cpy from 'cpy';
import { rollup } from 'rollup';
import ts from 'rollup-plugin-ts';
import { getDeps } from './get-deps';
import type { BuildExecutorOptions } from './schema';
import { setPackageDefaults } from './set-package-defaults';
import { writeResolvedPackageJson } from './write-resolved-package-json';

/**
 * THIS IS KLUDGE #ES_NODE_MODULES
 *
 * lifted from https://github.com/nrwl/nx/pull/10414
 *
 * @TODO once Nx allows esm imports, it should be removed
 */
// eslint-disable-next-line @typescript-eslint/no-implied-eval -- this is a kludge
const esmModuleImport = new Function('specifier', 'return import(specifier)');

const exec = util.promisify(childProcess.exec);

const formats = ['cjs', 'esm'] as const;

const getRollupConfig = (
	options: BuildExecutorOptions,
	format: typeof formats[number],
) => ({
	output: {
		dir: `${options.outputPath}/${format}`,
		format,
		sourcemap: true,
		preserveModules: true,
	},
	plugins: [
		nodeResolve({
			extensions: ['.ts', '.tsx', '.mjs', '.jsx', '.js', '.json'],
		}),
		ts({ tsconfig: options.tsConfig }),
		json(),
		commonjs(),
	],
});

export default async function buildExecutor(
	options: BuildExecutorOptions,
	context: ExecutorContext,
): Promise<{ success: boolean }> {
	try {
		options.pkgRoot = path.dirname(options.packageJson);

		// remove old build
		await exec(`rm -rf ${options.outputPath}`);

		// create dist dir
		await exec(`mkdir -p ${options.outputPath}`);

		// copy assets over
		const { default: cpy } = (await esmModuleImport('cpy')) as {
			default: typeof Cpy;
		};
		await cpy(options.assets, options.outputPath, {
			cwd: context.root,
		});

		// add a package.json with workspace deps resolved
		await writeResolvedPackageJson(options, context);

		// remove unwanted fields and set any necessary defaults in the package.json
		await setPackageDefaults(options);

		if (options.main) {
			if (!options.tsConfig) {
				logger.error(
					"You must include a 'tsConfig' option when using the 'main' option",
				);
				return { success: false };
			}

			// do not bundle dependencies
			const deps = await getDeps(options.packageJson);

			const external = (id: string) => deps.includes(id);

			// create build for each module type
			await Promise.all(
				formats.map(async (format) => {
					const { plugins, output } = getRollupConfig(options, format);
					const bundle = await rollup({
						input: options.main,
						plugins,
						external,
					});
					await bundle.write(output);
					return bundle.close();
				}),
			);
		}

		return { success: true };
	} catch (e) {
		logger.error(e);
		return { success: false };
	}
}
