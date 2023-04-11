import { ArticleDesign } from './ArticleDesign.js';
import { ArticleDisplay } from './ArticleDisplay.js';
import { ArticlePillar } from './ArticlePillar.js';
import { ArticleSpecial } from './ArticleSpecial.js';
import { ArticleTheme } from './ArticleTheme.js';

/** An object is an enum if all all its keys map to unique numbers */
const isEnum = (obj: Record<string, number>) =>
	Object.keys(obj).length === new Set(Object.values(obj)).size;

it('Design is like an enum', () => {
	expect(isEnum(ArticleDesign)).toBe(true);
});

it('Design contains Standard', () => {
	expect(ArticleDesign.Standard).toBeDefined();
});

it('Display is like an enum', () => {
	expect(isEnum(ArticleDisplay)).toBe(true);
});

it('Display contains Standard', () => {
	expect(ArticleDisplay.Standard).toBeDefined();
});

it('Pillar is like an enum', () => {
	expect(isEnum(ArticlePillar)).toBe(true);
});

it('Pillar contains News', () => {
	expect(ArticlePillar.News).toBe(0);
});

it('Special is like an enum', () => {
	expect(isEnum(ArticleSpecial)).toBe(true);
});

it('Special contains SpecialReport', () => {
	expect(ArticleSpecial.SpecialReport).toBe(5);
});

it('Theme is like an enum', () => {
	expect(isEnum(ArticleTheme)).toBe(true);
});
