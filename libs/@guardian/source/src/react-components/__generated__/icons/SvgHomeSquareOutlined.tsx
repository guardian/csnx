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
			d="M3.75 2.875h6.5l.875.875v6.5l-.875.875h-6.5l-.875-.875v-6.5zM4.5 9.5h5v-5h-5zm-1.625 3.375h8.25V14.5h-8.25zm8.25 6.625h-8.25v1.625h8.25zm-8.25-3.312h8.25v1.625h-8.25zm17.375-3.313h-6.5l-.875.875v6.5l.875.875h6.5l.875-.875v-6.5zM19.5 19.5h-5v-5h5zM13.75 2.875h6.5l.875.875v6.5l-.875.875h-6.5l-.875-.875v-6.5z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgHomeSquareOutlined = ({
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
