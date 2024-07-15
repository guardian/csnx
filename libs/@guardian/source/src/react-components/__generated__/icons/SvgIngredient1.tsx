// DO NOT EDIT
// this file is auto-generated by libs/@guardian/source/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { IconProps } from '../..';
import { iconSize, visuallyHidden } from '../../../foundations';

const Svg = ({ size, theme }: IconProps) => (
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
			d="m4.905 4.024-.53-1.41L4.802 2h2.39l.428.614L7.1 4.007a4.04 4.04 0 0 1 2.964 3.888c0 1.791-2.827 12.65-3.15 13.882H5.15C4.827 20.545 2 9.682 2 7.895a4.04 4.04 0 0 1 2.905-3.871m2.125 10.64a363 363 0 0 1-.998 4.021c-.297-1.17-.652-2.589-.999-4.022a155 155 0 0 1-1.027-4.502l1.671-.73-.164-.763-1.786.033q-.103-.621-.102-.806A2.41 2.41 0 0 1 6.032 5.49a2.41 2.41 0 0 1 2.406 2.406c0 .243-.13 1.071-.412 2.419-.145.691-.318 1.466-.505 2.278l-1.326-.024-.163.764 1.192.522z"
			fill={theme?.fill}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M16.79 3.97c-.951.383-1.936.78-2.84 1.685-1.761 1.76-2.49 4.174-1.913 6.244l-1.224 1.647.582.577L13.04 12.9c.467.13.952.195 1.442.195h.004c1.68 0 3.433-.746 4.796-2.109 1.995-1.99 2.8-5.586 1.872-8.363l-1.504-.355c-.93.93-1.852 1.299-2.827 1.69l-.005.001zm.635 1.496-.003.002-.026.01c-.96.387-1.653.682-2.297 1.326-1.097 1.096-1.625 2.43-1.63 3.631l3.644-3.19.578.578-3.19 3.647c1.205-.005 2.548-.55 3.632-1.633v-.001c1.3-1.295 1.988-3.594 1.725-5.616-.847.613-1.67.942-2.38 1.226l-.052.02"
			fill={theme?.fill}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M21.322 12.237c1.63 3.37.22 7.442-3.15 9.077a6.75 6.75 0 0 1-2.959.681L15.21 22a6.81 6.81 0 0 1-6.127-3.827zm-4.603 3.408 3.312 1.146a5.1 5.1 0 0 0 .109-2.813zm2.957 1.985-3.354-1.161 1.517 3.125a5.05 5.05 0 0 0 1.837-1.964m-8.527.729 3.458-1.685-1.144 3.307a5.26 5.26 0 0 1-2.314-1.622m3.194 1.857 1.16-3.352 1.518 3.127c-.86.32-1.789.384-2.678.225"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgIngredient1 = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps) => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Ingredient
			</span>
		) : (
			''
		)}
	</>
);
