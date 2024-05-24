import { create } from '@storybook/theming';

export const createTheme = (pkgName: string) =>
	create({
		base: 'light',
		brandTitle: pkgName,
		brandUrl: `https://www.npmjs.com/package/${pkgName}`,
		brandImage:
			'https://raw.githubusercontent.com/guardian/source/main/assets/logo.png',
	});
