import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { updateReadmeSection } from './utils/update-readme-section.mjs';
import { pathFromRoot, projectRoot } from '../project-paths.mjs';
import { getPackageList } from './get-package-list.mjs';
import { getMakeTargets } from './get-make-targets.mjs';
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

readme = updateReadmeSection({
	readme,
	label: 'TASKS',
	updates: await getMakeTargets(),
	updater: thisFilePathFromRoot,
});

readme = updateReadmeSection({
	readme,
	label: 'CACHED_TASKS',
	updates: await getCachedTasks(),
	updater: thisFilePathFromRoot,
});

await writeFile(readMePath, readme);
