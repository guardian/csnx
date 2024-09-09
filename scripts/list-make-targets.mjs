import { getMakeTargets } from './lib/get-make-targets.mjs';
import { getTasksByPackage } from './lib/get-tasks-by-package.mjs';

const blue = '\x1b[34m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';
const orange = '\x1b[33m';

const makeTargets = await getMakeTargets();
const makeTargetsList = makeTargets
	.map(
		({ target, description }) =>
			`${blue}make ${target} ${dim}${description}${reset}`,
	)
	.join('\n');

console.log(`${orange}Repo-wide targets are:\n${reset}`);
console.log(makeTargetsList);

console.log('');
console.log(
	`${orange}You can also run any of the individual project tasks by running ${blue}make <project>:<task>${reset}${orange}:${reset}`,
);

const tasks = await getTasksByPackage();

const taskList = [];

for (const tasksByPkg of tasks) {
	const [pkg, scripts] = tasksByPkg;

	for (const script of scripts) {
		const makeTarget = `${pkg}:${script}`;

		if (!taskList.at(-1)?.includes(`${pkg}:`)) {
			taskList.push('');
		}

		taskList.push(`${blue}make ${makeTarget}${reset}`);
	}
}

console.log(taskList.join('\n'));
