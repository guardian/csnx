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
			d="M13.975 2.275v7.25l.475.475h7.275V8.75l-4.5-.6 5.75-5.725L21.55 1l-5.725 5.775-.6-4.5h-1.25Zm-4 19.45v-7.25L9.5 14H2.25v1.25l4.475.575L1 21.575 2.4 23l5.75-5.775.575 4.5h1.25Z"
			clipRule="evenodd"
		/>
	</svg>
);

export const SvgArrowContract = ({
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
				Collapse
			</span>
		) : (
			''
		)}
	</>
);
