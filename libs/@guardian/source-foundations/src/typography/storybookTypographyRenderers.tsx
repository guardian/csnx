import { css } from '@emotion/react';
import {
	bodyObjectStyles,
	fontWeights,
	headlineObjectStyles,
	textSansObjectStyles,
} from '../index';
import type { Category, FontScaleFunction, FontWeight } from './types';
import {
	headlineMed14,
	headlineMed17,
	headlineMed20,
	headlineMed24,
	headlineMed28,
	headlineMed34,
	headlineMed42,
	headlineMed50,
	headlineMed70,
} from './presets';

type FontFunctions = {
	[key in Category]: FontScaleFunction;
};

interface FontStylesRendererProps {
	fontName: string;
	fontStyles: FontFunctions;
}

export const FontStylesRenderer = ({
	fontName,
	fontStyles,
}: FontStylesRendererProps) => {
	return (
		<ul>
			{Object.entries(fontStyles).map(([name, getFontStyles]) => {
				const fontStyles = getFontStyles({ unit: 'px' });

				return (
					<li key={name} style={{ ...fontStyles }}>
						{fontName}.{name} {'->'} {fontStyles.fontSize}px
					</li>
				);
			})}
		</ul>
	);
};

interface LineHeightRendererProps {
	getFontStyles: FontScaleFunction;
}

export const LineHeightRenderer = ({
	getFontStyles,
}: LineHeightRendererProps) => {
	const fontStyles = getFontStyles({ unit: 'px' });
	return (
		<p style={{ ...fontStyles, width: '15ch' }}>
			The quick brown fox jumps over the lazy dogs
		</p>
	);
};

export const FontWeightRenderer = () => (
	<ul>
		{Object.entries(fontWeights).map(([fontWeight, value]) => (
			<li
				key={value}
				style={{
					...headlineObjectStyles.xxsmall({
						fontWeight: fontWeight as FontWeight,
					}),
				}}
			>
				{fontWeight} {'->'} {value}
			</li>
		))}
	</ul>
);

export const ItalicsRenderer = () => (
	<ul>
		<li
			style={{
				...headlineObjectStyles.xxsmall({
					fontStyle: 'italic',
					fontWeight: 'light',
				}),
			}}
		>
			headline light
		</li>
		<li
			style={{
				...headlineObjectStyles.xxsmall({
					fontStyle: 'italic',
					fontWeight: 'medium',
				}),
			}}
		>
			headline medium
		</li>
		<li
			style={{
				...bodyObjectStyles.xsmall({
					fontStyle: 'italic',
					fontWeight: 'regular',
				}),
			}}
		>
			body regular
		</li>
		<li
			style={{
				...bodyObjectStyles.xsmall({
					fontStyle: 'italic',
					fontWeight: 'bold',
				}),
			}}
		>
			body bold
		</li>
		<li
			style={{
				...textSansObjectStyles.xsmall({
					fontStyle: 'italic',
					fontWeight: 'regular',
				}),
			}}
		>
			textSans regular
		</li>
	</ul>
);

/**
 * Test code
 */

export const HeadlineTypographyTokens = () => (
	<>
		<ul
			css={css`
				list-style: none;
			`}
		>
			<li
				css={css`
					${headlineMed14()}
				`}
			>
				headline.med.14
			</li>
			<li
				css={css`
					${headlineMed17()}
				`}
			>
				headline.med.17
			</li>
			<li
				css={css`
					${headlineMed20()}
				`}
			>
				headline.med.20
			</li>
			<li
				css={css`
					${headlineMed24()}
				`}
			>
				headline.med.24
			</li>
			<li
				css={css`
					${headlineMed28()}
				`}
			>
				headline.med.28
			</li>
			<li
				css={css`
					${headlineMed34()}
				`}
			>
				headline.med.34
			</li>
			<li
				css={css`
					${headlineMed42()}
				`}
			>
				headline.med.42
			</li>
			<li
				css={css`
					${headlineMed50()}
				`}
			>
				headline.med.50
			</li>
			<li
				css={css`
					${headlineMed70()}
				`}
			>
				headline.med.70
			</li>
		</ul>
	</>
);
