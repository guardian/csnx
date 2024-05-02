// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src';

const Svg = ({ size, theme }: IconProps): JSX.Element => (
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
			d="M4.364 6.5v-1L5 4.717l4.818-1.086V2.543L10.364 2h3.272l.546.544V3.63L19 4.716l.636.783v1H4.364ZM6 21 4.364 7.5h15.272L18 21l-1 1-10-.09L6 21Zm8.182-3.348v-6.108l.545-.544.546.544v6.108l-.546.544-.545-.544Zm-5.455-6.108v6.108l.546.544.545-.544v-6.108L9.273 11l-.546.544Zm2.727 6.108v-6.108L12 11l.545.544v6.108l-.545.544-.546-.544Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgBin = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps): JSX.Element => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Delete
			</span>
		) : (
			''
		)}
	</>
);
