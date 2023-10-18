import type { ArticleTheme } from '@guardian/libs';

export type InteractiveAtomBlockElementType = {
	_type: string;
	css: string;
	js: string;
	html: string;
	id: string;
	url: string;
};

export type InteractiveLayoutAtomType = {
	_type: string;
	css: string;
	js: string;
	html: string;
	id: string;
	url: string;
};

export type TimelineAtomType = {
	id: string;
	events?: TimelineEvent[];
	title: string;
	pillar: ArticleTheme;
	description?: string;
	expandForStorybook?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
};

export interface TimelineEvent {
	title: string;
	date: string;
	unixDate: number;
	body?: string;
	toDate?: string;
	toUnixDate?: number;
}

export type SrcSetItem = { src: string; width: number };

export type ImageSource = {
	srcSet: SrcSetItem[];
};

// aka weighting. RoleType affects how an image is placed. It is called weighting
// in Composer but role in CAPI. We respect CAPI so we maintain this nomenclature
// in DCR
export type RoleType =
	| 'immersive'
	| 'supporting'
	| 'showcase'
	| 'inline'
	| 'thumbnail'
	| 'halfWidth';

export type SharePlatformType =
	| 'facebook'
	| 'twitter'
	| 'email'
	| 'linkedIn'
	| 'pinterest'
	| 'whatsApp'
	| 'messenger';

export type SharingUrlsType = {
	[K in SharePlatformType]?: {
		url: string;
		userMessage: string;
	};
};

export type RecipeSchemaAtomType = {
	id: string;
	json: string;
};
