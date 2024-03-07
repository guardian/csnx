/* eslint-disable import/no-default-export -- that's what cypress likes */

import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		supportFile: false,
	},
});
