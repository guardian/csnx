import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { execa } from 'execa';

// from https://docs.google.com/spreadsheets/d/19ShjyvTn5sEAZLMgjW0lh7dElxl_5Xk-8Z-OZm1nfS0
const result = await fetch(
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvT158n7GDBidp3r62aoJkMz2WQlvct26kzfocmH60xEoxCXGPBjubqN3k2k_5g44jBLk9-YYGSpuC/pub?gid=1583460609&single=true&output=csv',
);

const csv = await result.text();

await mkdir('./.tmp', { recursive: true });
await writeFile('./.tmp/data.csv', csv);

const { stdout } = await execa('browserslist-ga-export', [
	'--reportPath',
	'./.tmp/data.csv',
	'--firstRowIndex',
	'15',
]);

await rm('./.tmp', { recursive: true, force: true });
