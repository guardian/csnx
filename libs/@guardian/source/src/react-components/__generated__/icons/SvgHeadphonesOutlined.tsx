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
			d="M20.8 11.255c0-4.832-3.92-8.753-8.757-8.753a8.752 8.752 0 0 0-8.207 11.801 4.2 4.2 0 0 0-.502 1.996v.291a4.24 4.24 0 0 0 4.235 4.235h.602l1.223-1.223.235-.235v-5.845L8.17 12.064h-.602c-.984 0-1.889.339-2.61.905a7.4 7.4 0 0 1-.21-1.714c0-4.02 3.274-7.295 7.294-7.295s7.295 3.275 7.295 7.295c0 .586-.076 1.152-.207 1.694a4.2 4.2 0 0 0-2.586-.889h-.602l-1.458 1.458v5.845l.227.227 1.232 1.231h.601a4.24 4.24 0 0 0 4.235-4.235v-.29c0-.734-.187-1.423-.518-2.025.347-.94.534-1.956.534-3.016zm-15.303 3.2a2.77 2.77 0 0 1 2.072-.933h.602v5.845h-.602a2.777 2.777 0 0 1-2.777-2.777v-.29c0-.045.004-.085.008-.128a2.76 2.76 0 0 1 .697-1.718m13.829 1.84v.291a2.777 2.777 0 0 1-2.777 2.777h-.602v-5.845h.602c.817 0 1.546.355 2.052.913a2.73 2.73 0 0 1 .713 1.697c0 .056.008.107.008.163z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgHeadphonesOutlined = ({
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
				Listen
			</span>
		) : (
			''
		)}
	</>
);
