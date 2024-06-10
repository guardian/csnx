import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathFromRoot, projectRoot } from '../project-paths.mjs';
import { getPackageList } from './get-package-list.mjs';
import { getMakeTargets } from '../lib/get-make-targets.mjs';
import { format } from 'prettier';
import prettierConfig from '@guardian/prettier';
import { getTasks } from '../lib/get-tasks.mjs';
import _updateSection from 'update-section';

const updateSection = ({ contents, tag, updates, updater }) => {
	const START = `<!-- START ${tag} -->`;
	const END = `<!-- END ${tag} -->`;

	function matchesStart(line) {
		return line.includes(START);
	}

	function matchesEnd(line) {
		return line.includes(END);
	}

	return _updateSection(
		contents,
		[
			START,
			`<!-- THIS CONTENT IS AUTOGENERATED BY ${updater} -->`,
			'',
			updates,
			'',
			END,
		].join('\n'),
		matchesStart,
		matchesEnd,
	);
};

const thisFilePath = fileURLToPath(import.meta.url);
const thisFilePathFromRoot = pathFromRoot(thisFilePath);

const readMePath = path.resolve(projectRoot, 'README.md');
let contents = await readFile(readMePath, 'utf8');

contents = updateSection({
	contents,
	tag: 'PUBLISHED_PACKAGES',
	updates: await getPackageList(),
	updater: thisFilePathFromRoot,
});

const makeTargets = await getMakeTargets();
const makeTargetsList = makeTargets
	.map(({ target, description }) => `- \`make ${target}\` _${description}_`)
	.join('\n');

const tasks = await getTasks();

const tasksList = [
	'### Project-specific tasks',
	'Project-specific tasks are defined as `scripts` in their `package.json`, and can be run with `make <project>:<script>`:',
	'',
];

let currentProject = '';
for (const pkgTasks of tasks) {
	const [thisProject, scripts] = pkgTasks;

	if (thisProject !== currentProject) {
		currentProject = thisProject;
		tasksList.push(`#### ${currentProject}`);
	}

	for (const script of scripts) {
		tasksList.push(`- \`make ${thisProject}:${script}\``);
	}
}

contents = updateSection({
	contents,
	tag: 'TASKS',
	updates: makeTargetsList + '\n\n' + tasksList.join('\n'),
	updater: thisFilePathFromRoot,
});

await writeFile(
	readMePath,
	await format(contents, { filepath: readMePath, ...prettierConfig }),
);
