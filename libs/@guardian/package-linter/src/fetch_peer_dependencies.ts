import { minVersion, Range, satisfies, SemVer } from 'semver';
import * as zod from 'zod';
import type {
	Dependency,
	RegistryDependency,
	UnrefinedDependency,
} from './@types/dependencies';
import { colour } from './colours';

const json_parser = zod.object({
	version: zod.string(),
	dependencies: zod.record(zod.string()).optional(),
	peerDependencies: zod.record(zod.string()).optional(),
	peerDependenciesMeta: zod
		.record(zod.object({ optional: zod.boolean() }))
		.optional(),
});

interface Options {
	known_issues?: UnrefinedDependency['known_issues'];
	cache?: boolean;
}

type ParsedJSON = zod.infer<typeof json_parser>;

const registry_dependencies_cache = new Map<string, ParsedJSON>();

export const get_registry_dependency = async (
	dependency: Dependency,
	cache: boolean,
): Promise<ParsedJSON> => {
	const min_version = minVersion(dependency.range)?.version;
	if (!min_version) throw new Error('Invalid version');

	const url = new URL(
		`${dependency.name}@${min_version}/package.json`,
		'https://unpkg.com/',
	);

	const found = registry_dependencies_cache.get(url.href);
	if (cache && found) return found;

	const registry_dependency = await fetch(url.href)
		.then((res) => res.json())
		.then((json) => json_parser.parse(json));

	registry_dependencies_cache.set(url.href, registry_dependency);

	return registry_dependency;
};

export const fetch_peer_dependencies = (
	dependencies: Dependency[],
	{ known_issues, cache }: Options = {},
): Promise<RegistryDependency[]> =>
	Promise.all(
		dependencies.map((dependency) =>
			get_registry_dependency(dependency, !!cache)
				.then((registry) => {
					const peers = Object.entries(registry.peerDependencies ?? {}).map(
						([name, range]) => {
							const local_version = dependencies.find(
								(dependency) => dependency.name === name,
							)?.range;

							const known_issue =
								known_issues?.[`${dependency.name}@${dependency.range.raw}`]?.[
									name
								];

							const comparative_range = known_issue
								? range.replace(...known_issue)
								: range;

							const local_min_version = local_version
								? minVersion(local_version)
								: null;
							const local_version_matches = local_min_version
								? satisfies(local_min_version, comparative_range)
								: false;

							const is_optional =
								!!registry.peerDependenciesMeta?.[name]?.optional;

							const satisfied = local_version
								? local_version_matches
								: is_optional;

							return {
								name,
								range: new Range(range),
								satisfied,
								local: local_version,
							};
						},
					);

					return {
						...dependency,
						dependencies: Object.entries(registry.dependencies ?? {})
							.filter(([name, range]) => {
								try {
									new Range(range);
									return true;
								} catch (error) {
									const reason =
										error instanceof Error ? error.message : 'unknown';
									console.warn(
										`╟─ ${colour.warn('△')} ${colour.dependency(
											name,
										)} (${reason})`,
									);
								}
								return false;
							})
							.map(([name, range]) => ({ name, range: new Range(range) })),
						peers,
						version: new SemVer(registry.version),
					};
				})
				.catch((error) => {
					console.error('🚨 Failed to parse package.json for', dependency.name);
					throw error;
				}),
		),
	);
