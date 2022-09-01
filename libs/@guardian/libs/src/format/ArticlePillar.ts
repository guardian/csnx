const ArticlePillars = [
	'PillarNews',
	'PillarOpinion',
	'PillarSport',
	'PillarCulture',
	'PillarLifestyle',
] as const;

type ArticlePillar = typeof ArticlePillars[number];

export type { ArticlePillar };
