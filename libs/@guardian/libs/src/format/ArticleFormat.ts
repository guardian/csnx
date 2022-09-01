import type { ArticleDesign } from './ArticleDesign';
import type { ArticleDisplay } from './ArticleDisplay';
import type { ArticleTheme } from './ArticleTheme';

export interface ArticleFormat {
	theme: ArticleTheme;
	design: ArticleDesign;
	display: ArticleDisplay;
}
