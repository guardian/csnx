/**
 * Updates placeholders in the readme:
 *
 * <!-- MY_KEY --><!-- /MY_KEY --> becomes <!-- MY_KEY -->my-value<!-- /MY_KEY -->
 *
 * Note that anything between the comments is replaced each time.
 */

import fs from 'fs';
import path from 'path';
import pkg from '../package.json';

const pathToReadme = path.join(__dirname, '../README.md');

let readme = fs.readFileSync(pathToReadme, 'utf8');

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

fs.writeFileSync(pathToReadme, readme);
