import childProcess from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import util from 'node:util';
import type { ExecutorContext } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';
import { setPkgDefaults } from '../utils/set-pkg-defaults';

const execFile = util.promisify(childProcess.execFile);

export type PackOptions = {
	project: string;
	outputPath: string;
};

/**
 * Packages a plain NPM package, with no compilation steps.
 */
export default async (options: PackOptions, context: ExecutorContext) => {
	try {
		const src = path.resolve(context.root, path.dirname(options.project));
		const dist = path.resolve(context.root, options.outputPath);

		await rm(dist, { recursive: true, force: true });
		await mkdir(dist, { recursive: true });
		const packResult = await execFile(
			'corepack',
			['pnpm', 'pack', '--pack-destination', dist],
			{
				cwd: src,
			},
		);
		const packedFileName = packResult.stdout.trim();
		await execFile(
			'tar',
			['-xvf', packedFileName, '--strip-components', '1', 'package'],
			{
				cwd: dist,
			},
		);
		await rm(path.resolve(dist, packedFileName));

		await setPkgDefaults(options);

		return { success: true };
	} catch (e) {
		logger.fatal(e);
		return { success: false };
	}
};
