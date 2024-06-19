import semver from 'npm:semver@7.5.4';
import * as colors from 'https://deno.land/std@0.224.0/fmt/colors.ts';
import { getInstallationData } from './get-installation-data.ts';
import { getInstallations } from './get-installations.ts';

export type PkgVersionsInUse = {
	version: string | number;
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

	function reportVersion(
		finalVersion: PkgVersionsInUse[number]['version'],
		instance: PkgVersionsInUse[number]['installations'][number],
	) {
		const existingVersion = pkgVersionsInUse.find(
			(_) => _.version === finalVersion,
		);

		if (existingVersion) {
			existingVersion.installations.push(instance);
		} else {
			pkgVersionsInUse.push({
				version: finalVersion,
				installations: [instance],
			});
		}
	}

	try {
		// search github for guardian repos with package.jsons that contain this
		// package name
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

				if (installationPkg.name === packageName) {
					console.log(
						colors.dim(`  package.json is for ${packageName}, skipping`),
					);
					continue;
				}

				const instance: PkgVersionsInUse[number]['installations'][number] = {
					project,
					pkgUrl: installation.html_url,
				};

				// get versions of package in use in by dep type
				for (const depType of depTypes) {
					instance[depType] = installationPkg[depType]?.[packageName];
				}

				// get all versions in use
				const versions = depTypes
					.map((depType) => installationPkg[depType]?.[packageName])
					.filter(Boolean);

				// the search isn't infallible...
				if (versions.length === 0) {
					console.log(
						colors.dim(`  ${packageName} not found (false positive), skipping`),
					);
					continue;
				}

				for (const nonSemverVersion of versions.filter(
					(version) => !semver.valid(version) && !semver.validRange(version),
				)) {
					reportVersion(nonSemverVersion, instance);
				}

				// get the lowest versions in use in this package
				const minVersions = versions
					.filter(
						(version) => semver.valid(version) || semver.validRange(version),
					)
					.map((version) => {
						return semver.minVersion(version).version;
					});

				if (minVersions.length > 0) {
					const lowestVersion = semver.sort(minVersions)[0];
					const lowestVersionMajor = semver.major(lowestVersion);
					reportVersion(lowestVersionMajor, instance);
				}
			}
		}
	} catch (error) {
		console.error(error);
	}

	return pkgVersionsInUse;
};
