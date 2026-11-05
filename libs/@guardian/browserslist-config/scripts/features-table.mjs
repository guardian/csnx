import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import caniuse from 'caniuse-lite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browserslistStats = JSON.parse(
	readFileSync(path.join(__dirname, '..', 'browserslist-stats.json'), 'utf8'),
);

// caniuse only tracks the latest version of some mobile browsers, so fall back
// to their desktop equivalent
const desktopEquivalents = {
	and_chr: 'chrome',
	and_ff: 'firefox',
	android: 'chrome',
};

const lookup = (browserStats, version) => {
	if (!browserStats) {
		return undefined;
	}
	if (browserStats[version]) {
		return browserStats[version];
	}

	// versions newer than the caniuse data use the latest known version
	const latest = Object.keys(browserStats).reduce((a, b) =>
		parseFloat(b) > parseFloat(a) ? b : a,
	);
	return parseFloat(version) > parseFloat(latest)
		? browserStats[latest]
		: undefined;
};

const getSupport = (stats, browser, version) => {
	const support =
		lookup(stats[browser], version) ??
		lookup(stats[desktopEquivalents[browser]], version);
	if (support) {
		return support;
	}

	// single-version browsers (e.g. op_mini, and_uc) use the latest caniuse data
	const versions = Object.keys(stats[browser] ?? {});
	return versions.length === 1 ? stats[browser][versions[0]] : undefined;
};

const total = Object.values(browserslistStats)
	.flatMap((versions) => Object.values(versions))
	.reduce((sum, usage) => sum + usage, 0);

const rows = Object.entries(caniuse.features).map(([id, packed]) => {
	const { title, stats } = caniuse.feature(packed);
	let supported = 0;

	for (const [browser, versions] of Object.entries(browserslistStats)) {
		for (const [version, usage] of Object.entries(versions)) {
			const support = getSupport(stats, browser, version)?.split(' ') ?? [];
			if (support.includes('y')) {
				supported += usage;
			}
		}
	}

	return {
		id,
		title: title.replaceAll('|', '\\|'),
		supported: (supported / total) * 100,
	};
});

rows.sort(
	(a, b) => b.supported - a.supported || a.title.localeCompare(b.title),
);

const table = [
	'| Feature | Supported |',
	'| ------- | --------- |',
	...rows.map(
		({ id, title, supported }) =>
			`| [${title}](https://caniuse.com/${id}) | ${supported.toFixed(2)}% |`,
	),
];

export const featuresTable = table.join('\n');
