import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import type { ExecutorContext } from '@nrwl/devkit';
import type { BuildExecutorOptions } from './schema';

const exec = util.promisify(childProcess.exec);

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
	// `pnpm pack` the source package, into the output directory
	const tarball = (
		await exec(
			`corepack pnpm pack --pack-destination ${path.resolve(
				context.root,
				options.outputPath,
			)}`,
			{
				cwd: options.pkgRoot,
			},
		)
	).stdout.trim();

	const tarballPath = path.join(options.outputPath, tarball);

	// extract the package.json into the output directory
	await exec(
		`tar -xvf ${tarballPath} -C ${options.outputPath} --strip-components 1 package/package.json`,
	);

	// remove the tarball
	await exec(`rm -rf ${tarballPath}`);
};
