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
			d="M21.167 12a9.167 9.167 0 1 1-18.334 0 9.167 9.167 0 0 1 18.334 0M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-9.973-5.999a5.53 5.53 0 0 1 5.53 5.529h-.002c0 .669-.118 1.31-.337 1.905.209.38.327.815.327 1.278v.183c0 1.475-1.2 2.675-2.675 2.675h-.38l-.777-.777-.143-.144V12.96l.92-.921h.38c.617 0 1.18.211 1.634.561.083-.342.13-.7.13-1.07a4.615 4.615 0 0 0-4.607-4.607A4.614 4.614 0 0 0 7.42 11.53c0 .372.05.734.133 1.082a2.66 2.66 0 0 1 1.648-.572h.38l.921.921v3.692l-.148.148-.773.773h-.38a2.68 2.68 0 0 1-2.674-2.675v-.184c0-.455.115-.886.317-1.26a5.528 5.528 0 0 1 5.183-7.453m-2.826 6.96a1.75 1.75 0 0 0-1.748 1.674l-.001.006q-.003.037-.004.074v.184c0 .969.785 1.754 1.753 1.754h.38V12.96zm7.426 1.935v-.183l-.003-.003-.002-.051q-.002-.025-.003-.052a1.72 1.72 0 0 0-.45-1.072 1.74 1.74 0 0 0-1.296-.576h-.38v3.691h.38c.969 0 1.754-.785 1.754-1.754"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgHeadphonesRoundOutlined = ({
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
				Listen
			</span>
		) : (
			''
		)}
	</>
);
