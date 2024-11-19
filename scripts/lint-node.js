import semver from 'semver';
import fs from 'fs/promises';
import path from 'path';
import latestVersion from 'latest-version';

const red = '\x1b[31m';
const reset = '\x1b[0m';

try {
	const nvmrcVersion = (
		await fs.readFile(path.resolve(import.meta.dirname, '../.nvmrc'), 'utf-8')
	).trim();

	const pkg = await fs.readFile(
		path.resolve(import.meta.dirname, '../package.json'),
		'utf-8',
	);

	const localTypesNode = JSON.parse(pkg).devDependencies?.['@types/node'];

	const targetTypesNode = await latestVersion('@types/node', {
		version: `<${semver.inc(nvmrcVersion, 'minor')}`,
	});

	// if local @types/node is more than a patch version out from the target
	// Node version, we have a problem
	if (!semver.satisfies(targetTypesNode, `~${localTypesNode}`)) {
		console.log(
			`${red}@types/node version in package.json (${localTypesNode}) does not apply the Node version in .nvmrc (${nvmrcVersion}).`,
		);
		console.log(`${reset}Update @types/node to v${targetTypesNode}.`);
		process.exit(1);
	}
} catch (error) {
	console.error(error);
	process.exit(1);
}
