import type { ExecutorContext } from '@nrwl/devkit';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-ts';
import { logger } from '@nrwl/devkit';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { InputOption } from 'rollup';
import util from 'node:util';
import childProcess from 'node:child_process';
import cpy from 'cpy';
import json from '@rollup/plugin-json';

const exec = util.promisify(childProcess.exec);

export interface BuildExecutorOptions {
	main?: InputOption;
	outputPath: string;
	tsConfig?: string;
	packageJson: string;
	assets: Array<string>;
}

const getConfig = (options, format) => ({
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
		// remove old build
		await exec(`rm -rf ${options.outputPath}`);

		// copy assets over
		await cpy([options.packageJson, ...options.assets], options.outputPath, {
			cwd: context.root,
		});

		if (options.main) {
			if (!options.tsConfig) {
				logger.fatal(
					"You must include a 'tsConfig' option when using the 'main' option",
				);
				process.exit(1);
			}

			// create build for each module type
			await Promise.all(
				['cjs', 'esm'].map(async (format) => {
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
