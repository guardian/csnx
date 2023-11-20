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
		<path d="M7.07503 3.95183C7.07503 5.03656 6.28996 5.90198 4.99593 5.90198C3.78507 5.90198 3 5.03656 3 3.95183C3 2.84349 3.81002 2 5.05082 2C6.29163 2 7.05008 2.84349 7.07503 3.95183ZM3.10146 19.9967V7.44219H6.94862V19.9967H3.10146Z" />
		<path d="M9.25068 11.4471C9.25068 9.88154 9.20078 8.57919 9.15088 7.44217H12.4907L12.6687 9.18819H12.7452C13.2442 8.36663 14.4917 7.16382 16.5708 7.16382C19.1023 7.16382 21.0001 8.88454 21.0001 12.5807V20.0034H17.1496V13.0396C17.1496 11.4218 16.5924 10.3185 15.2002 10.3185C14.1374 10.3185 13.5037 11.0624 13.2259 11.7811C13.1267 12.0964 13.0833 12.4271 13.0978 12.7578V19.9967H9.25068V11.4471Z" />
	</svg>
);

export const SvgLinkedIn = ({
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
				LinkedIn logo
			</span>
		) : (
			''
		)}
	</>
);
