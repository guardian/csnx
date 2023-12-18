import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { projectRoot } from '../project-paths.mjs';

export const getMakeTargets = async () => {
	const makefilePath = path.resolve(projectRoot, 'Makefile');
	const makefile = await readFile(makefilePath, 'utf8');

	const lines = makefile.split('\n');

	const targets = [];

	for (const [lineNumber, line] of lines.entries()) {
		if (line.includes('INTERNAL UTILS')) {
			break;
		}
		if (line.startsWith('.PHONY')) {
			const target = line.split(':')[1].trim();

			const description = [];
			let i = lineNumber - 1;
			while (lines[i].startsWith('#')) {
				description.unshift(lines[i].slice(1).trim());
				i--;
			}

			targets.push({
				target,
				description: description.join(' '),
			});
		}
	}

	return targets.sort((a, b) => a.target.localeCompare(b.target));
};
