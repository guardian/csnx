import { privateLib } from '@guardian/private-lib';

export function publicLib(): string {
	return `${privateLib()} public-lib`;
}
