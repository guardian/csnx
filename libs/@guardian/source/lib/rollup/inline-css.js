import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const QUERY = '?inline';
const PREFIX = '\0inline-css:';

/**
 * Resolves `import styles from 'some.css?inline'` to the file's contents as a
 * string, mirroring Vite's `?inline` behaviour so the same source works in both
 * Storybook (Vite) and the Rollup build.
 *
 * @returns {import("rollup").Plugin}
 */
export const inlineCss = () => ({
	name: 'inline-css',
	resolveId(source, importer) {
		if (!source.endsWith(QUERY)) {
			return null;
		}

		const specifier = source.slice(0, -QUERY.length);
		const require = createRequire(importer ?? import.meta.url);

		return PREFIX + require.resolve(specifier);
	},
	async load(id) {
		if (!id.startsWith(PREFIX)) {
			return null;
		}

		const css = await readFile(id.slice(PREFIX.length), 'utf8');

		return {
			code: `export default ${JSON.stringify(css)};`,
			moduleSideEffects: false,
		};
	},
});
