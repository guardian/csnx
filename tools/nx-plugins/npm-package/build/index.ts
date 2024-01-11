import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import type { ExecutorContext } from '@nx/devkit';
import { logger } from '@nx/devkit';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type Cpy from 'cpy';
import type { OutputChunk } from 'rollup';
import { rollup } from 'rollup';
import ts from 'rollup-plugin-ts';
import { ScriptTarget } from 'typescript';
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

const formats = ['cjs', 'esm'] as const;
export type Entries = {
	[K in (typeof formats)[number]]: string;
};

const getRollupConfig = (
	options: BuildExecutorOptions,
	context: ExecutorContext,
	format: (typeof formats)[number],
) => {
	const compilerOptions = getCompilerOptions(options, context);

	if (format === 'cjs') {
		// Node 14 is eol 2023-04-30, so we should still support it
		compilerOptions.target = ScriptTarget.ES2018;
	}

	return {
		strictDeprecations: true,
		output: {
			dir: `${options.outputPath}/${format}`,
			format,
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

		let entries: Entries | undefined;

		if (options.tsConfig) {
			if (!options.entry) {
				logger.error(
					"You must include a 'entry' option when using the 'tsConfig' option",
				);
				return { success: false };
			}

			// do not bundle dependencies
			const deps = await getDeclaredDeps(options.packageJson);
			const external = deps.map((dep) => new RegExp(`^${dep}`));

			// create build for each module type
			const outputs = await Promise.all(
				formats.map(async (format) => {
					const { plugins, output } = getRollupConfig(options, context, format);
					const bundle = await rollup({
						input: options.entry,
						plugins,
						external,
					});
					const artefact = await bundle.write(output);
					await bundle.close();

					const outputEntry = artefact.output.filter(
						(file) => file.type === 'chunk' && file.isEntry,
					) as OutputChunk[];

					if (outputEntry.length === 1 && outputEntry[0]?.fileName) {
						return [format, `${format}/${outputEntry[0].fileName}`];
					}

					// in reality, we control the entry option in the plugin, so we
					// know there is only ever 1, but typescript doesn't know that
					throw new Error('Expected a single entry file');
				}),
			);

			entries = Object.fromEntries(outputs) as Entries;
		}

		// remove unwanted fields and set any necessary defaults in the package.json
		await setPackageDefaults(options, entries);

		return { success: true };
	} catch (e) {
		logger.error(e);
		return { success: false };
	}
}
