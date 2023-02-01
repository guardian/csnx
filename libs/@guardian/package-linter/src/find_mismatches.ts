import type { RegistryDependency } from './@types/dependencies';
import { colour, format } from './colours';

export const count_unsatisfied_peer_dependencies = (
	dependencies: RegistryDependency[],
) =>
	dependencies
		.map(({ peers }) => peers.filter((peer) => !peer.satisfied).length)
		.reduce((acc, curr) => acc + curr);

export const format_dependencies = (
	registry_dependencies: RegistryDependency[],
	verbose = true,
): void => {
	for (const { name, range, dependencies, peers } of registry_dependencies) {
		const unsatisfied = peers.filter(({ satisfied }) => !satisfied);
		if (verbose || unsatisfied.length > 0) {
			const leg = peers.length + dependencies.length > 0 ? '╤' : '═';
			console.info(`║`);
			console.info(`╠${leg}═ ${format(name, range)}`);
		}

		let count = dependencies.length;
		if (verbose) {
			for (const dependency of dependencies) {
				const angle = peers.length === 0 && --count === 0 ? '╰' : '├';
				console.warn(
					`║${angle}─ ${colour.warn('△')} ${format(
						dependency.name,
						dependency.range,
					)} – futher ${colour.file('dependencies')} not analysed`,
				);
			}
		}

		count = verbose ? peers.length : unsatisfied.length;
		for (const { name, range, satisfied, local } of verbose
			? peers
			: unsatisfied) {
			const angle = --count === 0 ? '╰' : '├';
			if (satisfied) {
				if (verbose) {
					console.info(
						`║${angle}─ ${colour.valid('○')} ${format(name, range)}`,
					);
				}
			} else {
				const reason = local
					? `locally specified to ${colour.version(local.raw)}`
					: 'locally missing';

				console.error(
					`║${angle}─ ${colour.invalid('✕')} ${format(
						name,
						range,
					)} – ${reason}`,
				);
			}
		}
	}
};
