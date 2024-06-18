// DO NOT EDIT
// this file is auto-generated by libs/@guardian/source/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '../../../foundations';
import type { IconProps } from '../..';
const Svg = ({ size }: IconProps) => (
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
			d="M18.108 7.573a10 10 0 0 1-.057.328c-.738 3.789-3.262 5.097-6.486 5.097H9.923a.8.8 0 0 0-.788.676l-.84 5.33-.238 1.51A.42.42 0 0 0 8.47 21h2.912a.7.7 0 0 0 .692-.59l.028-.148.548-3.48.036-.19a.7.7 0 0 1 .692-.592h.435c2.82 0 5.029-1.145 5.674-4.459.27-1.384.13-2.54-.583-3.353a2.8 2.8 0 0 0-.797-.615"
			fill="#A7B4C8"
		/>
		<path
			d="M17.336 7.265a6 6 0 0 0-.718-.159 9 9 0 0 0-1.447-.105h-4.385a.7.7 0 0 0-.691.591l-.933 5.91-.027.171a.8.8 0 0 1 .788-.675h1.641c3.224 0 5.749-1.309 6.486-5.097q.032-.168.058-.328a4 4 0 0 0-.772-.308"
			fill="#041F4A"
		/>
		<path
			d="M10.095 7.592a.7.7 0 0 1 .691-.59h4.385c.52 0 1.005.033 1.447.105q.19.03.37.07a6 6 0 0 1 .514.14q.327.109.606.256c.22-1.4-.001-2.353-.758-3.216C16.515 3.407 15.01 3 13.082 3H7.487a.8.8 0 0 0-.79.676l-2.33 14.772a.48.48 0 0 0 .473.556h3.454l.868-5.503z"
			fill="#052962"
		/>
	</svg>
);

export const SvgPayPalBrand = ({
	size,
	isAnnouncedByScreenReader = false,
}: IconProps) => (
	<>
		<Svg size={size} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				PayPal logo
			</span>
		) : (
			''
		)}
	</>
);
