// DO NOT EDIT
// this file is auto-generated by libs/@guardian/source/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { IconProps } from '../..';
import { iconSize, visuallyHidden } from '../../../foundations';

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
		<mask
			id="whats-app-brand__a"
			style={{
				maskType: 'luminance',
			}}
			maskUnits="userSpaceOnUse"
			x={2}
			y={2}
			width={20}
			height={20}
		>
			<path d="M2 2h20v20H2z" fill="white" />
		</mask>
		<g mask="url(#whats-app-brand__a)">
			<mask
				id="whats-app-brand__b"
				style={{
					maskType: 'luminance',
				}}
				maskUnits="userSpaceOnUse"
				x={2}
				y={2}
				width={20}
				height={20}
			>
				<path d="M22 2H2v20h20z" fill="white" />
			</mask>
			<g mask="url(#whats-app-brand__b)">
				<path
					d="M12 20.89A8.89 8.89 0 0 0 20.888 12 8.89 8.89 0 0 0 12 3.11 8.89 8.89 0 0 0 3.11 12 8.89 8.89 0 0 0 12 20.89"
					fill="#2EDB2A"
				/>
				<path
					d="m4.274 15.163 4.25 4.101-5.682 1.628 1.432-5.73"
					fill="#2EDB2A"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M19.086 4.906A9.92 9.92 0 0 0 12.042 2c-5.489 0-9.956 4.446-9.959 9.91a9.85 9.85 0 0 0 1.33 4.954L2 22l5.28-1.378a10 10 0 0 0 4.757 1.206h.005c5.488 0 9.955-4.445 9.958-9.91a9.82 9.82 0 0 0-2.914-7.012m-7.044 15.249h-.004a8.3 8.3 0 0 1-4.212-1.148l-.303-.179-3.132.818.837-3.04-.197-.311a8.2 8.2 0 0 1-1.266-4.383c.002-4.542 3.715-8.237 8.28-8.237 2.212 0 4.29.858 5.853 2.416a8.17 8.17 0 0 1 2.422 5.827c-.003 4.543-3.715 8.239-8.277 8.239zm4.54-6.17c-.25-.124-1.473-.723-1.7-.805-.228-.082-.394-.124-.56.124s-.643.805-.788.971-.29.186-.539.063c-.248-.124-1.05-.385-2.002-1.23-.74-.656-1.239-1.467-1.384-1.716s-.015-.381.11-.505c.111-.11.248-.289.373-.434.124-.145.165-.247.249-.413s.042-.31-.021-.434c-.062-.124-.56-1.344-.767-1.838-.201-.484-.406-.418-.56-.425-.145-.007-.311-.01-.477-.01a.92.92 0 0 0-.663.31c-.229.248-.871.847-.871 2.066 0 1.22.891 2.396 1.015 2.562.125.166 1.755 2.666 4.251 3.739.594.255 1.057.407 1.42.522a3.4 3.4 0 0 0 1.567.098c.478-.07 1.473-.6 1.68-1.177.206-.579.207-1.075.144-1.178-.062-.103-.228-.165-.477-.29"
					fill="white"
				/>
			</g>
		</g>
	</svg>
);

export const SvgWhatsAppBrand = ({
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
				WhatsApp logo
			</span>
		) : (
			''
		)}
	</>
);
