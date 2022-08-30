/**
 * Updates placeholders in the readme:
 *
 * <!-- MY_KEY --><!-- /MY_KEY --> becomes <!-- MY_KEY -->my-value<!-- /MY_KEY -->
 *
 * Note that anything between the comments is replaced each time.
 */

import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';
import pkg from '../../../../package.json';

const exec = util.promisify(childProcess.exec);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const updateReadme = async () => {
	const pathToReadme = path.join(__dirname, '../README.md');

	let readme = await readFile(pathToReadme, 'utf8');

	// the keys and values to be replaced
	const replacements = [
		{
			key: 'TS_VERSION',
			value: pkg.devDependencies.typescript,
		},
	];

	for (const { key, value } of replacements) {
		const regex = new RegExp(`<!-- ${key} -->.*?<!-- /${key} -->`, 'gm');
		readme = readme.replace(regex, `<!-- ${key} -->${value}<!-- /${key} -->`);
	}

	await writeFile(pathToReadme, readme);

	await exec(`git add ${pathToReadme}`);
};

void updateReadme();
