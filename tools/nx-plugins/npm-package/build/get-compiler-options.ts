/* eslint-disable @typescript-eslint/unbound-method -- this is what the TS methods do */
import path from 'node:path';
import type { ExecutorContext } from '@nrwl/devkit';
import {
	findConfigFile,
	parseJsonConfigFileContent,
	readConfigFile,
	sys,
} from 'typescript';
import type { BuildExecutorOptions } from './schema';

export const getCompilerOptions = (
	options: BuildExecutorOptions,
	context: ExecutorContext,
) => {
	const tsconfigPath = findConfigFile(
		context.root,
		sys.fileExists,
		options.tsConfig,
	);

	if (tsconfigPath) {
		// Read tsconfig.json file
		const tsconfigFile = readConfigFile(tsconfigPath, sys.readFile);

		// Resolve extends
		const parsedTsconfig = parseJsonConfigFileContent(
			tsconfigFile.config,
			sys,
			path.dirname(tsconfigPath),
		);

		return parsedTsconfig.options;
	}

	return {};
};
