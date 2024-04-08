import fg from 'fast-glob';
import { readFile } from 'fs/promises';

export const getTasks = async () => {
	const packages = await fg(['{libs,apps}/**/package.json'], {
		followSymbolicLinks: false,
		ignore: ['**/node_modules', '**/dist'],
	});

	const tasks = new Set();

	for (const pkg of packages) {
		const { scripts, name, nx } = JSON.parse(await readFile(pkg, 'utf8'));

		if (!scripts && !nx) {
			continue;
		}

		for (const script of Object.keys(scripts ?? {})) {
			tasks.add(`${name}:${script}`);
		}

		for (const nxTarget of Object.keys(nx?.targets ?? {})) {
			tasks.add(`${name}:${nxTarget}`);
		}
	}

	return Array.from(tasks)
		.sort()
		.sort((a, b) => a.split(':')[0].localeCompare(b.split(':')[0]));
};
