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
			d="M10.25 2.875h-6.5l-.875.875v6.5l.875.875h6.5l.875-.875v-6.5z"
			fill={theme?.fill}
		/>
		<path d="M11.125 12.875h-8.25V14.5h8.25z" fill={theme?.fill} />
		<path d="M11.125 19.5h-8.25v1.625h8.25z" fill={theme?.fill} />
		<path d="M11.125 16.188h-8.25v1.625h8.25z" fill={theme?.fill} />
		<path
			d="M20.25 12.875h-6.5l-.875.875v6.5l.875.875h6.5l.875-.875v-6.5z"
			fill={theme?.fill}
		/>
		<path
			d="M20.25 2.875h-6.5l-.875.875v6.5l.875.875h6.5l.875-.875v-6.5z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgHomeSquareFilled = ({
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
				Home
			</span>
		) : (
			''
		)}
	</>
);
