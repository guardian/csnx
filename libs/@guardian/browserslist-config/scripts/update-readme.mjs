/**
 * Updates placeholders in the readme:
 *
 * <!-- MY_KEY --><!-- /MY_KEY --> becomes <!-- MY_KEY -->my-value<!-- /MY_KEY -->
 *
 * Note that anything between the comments is replaced each time.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { format } from 'prettier';
import { featuresTable } from './features-table.mjs';
import { includedTable } from './included-table.mjs';
import { usageTable } from './usage-table.mjs';

const pathToReadme = path.join(import.meta.dirname, '..', '/README.md');
const pathToFeatures = path.join(import.meta.dirname, '..', '/FEATURES.md');

let readme = await readFile(pathToReadme, 'utf8');
let features = await readFile(pathToFeatures, 'utf8');

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

const replace = (content, key, value) => {
	const regex = new RegExp(`<!-- ${key} -->(.|\n)*?<!-- /${key} -->`, 'gm');
	return content.replace(regex, `<!-- ${key} -->\n${value}\n<!-- /${key} -->`);
};

for (const { key, value } of replacements) {
	readme = replace(readme, key, value);
}

features = replace(features, 'FEATURES', featuresTable);

await writeFile(pathToReadme, await format(readme, { parser: 'markdown' }));
await writeFile(pathToFeatures, await format(features, { parser: 'markdown' }));
