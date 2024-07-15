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
			d="M11.125 3.125V12h1.75V3.125l3.683 2.89.88-.885L12.313 0h-.69L6.497 5.13l.88.88z"
			fill={theme?.fill}
		/>
		<path
			d="M19.125 8H15v1.625h3.375v10.75H5.625V9.625H9V8H4.875L4 9v12.125l.875.875h14.25l.875-.875V8.875z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgShareApp = ({
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
				Share
			</span>
		) : (
			''
		)}
	</>
);
