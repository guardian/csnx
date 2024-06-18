// DO NOT EDIT
// this file is auto-generated by libs/@guardian/source/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '../../../foundations';
import type { IconProps } from '../..';
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
			d="m15.006 4.63.369.374V19L12 17.13 8.625 19V5.004L9 4.63zM15.625 3l-7.25.013L7 4.375v16.958l.467.296L12 19.03l4.53 2.6.466-.3V4.375z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgBookmarkOutlined = ({
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
				Bookmark
			</span>
		) : (
			''
		)}
	</>
);
