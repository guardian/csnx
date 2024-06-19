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
			d="M11.265 13V6.44L9.04 8.04l-.66-.665L11.755 4h.515l3.365 3.365-.66.665-2.21-1.59V13zM14 9.5h2.5l1 .99v7.01l-1.01 1h-9l-.99-1v-7.01l1-.99H10V11H8v6h8v-6h-2V9.5"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgShareAppSmall = ({
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
