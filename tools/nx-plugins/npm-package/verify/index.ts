import fs from 'node:fs/promises';
import { logger } from '@nx/devkit';
import type { publint as Publint } from 'publint';
import type { formatMessage as FormatMessage } from 'publint/utils';
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

export default async function buildExecutor(
	options: BuildExecutorOptions,
): Promise<{ success: boolean }> {
	try {
		const { publint } = (await esmModuleImport('publint')) as {
			publint: typeof Publint;
		};
		const { formatMessage } = (await esmModuleImport('publint/utils')) as {
			formatMessage: typeof FormatMessage;
		};

		const pkg = JSON.parse(
			await fs.readFile(`${options.outputPath}/package.json`, 'utf8'),
		) as Record<string, unknown>;

		const { messages } = await publint({
			pkgDir: options.outputPath,
			level: 'warning',
			strict: true,
		});

		if (messages.length > 0) {
			logger.log(`There are issues with the ${options.outputPath} package:`);

			for (const message of messages) {
				logger.error(formatMessage(message, pkg));
			}

			return { success: false };
		}
	} catch (error) {
		logger.error(error);
		return { success: false };
	}

	// logger.info(messages.join('\n'));

	return { success: true };
}
