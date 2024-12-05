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
			d="m3.222 2 9.5 9.499V12.5L3.221 22l-.952-.977L9.638 12 2.27 2.977zm10.026 0 9.498 9.499V12.5L13.248 22l-.953-.977L19.663 12l-7.368-9.023z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgChevronRightDouble = ({
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
				Double chevron right
			</span>
		) : (
			''
		)}
	</>
);
