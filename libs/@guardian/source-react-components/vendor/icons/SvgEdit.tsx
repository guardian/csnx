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
			d="m19.43 6.475-.325-.3-5.65 5.675-.35-.375L21.605 3l1.4 1.4-8.475 8.5-.775-.75 5.675-5.675ZM12.255 14.1l-.375-.35.85-1.9 1.425 1.4-1.9.85ZM1.975 21 1 19.975V8l.975-1H11v1l-1 1H3v10h16v-5l.975-1H21v6.975L19.975 21h-18Z"
		/>
	</svg>
);

export const SvgEdit = ({
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
				Edit
			</span>
		) : (
			''
		)}
	</>
);
