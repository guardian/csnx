import { expect, test } from '@playwright/experimental-ct-react';
import { Byline } from '../src';
import type { BylineModel } from '../src/byline/lib';

test('displays placeholder text until text is entered', async ({
	mount,
	page,
}) => {
	const component = await mount(
		<Byline placeholder="My placeholder" handleSave={() => {}} />,
	);
	await expect(component).toHaveText('My placeholder');

	const editor = page.getByRole('combobox');
	await editor.click();
	await page.keyboard.type('test');

	await expect(component).toHaveText('test');
	await expect(component).not.toHaveText('My placeholder');
});
test('executes save on every keypress', async ({ mount, page }) => {
	let saveCounter = 0;
	await mount(
		<Byline
			handleSave={() => {
				saveCounter++;
			}}
		/>,
	);

	const editor = page.getByRole('combobox');
	await editor.click();
	await page.keyboard.type('test');

	expect(saveCounter).toBe(4);
});
test('executes save with correct input on every keypress', async ({
	mount,
	page,
}) => {
	const saveLog: BylineModel[] = [];
	const mockHandleSave = (value: BylineModel) => {
		saveLog.push(value);
	};
	await mount(<Byline handleSave={mockHandleSave} />);

	const editor = page.getByRole('combobox');
	await editor.click();
	await page.keyboard.type('T');
	await page.keyboard.type('e');
	await page.keyboard.type('s');
	await page.keyboard.type('t');

	expect(saveLog.at(0)?.pop()?.value).toBe('T');
	expect(saveLog.at(1)?.pop()?.value).toBe('Te');
	expect(saveLog.at(2)?.pop()?.value).toBe('Tes');
	expect(saveLog.at(3)?.pop()?.value).toBe('Test');
});
