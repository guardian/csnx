import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { updateReadmeSection } from './update-readme-section.mjs';
import { pathFromRoot, projectRoot } from '../project-paths.mjs';
import { getPackageList } from './get-package-list.mjs';
import { getMakeTargets } from '../lib/get-make-targets.mjs';
import { getTasks } from '../lib/get-tasks.mjs';
import { getCachedTasks } from './get-cached-tasks.mjs';

const thisFilePath = fileURLToPath(import.meta.url);
const thisFilePathFromRoot = pathFromRoot(thisFilePath);

const readMePath = path.resolve(projectRoot, 'README.md');
let readme = await readFile(readMePath, 'utf8');

readme = updateReadmeSection({
	readme,
	label: 'PUBLISHED_PACKAGES',
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
	'Project-specific tasks are defined as `scripts` in a `package.json` or `targets` in a `project.json` files, and can be run with `make <project>:<script>`/`make <project>:<target>`:',
	'',
];

let currentProject = '';
for (const task of tasks) {
	const thisProject = task.split(':')[0];
	if (thisProject !== currentProject) {
		currentProject = thisProject;
		tasksList.push(`#### ${currentProject}`);
	}
	tasksList.push(`- \`make ${task}\``);
}

readme = updateReadmeSection({
	readme,
	label: 'TASKS',
	updates: makeTargetsList + '\n\n' + tasksList.join('\n'),
	updater: thisFilePathFromRoot,
});

readme = updateReadmeSection({
	readme,
	label: 'CACHED_TASKS',
	updates: await getCachedTasks(),
	updater: thisFilePathFromRoot,
});

await writeFile(readMePath, readme);
