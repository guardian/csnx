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
			d="M15.36 11.426a3.93 3.93 0 0 0-2.805 1.17 3.944 3.944 0 1 0 2.804-1.17m-1.153 1.37a2.819 2.819 0 1 1 2.303 5.147 2.819 2.819 0 0 1-2.303-5.147"
			fill={theme?.fill}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12.016 3.75a8.23 8.23 0 0 0-5.877 2.453 8.268 8.268 0 0 0 4.618 13.983 6.7 6.7 0 0 1-1.643-2.493 6.375 6.375 0 0 1-1.631-10.16 6.355 6.355 0 0 1 4.533-1.892 6.38 6.38 0 0 1 5.686 3.49 6.662 6.662 0 0 1-3.843 12.73q-.897.169-1.843.17C6.484 22.031 2 17.547 2 12.016a9.99 9.99 0 0 1 2.894-7.043A9.983 9.983 0 0 1 12.015 2c5.532 0 10.016 4.484 10.016 10.016q-.001.962-.175 1.874a6.65 6.65 0 0 0-1.666-3.108 8.27 8.27 0 0 0-8.174-7.032M8.697 15.37q0 .378.042.748a5.24 5.24 0 0 1-1.973-4.102c0-1.44.578-2.743 1.517-3.692a5.23 5.23 0 0 1 3.733-1.558 5.24 5.24 0 0 1 4.112 1.985 6.641 6.641 0 0 0-5.505 1.934 6.64 6.64 0 0 0-1.926 4.684m4.655-4.485a4.912 4.912 0 1 1 4.014 8.97 4.912 4.912 0 0 1-4.014-8.97"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgMealTypes = ({
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
				Meal types
			</span>
		) : (
			''
		)}
	</>
);
