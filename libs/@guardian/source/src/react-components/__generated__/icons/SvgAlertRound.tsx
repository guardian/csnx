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
			d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10.704 1.818h1.386l.659-8.636-.91-.91h-.885l-.91.91.66 8.636Zm2.068 3.637c0-.75-.614-1.364-1.364-1.364-.75 0-1.364.614-1.364 1.364 0 .75.614 1.363 1.364 1.363.75 0 1.364-.613 1.364-1.363Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgAlertRound = ({
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
				Warning
			</span>
		) : (
			''
		)}
	</>
);
