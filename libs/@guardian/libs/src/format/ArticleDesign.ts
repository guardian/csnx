const ArticleDesigns = [
	'DesignStandard',
	'DesignMedia',
	'DesignReview',
	'DesignAnalysis',
	'DesignComment',
	'DesignLetter',
	'DesignFeature',
	'DesignLiveBlog',
	'DesignDeadBlog',
	'DesignRecipe',
	'DesignMatchReport',
	'DesignInterview',
	'DesignEditorial',
	'DesignQuiz',
	'DesignInteractive',
	'DesignPhotoEssay',
	'DesignPrintShop',
	'DesignObituary',
	'DesignCorrection',
	'DesignFullPageInteractive',
	'DesignNewsletterSignup',
] as const;

type ArticleDesign = typeof ArticleDesigns[number];

export type { ArticleDesign };
