// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src/@types/Icons';

const Svg = ({ size }: IconProps): EmotionJSX.Element => (
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
			d="M7.05 10.207 6.344 9.5H2.707L2 10.207v3.636l.707.707h3.636l.708-.707v-3.636Zm7.475 0-.707-.707h-3.636l-.707.707v3.636l.707.707h3.636l.707-.707v-3.636Zm7.475 0-.707-.707h-3.636l-.707.707v3.636l.707.707h3.636l.707-.707v-3.636Z"
		/>
	</svg>
);

export const SvgEllipsis = ({
	size,
	isAnnouncedByScreenReader = false,
}: IconProps): EmotionJSX.Element => (
	<>
		<Svg size={size} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				More
			</span>
		) : (
			''
		)}
	</>
);
