import { css } from '@emotion/react';
import { tokens } from '@guardian/design-tokens';
import * as presets from '../../../vendor/typography/css';
import { palette } from '../../colour/palette';
import { space } from '../../space/space';

const presetTokens = tokens.typography.presets;
type Preset = keyof typeof presetTokens;

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

export const TypographyPresets = () => (
	<ul css={listCss}>
		{Object.entries(presets).map(([preset, styles]) => {
			const token = presetTokens[preset as Preset];
			return (
				<li>
					<span css={presetNameCss}>{preset}</span>
					<span css={specimenCss}>
						<dl css={propertiesCss}>
							<div>
								<dt>Family</dt>
								<dd>
									{token.fontFamily[0]} ({token.fontWeight})
								</dd>
							</div>
							<div>
								<dt>Size</dt>
								<dd>{token.fontSize}</dd>
							</div>
							<div>
								<dt>Line height</dt>
								<dd>{token.lineHeight}</dd>
							</div>
						</dl>
						<span
							css={css`
								${styles}
							`}
						>
							For facts' sake
						</span>
					</span>
				</li>
			);
		})}
	</ul>
);
