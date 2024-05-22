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
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.072 1.1c1.689 0 3.088 1.375 3.088 3.064 0 1.712-1.399 3.087-3.088 3.087a3.073 3.073 0 0 1-3.063-3.087v-.097a10 10 0 0 0-1.423-.12c-2.775 0-5.476 1.35-6.803 3.739l-.12.217-.025-.025-.217-.603-.844-.434-.627.217c1.76-3.063 5.041-5.017 8.636-5.017.675 0 1.375.096 2.074.241A3.017 3.017 0 0 1 17.072 1.1Zm4.077 5.862a10.04 10.04 0 0 1 1.351 5.017 9.903 9.903 0 0 1-1.327 4.97 9.15 9.15 0 0 1-1.23 1.688c.145.362.217.772.217 1.158 0 .53-.12 1.037-.41 1.52a3.077 3.077 0 0 1-2.678 1.544 3.195 3.195 0 0 1-1.52-.41 3.077 3.077 0 0 1-1.543-2.678c0-.506.144-1.037.41-1.52a3.116 3.116 0 0 1 2.702-1.544c.506 0 1.061.097 1.52.41l.072.049c.313-.386.603-.772.82-1.158a8.083 8.083 0 0 0 1.085-4.029c0-1.278-.29-2.605-.916-3.739l-.12-.217h.023l.627.12.797-.53.12-.651Zm-8.515 14.956-.507-.434-.048-.965.434-.483v-.024h-.241c-2.75 0-5.283-1.592-6.658-4.004a8.006 8.006 0 0 1-.603-1.303c.048-.024.072-.024.096-.048a3.077 3.077 0 0 0 1.544-2.678c0-.506-.144-1.037-.41-1.52a3.106 3.106 0 0 0-2.677-1.543c-.531 0-1.038.144-1.52.41A3.077 3.077 0 0 0 .5 12.004c0 .506.145 1.037.41 1.52a3.133 3.133 0 0 0 2.22 1.519c.216.675.506 1.303.844 1.906a9.914 9.914 0 0 0 8.66 4.969Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgPartyOfThree = ({
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
				Share
			</span>
		) : (
			''
		)}
	</>
);
