import semver from 'npm:semver@7.5.4';
import { getInstallationData } from './get-installation-data.ts';
import { getInstallations } from './get-installations.ts';

export type PkgVersionsInUse = {
	version: number;
	installations: Array<{
		project: string;
		pkgUrl: string;
		dependencies?: string;
		devDependencies?: string;
		peerDependencies?: string;
	}>;
}[];

export const depTypes = [
	'dependencies',
	'devDependencies',
	'peerDependencies',
] as const;

export const getPkgVersionsInUse = async (
	packageName: string,
): Promise<PkgVersionsInUse> => {
	const pkgVersionsInUse: PkgVersionsInUse = [];

	console.log(`Searching for installations of ${packageName}:`);
	const installations = await getInstallations(packageName);
	console.log(`- found ${installations.length} installations`);

	console.log(`Getting versions in:`);

	for (const installation of installations) {
		const installationData = await getInstallationData(installation);
		const project =
			`${installation.repository.name}/${installation.path}`.replace(
				'/package.json',
				'',
			);

		console.log(`- ${project}`);

		if (!Array.isArray(installationData) && 'content' in installationData) {
			const contents = atob(installationData.content);
			const installationPkg = JSON.parse(contents);

			if (installationPkg.name === packageName) continue;

			const instance: PkgVersionsInUse[number]['installations'][number] = {
				project,
				pkgUrl: installation.html_url,
			};

			for (const depType of depTypes) {
				instance[depType] = installationPkg[depType]?.[packageName];
			}

			const versions = depTypes.map(
				(depType) => installationPkg[depType]?.[packageName],
			);

			const minVersions = versions
				.filter(Boolean)
				.map((version) => semver.minVersion(version).version);
			const lowestVersion = semver.sort(minVersions)[0];
			const lowestVersionMajor = semver.major(lowestVersion);

			const existingVersion = pkgVersionsInUse.find(
				(_) => _.version === lowestVersionMajor,
			);
			if (existingVersion) {
				existingVersion.installations.push(instance);
			} else {
				pkgVersionsInUse.push({
					version: lowestVersionMajor,
					installations: [instance],
				});
			}
		}
	}
	return pkgVersionsInUse;
};
