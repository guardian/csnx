import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'https://deno.land/std@0.187.0/path/mod.ts';

export const rootDir = resolve(
	dirname(fileURLToPath(import.meta.url)),
	'../..',
);
