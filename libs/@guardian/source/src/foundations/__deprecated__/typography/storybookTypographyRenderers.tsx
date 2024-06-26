import {
	bodyObjectStyles,
	headlineObjectStyles,
	textSansObjectStyles,
} from '../..';
import type {
	AvailableSizes,
	FontScaleFunction,
	FontWeight,
	TypographyFunctions,
} from './types';
import { fontWeights } from '.';

interface FontStylesRendererProps {
	fontName: string;
	fontStyles: TypographyFunctions<AvailableSizes>;
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
