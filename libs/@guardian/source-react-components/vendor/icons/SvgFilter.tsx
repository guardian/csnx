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
			d="M1 9V7h4V4.5l1-1h2.5l1 1V7H23v2H9.5v2.5l-1 1H6l-1-1V9H1Zm7-4H6.5v6H8V5Zm8.5 12H1v-2h15.5v-2.525l.975-.975H20l1 1V15h2v2h-2v2.5l-1 1h-2.525l-.975-1V17Zm3-4H18v6h1.5v-6Z"
			clipRule="evenodd"
		/>
	</svg>
);

export const SvgFilter = ({
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
				Filter
			</span>
		) : (
			''
		)}
	</>
);
