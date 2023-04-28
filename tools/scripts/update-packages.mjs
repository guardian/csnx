import path from 'node:path';
import fs from 'node:fs';

async function getPackageNames(rootDir, companyName) {
	const packageNames = [];
	const libsPath = path.join(rootDir, 'libs', companyName);

	try {
		const entries = await fs.promises.readdir(libsPath, {
			withFileTypes: true,
		});

		for (const entry of entries) {
			if (entry.isDirectory()) {
				const packageJsonPath = path.join(libsPath, entry.name, 'package.json');
				try {
					const packageJson = await fs.promises.readFile(
						packageJsonPath,
						'utf-8',
					);
					const { name } = JSON.parse(packageJson);
					packageNames.push(name);
				} catch (err) {
					console.error(`Error reading ${entry.name} package.json:`, err);
				}
			}
		}
	} catch (err) {
		console.error(`Error reading libs/${companyName} directory:`, err);
	}

	return packageNames;
}

async function createPackageNamesVersions(packageNames, rootDir) {
	const packageNamesVersions = {};

	for (const packageName of packageNames) {
		const packagePath = path.join(rootDir, 'libs', packageName, 'package.json');
		try {
			const packageJson = await fs.promises.readFile(packagePath, 'utf-8');
			const { version } = JSON.parse(packageJson);
			packageNamesVersions[packageName] = version;
		} catch (err) {
			console.error(`Error reading ${packageName} package.json:`, err);
		}
	}

	return packageNamesVersions;
}

function traverseDir(dir, callback) {
	fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
		if (err) {
			console.error(err);
			return;
		}

		entries.forEach((entry) => {
			if (entry.isDirectory()) {
				if (entry.name === 'node_modules') return;

				traverseDir(path.join(dir, entry.name), callback);
			} else if (entry.isFile() && entry.name === 'package.json') {
				callback(path.join(dir, entry.name));
			}
		});
	});
}

function replacePackageVersions(packageJsonPath, packageNamesVersions) {
	fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		const packageJson = JSON.parse(data);
		const dependencies = [
			'dependencies',
			'devDependencies',
			'peerDependencies',
		];

		let updated = false;
		dependencies.forEach((depType) => {
			if (packageJson[depType]) {
				Object.entries(packageNamesVersions).forEach(
					([packageName, newVersion]) => {
						if (
							packageJson[depType][packageName] &&
							!packageJson[depType][packageName].startsWith('workspace:')
						) {
							const currentVersion = packageJson[depType][packageName];

							const versionWithPrefix =
								depType === 'peerDependencies' ? `^${newVersion}` : newVersion;
							if (currentVersion !== versionWithPrefix) {
								packageJson[depType][packageName] = versionWithPrefix;
								updated = true;
								console.log(
									`Replaced ${packageName}@${currentVersion} with ${packageName}@${versionWithPrefix} in ${packageJsonPath}`,
								);
							}
						}
					},
				);
			}
		});

		if (updated) {
			fs.writeFile(
				packageJsonPath,
				JSON.stringify(packageJson, null, '\t'),
				(err) => {
					if (err) {
						console.error(err);
					}
				},
			);
		}
	});
}

const companyName = '@guardian';
const rootDir = path.resolve('.');
getPackageNames(rootDir, companyName).then((packageNames) => {
	createPackageNamesVersions(packageNames, rootDir).then(
		(packageNamesVersions) => {
			traverseDir(rootDir, (packageJsonPath) =>
				replacePackageVersions(packageJsonPath, packageNamesVersions),
			);
		},
	);
});
