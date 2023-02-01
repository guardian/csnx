import { Range } from 'semver';
import { matched_types, mismatches } from './check_types';

it('will not complain on types without an associated package', () => {
	const mismatches = matched_types([
		{ name: '@types/node', range: new Range('~8.11') },
		{ name: 'typescript', range: new Range('^4.9') },
	]);

	expect(mismatches).toStrictEqual([]);
});

it('will find potential mismatches on types with an associated package', () => {
	const matched = matched_types([
		{ name: '@types/react', range: new Range('~16.1') },
		{ name: 'react', range: new Range('^16.1') },
	]);

	expect(matched).toStrictEqual([
		{
			name: 'react',
			range: new Range('^16.1'),
			type_range: new Range('~16.1'),
		},
	]);
});

it('will error on caret ranges', () => {
	const mismatched = mismatches(
		matched_types([
			{ name: '@types/react', range: new Range('^17') },
			{ name: 'react', range: new Range('^17') },
		]),
	);

	expect(mismatched).toStrictEqual([
		['react', 'Invalid notation. Only pinned and tilde (~) ranges allowed'],
	]);
});

it('will error on wide ranges', () => {
	const mismatched = mismatches(
		matched_types([
			{ name: '@types/react', range: new Range('>=17') },
			{ name: 'react', range: new Range('^17') },
		]),
	);

	expect(mismatched).toStrictEqual([
		['react', 'Invalid notation. Only pinned and tilde (~) ranges allowed'],
	]);
});

it('will allow pinned versions', () => {
	const mismatched = mismatches(
		matched_types([
			{ name: '@types/react', range: new Range('17') },
			{ name: 'react', range: new Range('17') },
		]),
	);

	expect(mismatched).toStrictEqual([]);
});

it('will error on invalid major ranges', () => {
	const mismatched = mismatches(
		matched_types([
			{ name: '@types/react', range: new Range('~17.1') },
			{ name: 'react', range: new Range('~18.1') },
		]),
	);

	expect(mismatched).toStrictEqual([['react', 'Mismatching major versions']]);
});

it('will error on invalid minor ranges', () => {
	const mismatched = mismatches(
		matched_types([
			{ name: '@types/react', range: new Range('~17.1') },
			{ name: 'react', range: new Range('~17.0') },
		]),
	);

	expect(mismatched).toStrictEqual([['react', 'Mismatching minor versions']]);
});

it('will allow known errors ', () => {
	const mismatched = mismatches(
		matched_types([
			{ name: '@types/scheduler', range: new Range('~0.16.2') },
			{ name: 'scheduler', range: new Range('~0.23.0') },
		]),
		{
			known_issues: {
				'scheduler@~0.23.0': {
					'@types/scheduler': ['~0.16.2', '~0.23.0'],
				},
			},
		},
	);

	expect(mismatched).toEqual([]);
});
