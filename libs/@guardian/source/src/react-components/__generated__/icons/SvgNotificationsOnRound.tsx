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
			d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-3.947-6.474c-.75-.984-1.217-2.201-1.217-3.53 0-1.327.467-2.544 1.217-3.528l-.258-.258A4.872 4.872 0 0 0 6 11.997c0 1.537.7 2.89 1.795 3.787l.258-.258Zm7.87-7.058c.786.984 1.216 2.201 1.216 3.529 0 1.328-.43 2.545-1.217 3.529l.283.258A4.872 4.872 0 0 0 18 11.997c0-1.537-.7-2.89-1.795-3.787l-.283.258Zm-6.69 5.595a3.55 3.55 0 0 1-.639-2.066c0-.787.234-1.488.64-2.078l-.332-.307c-.627.59-.984 1.45-.984 2.385 0 .934.357 1.758.984 2.385l.332-.32Zm5.546-4.144c.393.59.627 1.291.627 2.078 0 .787-.234 1.488-.627 2.066l.307.32c.627-.628.996-1.452.996-2.386 0-.934-.369-1.795-.996-2.385l-.307.307Zm-2.78.11c1.095 0 1.968.874 1.968 1.968A1.957 1.957 0 0 1 12 13.964a1.957 1.957 0 0 1-1.967-1.967c0-1.094.873-1.967 1.967-1.967Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgNotificationsOnRound = ({
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
				Notification off
			</span>
		) : (
			''
		)}
	</>
);
