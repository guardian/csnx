import fastGlob from 'fast-glob';
import { readFile } from 'node:fs/promises';

/**
 * @typedef {string[]} TaskList - e.g. ['build', 'test']
 * @typedef {[string, TaskList]} PackageTasks - e.g. ['my-app', ['build', 'test']]
 */

/**
 * Gets all npm-scripts from all packages in `libs` and `apps`.
 */
export const getTasksByPackage = async () => {
	const packages = await fastGlob(['{libs,apps}/**/package.json'], {
		followSymbolicLinks: false,
		ignore: ['**/node_modules', '**/dist'],
	});

	/** @type PackageTasks[] */
	const tasks = [];

	for (const pkg of packages) {
		const { scripts, name } = JSON.parse(await readFile(pkg, 'utf8'));

		if (!scripts) {
			continue;
		}

		tasks.push([name, Object.keys(scripts).sort()]);
	}

	return tasks.sort((a, b) => a[0].localeCompare(b[0]));
};
