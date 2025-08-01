import * as pkgExports from './index';

test('Should have exactly these exports', () => {
	expect(Object.keys(pkgExports).sort()).toEqual(['Byline']);
});
