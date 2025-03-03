// DO NOT EDIT
// this file is auto-generated by libs/@guardian/source/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { IconProps } from '../..';
import { iconSize, visuallyHidden } from '../../../foundations';

const Svg = ({ size, theme }: IconProps) => (
	<svg
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			d="m11.425 18.031-.088-2.15-2.15-.1V14.77l2.15-.088.088-2.15h1.012l.1 2.15 2.15.088v1.012l-2.15.1-.1 2.15z"
			fill={theme?.fill}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="m11.31 3.578-.534.175-3.79 6.56H4.5l-.812.812V12l.042.259 2.5 7.437.77.554h10l.77-.554 2.5-7.437.043-.259v-.875l-.813-.812h-2.495l-3.78-6.56-.533-.175-.691.399zM12 4.88l3.13 5.432H8.861zM7.585 18.625l-2.248-6.687h13.328l-2.248 6.687z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgAddToBasket = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps) => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Add to basket
			</span>
		) : (
			''
		)}
	</>
);
