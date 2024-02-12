import type { ReactElement, ReactNode } from 'react';
import { cloneElement, Fragment } from 'react';
import type { ThemeLink } from './theme';
import { themeLink } from './theme';
import type { IconSide } from './types';

export const linkContents = ({
	children,
	iconSvg,
	iconSide,
	theme,
}: {
	children: ReactNode;
	iconSvg?: ReactElement;
	iconSide: IconSide;
	theme?: Partial<ThemeLink>;
}): ReactNode[] => {
	// a bit of underlined space; the icon sits on top
	const spacer = (
		<Fragment key="spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>
	);
	const linkContents = [children];

	if (iconSvg) {
		if (iconSide === 'left') {
			linkContents.unshift(
				spacer,
				cloneElement(iconSvg, {
					key: 'svg',
					theme: { fill: theme?.textPrimary ?? themeLink.textPrimary },
				}),
			);
		} else {
			linkContents.push(
				spacer,
				cloneElement(iconSvg, {
					key: 'svg',
					theme: { fill: theme?.textPrimary ?? themeLink.textPrimary },
				}),
			);
		}
	}

	return linkContents;
};
