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
			d="m13.345 17.69 1.475-.325-1-3.1H9.495l-1.05 3.1 1.525.325v.775h-4.1v-.775l1.3-.325L11.295 5.54h1.55l4 11.825 1.275.325v.775h-4.775zM9.82 13.315h3.7l-1.75-5.45h-.1z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgTextSmall = ({
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
				Small text
			</span>
		) : (
			''
		)}
	</>
);
