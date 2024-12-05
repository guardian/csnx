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
			fillRule="evenodd"
			clipRule="evenodd"
			d="m6.469 19.31 1.19-4.454.624-.624a11.3 11.3 0 0 1 3.742-.625c1.353 0 2.523.223 3.741.625l.625.624h-.005l1.182 4.426a9.167 9.167 0 1 0-11.1.028M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-9.967.358c1.127 0 2.472-1.266 2.472-2.824 0-1.559-.913-2.472-2.472-2.472s-2.475.913-2.475 2.472 1.458 2.824 2.475 2.824"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgPersonRoundOutlined = ({
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
				Account, profile
			</span>
		) : (
			''
		)}
	</>
);
