import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { visuallyHidden } from '@guardian/source-foundations';

export type SvgGuardianLiveLogoProps = {
	/**
	 * The text colour.
	 *
	 * This should probably come from
	 * [`@guardian/src-foundation`](https://theguardian.design/2a1e5182b/p/2668c8-code).
	 */
	textColor?: string;
	/**
	 * The width the SVG will display at (height is automatically adjusted
	 * to maintain the correct aspect ratio).
	 */
	width?: number;
};

/**
 * [Storybook](https://guardian.github.io/source/?path=/docs/packages-source-react-components-svgguardianlivelogo--playground) •
 * [Design System](https://theguardian.design/2a1e5182b/p/8909e0-assets/t/05bdd0) •
 * [GitHub](https://github.com/guardian/source/tree/main/packages/@guardian/source-react-components/src/brand/SvgGuardianLiveLogo.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 */

export const SvgGuardianLiveLogo = ({
	textColor,
	width,
}: SvgGuardianLiveLogoProps): EmotionJSX.Element => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 380 200"
				fill={textColor}
				width={width}
				focusable={false}
				aria-hidden={true}
			>
				<defs />
				<path d="M84.69 196.22l5.82-1.3v-57.13l-5.82-1.3V135h30.44v1.48l-6.27 1.22v58.37h9.92l14.28-22.36h1.48l-1.13 24H84.7v-1.5zm69.56-47.05l2.18.17v45.49l4.87 1.4v1.47h-25.76v-1.48l4.95-1.4v-39.3l-5.3-2.1v-1.48l19.06-2.77zm2.25-11.27a8.24 8.24 0 01-.7 3.15 8.26 8.26 0 01-7.74 4.94 8.13 8.13 0 01-5.99-2.25 8.13 8.13 0 01-2.51-5.88 8.14 8.14 0 018.5-8.14 8.33 8.33 0 018.44 8.18zm46.84 17.19l-14.1 42.62h-9.52l-16.84-43.94-4-2.18v-1.47h26.81v1.47l-5.47 2.08 11.1 31.06h.43l9.92-29.56-6.7-3.58v-1.47h13.83v1.47l-5.46 3.5zm16.63 17.14c.6 11.74 4.35 18.96 16.52 18.96a25.95 25.95 0 0010.62-1.92v1.4c-2.7 4.1-9.3 8.35-18.79 8.35-16.1 0-24.36-9.75-24.36-25.32 0-15.22 9.05-24.7 23.66-24.7s20.87 7.82 20.87 22v1.23h-28.52zm0-1.75l13.5-.6c0-14.97-2-19.22-6.18-19.22-4.54-.07-7.32 6.08-7.32 19.82zM85.47 68.86l6.46-3.36V14.7h-4.9L75.1 30.54h-1.35l.77-17.65h51.75l.75 17.64h-1.42L113.9 14.7h-5v50.69l6.5 3.42v1.72H85.47v-1.67zm47.45-2.25V10.35l-5.01-2.03V7.27L146 4h1.92v26.63l.51-.43A24.22 24.22 0 01164 24.42c7.93 0 11.45 4.48 11.45 12.84v29.35l4.24 2.32v1.73H156v-1.73l4.3-2.32V37.19c0-4.6-2-6.45-5.77-6.45a9.92 9.92 0 00-6.35 2.07v33.88l4.2 2.38v1.59h-23.82v-1.6l4.37-2.45zm61.82-17.28c.49 9.3 4.66 16.5 14.53 16.5 4.77 0 8.16-2.22 11.37-3.9v1.82a22.22 22.22 0 01-17.46 8.13c-15.31 0-23.14-8.5-23.14-23.25 0-14.41 8.56-23.38 22.4-23.38 13 0 19.75 6.5 19.75 23.63v.45h-27.45zm-.26-2.15l13.48-.82c0-11.52-1.99-19.17-5.92-19.17-4.2 0-7.54 8.88-7.54 20h-.02zM0 93.08c0-24.5 16.22-33.23 34.28-33.23a55.07 55.07 0 0118.95 2.87l.35 17.1h-1.71L41.27 63.3a15.55 15.55 0 00-6.72-1.08c-9.6 0-14.5 11.1-14.28 29.3.19 21.77 3.97 31.64 12.78 31.64 1.8.06 3.6-.25 5.28-.89v-23.3l-5.81-3.33V93.7h28.03v2.08l-5.73 3.17v23.03a62.88 62.88 0 01-21.24 3.62C13.05 125.6 0 116.08 0 93.08zm60.31-11.44v-1.46l18.92-3.33 2.03.15v37.33c0 4.5 2.16 5.87 5.8 5.87a7.72 7.72 0 006.12-2.9V83.9l-5.2-2.25v-1.47l18.93-3.33 1.9.17v42.7l5.1 2.15v1.36l-18.68 2.27-1.9-.17v-5.6h-.53a20.95 20.95 0 01-14.16 5.95c-9.06 0-13.22-5.35-13.22-13.48V83.9l-5.11-2.26zM181.2 76.8l1.59.18v13.79h.42c2.02-10.11 6.48-13.89 11.92-13.89a6.02 6.02 0 012.34.35V91.3a16.12 16.12 0 00-3.9-.35 23.81 23.81 0 00-10.26 2.05v27.32l4.3 2.38v1.77h-24.57v-1.75l4.41-2.4V83.13l-5.17-1.59v-1.27l18.92-3.46z" />
				<path d="M228.67 77.97V63.44l-5.17-1.81v-1.16l19.04-3.51 1.81.25v62.48l5.27 1.92v1.6l-18.82 2.53-1.46-.17v-5.16h-.43a16.81 16.81 0 01-12.52 5.27c-10.29 0-17.8-7.94-17.8-23.92 0-16.93 8.73-25.25 21.94-25.25a18.71 18.71 0 018.1 1.46h.04zm-.03 40.01V80.64a6.97 6.97 0 00-5.22-1.59c-5.11.18-8.26 7.94-8.26 21.62 0 12.34 2.27 19.25 9.07 19.04a6.68 6.68 0 004.4-1.59v-.14zm42-41.2l1.58.18v43.35l4.32 2.38v1.77h-24.48v-1.75l4.4-2.4v-36.5l-5.25-2.05v-1.44l19.42-3.54zm1.72-11.71a8.22 8.22 0 01-2.52 5.75 8.21 8.21 0 01-5.86 2.28 8.08 8.08 0 01-7.46-4.99 8.08 8.08 0 017.46-11.17 8.29 8.29 0 018.38 8.13zm59.34 55.26V83.35l-5.18-1.8V79.8l18.82-3.51 1.9.17V82h.53a24.84 24.84 0 0116.06-5.95c8.2 0 11.82 3.88 11.82 12.52v31.74l4.4 2.46v1.76H355.5v-1.75l4.41-2.4V89.42c0-4.76-2.08-6.65-5.95-6.65a10.3 10.3 0 00-6.47 2.07v35.48l4.31 2.4v1.76h-24.57v-1.74l4.46-2.4zm-27.26-23.22v-6.19c0-9.33-2.03-12.38-7.81-12.38a15.13 15.13 0 00-1.95.18L284.4 92.64h-1.45V79.8a55.28 55.28 0 0117.22-2.96c12.56 0 19.86 3.47 19.86 14V121l4.5 1.19v1.19a19.29 19.29 0 01-9.26 2.12c-6.2 0-9.16-2.03-10.53-5.42h-.42c-2.64 3.57-6.35 5.6-12.22 5.6-7.46 0-12.56-4.67-12.56-12.7 0-7.8 4.76-12.04 14.68-13.92l10.2-1.95zm0 20.87V99.33l-3.18.26c-4.92.43-6.7 3.57-6.7 10.52 0 7.55 2.47 9.52 5.94 9.52a4.56 4.56 0 003.9-1.59l.04-.06zm-164.1-20.87v-6.19c0-9.33-2.02-12.38-7.8-12.38-.66.02-1.3.08-1.95.18l-10.27 13.92h-1.45V79.8a55.31 55.31 0 0117.24-2.96c12.55 0 19.85 3.47 19.85 14V121l4.5 1.19v1.19a19.29 19.29 0 01-9.26 2.12c-6.19 0-9.15-2.03-10.52-5.42h-.43c-2.63 3.57-6.35 5.6-12.22 5.6-7.46 0-12.55-4.67-12.55-12.7 0-7.8 4.76-12.04 14.68-13.92l10.19-1.95zm0 20.87V99.33l-3.17.26c-4.92.43-6.7 3.57-6.7 10.52 0 7.55 2.47 9.52 5.94 9.52a4.56 4.56 0 003.9-1.59" />
				<defs>
					<clipPath id="clip0">
						<path d="M0 0h380v200H0z" />
					</clipPath>
				</defs>
			</svg>
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				The Guardian Live
			</span>
		</>
	);
};
