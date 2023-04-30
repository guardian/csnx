const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const semver = require('semver');

const guardianFolder = path.join(path.resolve('.'), 'libs', '@guardian');
const packageFolders = fs.readdirSync(guardianFolder);

const SemverDiff = {
	major: 1,
	minor: 2,
	patch: 3,
};

packageFolders.forEach((folder) => {
	const packagePath = path.join(guardianFolder, folder);
	const packageJsonPath = path.join(packagePath, 'package.json');

	if (fs.existsSync(packageJsonPath)) {
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
		const lastCommitPackageJson = JSON.parse(
			execSync(
				`git show HEAD~1:${path.join(
					'libs',
					'@guardian',
					folder,
					'package.json',
				)}`,
				{ encoding: 'utf8' },
			),
		);

		const dependencyTypes = [
			'dependencies',
			'devDependencies',
			'peerDependencies',
		];
		let maxDiff = 0;

		dependencyTypes.forEach((type) => {
			const currentDeps = packageJson[type] || {};
			const lastCommitDeps = lastCommitPackageJson[type] || {};
			const depsKeys = new Set([
				...Object.keys(currentDeps),
				...Object.keys(lastCommitDeps),
			]);

			depsKeys.forEach((dep) => {
				const currentVersion = (currentDeps[dep] || '0.0.0').replace('^', '');
				const lastCommitVersion = (lastCommitDeps[dep] || '0.0.0').replace(
					'^',
					'',
				);
				if (currentVersion !== lastCommitVersion) {
					const diff = semver.diff(currentVersion, lastCommitVersion);

					if (diff && SemverDiff[diff] > maxDiff) {
						maxDiff = diff;
					}
				}
			});
		});

		if (maxDiff) {
			const newPackageVersion = semver.inc(packageJson.version, maxDiff);
			packageJson.version = newPackageVersion;

			// Write the updated package.json content back to the file
			fs.writeFileSync(
				packageJsonPath,
				JSON.stringify(packageJson, null, '\t') + '\n',
				'utf8',
			);
			console.log(`${folder} updated to version ${newPackageVersion}`);
		}
	}
});
