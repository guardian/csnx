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
			d="M6 7h11.985v1.5l-.49.5h-11L6 8.5zm9.995 4.005h-8V12.5l.5.505h7l.5-.505zM13.98 15h-3.975v1.5l.49.5h3l.485-.5z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgFilterAndroidAppSmall = ({
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
				Filter
			</span>
		) : (
			''
		)}
	</>
);
