import fg from 'fast-glob';
import { readFile } from 'fs/promises';

export const getNxTargets = async () => {
	const projects = await fg(['libs/**/project.json', 'apps/**/project.json'], {
		followSymbolicLinks: false,
	});

	const nxTargets = [];

	for (const project of projects.sort((a, b) =>
		a.split('/project.json')[0].localeCompare(b.split('/project.json')[0]),
	)) {
		const data = JSON.parse(await readFile(project, 'utf8'));
		const { targets, name } = data;

		for (const target of Object.keys(targets).sort()) {
			nxTargets.push(`${name}:${target}`);
		}
	}

	return nxTargets;
};
