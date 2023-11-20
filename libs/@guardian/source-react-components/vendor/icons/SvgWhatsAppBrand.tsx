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
		fill="none"
		viewBox="-3 -3 30 30"
		focusable={false}
		aria-hidden={true}
	>
		<mask
			id="prefix__a"
			width={20}
			height={20}
			x={2}
			y={2}
			maskUnits="userSpaceOnUse"
			style={{
				maskType: 'luminance',
			}}
		>
			<path fill="#fff" d="M2 2h20v20H2V2Z" />
		</mask>
		<g mask="url(#prefix__a)">
			<mask
				id="prefix__b"
				width={20}
				height={20}
				x={2}
				y={2}
				maskUnits="userSpaceOnUse"
				style={{
					maskType: 'luminance',
				}}
			>
				<path fill="#fff" d="M22 2H2v20h20V2Z" />
			</mask>
			<g mask="url(#prefix__b)">
				<path
					fill="#2EDB2A"
					d="M12 20.89A8.892 8.892 0 0 0 20.888 12 8.891 8.891 0 0 0 12 3.11 8.892 8.892 0 0 0 3.11 12 8.892 8.892 0 0 0 12 20.89Z"
				/>
				<path
					fill="#2EDB2A"
					d="m4.274 15.162 4.25 4.102-5.682 1.628 1.432-5.73Z"
				/>
				<path
					fill="#fff"
					fillRule="evenodd"
					d="M19.086 4.906A9.922 9.922 0 0 0 12.042 2c-5.489 0-9.956 4.446-9.959 9.91a9.85 9.85 0 0 0 1.33 4.954L2 22l5.28-1.378a9.995 9.995 0 0 0 4.757 1.206h.005c5.488 0 9.955-4.445 9.958-9.91a9.824 9.824 0 0 0-2.914-7.012Zm-7.044 15.249h-.004a8.292 8.292 0 0 1-4.212-1.148l-.303-.179-3.132.818.837-3.04-.197-.311a8.195 8.195 0 0 1-1.266-4.383c.002-4.542 3.715-8.237 8.28-8.237 2.212 0 4.29.858 5.853 2.416a8.174 8.174 0 0 1 2.422 5.827c-.003 4.543-3.715 8.239-8.277 8.239l-.001-.002Zm4.54-6.17c-.25-.124-1.473-.723-1.7-.805-.228-.082-.394-.124-.56.124-.166.248-.643.805-.788.971-.145.166-.29.186-.539.063-.248-.124-1.05-.385-2.002-1.23-.74-.656-1.239-1.467-1.384-1.716-.145-.248-.015-.381.11-.505.111-.11.248-.289.373-.434.124-.145.165-.247.249-.413.083-.166.042-.31-.021-.434s-.56-1.344-.767-1.838c-.201-.484-.406-.418-.56-.425-.145-.007-.311-.01-.477-.01a.917.917 0 0 0-.663.31c-.229.248-.871.847-.871 2.066 0 1.22.891 2.396 1.015 2.562.125.166 1.755 2.666 4.251 3.739.594.255 1.057.407 1.42.522a3.424 3.424 0 0 0 1.567.098c.478-.07 1.473-.6 1.68-1.177.206-.579.207-1.075.144-1.178-.062-.103-.228-.165-.477-.29Z"
					clipRule="evenodd"
				/>
			</g>
		</g>
	</svg>
);

export const SvgWhatsAppBrand = ({
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
				WhatsApp logo
			</span>
		) : (
			''
		)}
	</>
);
