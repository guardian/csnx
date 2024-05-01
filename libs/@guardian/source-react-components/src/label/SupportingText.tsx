import { css } from '@emotion/react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { visuallyHidden as _visuallyHidden } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import type { Theme } from '../@types/Theme';
import { mergedTheme } from './shared';
import { supportingText } from './styles';
import type { ThemeLabel } from './theme';

const visuallyHidden = css`
	${_visuallyHidden}
`;

export const SupportingText = ({
	hideLabel,
	children,
	theme,
}: {
	hideLabel?: boolean;
	children: ReactNode;
	theme?: Partial<ThemeLabel>;
}): JSX.Element => {
	return (
		<p
			css={(providerTheme: Theme) => [
				supportingText(mergedTheme(providerTheme.label, theme)),
				hideLabel ? visuallyHidden : '',
			]}
		>
			{children}
		</p>
	);
};
