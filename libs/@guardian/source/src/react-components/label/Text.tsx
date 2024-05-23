import { css } from '@emotion/react';
import { visuallyHidden as _visuallyHidden } from '../../foundations';
import type { Theme } from '../@types/Theme';
import type { LabelProps } from './@types/LabelProps';
import { mergedTheme } from './shared';
import { labelText, optionalText } from './styles';

const visuallyHidden = css`
	${_visuallyHidden}
`;

export const Text = ({
	text,
	optional,
	hideLabel,
	size = 'medium',
	theme,
}: LabelProps) => (
	<div
		css={(providerTheme: Theme) => [
			labelText(mergedTheme(providerTheme.label, theme), size),
			hideLabel ? visuallyHidden : '',
		]}
	>
		{text}{' '}
		{optional ? (
			<span
				css={(providerTheme: Theme) =>
					optionalText(mergedTheme(providerTheme.label, theme))
				}
			>
				Optional
			</span>
		) : (
			''
		)}
	</div>
);
