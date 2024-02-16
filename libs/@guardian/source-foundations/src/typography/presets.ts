import { tokens } from '@guardian/design-tokens';
import { fontArrayToString } from '../utils/convert-value';

const { fontFamily, lineHeight, fontWeight, fontSize } = tokens.typography;

/**
 * Guardian Headline
 *
 * Use for headlines, headings and any short form text like pull quotes, bylines
 * and titles.
 */

const headline = () => `
	font-family: ${fontArrayToString(fontFamily.headline)};
	line-height: ${lineHeight.tight};
`;

const headlineLit = () => `
	${headline()};
	font-weight: ${fontWeight.light};
`;

const headlineLitIta = () => `
	${headlineLit()};
	font-style: italic;
`;

const headlineMed = () => `
	${headline()};
	font-weight: ${fontWeight.medium};
`;

const headlineMedIta = () => `
	${headlineMed()};
	font-style: italic;
`;

const headlineBld = () => `
	${headline()};
	font-weight: ${fontWeight.bold};
`;

// headline.lit.x

export const headlineLit14 = () => `
	${headlineLit()};
	font-size: ${fontSize[14]};
`;

export const headlineLit17 = () => `
	${headlineLit()};
	font-size: ${fontSize[17]};
`;

export const headlineLit20 = () => `
	${headlineLit()};
	font-size: ${fontSize[20]};
`;

export const headlineLit24 = () => `
	${headlineLit()};
	font-size: ${fontSize[24]};
`;

export const headlineLit28 = () => `
	${headlineLit()};
	font-size: ${fontSize[28]};
`;

export const headlineLit34 = () => `
	${headlineLit()};
	font-size: ${fontSize[34]};
`;

export const headlineLit42 = () => `
	${headlineLit()};
	font-size: ${fontSize[42]};
`;

export const headlineLit50 = () => `
	${headlineLit()};
	font-size: ${fontSize[50]};
`;

export const headlineLit70 = () => `
	${headlineMed()};
	font-size: ${fontSize[70]};
`;

// headline.lit.ita.x

export const headlineLitIta14 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[14]};
`;

export const headlineLitIta17 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[17]};
`;

export const headlineLitIta20 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[20]};
`;

export const headlineLitIta24 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[24]};
`;

export const headlineLitIta28 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[28]};
`;

export const headlineLitIta34 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[34]};
`;

export const headlineLitIta42 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[42]};
`;

export const headlineLitIta50 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[50]};
`;

export const headlineLitIta70 = () => `
	${headlineLitIta()};
	font-size: ${fontSize[70]};
`;

// headline.med.x

export const headlineMed14 = () => `
	${headlineMed()};
	font-size: ${fontSize[14]};
`;

export const headlineMed17 = () => `
	${headlineMed()};
	font-size: ${fontSize[17]};
`;

export const headlineMed20 = () => `
	${headlineMed()};
	font-size: ${fontSize[20]};
`;

export const headlineMed24 = () => `
	${headlineMed()};
	font-size: ${fontSize[24]};
`;

export const headlineMed28 = () => `
	${headlineMed()};
	font-size: ${fontSize[28]};
`;

export const headlineMed34 = () => `
	${headlineMed()};
	font-size: ${fontSize[34]};
`;

export const headlineMed42 = () => `
	${headlineMed()};
	font-size: ${fontSize[42]};
`;

export const headlineMed50 = () => `
	${headlineMed()};
	font-size: ${fontSize[50]};
`;

export const headlineMed70 = () => `
	${headlineMed()};
	font-size: ${fontSize[70]};
`;

// headline.med.ita.x

export const headlineMedIta14 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[14]};
`;

export const headlineMedIta17 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[17]};
`;

export const headlineMedIta20 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[20]};
`;

export const headlineMedIta24 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[24]};
`;

export const headlineMedIta28 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[28]};
`;

export const headlineMedIta34 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[34]};
`;

export const headlineMedIta42 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[42]};
`;

export const headlineMedIta50 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[50]};
`;

export const headlineMedIta70 = () => `
	${headlineMedIta()};
	font-size: ${fontSize[70]};
`;

// headline.bld.x

export const headlineBld14 = () => `
${headlineBld()};
	font-size: ${fontSize[14]};
`;

export const headlineBld17 = () => `
	${headlineBld()};
	font-size: ${fontSize[17]};
`;

export const headlineBld20 = () => `
	${headlineBld()};
	font-size: ${fontSize[20]};
`;

export const headlineBld24 = () => `
	${headlineBld()};
	font-size: ${fontSize[24]};
`;

export const headlineBld28 = () => `
	${headlineBld()};
	font-size: ${fontSize[28]};
`;

export const headlineBld34 = () => `
	${headlineBld()};
	font-size: ${fontSize[34]};
`;

export const headlineBld42 = () => `
	${headlineBld()};
	font-size: ${fontSize[42]};
`;

export const headlineBld50 = () => `
	${headlineBld()};
	font-size: ${fontSize[50]};
`;

export const headlineBld70 = () => `
	${headlineBld()};
	font-size: ${fontSize[70]};
`;
