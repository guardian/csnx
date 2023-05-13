import { fileURLToPath } from 'https://deno.land/std@0.170.0/node/url.ts';
import { resolve, dirname } from 'https://deno.land/std/path/mod.ts';

export const root_dir = resolve(
	dirname(fileURLToPath(import.meta.url)),
	'../..',
);
