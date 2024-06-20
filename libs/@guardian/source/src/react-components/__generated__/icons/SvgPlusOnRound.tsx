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
			d="M12 21.167a9.167 9.167 0 1 0 0-18.334 9.167 9.167 0 0 0 0 18.334M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m-.6-9.4.213 4.9h.762l.225-4.9 4.9-.225v-.762l-4.9-.213-.225-4.9h-.762l-.213 4.9-4.9.213v.762z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgPlusOnRound = ({
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
				Add
			</span>
		) : (
			''
		)}
	</>
);
