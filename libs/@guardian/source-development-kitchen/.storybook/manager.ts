import { addons } from '@storybook/manager-api';
import { createTheme } from '../../../../configs/storybook/theme';

addons.setConfig({
	theme: createTheme('@guardian/source-development-kitchen'),
});
