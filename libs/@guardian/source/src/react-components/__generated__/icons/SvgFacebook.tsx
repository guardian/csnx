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
			d="M9.575 6.125V9.25H6.15v3.45h3.425V23H13.7V12.7h3.375l.75-3.45H13.7V6.5c0-1.525.9-2.05 2.075-2.05h2.05L17.7 1.175c-1.025-.1-1.825-.175-3-.175-2.925 0-5.125 1.825-5.125 5.125"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgFacebook = ({
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
				Facebook logo
			</span>
		) : (
			''
		)}
	</>
);
