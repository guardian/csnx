// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src/@types/Icons';

const Svg = ({ size }: IconProps): EmotionJSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fillRule="evenodd"
			d="M18.364 2H5.636v5.68H3.43L2 9.29l9.048 7.504h1.904L22 9.289 20.571 7.68h-2.207V2Zm-1.819 5.68v-.946h-9.09v.946h9.09Zm0-3.787h-9.09v.947h9.09v-.947ZM2 20.58v-8.994l9.048 6.627h1.904L22 11.586v8.994L20.571 22H3.43L2 20.58ZM7.455 9.574h9.09v.947h-9.09v-.947Z"
			clipRule="evenodd"
		/>
	</svg>
);

export const SvgNewsletter = ({
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
				Newsletter
			</span>
		) : (
			''
		)}
	</>
);
