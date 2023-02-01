import { cyan, gray, green, red, underline, yellow } from 'colorette';
import type { Range } from 'semver';

export const colour = {
	dependency: cyan,
	file: underline,
	invalid: red,
	subdued: gray,
	valid: green,
	version: yellow,
	warn: yellow,
};

export const format = (name: string, range: Range) =>
	[
		colour.dependency(name),
		colour.subdued('@'),
		colour.version(range.raw),
	].join('');
