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
	"You can also run individual project's Nx targets by running `make <target>`:",
	'',
	'<details>',
	'<summary>List of all targets</summary>',
	'',
];
for (const target of nxTargets) {
	nxTargetsList.push(`- \`make ${target}\``);
}

nxTargetsList.push('</details>');

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
