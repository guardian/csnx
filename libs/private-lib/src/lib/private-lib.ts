import { noBuildLib } from '@guardian/no-build-lib';

export function privateLib(): string {
	return `${noBuildLib()} private-lib`;
}
