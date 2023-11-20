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
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			d="M12 22C17.5233 22 22 17.5233 22 12C22 6.47667 17.5233 2 12 2C6.47667 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22Z"
			fill="url(#telegram-brand__a)"
		/>
		<path
			d="M6.52654 11.8942L12.3582 9.37834L16.089 8.01584C16.2272 8.01284 16.3627 8.05336 16.4765 8.13168C16.5557 8.20084 16.6065 8.29751 16.619 8.40251C16.6392 8.53259 16.6448 8.66452 16.6357 8.79584C16.4849 10.3767 15.834 14.215 15.504 15.9858C15.364 16.7408 15.0874 16.9917 14.8207 17.0108C14.2399 17.0642 13.799 16.6275 13.2374 16.2558L11.0057 14.7567C10.0182 14.1067 10.6582 13.7508 11.2207 13.1642L13.9765 10.4725C13.9832 10.4417 13.9824 10.4092 13.974 10.3783C13.9657 10.3475 13.9507 10.3192 13.9299 10.295C13.899 10.2758 13.8649 10.2633 13.8282 10.26C13.7915 10.2567 13.7557 10.2617 13.7224 10.275C13.634 10.295 12.2282 11.2242 9.50487 13.0625C9.1057 13.3367 8.74404 13.47 8.4207 13.4625C8.0632 13.455 7.37654 13.2608 6.8657 13.095C6.23654 12.8908 5.74154 12.7842 5.78487 12.4383C5.8057 12.2642 6.05237 12.0825 6.52654 11.8942Z"
			fill="white"
		/>
		<defs>
			<linearGradient
				id="telegram-brand__a"
				x1={11.8742}
				y1={1.81167}
				x2={11.8742}
				y2={21.9375}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#2AABEE" />
				<stop offset={1} stopColor="#229ED9" />
			</linearGradient>
		</defs>
	</svg>
);

export const SvgTelegramBrand = ({
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
				Telegram logo
			</span>
		) : (
			''
		)}
	</>
);
