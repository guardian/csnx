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
			d="M3.7 4.904a2.38 2.38 0 0 1 .456-3.336 2.38 2.38 0 0 1 3.336.456L3.7 4.91zM12 2C6.477 2 2 6.477 2 12a9.96 9.96 0 0 0 2.315 6.4L2.46 20.886l.64.64 2.486-1.855A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 6.401-2.317l2.473 1.844.64-.64-1.844-2.47A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10m8.25 10c0-4.551-3.699-8.25-8.25-8.25S3.75 7.449 3.75 12s3.699 8.25 8.25 8.25 8.25-3.699 8.25-8.25m-2.277.93-5.906.588-1.158-1.167.684-7.169h.912l.633 6.522 4.835.314zm1.969-11.362a2.38 2.38 0 0 1 .456 3.336v.005l-3.792-2.885a2.38 2.38 0 0 1 3.336-.456"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgAlarmClockOutlined = ({
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
