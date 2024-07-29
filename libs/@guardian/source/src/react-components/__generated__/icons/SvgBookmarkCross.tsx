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
			d="m14 5.54.937.96 2.052-2.052L19.063 6.5 20 5.585l-2.074-2.074L20 1.437 19.04.5l-2.073 2.074-2.03-2.052-.915.937 2.03 2.03zM8.375 3.014l3.146-.006q-.021.237-.021.48c0 3.03 2.457 5.213 5.487 5.213h.009v12.63l-.467.3L12 19.03l-4.533 2.6L7 21.332V4.375z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgBookmarkCross = ({
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
				Remove bookmark
			</span>
		) : (
			''
		)}
	</>
);