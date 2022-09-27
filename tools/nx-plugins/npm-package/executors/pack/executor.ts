import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import type { ExecutorContext } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';
import { setPkgDefaults } from '../utils/set-pkg-defaults';

const exec = util.promisify(childProcess.exec);

export type PackOptions = {
	project: string;
	outputPath: string;
};

/**
 * Packages a plain NPM package, with no compilation steps.
 */
export default async (options: PackOptions, context: ExecutorContext) => {
	try {
		const projectPath = path.dirname(options.project);
		const src = path.resolve(context.root, projectPath);
		const dist = path.resolve(context.root, options.outputPath);

		await exec(`rm -rf ${dist}`);
		await exec(`mkdir -p ${dist}`);
		await exec(`cd ${src} && corepack pnpm pack --pack-destination ${dist}`);
		await exec(
			`tar -xvf ${dist}/*.tgz -C ${dist} --strip-components 1 package`,
		);
		await exec(`rm -rf ${dist}/*.tgz`);

		await setPkgDefaults(options);

		return { success: true };
	} catch (e) {
		logger.fatal(e);
		return { success: false };
	}
};
