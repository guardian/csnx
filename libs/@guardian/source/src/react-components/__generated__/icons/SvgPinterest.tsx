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
			d="M10.577 15.303c-.54 2.831-1.2 5.546-3.153 6.963-.604-4.279.885-7.489 1.576-10.905-1.182-1.984.142-5.977 2.628-4.993 3.059 1.21-2.649 7.376 1.183 8.146 4 .804 5.634-6.941 3.153-9.46-3.584-3.637-10.434-.083-9.592 5.124.205 1.273 1.52 1.66.526 3.416-2.294-.508-2.979-2.317-2.89-4.73.141-3.941 3.547-6.713 6.963-7.095 4.32-.483 8.375 1.586 8.935 5.65.63 4.587-1.95 9.555-6.57 9.198-1.252-.098-1.777-.718-2.759-1.314Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgPinterest = ({
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
				Pinterest logo
			</span>
		) : (
			''
		)}
	</>
);
