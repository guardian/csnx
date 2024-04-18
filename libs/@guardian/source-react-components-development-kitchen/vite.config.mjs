import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import pkg from './package.json';

const packageDependencies = [
	...Object.keys(pkg.dependencies || {}),
	...Object.keys(pkg.peerDependencies || {}),
];

const packageAdditionalDependencies = packageDependencies.map((dep) => {
	return new RegExp(`${dep}\/`);
});
export default defineConfig({
	build: {
		minify: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['cjs', 'es'],
		},
		rollupOptions: {
			external: [...packageDependencies, ...packageAdditionalDependencies],
		},
	},
});
