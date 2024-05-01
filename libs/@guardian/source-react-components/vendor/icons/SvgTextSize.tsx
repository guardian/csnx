// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src';

const Svg = ({ size, theme }: IconProps): JSX.Element => (
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
			d="M5.43 14.604 4.16 18.51l1.82.417v.943H1v-.987l1.58-.373L7.623 4.12h1.843l4.913 14.389 1.535.373v.987h-5.79v-.943l1.798-.417-1.272-3.905h-5.22Zm.352-.92h4.606L8.194 6.95h-.11l-2.302 6.733Zm16.143 5.198 1.075.307v.68h-4.102v-.68l1.294-.307-.877-2.632h-3.729v.044l-.57-1.514 2.106-6.032h1.316l3.487 10.134Zm-6.032-3.422h3.159l-1.514-4.716h-.065l-1.58 4.716Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgTextSize = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps): JSX.Element => (
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
