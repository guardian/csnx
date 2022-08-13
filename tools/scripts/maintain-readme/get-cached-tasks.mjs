import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { projectRoot } from '../project-paths.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const getCachedTasks = async () => {
	const nxConfig = path.resolve(projectRoot, 'nx.json');
	const { cacheableOperations } =
		require(nxConfig).tasksRunnerOptions.default.options;

	const listFormatter = new Intl.ListFormat('en', {
		style: 'long',
		type: 'conjunction',
	});

	const formattedTasks = cacheableOperations.map((op) => '`' + op + '`');
	const taskList = listFormatter.format(formattedTasks);

	const markdown = `[Nx remotely caches the output](https://nx.dev/using-nx/mental-model#computation-hashing-and-caching) of ${taskList}.`;

	return markdown;
};
