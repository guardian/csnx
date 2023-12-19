/** detect two or more `/` chars after a word boundary */
const multipleSlashesInRoute = /\b\/{2,}/g;

/**
 * Takes a variable number of strings as arguments,
 * joining them as a single valid URL string.
 *
 * Handles trailing or leading spaces and double slashes.
 *
 * @returns a normalised URL pathname
 *
 * @example
 * ```js
 * import { joinUrl } from '@guardian/libs';
 *
 * const url = joinUrl('https://example.com/', '/media', '/', '//source.png');
 * console.assert(url === 'https://example.com/media/source.png');
 * ```
 */
export const joinUrl = (...args: readonly string[]): string =>
	args.join('/').replace(multipleSlashesInRoute, '/');
