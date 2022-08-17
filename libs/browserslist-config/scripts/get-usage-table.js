const browserslistStats = require('../browserslist-stats.json');
const normalise = require('./normalise-browser-name');

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
	table.push(`| ${normalise(browser)} | ${usage}% |`);
}

module.exports = table.join('\n');
