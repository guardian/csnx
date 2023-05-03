import path from 'node:path';
import fs from 'node:fs';
import semver from 'semver';
import simpleGit from 'simple-git';
import readline from 'node:readline';

const MONOREPO_FOLDER = 'libs/@guardian';
const PACKAGE_JSON_FILE = 'package.json';
const CHANGELOG_FILE = 'CHANGELOG.md';

const git = simpleGit();

const firstLetterToUppercase = (str) =>
	str.charAt(0).toUpperCase() + str.slice(1);

function getInput(query) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	return new Promise((resolve) =>
		rl.question(query, (ans) => {
			rl.close();
			resolve(ans);
		}),
	);
}

async function getVersionFromBranch(packagePath, branch) {
	await git.fetch();
	const packageJsonContent = await git.show([
		`${branch}:${path.join(packagePath, PACKAGE_JSON_FILE)}`,
	]);
	const packageJson = JSON.parse(packageJsonContent);
	return packageJson.version;
}

function insertAfterPackageName(data, packageName, newEntry) {
	const lines = data.split('\n');
	console.log(packageName);
	const packageLineIndex = lines.findIndex(
		(line) => line === `# ${packageName}`,
	);

	if (packageLineIndex === -1) {
		console.error(`Package name not found in ${CHANGELOG_FILE}.`);
		process.exit(1);
	}

	lines.splice(packageLineIndex + 1, 0, newEntry);
	return lines.join('\n');
}

async function updateChangelog(
	packagePath,
	packageName,
	localVersion,
	changeType,
) {
	const changeTypeCapitalised = firstLetterToUppercase(changeType);
	const description = await getInput(
		`Enter a description for the changelog of ${packageName}:`,
	);
	const newEntry = `\n## ${localVersion} \n\n### ${changeTypeCapitalised} changes \n\n- ${description}`;

	const changelogPath = path.join(packagePath, CHANGELOG_FILE);

	fs.readFile(changelogPath, 'utf8', (err, data) => {
		if (err) {
			console.error(
				`Error reading ${CHANGELOG_FILE} in ${packagePath}: ${err}`,
			);
			process.exit(1);
		}

		const updatedChangelog = insertAfterPackageName(
			data,
			packageName,
			newEntry,
		);

		fs.writeFile(changelogPath, updatedChangelog, 'utf8', (err) => {
			if (err) {
				console.error(
					`Error writing to ${CHANGELOG_FILE} in ${packagePath}: ${err}`,
				);
				process.exit(1);
			}

			console.log(
				`Changelog updated in ${packagePath} with version ${localVersion} (${changeType}).`,
			);
		});
	});
}

(async function () {
	fs.readdir(MONOREPO_FOLDER, { withFileTypes: true }, async (err, items) => {
		if (err) {
			console.error(`Error reading monorepo folder ${MONOREPO_FOLDER}: ${err}`);
			process.exit(1);
		}

		const packageFolders = items
			.filter((item) => item.isDirectory())
			.map((item) => item.name);

		for (const packageFolder of packageFolders) {
			const packagePath = path.join(MONOREPO_FOLDER, packageFolder);

			const localPackageJsonPath = path.join(packagePath, PACKAGE_JSON_FILE);
			const localPackageJson = JSON.parse(
				fs.readFileSync(localPackageJsonPath, 'utf8'),
			);
			const localVersion = localPackageJson.version;
			const packageName = localPackageJson.name;

			const mainVersion = await getVersionFromBranch(
				packagePath,
				'origin/main',
			);

			if (!semver.valid(localVersion) || !semver.valid(mainVersion)) {
				console.error(
					`Invalid version in ${packagePath}. Please ensure a valid SemVer version is in package.json for both branches.`,
				);
				process.exit(1);
			}

			const changeType = semver.diff(mainVersion, localVersion);

			if (!changeType) {
				console.log(
					`No version change detected for ${packagePath}. Skipping...`,
				);
			} else {
				await updateChangelog(
					packagePath,
					packageName,
					localVersion,
					changeType,
				);
			}
		}
	});
})();
