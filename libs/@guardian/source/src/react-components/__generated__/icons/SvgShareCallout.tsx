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
			d="M19 16c1.675 0 3 1.35 3 3 0 1.675-1.325 3-3 3a2.97 2.97 0 0 1-2.975-3c0-.125 0-.275.025-.375L7.1 14.15a2.9 2.9 0 0 1-2.075.825C3.325 14.975 2 13.65 2 12a3.004 3.004 0 0 1 3.025-3.025c.775 0 1.5.35 2.075.875l8.95-4.475c-.025-.1-.025-.225-.025-.4A2.966 2.966 0 0 1 19 2c1.675 0 3 1.325 3 2.975C22 6.65 20.675 8 19 8c-.8 0-1.475-.325-2.05-.825l-8.975 4.45C8 11.7 8 11.825 8 12s0 .3-.025.375l8.975 4.45c.575-.5 1.25-.825 2.05-.825m0-12.8c-.975 0-1.8.775-1.8 1.775S18.025 6.8 19 6.8c1 0 1.825-.825 1.825-1.825S20 3.2 19 3.2m0 17.6c1 0 1.825-.825 1.825-1.8 0-1-.825-1.8-1.825-1.8-.975 0-1.8.8-1.8 1.8 0 .975.825 1.8 1.8 1.8"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgShareCallout = ({
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
				Share callout
			</span>
		) : (
			''
		)}
	</>
);
