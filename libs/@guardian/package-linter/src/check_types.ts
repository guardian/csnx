import { major, minor, minVersion } from 'semver';
import type { Dependency, UnrefinedDependency } from './@types/dependencies';
import { is_defined } from './utils';

export const filter_types = (dependencies: string[]) =>
	dependencies.filter((dependency) => dependency.startsWith('@types/'));

export const matched_types = (dependencies: Dependency[]) =>
	dependencies
		.map(({ name, range }) => {
			const { range: type_range } =
				dependencies.find(
					({ name: other_name }) => other_name === `@types/${name}`,
				) ?? {};

			return type_range ? { name, range, type_range } : undefined;
		})
		.filter(is_defined);

const PIN_OR_TILDE = /^(~|\d)/;

interface Options {
	known_issues?: UnrefinedDependency['known_issues'];
}

export const mismatches = (
	dependencies: ReturnType<typeof matched_types>,
	{ known_issues }: Options = {},
) =>
	dependencies
		.map(({ name, range, type_range }) => {
			const known_issue =
				known_issues?.[`${name}@${range.raw}`]?.[`@types/${name}`];

			if (known_issue) {
				const [from, to] = known_issue;
				if (from === type_range.raw && to === range.raw) return undefined;
			}

			if (
				!range.raw.match(PIN_OR_TILDE) ||
				!type_range.raw.match(PIN_OR_TILDE)
			) {
				return [
					name,
					'Invalid notation. Only pinned and tilde (~) ranges allowed',
				] as const;
			}

			const main_min = minVersion(range);
			const type_min = minVersion(type_range);

			if (!main_min || !type_min) {
				return [name, 'Invalid range or version types'] as const;
			}

			if (major(main_min) !== major(type_min)) {
				return [name, 'Mismatching major versions'] as const;
			}
			if (minor(main_min) !== minor(type_min)) {
				return [name, 'Mismatching minor versions'] as const;
			}

			return undefined;
		})
		.filter(is_defined);
