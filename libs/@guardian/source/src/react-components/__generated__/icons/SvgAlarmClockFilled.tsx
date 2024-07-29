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
			d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.96 9.96 0 0 1-2.33 6.416l1.843 2.471-.64.64-2.472-1.844A9.96 9.96 0 0 1 12 22a9.96 9.96 0 0 1-6.414-2.328l-2.487 1.855-.64-.64L4.316 18.4A9.96 9.96 0 0 1 2 12m15.973.93-5.906.588-1.158-1.167.684-7.169h.912l.633 6.522 4.835.314z"
			fill={theme?.fill}
		/>
		<path
			d="M3.7 4.904a2.38 2.38 0 0 1 .456-3.336 2.38 2.38 0 0 1 3.336.456L3.7 4.91z"
			fill={theme?.fill}
		/>
		<path
			d="M20.398 4.904a2.38 2.38 0 0 0-.456-3.336 2.38 2.38 0 0 0-3.336.456l3.792 2.885z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgAlarmClockFilled = ({
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
				Alarm
			</span>
		) : (
			''
		)}
	</>
);