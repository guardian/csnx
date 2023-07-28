import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import type { ExecutorContext } from '@nx/devkit';
import { logger } from '@nx/devkit';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type Cpy from 'cpy';
import type { InputPluginOption, OutputChunk, OutputOptions } from 'rollup';
import { rollup } from 'rollup';
import ts from 'rollup-plugin-ts';
import { getCompilerOptions } from './get-compiler-options';
import { getDeclaredDeps } from './get-declared-deps';
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

const getRollupConfig = (
	options: BuildExecutorOptions,
	context: ExecutorContext,
): { output: OutputOptions; plugins: InputPluginOption } => {
	const compilerOptions = getCompilerOptions(options, context);

	return {
		output: {
			dir: `${options.outputPath}`,
			format: 'esm',
			sourcemap: true,
			preserveModules: true,
			esModule: true,
		},
		plugins: [
			nodeResolve({
				extensions: ['.ts', '.tsx', '.mjs', '.jsx', '.js', '.json'],
			}),
			ts({
				tsconfig: compilerOptions,
			}),
			json(),
			commonjs(),
		],
	};
};

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
			flat: true,
		});

		// add a package.json with workspace deps resolved
		await writeResolvedPackageJson(options, context);

		// if we end up using rollup, this will be reassigned to the path to the
		// entry file that rollup generates
		let entry: string | undefined = undefined;

		// if there's a tsconfig, we'll use rollup to bundle the package
		if (options.tsConfig) {
			if (!options.entry) {
				logger.error(
					"You must include a 'entry' option when using the 'tsConfig' option",
				);
				return { success: false };
			}

			try {
				// do not bundle dependencies
				const deps = await getDeclaredDeps(options.packageJson);
				const external = deps.map((dep) => new RegExp(`^${dep}`));

				const { plugins, output } = getRollupConfig(options, context);
				const bundle = await rollup({
					input: options.entry,
					plugins,
					external,
				});
				const artefact = await bundle.write(output);
				await bundle.close();

				const [outputEntry, ...unknownEntries] = artefact.output.filter(
					(file) => file.type === 'chunk' && file.isEntry,
				) as OutputChunk[];

				if (!outputEntry) {
					throw new Error(
						'Bundle does not include an entry file in the output...',
					);
				}

				if (unknownEntries.length) {
					throw new Error(
						'Bundle includes unexplained entry files in the output...',
					);
				}

				entry = outputEntry.fileName;
			} catch (e) {
				logger.error(e);
				return { success: false };
			}
		}

		// remove unwanted fields and set any necessary defaults in the package.json
		await setPackageDefaults(options, entry);

		return { success: true };
	} catch (e) {
		logger.error(e);
		return { success: false };
	}
}
