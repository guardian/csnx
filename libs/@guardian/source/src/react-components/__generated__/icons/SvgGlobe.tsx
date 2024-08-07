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
			d="M20 12c0 .715-.094 1.408-.27 2.068h-3.328a22 22 0 0 0 0-4.132h3.33c.175.659.268 1.35.268 2.064m-5.607-2.064q.104.986.105 2.064-.001 1.081-.106 2.068H9.608A20 20 0 0 1 9.502 12q.001-1.078.106-2.064zm1.718-2h2.781a8.03 8.03 0 0 0-3.871-3.346c.46.928.834 2.066 1.09 3.346M12 4c.003 0 .026 0 .079.024.06.027.163.088.302.219.288.27.638.756.976 1.506.277.617.52 1.355.71 2.187H9.933c.19-.832.432-1.57.71-2.187.337-.75.687-1.235.975-1.506.139-.13.243-.192.303-.22A.2.2 0 0 1 11.998 4zm-3.02.59c-.461.928-.835 2.066-1.091 3.346H5.108A8.03 8.03 0 0 1 8.98 4.59M7.598 9.936h-3.33A8 8 0 0 0 4 12c0 .715.094 1.408.27 2.068h3.328a22 22 0 0 1 0-4.132m.292 6.132H5.11a8.03 8.03 0 0 0 3.87 3.342c-.46-.927-.834-2.064-1.09-3.342M12 20h-.002a.2.2 0 0 1-.076-.024 1.2 1.2 0 0 1-.303-.219c-.288-.27-.638-.756-.976-1.506a11.7 11.7 0 0 1-.708-2.183h4.13c-.189.83-.431 1.567-.708 2.183-.338.75-.688 1.235-.976 1.506a1.2 1.2 0 0 1-.303.22.2.2 0 0 1-.076.023zm3.02-.59a8.03 8.03 0 0 0 3.87-3.342h-2.78c-.256 1.278-.63 2.415-1.09 3.342M12 2c4.076 0 7.582 2.438 9.14 5.936h.01v.022A10 10 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgGlobe = ({
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
				Globe
			</span>
		) : (
			''
		)}
	</>
);
