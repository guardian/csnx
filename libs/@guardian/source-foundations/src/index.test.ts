import * as pkgExports from './index';

// this makes sure no type exports have been removed
// it won't catch that new ones have been added, but can anyone?
export type { Placeholder } from './index';

it('Should have exactly these exports', () => {
	expect(Object.keys(pkgExports).sort()).toEqual(['placeholder']);
});
