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
			d="M16.488 1 18 2.512v18.976l-1.512 1.488L7.512 23 6 21.488V2.512L7.512 1h8.976Zm-4.39 20.488c.536 0 1-.44 1-1 0-.561-.464-1-1-1a1.01 1.01 0 0 0-1.025 1c0 .56.464 1 1.025 1Zm3.975-3v-14h-8v14h8Z"
			clipRule="evenodd"
		/>
	</svg>
);

export const SvgPhone = ({
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
				Mobile phone
			</span>
		) : (
			''
		)}
	</>
);
