/**
 * Updates placeholders in the readme:
 *
 * <!-- MY_KEY --><!-- /MY_KEY --> becomes <!-- MY_KEY -->my-value<!-- /MY_KEY -->
 *
 * Note that anything between the comments is replaced each time.
 */

const fs = require('fs');
const path = require('path');
const includedTable = require('./get-included-table');
const usageTable = require('./get-usage-table');

const pathToReadme = path.join(__dirname, '../README.md');

let readme = fs.readFileSync(pathToReadme, 'utf8');

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

fs.writeFileSync(pathToReadme, readme);
