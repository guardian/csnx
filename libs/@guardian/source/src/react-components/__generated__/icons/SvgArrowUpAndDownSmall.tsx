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
			d="M17.45 6.125 12.35 1h-.7l-5.1 5.125.85.85 3.6-2.75V10h2V4.225l3.6 2.75zM7.4 17l-.85.9 5.1 5.1h.7l5.1-5.1-.85-.9-3.6 2.75V14h-2v5.75z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgArrowUpAndDownSmall = ({
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
				Up and down arrow
			</span>
		) : (
			''
		)}
	</>
);
