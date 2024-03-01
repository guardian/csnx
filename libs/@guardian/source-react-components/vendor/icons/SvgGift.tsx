// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src';

const Svg = ({ size, theme }: IconProps): EmotionJSX.Element => (
	<svg
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			d="M5.91 3.763 8.21 1l3.78 4.498L15.77 1l2.299 2.763-3.881 2.21H19.5l1 1.106v5.637h-7.4v-6.19h-2.2v6.19H3.5V7.079l1-1.105h5.291l-3.88-2.21Z"
			fill={theme?.fill}
		/>
		<path d="M10.9 15H4v5.804L5.192 22H10.9v-7Z" fill={theme?.fill} />
		<path d="M20 15h-6.9v7h5.521L20 20.787V15Z" fill={theme?.fill} />
	</svg>
);

export const SvgGift = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps): EmotionJSX.Element => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Gift
			</span>
		) : (
			''
		)}
	</>
);
