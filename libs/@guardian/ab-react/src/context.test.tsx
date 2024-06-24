import { render, screen } from '@testing-library/react';
import { ABProvider, useAB } from './context';

const DummyTest = {
	id: 'DummyTest',
	audienceCriteria: 'n/a',
	audienceOffset: 0,
	audience: 1,
	author: 'n/a',
	canRun: (): boolean => {
		return true;
	},
	description: 'n/a',
	start: '0001-01-01',
	expiry: '9999-12-12',
	successMeasure: 'n/a',
	variants: [
		{ id: 'control', test: () => null },
		{ id: 'variant', test: () => null },
	],
};

const Example = () => {
	const AB = useAB();
	if (AB.isUserInVariant('DummyTest', 'variant')) {
		return <p>InTheTest</p>;
	}
	return <p>NotInTest</p>;
};

describe('AB', () => {
	it('throws an error if you try to use AB outside of a provider', () => {
		// We disable console.error for this test to keep our jest output clean

		const originalError = console.error;

		console.error = jest.fn();

		expect(() => render(<Example />)).toThrow(
			'useAB must be used within the ABProvider',
		);

		console.error = originalError;
	});

	it('puts a user in the test bucket when test is valid and mvtId value is in scope', () => {
		render(
			<ABProvider
				arrayOfTestObjects={[DummyTest]}
				abTestSwitches={{ abDummyTest: true }}
				mvtId={19}
				pageIsSensitive={false}
				serverSideTests={{}}
				errorReporter={() => void 0}
				ophanRecord={() => void 0}
			>
				<Example />
			</ABProvider>,
		);

		expect(screen.getByText('InTheTest')).toBeTruthy();
	});

	it('does not put user in bucket when mvtId out of scope', () => {
		render(
			<ABProvider
				arrayOfTestObjects={[DummyTest]}
				abTestSwitches={{ abDummyTest: true }}
				mvtId={20}
				pageIsSensitive={false}
				serverSideTests={{}}
				errorReporter={() => void 0}
				ophanRecord={() => void 0}
			>
				<Example />
			</ABProvider>,
		);

		expect(screen.getByText('NotInTest')).toBeTruthy();
	});

	it('does not put user in bucket when test is turned off with a switch', () => {
		render(
			<ABProvider
				arrayOfTestObjects={[DummyTest]}
				abTestSwitches={{ abDummyTest: false }}
				mvtId={19}
				pageIsSensitive={false}
				serverSideTests={{}}
				errorReporter={() => void 0}
				ophanRecord={() => void 0}
			>
				<Example />
			</ABProvider>,
		);

		expect(screen.getByText('NotInTest')).toBeTruthy();
	});

	it('does not put user in bucket when isSensitive is true', () => {
		render(
			<ABProvider
				arrayOfTestObjects={[DummyTest]}
				abTestSwitches={{ abDummyTest: true }}
				mvtId={19}
				pageIsSensitive={true}
				serverSideTests={{}}
				errorReporter={() => void 0}
				ophanRecord={() => void 0}
			>
				<Example />
			</ABProvider>,
		);

		expect(screen.getByText('NotInTest')).toBeTruthy();
	});

	it('does not put user in bucket when test is expired', () => {
		render(
			<ABProvider
				arrayOfTestObjects={[{ ...DummyTest, expiry: '2001-01-01' }]}
				abTestSwitches={{ abDummyTest: true }}
				mvtId={19}
				pageIsSensitive={false}
				serverSideTests={{}}
				errorReporter={() => void 0}
				ophanRecord={() => void 0}
			>
				<Example />
			</ABProvider>,
		);

		expect(screen.getByText('NotInTest')).toBeTruthy();
	});
});
