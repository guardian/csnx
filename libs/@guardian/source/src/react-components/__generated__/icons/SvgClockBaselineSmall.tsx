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
			d="M11.975 4C16.95 4 21 8.05 21 13.025s-4.05 9-9.025 9S3 18 3 13.025 7 4 11.975 4m-.6 1.65-.625 7.675 1.25 1.05 6.35-.525v-1.225l-5.2-.3-.55-6.675z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgClockBaselineSmall = ({
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
				Clock
			</span>
		) : (
			''
		)}
	</>
);
