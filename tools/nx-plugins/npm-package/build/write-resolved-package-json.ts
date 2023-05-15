import path from 'node:path';
import type { ExecutorContext } from '@nrwl/devkit';
import type { execa as Execa } from 'execa';
import type { BuildExecutorOptions } from './schema';

/**
 * THIS IS KLUDGE #ES_NODE_MODULES
 *
 * lifted from https://github.com/nrwl/nx/pull/10414
 *
 * @TODO once Nx allows esm imports, it should be removed
 */
// eslint-disable-next-line @typescript-eslint/no-implied-eval -- this is a kludge
const esmModuleImport = new Function('specifier', 'return import(specifier)');

/** Handles the use of `workspace:*`-style versions for dependencies in the same
 * workspace (https://pnpm.io/workspaces). `pnpm` resolves them to the real path
 * when running `pnpm publish` or `pnpm pack`, but because we're doing some
 * slightly unorthodox stuff with Nx and changesets in the release process, we
 * need these pre-resolved in the build output.
 * */
export const writeResolvedPackageJson = async (
	options: BuildExecutorOptions,
	context: ExecutorContext,
) => {
	const { execa } = (await esmModuleImport('execa')) as {
		execa: typeof Execa;
	};
	// `pnpm pack` the source package, into the output directory
	const { stdout: tarballPath } = await execa(
		`corepack`,
		[
			`pnpm`,
			`pack`,
			`--pack-destination`,
			path.resolve(context.root, options.outputPath),
		],
		{
			cwd: options.pkgRoot,
		},
	);

	// extract the package.json into the output directory
	await execa(`tar`, [
		`-xvf`,
		tarballPath.trim(),
		`-C`,
		options.outputPath,
		`--strip-components`,
		`1`,
		`package/package.json`,
	]);

	// remove the tarball
	await execa(`rm`, [`-rf`, tarballPath.trim()]);
};
