import { Range } from 'semver';
import { object, record, string, tuple } from 'zod';
import type { Dependency, UnrefinedDependency } from './@types/dependencies';
import { colour } from './colours';
import { is_defined } from './utils';

export const find_duplicates = (dependencies: Dependency[]): string[] => {
	const seen = new Set<string>();
	const duplicates = new Set<string>();

	for (const { name } of dependencies) {
		if (seen.has(name)) duplicates.add(name);
		seen.add(name);
	}

	return [...duplicates];
};

const package_parser = object({
	name: string(),
	version: string(),
	dependencies: record(string()).optional(),
	devDependencies: record(string()).optional(),
	peerDependencies: record(string()).optional(),
	known_issues: record(record(tuple([string(), string()]))).optional(),
});

export const parse_package_info = (contents: unknown): UnrefinedDependency => {
	const {
		name,
		version,
		dependencies = {},
		devDependencies = {},
		peerDependencies = {},
		known_issues = {},
	} = package_parser.parse(contents);
	return {
		name,
		range: new Range(version),
		dependencies,
		devDependencies,
		peerDependencies,
		known_issues,
	};
};

export const parse_declared_dependencies = (
	dependencies: Array<[name: string, range: string]>,
): Dependency[] =>
	dependencies
		.map(([name, range]) => {
			try {
				return { name, range: new Range(range) };
			} catch (error: unknown) {
				const reason = error instanceof Error ? error.message : 'unknown';
				console.warn(
					`╟─ ${colour.warn('△')}`,
					colour.dependency(name),
					`(${reason})`,
				);
			}
			return undefined;
		})
		.filter(is_defined)
		.flat();
