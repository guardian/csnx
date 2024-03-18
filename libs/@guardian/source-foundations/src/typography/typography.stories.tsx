import {
	headlineObjectStyles,
	bodyObjectStyles,
	textSansObjectStyles,
	titlepieceObjectStyles,
} from '@guardian/source-foundations';
import {
	FontStylesRenderer,
	LineHeightRenderer,
	FontWeightRenderer,
	ItalicsRenderer,
} from './storybookTypographyRenderers';

export default {
	title: 'Typography',

	parameters: {
		previewTabs: {
			canvas: {
				hidden: true,
			},
		},

		viewMode: 'docs',
	},
};

export const Headline = {
	render: () => (
		<FontStylesRenderer fontName="headline" fontStyles={headlineObjectStyles} />
	),
	name: 'headline',
};

export const HeadlineLineheight = {
	render: () => (
		<LineHeightRenderer getFontStyles={headlineObjectStyles.large} />
	),
	name: 'headline-lineheight',
};

export const Body = {
	render: () => (
		<FontStylesRenderer fontName="body" fontStyles={bodyObjectStyles} />
	),
	name: 'body',
};

export const BodyLineheight = {
	render: () => <LineHeightRenderer getFontStyles={bodyObjectStyles.small} />,
	name: 'body-lineheight',
};

export const TextSans = {
	render: () => (
		<FontStylesRenderer fontName="textSans" fontStyles={textSansObjectStyles} />
	),
	name: 'textSans',
};

export const TextSansLineheight = {
	render: () => (
		<LineHeightRenderer getFontStyles={textSansObjectStyles.medium} />
	),
	name: 'text-sans-lineheight',
};

export const Titlepiece = {
	render: () => (
		<FontStylesRenderer
			fontName="titlepiece"
			fontStyles={titlepieceObjectStyles}
		/>
	),
	name: 'titlepiece',
};

export const TitlepieceLineheight = {
	render: () => (
		<LineHeightRenderer getFontStyles={titlepieceObjectStyles.medium} />
	),
	name: 'titlepiece-lineheight',
};

export const FontWeight = {
	render: () => <FontWeightRenderer />,
	name: 'font weight',
};

export const Italics = {
	render: () => <ItalicsRenderer />,
	name: 'italics',
};
