// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
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
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3.011 11.883 2 12.896l5.057 7.08h.48L22 5.005l-1.011-.986L7.537 16.207l-4.526-4.324Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgCheckmark = ({
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
				Checkmark
			</span>
		) : (
			''
		)}
	</>
);