import browserslist from 'browserslist';
import { normaliseBrowserName } from './normalise-browser-name.mjs';

const includedBrowsers = {};

for (let [browser, version] of browserslist().map((browser) =>
	browser.split(' '),
)) {
	const normalisedBrowser = normaliseBrowserName(browser);
	includedBrowsers[normalisedBrowser] = [
		version,
		...(includedBrowsers[normalisedBrowser] ?? []),
	];
}

// sort object by alpha then descending by usage
const sorted = Object.fromEntries(Object.entries(includedBrowsers).sort());

const table = ['| Browser | Versions |', '| ------- | -------- |'];

for (let [browser, versions] of Object.entries(sorted)) {
	table.push(`| ${normaliseBrowserName(browser)} | ${versions.join(', ')} |`);
}

export const includedTable = table.join('\n');
// in my stats
