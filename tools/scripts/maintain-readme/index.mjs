import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { updateReadmeSection } from './update-readme-section.mjs';
import { pathFromRoot, projectRoot } from '../project-paths.mjs';
import { getPackageList } from './get-package-list.mjs';
import { getMakeTargets } from '../lib/get-make-targets.mjs';
import { getNxTargets } from '../lib/get-nx-targets.mjs';
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

const nxTargets = await getNxTargets();

const nxTargetsList = [
	'### Project-specific tasks',
	'Project-specific are defined in their `project.json`, and can be run with `make <project>:<task>`:',
	'',
];

let currentProject = '';
for (const target of nxTargets) {
	const thisProject = target.split(':')[0];
	if (thisProject !== currentProject) {
		currentProject = thisProject;
		nxTargetsList.push(`#### ${currentProject}`);
	}
	nxTargetsList.push(`- \`make ${target}\``);
}

readme = updateReadmeSection({
	readme,
	label: 'TASKS',
	updates: makeTargetsList + '\n\n' + nxTargetsList.join('\n'),
	updater: thisFilePathFromRoot,
});

readme = updateReadmeSection({
	readme,
	label: 'CACHED_TASKS',
	updates: await getCachedTasks(),
	updater: thisFilePathFromRoot,
});

await writeFile(readMePath, readme);
