const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

const git = simpleGit();

const guardianLibsPath = 'libs/@guardian';

// Read package.json file from a given folder
const readPackageJson = (folderPath) => {
	return JSON.parse(
		fs.readFileSync(path.join(folderPath, 'package.json'), 'utf8'),
	);
};

// Get package.json from the main branch for a given folder
const getPackageJsonFromMain = async (folderPath) => {
	const packageJsonContent = await git.show([
		`origin/main:${folderPath}/package.json`,
	]);
	return JSON.parse(packageJsonContent);
};

// Compare dependencies and create a list of changes
const compareDependencies = (currentDeps, mainDeps, type) => {
	const changes = [];
	if (currentDeps === undefined) {
		return changes;
	}
	for (const [dep, version] of Object.entries(currentDeps)) {
		if (!mainDeps[dep] || mainDeps[dep] !== version) {
			changes.push(
				`- ${type} ${dep} changed from ${mainDeps[dep]} to ${version}`,
			);
		}
	}

	return changes;
};

const compareAllDependencies = async (folderPath) => {
	try {
		const localPackageJson = readPackageJson(folderPath);
		const mainPackageJson = await getPackageJsonFromMain(folderPath);

		const dependencyChanges = compareDependencies(
			localPackageJson.dependencies,
			mainPackageJson.dependencies,
			'dependency',
		);
		const devDependencyChanges = compareDependencies(
			localPackageJson.devDependencies,
			mainPackageJson.devDependencies,
			'devDependency',
		);
		const peerDependencyChanges = compareDependencies(
			localPackageJson.peerDependencies,
			mainPackageJson.peerDependencies,
			'peerDependency',
		);

		const allChanges = [
			...dependencyChanges,
			...devDependencyChanges,
			...peerDependencyChanges,
		];

		console.log(`Dependency changes for ${folderPath}:`, allChanges);
	} catch (error) {
		console.error('Error:', error);
	}
};

const main = async () => {
	const guardianLibsFolders = fs
		.readdirSync(guardianLibsPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => path.join(guardianLibsPath, dirent.name));

	for (const folder of guardianLibsFolders) {
		await compareAllDependencies(folder);
	}
};

main();
