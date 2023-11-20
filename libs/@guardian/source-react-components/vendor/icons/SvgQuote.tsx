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
			d="M6.506 4.7h4.976c-.6 4.745-1.13 9.399-1.36 14.605H1c.83-5.068 2.557-9.86 5.506-14.605Zm11.587 0H23c-.53 4.745-1.129 9.399-1.36 14.605h-9.098c.944-5.068 2.603-9.86 5.551-14.605Z"
			clipRule="evenodd"
		/>
	</svg>
);

export const SvgQuote = ({
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
				Quote
			</span>
		) : (
			''
		)}
	</>
);
