import { expect, test } from '@playwright/experimental-ct-react';
import { Byline } from '../src';

test('should work', async ({ mount }) => {
	const component = await mount(
		<Byline placeholder="My placeholder" handleSave={() => {}} />,
	);
	await expect(component).toHaveText('My placeholder');
});
