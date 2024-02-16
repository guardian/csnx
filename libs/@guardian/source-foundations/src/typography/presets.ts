import { tokens } from '@guardian/design-tokens';
import { fontArrayToString } from '../utils/convert-value';

const { fontFamily, lineHeight, fontWeight, fontSize } = tokens.typography;

const headlineMed = () => `
	font-family: ${fontArrayToString(fontFamily.headline)};
	line-height: ${lineHeight.tight};
	font-weight: ${fontWeight.medium};
`;

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
