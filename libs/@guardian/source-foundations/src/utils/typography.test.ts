import { headlineBold24, titlepiece42 } from '../typography/css';
import { presetToPx } from './typography';

describe('presetToPx', () => {
	it('should convert preset font size value from rem to px', () => {
		expect(presetToPx(headlineBold24)).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 24px;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);

		expect(presetToPx(titlepiece42)).toMatchCSS(
			`
			font-family: "GT Guardian Titlepiece", Georgia, serif;
			font-size: 42px;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 5px;
			`,
			{ isFragment: true },
		);
	});
});
