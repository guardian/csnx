/**
 * Updates placeholders in the readme:
 *
 * <!-- MY_KEY --><!-- /MY_KEY --> becomes <!-- MY_KEY -->my-value<!-- /MY_KEY -->
 *
 * Note that anything between the comments is replaced each time.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import { includedTable } from './included-table.mjs';
import { usageTable } from './usage-table.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToReadme = path.join(__dirname, '..', '/README.md');

let readme = await readFile(pathToReadme, 'utf8');

// the keys and values to be replaced
const replacements = [
	{
		key: 'INCLUDED',
		value: includedTable,
	},
	{
		key: 'USAGE',
		value: usageTable,
	},
];

for (const { key, value } of replacements) {
	const regex = new RegExp(`<!-- ${key} -->(.|\n)*?<!-- /${key} -->`, 'gm');
	readme = readme.replace(regex, `<!-- ${key} -->\n${value}\n<!-- /${key} -->`);
}

await writeFile(pathToReadme, readme);
