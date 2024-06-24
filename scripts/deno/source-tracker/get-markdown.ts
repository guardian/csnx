import { Markdown } from 'https://deno.land/x/deno_markdown@v0.2/mod.ts';
import { depTypes } from './get-pkg-versions-in-use.ts';
import { UsageData } from './mod.ts';

export const getMarkdown = (usageData: UsageData) => {
	const issue = new Markdown();

	for (const [packageName, { usage, latestVersion }] of Object.entries(
		usageData,
	)) {
		issue.header(`${packageName}`, 1);
		issue.paragraph(
			`Latest version: [\`v${latestVersion}\`](https://www.npmjs.com/package/${packageName}).`,
		);
		issue.header(`Versions in use`, 3);

		const versions = usage
			.sort((a, b) => b.version - a.version)
			.flatMap(({ version, installations }) => {
				const x = installations
					.sort((a, b) => a.project.localeCompare(b.project))
					.map(
						({
							project,
							pkgUrl,
							dependencies,
							devDependencies,
							peerDependencies,
						}) => [
							`[${project}](${pkgUrl})`,
							dependencies ? `\`${dependencies}\`` : '',
							devDependencies ? `\`${devDependencies}\`` : '',
							peerDependencies ? `\`${peerDependencies}\`` : '',
						],
					);
				return [[`**${version}**`], ...x];
			});

		issue.table([['Installation', ...depTypes], ...versions], {
			align: ['l', 'r', 'r', 'r'],
		});
	}

	return issue.content;
};
