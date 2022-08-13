import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { projectRoot } from '../project-paths.mjs';

export const getMakeTargets = async () => {
	const makefilePath = path.resolve(projectRoot, 'Makefile');
	const makefile = await readFile(makefilePath, 'utf8');

	const lines = makefile.split('\n');

	const markdown = [];

	for (const [lineNumber, line] of lines.entries()) {
		if (line.includes('INTERNAL UTILS')) {
			break;
		}
		if (line.startsWith('.PHONY')) {
			let task = `- \`make ${line.split(':')[1].trim()}\` `;

			const description = [];
			let i = lineNumber - 1;
			while (lines[i].startsWith('#')) {
				description.unshift(lines[i].slice(1).trim());
				i--;
			}

			task += `_${description.join(' ')}_`;

			markdown.push(task);
		}
	}

	return markdown.join('\n');
};
