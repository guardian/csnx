import { ArticleDesign } from './ArticleDesign';
import { ArticleDisplay } from './ArticleDisplay';
import { Pillar } from './Pillar';
import { ArticleSpecial } from './ArticleSpecial';

it('Design enum contains Article', () => {
	expect(ArticleDesign.Standard).toBeDefined();
});

it('Display enum contains Standard', () => {
	expect(ArticleDisplay.Standard).toBeDefined();
});

it('Pillar enum contains News', () => {
	expect(Pillar.News).toBe(0);
});

it('Special enum contains SpecialReport', () => {
	expect(ArticleSpecial.SpecialReport).toBe(5);
});
