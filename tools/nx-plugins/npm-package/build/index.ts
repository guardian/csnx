import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import { isObject, isUndefined } from '@guardian/libs';
import type { ExecutorContext } from '@nx/devkit';
import { logger } from '@nx/devkit';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type Cpy from 'cpy';
import type { OutputChunk } from 'rollup';
import { rollup } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
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

// the order of these sets the order of the exports in the package.json
const formats = ['esm', 'cjs'] as const;

type Format = (typeof formats)[number];
type ImportType = 'import' | 'require';

// the exports field of the package.json
export type Exports = Record<string, Record<ImportType, string> | undefined>;

const getRollupConfig = (
	options: BuildExecutorOptions,
	context: ExecutorContext,
	format: Format,
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
			typescript({
				tsconfig: options.tsConfig,
				tsconfigOverride: {
					compilerOptions: {},
				},
				verbosity: 2, // 3 for debugging
				abortOnError: true,
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

		const packageExports: Exports = {};

		if (options.entry) {
			if (!options.tsConfig) {
				logger.error(
					"You must include a 'tsConfig' option when using the 'entry' option",
				);
				return { success: false };
			}

			const input = isObject(options.entry)
				? options.entry
				: { index: options.entry };

			if (isUndefined(input.index)) {
				logger.error(
					"You must include a 'index' field when passing an object to the 'entry' option",
				);
				return { success: false };
			}

			if (
				Object.keys(input).some(
					(key) => key.startsWith('.') || key.startsWith('/'),
				)
			) {
				logger.error("Keys in 'entry' option must not start with '.' or '/'");
				return { success: false };
			}

			// do not bundle dependencies
			const deps = await getDeclaredDeps(options.packageJson);
			const external = deps.map((dep) => new RegExp(`^${dep}`));

			// create build for each module type
			const builds = [];

			for (const format of formats) {
				logger.log(`Building ${format}...`);

				const { plugins, output } = getRollupConfig(options, context, format);

				const bundle = await rollup({
					input,
					plugins,
					external,
				});
				const artefact = await bundle.write(output);
				await bundle.close();

				const outputs = artefact.output.filter(
					(file) => file.type === 'chunk' && file.isEntry,
				) as OutputChunk[];

				builds.push(
					outputs.map((output) => ({
						name: output.name,
						path: `${format}/${output.fileName}`,
						format,
					})),
				);
			}

			for (const { name, path, format } of builds.flat()) {
				const exportName = '.' + (name === 'index' ? '' : '/' + name);

				const packageExport = (packageExports[exportName] ||= {} as Record<
					ImportType,
					string
				>);

				packageExport[format === 'cjs' ? 'require' : 'import'] = './' + path;
			}
		}

		// remove unwanted fields and set any necessary defaults in the package.json
		await setPackageDefaults(options, packageExports);

		return { success: true };
	} catch (e) {
		logger.error(e);
		return { success: false };
	}
}
