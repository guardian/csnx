import fg from 'fast-glob';
import { readFile } from 'fs/promises';

export const getTasks = async () => {
	const projects = await fg(['{libs,apps}/**/project.json'], {
		followSymbolicLinks: false,
		ignore: ['**/storybook-static'],
	});

	const packages = await fg(['{libs,apps}/**/package.json'], {
		followSymbolicLinks: false,
		ignore: ['**/node_modules', '**/dist'],
	});

	const tasks = new Set();

	for (const pkg of packages) {
		const { scripts, name } = JSON.parse(await readFile(pkg, 'utf8'));

		if (!scripts) {
			continue;
		}

		for (const script of Object.keys(scripts ?? {})) {
			tasks.add(`${name}:${script}`);
		}
	}

	for (const project of projects) {
		const { targets, name } = JSON.parse(await readFile(project, 'utf8'));

		if (!targets) {
			continue;
		}

		for (const target of Object.keys(targets)) {
			tasks.add(`${name}:${target}`);
		}
	}

	return Array.from(tasks)
		.sort()
		.sort((a, b) => a.split(':')[0].localeCompare(b.split(':')[0]));
};
