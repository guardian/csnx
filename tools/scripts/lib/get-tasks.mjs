import fastGlob from 'fast-glob';
import { readFile } from 'fs/promises';

/**
 * Get all npm-scripts from all packages in `libs` and `apps`, and returns them
 * as a list of tuples, e.g.
 *
 * [
 * 	['my-app', ['build', 'test']],
 * 	['my-lib', ['start', 'build']],
 * 	...
 * ]
 */
export const getTasks = async () => {
	const packages = await fastGlob(['{libs,apps}/**/package.json'], {
		followSymbolicLinks: false,
		ignore: ['**/node_modules', '**/dist'],
	});

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
