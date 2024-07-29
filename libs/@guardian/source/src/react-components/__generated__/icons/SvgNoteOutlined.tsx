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
			d="M17 19.504v-3.629l1.25-1.238h.375v5.613l-.875.875H6.25l-.875-.875V3.75l.875-.875 9-.037 3.375 3.412V7.5L17.5 8.625H17V6.863l-2.375-2.359H7v15zM20.808 7.5l-6.925 6.925 1.18 1.18 6.925-6.926-.296-.296-.588-.587zm-8.037 8.958.296.292 1.595-.712-1.179-1.175zM15.32 9.5h-7.5v1.25h7.5zm-2.083 2.917H7.82v1.25h5.417zM7.82 15.333h3.75v1.25H7.82z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgNoteOutlined = ({
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
				Note
			</span>
		) : (
			''
		)}
	</>
);