// detect two or more `/` chars after a word boundary
const multipleSlashesInRoute = /\b\/{2,}/g;

export const joinUrl = (...args: string[]): string =>
	args.join('/').replace(multipleSlashesInRoute, '/');
