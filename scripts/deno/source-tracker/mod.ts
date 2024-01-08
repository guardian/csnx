import { getLatestVersion } from './get-latest-version.ts';
import { getMarkdown } from './get-markdown.ts';
import {
	getPkgVersionsInUse,
	type PkgVersionsInUse,
} from './get-pkg-versions-in-use.ts';
import { octokit } from '../octokit.ts';

// localStorage.clear();

const packages = [
	'@guardian/source-foundations',
	'@guardian/source-react-components',
] as const;

export type UsageData = {
	[name in (typeof packages)[number]]: {
		latestVersion: string;
		usage: PkgVersionsInUse;
	};
};

const usageData: UsageData = {} as UsageData;

for (const packageName of packages) {
	const versionsInUse = await getPkgVersionsInUse(packageName);

	console.log(`Getting latest version of ${packageName}:`);
	const latestVersion = await getLatestVersion(packageName);
	console.log(`- ${latestVersion}`);

	usageData[packageName] = { usage: versionsInUse, latestVersion };
}

const markdown = getMarkdown(usageData);

// const content = new TextEncoder().encode(markdown);
// await Deno.writeFile('markdown.md', content);

const issue_number = 1058;

try {
	const {
		data: { html_url },
	} = await octokit.rest.issues.update({
		owner: 'guardian',
		repo: 'csnx',
		issue_number,
		body: markdown,
	});

	console.info(`Successfully updated issue #${issue_number}`);
	console.info(html_url);
} catch (error) {
	console.warn(`Failed to update issue #${issue_number}`);
	console.error(error);
}
