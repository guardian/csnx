import { Range, SemVer } from 'semver';
import { count_unsatisfied_peer_dependencies } from './find_mismatches';

it('Works when all dependencies are matched', () => {
	expect(
		count_unsatisfied_peer_dependencies([
			{
				name: 'one',
				range: new Range('1.0.0'),
				version: new SemVer('1.0.0'),
				dependencies: [],
				peers: [
					{
						name: 'two',
						satisfied: true,
						range: new Range('^2.0.0'),
					},
					{
						name: 'three',
						satisfied: true,
						range: new Range('^3.0.0'),
					},
				],
			},
			{
				name: 'two',
				range: new Range('2.0.2'),
				version: new SemVer('2.0.2'),
				dependencies: [],
				peers: [{ name: 'four', satisfied: true, range: new Range('^4') }],
			},
		]),
	).toBe(0);
});

it('Fails on invalid range', () => {
	expect(
		count_unsatisfied_peer_dependencies([
			{
				name: 'one',
				range: new Range('1.0.0'),
				version: new SemVer('1.0.0'),
				dependencies: [],
				peers: [
					{
						name: 'two',
						satisfied: false,
						range: new Range('^2.0.3'),
					},
				],
			},
			{
				name: 'two',
				range: new Range('2.0.2'),
				version: new SemVer('2.0.2'),
				dependencies: [],
				peers: [],
			},
		]),
	).toBe(1);
});
