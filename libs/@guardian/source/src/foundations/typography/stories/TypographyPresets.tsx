import { css } from '@emotion/react';
import * as presets from '../../__generated__/typography';
import { palette } from '../../colour/palette';
import { space } from '../../space/space';

const listCss = css`
	list-style: none;
	padding: 0;
	li + li {
		margin-top: ${space[4]}px;
		padding-top: ${space[4]}px;
		border-top: 1px solid ${palette.neutral[86]};
	}
`;

const presetNameCss = css`
	display: block;
	font-weight: 700;
`;

const specimenCss = css`
	display: flex;
	gap: ${space[8]}px;
`;

const propertiesCss = css`
	display: flex;
	gap: ${space[4]}px;
	dt {
		${presets.textSans12}
		color: ${palette.neutral[38]};
		margin: 0;
		padding: 0;
	}
	dd {
		${presets.textSans14}
		margin: 0;
		padding: 0;
	}
`;

// Filter out object style versions of presets
const filteredPresets = Object.entries(presets).filter(
	([preset]) => !preset.endsWith('Object'),
);

export const TypographyPresets = () => (
	<ul css={listCss}>
		{filteredPresets.map(([preset, styles], index) => {
			const presetStyles = styles as string;

			const fontFamily = presetStyles
				.match(/font-family: (.+);/)?.[1]
				?.replace(/"/g, '')
				.split(',')[0];
			const fontWeight = presetStyles.match(/font-weight: (\d+);/)?.[1];
			const fontSize = presetStyles.match(/font-size: (.+)rem;/)?.[1] ?? 0;
			const lineHeight = presetStyles.match(/line-height: (.+);/)?.[1] ?? 0;

			return (
				<li key={`preset-${index}`}>
					<span css={presetNameCss}>{preset}</span>
					<span css={specimenCss}>
						<dl css={propertiesCss}>
							<div>
								<dt>Family</dt>
								<dd>
									{fontFamily} ({fontWeight})
								</dd>
							</div>
							<div>
								<dt>Size</dt>
								<dd>{(fontSize as number) * 16}px</dd>
							</div>
							<div>
								<dt>Line height</dt>
								<dd>{lineHeight}</dd>
							</div>
						</dl>
						<span
							css={css`
								${styles}
							`}
						>
							For facts&apos; sake
						</span>
					</span>
				</li>
			);
		})}
	</ul>
);
