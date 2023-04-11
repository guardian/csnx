/** detect two or more `/` chars after a word boundary */
const multipleSlashesInRoute = /\b\/{2,}/g;

/** @param {string[]} args */
export const joinUrl = (...args) =>
	args.join('/').replace(multipleSlashesInRoute, '/');
