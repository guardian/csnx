import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathFromRoot, projectRoot } from '../project-paths.mjs';
import { getTasks } from '../lib/get-tasks.mjs';

import _updateSection from 'update-section';

const updateSection = ({ contents, updates }) => {
	const START = `############################## START PROJECT_TASKS #############################`;
	const END = `############################### END PROJECT_TASKS ##############################`;

	function matchesStart(line) {
		return line.includes(START);
	}

	function matchesEnd(line) {
		return line.includes(END);
	}

	return _updateSection(
		contents,
		[START, '', updates, END].join('\n'),
		matchesStart,
		matchesEnd,
	);
};

const thisFilePath = fileURLToPath(import.meta.url);
const thisFilePathFromRoot = pathFromRoot(thisFilePath);

const makefilePath = path.resolve(projectRoot, 'Makefile');
let contents = await readFile(makefilePath, 'utf8');

const tasks = await getTasks();

const tasksList = [
	'# This is a set of all possible project-specific tasks.',
	'#',
	`# IT IS AUTOGENERATED BY ${thisFilePathFromRoot}`,
	'#',
	'# It enables running the relevant npm-scripts wrapped in the',
	'# standardised Makefile prerequisites.',
	'#',
	'# It also enables us to abstract away things like package manager vendor/version',
	'# etc.',
	'',
];

for (const tasksByPkg of tasks) {
	const [pkg, scripts] = tasksByPkg;

	for (const script of scripts) {
		const makeTarget = `${pkg}:${script}`.replace(/:/g, '\\:');

		tasksList.push(`.PHONY: ${makeTarget}`);
		tasksList.push(`${makeTarget}: env`);
		tasksList.push(`	@corepack pnpm --filter ${pkg} ${script}`);
		tasksList.push('');
	}
}

console.log(tasksList);

contents = updateSection({
	contents,
	updates: tasksList.join('\n'),
});

await writeFile(makefilePath, contents);
