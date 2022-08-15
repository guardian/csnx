import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import type { ExecutorContext } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cpy from 'cpy';
import { rollup } from 'rollup';
import type { InputOption } from 'rollup';
import ts from 'rollup-plugin-ts';

const exec = util.promisify(childProcess.exec);

const formats = ['cjs', 'esm'] as const;

export interface BuildExecutorOptions {
	main?: InputOption;
	outputPath: string;
	tsConfig?: string;
	packageJson: string;
	assets: string[];
	pkgRoot?: string;
}

const getConfig = (
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

// Handle the use of `workspace:*`-style versions for dependencies in the same
// workspace (https://pnpm.io/workspaces). pnpm resolves them to the real path
// when running `pnpm publish` or `pnpm pack`, but because we're doing some
// slightly unorthodox stuff with Nx and changesets in the release process, we
// need these pre-resolved in the build output.
const copyResolvedPackageJson = async (
	options: BuildExecutorOptions,
	context: ExecutorContext,
) => {
	const { stdout: tarball } = await exec(
		`corepack pnpm pack --pack-destination ${path.resolve(
			context.root,
			options.outputPath,
		)}`,
		{
			cwd: options.pkgRoot,
		},
	);
	await exec(
		`tar -xvf ${options.outputPath}/${tarball.trim()} -C ${
			options.outputPath
		} --strip-components 1 package/package.json`,
	);
	await exec(`rm -rf ${options.outputPath}/${tarball.trim()}`);
};

export default async function buildExecutor(
	options: BuildExecutorOptions,
	context: ExecutorContext,
): Promise<{ success: boolean }> {
	try {
		options.pkgRoot = path.dirname(options.packageJson);
		// remove old build
		await exec(`rm -rf ${options.outputPath}`);

		// copy assets over
		await cpy(options.assets, options.outputPath, {
			cwd: context.root,
		});

		await copyResolvedPackageJson(options, context);

		if (options.main) {
			if (!options.tsConfig) {
				logger.fatal(
					"You must include a 'tsConfig' option when using the 'main' option",
				);
				process.exit(1);
			}

			// create build for each module type
			await Promise.all(
				formats.map(async (format) => {
					const { plugins, output } = getConfig(options, format);
					const bundle = await rollup({ input: options.main, plugins });
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
