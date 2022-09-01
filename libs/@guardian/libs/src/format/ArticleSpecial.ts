const ArticleSpecials = ['SpecialReport', 'SpecialLabs'] as const;
type ArticleSpecial = typeof ArticleSpecials[number];

export type { ArticleSpecial };
