// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
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
			d="M23 7V5H1v2h22Zm0 6v-2H1v2h22Zm0 6v-2H1v2h22Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgMenu = ({
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
				Menu
			</span>
		) : (
			''
		)}
	</>
);