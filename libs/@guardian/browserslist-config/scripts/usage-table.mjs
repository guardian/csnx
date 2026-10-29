import { readFileSync } from 'fs';
import { resolve } from 'path';
import { normaliseBrowserName } from './normalise-browser-name.mjs';

const browserslistStats = JSON.parse(
	readFileSync(resolve(import.meta.dirname, '../browserslist-stats.json')),
);

const flattened = {};

// flatten the stats to { browserVersion: usage } shape
for (let [browser, versions] of Object.entries(browserslistStats)) {
	for (let [version, usage] of Object.entries(versions)) {
		const usageFixed = usage.toFixed(2);
		// if (usageFixed > 0) {
		flattened[`${browser} ${version}`] = usageFixed;
		// }
	}
}

// sort object by alpha then descending by usage
const sorted = Object.fromEntries(
	Object.entries(flattened)
		.sort()
		.sort(([, a], [, b]) => b - a),
);

const table = ['| Browser | Usage |', '| ------- | -------- |'];

for (let [browser, usage] of Object.entries(sorted)) {
	if (usage !== '0.00') {
		table.push(`| ${normaliseBrowserName(browser)} | ${usage}% |`);
	}
}

export const usageTable = table.join('\n');
