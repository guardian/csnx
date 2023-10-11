import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual([
			'InteractiveAtom',
			'InteractiveLayoutAtom',
			'KnowledgeQuizAtom',
			'PersonalityQuizAtom',
			'ProfileAtom',
			'QandaAtom',
			'RecipeAtom',
			'TimelineAtom',
			'VideoAtom',
		]);
	});
});

// test that type exports have not been removed.
// won't catch new types but I don't know how we can?
export type {
	ProfileAtomType,
	QandaAtomType,
	SharingUrlsType,
	TimelineEvent,
	TimelineAtomType,
} from './index';

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';
