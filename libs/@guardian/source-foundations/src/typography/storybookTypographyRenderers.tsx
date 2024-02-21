import { css } from '@emotion/react';
import {
	bodyObjectStyles,
	fontWeights,
	headlineObjectStyles,
	textSansObjectStyles,
} from '../index';
import type { Category, FontScaleFunction, FontWeight } from './types';
import {
	headlineBld14,
	headlineBld17,
	headlineBld20,
	headlineBld24,
	headlineBld28,
	headlineBld34,
	headlineBld42,
	headlineBld50,
	headlineBld70,
	headlineLit14,
	headlineLit17,
	headlineLit20,
	headlineLit24,
	headlineLit28,
	headlineLit34,
	headlineLit42,
	headlineLit50,
	headlineLit70,
	headlineLitIta14,
	headlineLitIta17,
	headlineLitIta20,
	headlineLitIta24,
	headlineLitIta28,
	headlineLitIta34,
	headlineLitIta42,
	headlineLitIta50,
	headlineLitIta70,
	headlineMed14,
	headlineMed17,
	headlineMed20,
	headlineMed24,
	headlineMed28,
	headlineMed34,
	headlineMed42,
	headlineMed50,
	headlineMed70,
	headlineMedIta14,
	headlineMedIta17,
	headlineMedIta20,
	headlineMedIta24,
	headlineMedIta28,
	headlineMedIta34,
	headlineMedIta42,
	headlineMedIta50,
	headlineMedIta70,
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
					${headlineLit14}
				`}
			>
				headline.lit.14
			</li>
			<li
				css={css`
					${headlineLit17}
				`}
			>
				headline.lit.17
			</li>
			<li
				css={css`
					${headlineLit20}
				`}
			>
				headline.lit.20
			</li>
			<li
				css={css`
					${headlineLit24}
				`}
			>
				headline.lit.24
			</li>
			<li
				css={css`
					${headlineLit28}
				`}
			>
				headline.lit.28
			</li>
			<li
				css={css`
					${headlineLit34}
				`}
			>
				headline.lit.34
			</li>
			<li
				css={css`
					${headlineLit42}
				`}
			>
				headline.lit.42
			</li>
			<li
				css={css`
					${headlineLit50}
				`}
			>
				headline.lit.50
			</li>
			<li
				css={css`
					${headlineLit70}
				`}
			>
				headline.lit.70
			</li>
			<li
				css={css`
					${headlineLitIta14}
				`}
			>
				headline.lit.ita.14
			</li>
			<li
				css={css`
					${headlineLitIta17}
				`}
			>
				headline.lit.ita.17
			</li>
			<li
				css={css`
					${headlineLitIta20}
				`}
			>
				headline.lit.ita.20
			</li>
			<li
				css={css`
					${headlineLitIta24}
				`}
			>
				headline.lit.ita.24
			</li>
			<li
				css={css`
					${headlineLitIta28}
				`}
			>
				headline.lit.ita.28
			</li>
			<li
				css={css`
					${headlineLitIta34}
				`}
			>
				headline.lit.ita.34
			</li>
			<li
				css={css`
					${headlineLitIta42}
				`}
			>
				headline.lit.ita.42
			</li>
			<li
				css={css`
					${headlineLitIta50}
				`}
			>
				headline.lit.ita.50
			</li>
			<li
				css={css`
					${headlineLitIta70}
				`}
			>
				headline.lit.ita.70
			</li>
			<li
				css={css`
					${headlineMed14}
				`}
			>
				headline.med.14
			</li>
			<li
				css={css`
					${headlineMed17}
				`}
			>
				headline.med.17
			</li>
			<li
				css={css`
					${headlineMed20}
				`}
			>
				headline.med.20
			</li>
			<li
				css={css`
					${headlineMed24}
				`}
			>
				headline.med.24
			</li>
			<li
				css={css`
					${headlineMed28}
				`}
			>
				headline.med.28
			</li>
			<li
				css={css`
					${headlineMed34}
				`}
			>
				headline.med.34
			</li>
			<li
				css={css`
					${headlineMed42}
				`}
			>
				headline.med.42
			</li>
			<li
				css={css`
					${headlineMed50}
				`}
			>
				headline.med.50
			</li>
			<li
				css={css`
					${headlineMed70}
				`}
			>
				headline.med.70
			</li>
			<li
				css={css`
					${headlineMedIta14}
				`}
			>
				headline.med.ita.14
			</li>
			<li
				css={css`
					${headlineMedIta17}
				`}
			>
				headline.med.ita.17
			</li>
			<li
				css={css`
					${headlineMedIta20}
				`}
			>
				headline.med.ita.20
			</li>
			<li
				css={css`
					${headlineMedIta24}
				`}
			>
				headline.med.ita.24
			</li>
			<li
				css={css`
					${headlineMedIta28}
				`}
			>
				headline.med.ita.28
			</li>
			<li
				css={css`
					${headlineMedIta34}
				`}
			>
				headline.med.ita.34
			</li>
			<li
				css={css`
					${headlineMedIta42}
				`}
			>
				headline.med.ita.42
			</li>
			<li
				css={css`
					${headlineMedIta50}
				`}
			>
				headline.med.ita.50
			</li>
			<li
				css={css`
					${headlineMedIta70}
				`}
			>
				headline.med.ita.70
			</li>
			<li
				css={css`
					${headlineBld14}
				`}
			>
				headline.bld.14
			</li>
			<li
				css={css`
					${headlineBld17}
				`}
			>
				headline.bld.17
			</li>
			<li
				css={css`
					${headlineBld20}
				`}
			>
				headline.bld.20
			</li>
			<li
				css={css`
					${headlineBld24}
				`}
			>
				headline.bld.24
			</li>
			<li
				css={css`
					${headlineBld28}
				`}
			>
				headline.bld.28
			</li>
			<li
				css={css`
					${headlineBld34}
				`}
			>
				headline.bld.34
			</li>
			<li
				css={css`
					${headlineBld42}
				`}
			>
				headline.bld.42
			</li>
			<li
				css={css`
					${headlineBld50}
				`}
			>
				headline.bld.50
			</li>
			<li
				css={css`
					${headlineBld70}
				`}
			>
				headline.bld.70
			</li>
		</ul>
	</>
);
