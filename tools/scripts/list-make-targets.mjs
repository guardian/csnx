import { getMakeTargets } from './lib/get-make-targets.mjs';
import { getNxTargets } from './lib/get-nx-targets.mjs';

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

console.log(`${orange}No target specified. Available targets are:\n${reset}`);
console.log(makeTargetsList);

console.log('');
console.log(
	`${orange}You can also run any of the individual Nx targets by running ${blue}make <target>${reset}${orange}.${reset}`,
);
console.log(`${orange}Available targets are:${reset}`);

const nxTargets = await getNxTargets();

const nxTargetsList = [];
for (const target of nxTargets) {
	if (!nxTargetsList.at(-1)?.includes(target.split(':')[0])) {
		nxTargetsList.push('');
	}
	nxTargetsList.push(`${blue}make ${target}${reset}`);
}

console.log(nxTargetsList.join('\n'));
