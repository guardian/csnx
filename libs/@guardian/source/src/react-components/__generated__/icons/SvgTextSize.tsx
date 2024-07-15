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
			d="M5.43 14.605 4.16 18.508l1.82.417v.943H1v-.987l1.58-.373L7.623 4.12h1.843l4.913 14.389 1.535.373v.987h-5.79v-.943l1.798-.417-1.272-3.905zm.352-.922h4.606L8.194 6.95h-.11zm16.143 5.199 1.075.307v.68h-4.102v-.68l1.294-.307-.877-2.632h-3.729v.044l-.57-1.514 2.106-6.032h1.316zm-6.032-3.422h3.159l-1.514-4.716h-.065z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgTextSize = ({
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
				Text size
			</span>
		) : (
			''
		)}
	</>
);
