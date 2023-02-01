import type { Range, SemVer } from 'semver';

export interface Dependency {
	name: string;
	range: Range;
}

export interface UnrefinedDependency extends Dependency {
	dependencies: Record<string, string>;
	devDependencies: Record<string, string>;
	peerDependencies: Record<string, string>;
	known_issues: Record<string, Record<string, [from: string, to: string]>>;
}

export interface RegistryDependency extends Dependency {
	version: SemVer;
	dependencies: Dependency[];
	peers: PeerDependency[];
}

export interface PeerDependency extends Dependency {
	satisfied: boolean;
	local?: Range;
}
