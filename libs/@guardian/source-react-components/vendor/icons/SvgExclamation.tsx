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
			d="M9.4068 2.05085L10.3899 14.8983H13.1017L14.1187 2.05085L13.1356 1H10.3899L9.4068 2.05085ZM14.4237 20.322C14.4237 18.8305 13.2034 17.6102 11.678 17.6102C10.2203 17.6102 9 18.8305 9 20.322C9 21.7797 10.2203 23 11.678 23C13.1695 23 14.4237 21.7797 14.4237 20.322Z"
		/>
	</svg>
);

export const SvgExclamation = ({
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
				Exclamation mark
			</span>
		) : (
			''
		)}
	</>
);
