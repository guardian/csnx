// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src';

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
			d="M7 5h2V3H7v2Zm8 0h2V3h-2v2ZM7 9h2V7H7v2Zm8 0h2V7h-2v2Zm-8 4h2v-2H7v2Zm8 0h2v-2h-2v2Zm-8 4h2v-2H7v2Zm8 0h2v-2h-2v2Zm-8 4h2v-2H7v2Zm8 0h2v-2h-2v2Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgDragHandle = ({
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
				Drag
			</span>
		) : (
			''
		)}
	</>
);
