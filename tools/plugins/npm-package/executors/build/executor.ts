import type { ExecutorContext } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';

export interface BuildExecutorOptions {
	textToEcho: string;
}

export default async function buildExecutor(
	options: BuildExecutorOptions,
	context: ExecutorContext,
): Promise<{ success: boolean }> {
	logger.info(options);

	return { success: true };
}
