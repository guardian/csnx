import { ArticlePillar } from './ArticlePillar.js';
import { ArticleSpecial } from './ArticleSpecial.js';

/** @typedef {typeof ArticleTheme[keyof typeof ArticleTheme]} ArticleTheme */

export const ArticleTheme = {
	...ArticlePillar,
	...ArticleSpecial,
};
