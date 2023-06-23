import type { Plugin } from 'rollup';

const pattern = /^\/\/\/ <reference types="(.*)" \/>$/gm;

export const removeTripleSlashDirectives: Plugin = {
	name: 'remove-triple-slash-directives',

	buildStart() {
		this.warn({
			message:
				'Due to an incompatibility between TypeScript 5.1 and `rollup-plugin-ts` we need to remove tripe-slash directives from output files',
		});
	},

	renderChunk(code, chunk) {
		console.log({ code, chunk });

		// if (!chunk.fileName.endsWith('.d.ts')) return null;
		return code.replaceAll(pattern, '');
	},

	// transform(code, id) {
	// 	if (!keys.length) return null;
	// 	if (!filter(id)) return null;
	// 	return executeReplacement(code, id);
	// },
};
