const browserslist = require('browserslist');
const normalise = require('./normalise-browser-name');

const includedBrowsers = {};

for (let [browser, version] of browserslist().map((browser) =>
	browser.split(' '),
)) {
	const normalisedBrowser = normalise(browser);
	includedBrowsers[normalisedBrowser] = [
		version,
		...(includedBrowsers[normalisedBrowser] ?? []),
	];
}

// sort object by alpha then descending by usage
const sorted = Object.fromEntries(Object.entries(includedBrowsers).sort());

const table = ['| Browser | Versions |', '| ------- | -------- |'];

for (let [browser, versions] of Object.entries(sorted)) {
	table.push(`| ${normalise(browser)} | ${versions.join(', ')} |`);
}

module.exports = table.join('\n');
