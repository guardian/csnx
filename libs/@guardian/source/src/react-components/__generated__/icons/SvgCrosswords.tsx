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
			d="m21 20.5-.5.5h-17l-.5-.5v-17l.5-.5h17l.5.5v17Zm-9.5-16h-7v7h7v-7Zm8 7v-7h-7v7h7ZM5.225 8.05v-.4h.5V5.825L5.2 5.9v-.35l.775-.35h.3v2.45h.5v.4h-1.55ZM11.5 12.5h-7v7h7v-7Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgCrosswords = ({
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
				Crosswords
			</span>
		) : (
			''
		)}
	</>
);
