import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import fetchMock from 'jest-fetch-mock';
import { Range, SemVer } from 'semver';
import { fetch_peer_dependencies } from './fetch_peer_dependencies';

fetchMock.enableMocks();

// How to generate the fixtures? Just use Deno:
// deno eval "console.log(await fetch('https://unpkg.com/@guardian/core-web-vitals@2.0.2/package.json').then(r => r.text()))" | pbcopy

it('Can get peer dependencies', async () => {
	fetchMock.mockResponseOnce(
		await readFile(
			resolve(
				__dirname +
					'/../fixtures/@guardian/core-web-vitals@2.0.2/registry.json',
			),
			'utf-8',
		),
	);

	const with_peer_deps = await fetch_peer_dependencies([
		{
			name: '@guardian/core-web-vitals',
			range: new Range('2.0.2'),
		},
	]);

	expect(with_peer_deps).toStrictEqual([
		{
			name: '@guardian/core-web-vitals',
			range: new Range('2.0.2'),
			version: new SemVer('2.0.2'),
			dependencies: [],
			peers: [
				{
					name: '@guardian/libs',
					range: new Range('^12.0.0'),
					satisfied: false,
					local: undefined,
				},
				{
					name: 'tslib',
					range: new Range('^2.4.1'),
					satisfied: false,
					local: undefined,
				},
				{
					name: 'typescript',
					range: new Range('^4.3.2'),
					satisfied: true,
					local: undefined,
				},
				{
					name: 'web-vitals',
					range: new Range('^2.0.0'),
					satisfied: false,
					local: undefined,
				},
			],
		},
	]);
});

it('Can get optional peer dependencies', async () => {
	fetchMock.mockResponseOnce(
		await readFile(
			resolve(__dirname + '/../fixtures/@guardian/libs@12.0.0/registry.json'),
			'utf-8',
		),
	);

	const peer_deps = await fetch_peer_dependencies([
		{ name: '@guardian/libs', range: new Range('12.0.0') },
	]);

	expect(peer_deps).toStrictEqual([
		{
			name: '@guardian/libs',
			range: new Range('12.0.0'),
			version: new SemVer('12.0.0'),
			dependencies: [],
			peers: [
				{
					name: 'tslib',
					range: new Range('^2.4.1'),
					satisfied: false,
					local: undefined,
				},
				{
					name: 'typescript',
					range: new Range('^4.3.2'),
					satisfied: true,
					local: undefined,
				},
			],
		},
	]);
});

it('Will fail on optional dependencies that are defined locally', async () => {
	fetchMock
		.mockResponseOnce(
			await readFile(
				resolve(__dirname + '/../fixtures/@guardian/libs@12.0.0/registry.json'),
				'utf-8',
			),
		)
		.mockResponseOnce(
			await readFile(
				resolve(__dirname + '/../fixtures/tslib@2.4.1/registry.json'),
				'utf-8',
			),
		)
		.mockResponseOnce(
			await readFile(
				resolve(__dirname + '/../fixtures/typescript@4.2.2/registry.json'),
				'utf-8',
			),
		);

	const peer_deps = await fetch_peer_dependencies([
		{ name: '@guardian/libs', range: new Range('12.0.0') },
		{ name: 'tslib', range: new Range('2.4.1') },
		{ name: 'typescript', range: new Range('4.2.2') },
	]);

	expect(peer_deps).toStrictEqual([
		{
			name: '@guardian/libs',
			range: new Range('12.0.0'),
			version: new SemVer('12.0.0'),
			dependencies: [],
			peers: [
				{
					name: 'tslib',
					range: new Range('^2.4.1'),
					satisfied: true,
					local: new Range('2.4.1'),
				},
				{
					name: 'typescript',
					range: new Range('^4.3.2'),
					satisfied: false,
					local: new Range('4.2.2'),
				},
			],
		},
		{
			name: 'tslib',
			range: new Range('2.4.1'),
			version: new SemVer('2.4.1'),
			dependencies: [],
			peers: [],
		},
		{
			name: 'typescript',
			range: new Range('4.2.2'),
			version: new SemVer('4.2.2'),
			dependencies: [],
			peers: [],
		},
	]);
});
