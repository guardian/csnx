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
			d="M7.05 10.207 6.344 9.5H2.707L2 10.207v3.636l.707.707h3.636l.708-.707zm7.475 0-.707-.707h-3.636l-.707.707v3.636l.707.707h3.636l.707-.707zm7.475 0-.707-.707h-3.636l-.707.707v3.636l.707.707h3.636l.707-.707z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgEllipsis = ({
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
				More
			</span>
		) : (
			''
		)}
	</>
);
