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
			d="M11.504 13.125h1.625v-1.629L7.574 6.817l-.757.757z"
			fill={theme?.fill}
		/>
		<path
			d="M12.629 3.775v3.229h-1.012l-.51-4.919A6 6 0 0 1 12 2c5.515.008 9.984 4.482 9.984 10 0 5.523-4.477 10-10 10s-10-4.477-10-10a9.97 9.97 0 0 1 2.89-7.032l1.245 1.23a8.25 8.25 0 1 0 6.51-2.424"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgTimer = ({
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
				Timer
			</span>
		) : (
			''
		)}
	</>
);
