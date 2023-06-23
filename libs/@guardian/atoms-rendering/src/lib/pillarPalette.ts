import type { ArticleTheme } from '@guardian/libs';
import { Pillar, ArticleSpecial } from '@guardian/libs';
import {
	culture,
	lifestyle,
	news,
	opinion,
	sport,
} from '@guardian/source-foundations';

type Colour = string;

interface PillarColours {
	300: Colour;
	400: Colour;
	500: Colour;
	600: Colour;
	800: Colour;
}

export const pillarPalette: Record<ArticleTheme, PillarColours> = {
	[Pillar.News]: news,
	[Pillar.Opinion]: opinion,
	[Pillar.Sport]: sport,
	[Pillar.Culture]: culture,
	[Pillar.Lifestyle]: lifestyle,
	[ArticleSpecial.Labs]: lifestyle,
	[ArticleSpecial.SpecialReport]: news,
	[ArticleSpecial.SpecialReportAlt]: news,
};
