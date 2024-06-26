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
			d="M14.216 5.698c-.75-.251-1.497-.4-2.216-.4-4.626 0-10.437 6.145-10.437 6.145v1.114s1.25 1.322 3.053 2.74l2.916-2.916a4.48 4.48 0 0 1 4.838-4.838l1.845-1.845Zm-4.333 7.016 2.119-2.12v.014l-2.116 2.117a.79.79 0 0 1-.003-.01ZM8.207 14.39l-2.04 2.042a.379.379 0 0 0 .008.005l2.038-2.038a.545.545 0 0 1-.006-.009Zm3.324 2.058-1.828 1.828c.777.267 1.552.426 2.297.426 4.626 0 10.437-6.144 10.437-6.144v-1.114s-1.279-1.352-3.114-2.788l-2.866 2.866c.017.161.026.325.026.49 0 2.468-2.016 4.46-4.483 4.46-.158 0-.315-.008-.469-.024Zm2.861-8.229-.008-.005 1.7-1.7.01.004-1.702 1.701Z"
			fill={theme?.fill}
		/>
		<rect
			x={20.0598}
			y={2.55109}
			width={1.8977}
			height={24.6701}
			transform="rotate(45 20.0598 2.55109)"
			fill="#052962"
		/>
	</svg>
);

export const SvgEyeStrike = ({
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
				Not visible
			</span>
		) : (
			''
		)}
	</>
);
