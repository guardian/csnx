import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { quick } from '../../stories/formats/quick';
import { DataProvider } from './Data';
import { ProgressProvider, useProgress } from './Progress';

it('restores over saved letters without reporting, and keeps the next reader edit', () => {
	Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
	const { dimensions, entries, id } = quick;
	const entry = entries.find((candidate) => candidate.solution)!;
	const { x, y } = entry.position;
	const initial: string[][] = Array.from({ length: dimensions.cols }, () =>
		Array<string>(dimensions.rows).fill(''),
	);
	initial[x]![y] = '?';
	const storageKey = `crosswords.${id}`;
	localStorage.setItem(storageKey, JSON.stringify({ value: initial }));
	const container = document.createElement('div');
	const root = createRoot(container);
	const onChange = jest.fn();
	const Probe = () => {
		const { progress, updateProgress } = useProgress();
		return (
			<button onClick={() => updateProgress(initial)}>
				{progress[x]?.[y]}
			</button>
		);
	};
	const render = (restoreCompleted: boolean) =>
		act(() => {
			root.render(
				<DataProvider {...quick}>
					<ProgressProvider
						id={id}
						dimensions={dimensions}
						restoreCompleted={restoreCompleted}
						onProgressChange={onChange}
					>
						<Probe />
					</ProgressProvider>
				</DataProvider>,
			);
		});
	try {
		render(false);
		expect(container.textContent).toBe('?');
		render(true);
		expect(container.textContent).toBe(entry.solution?.[0]);
		expect(onChange).not.toHaveBeenCalled();
		act(() => container.querySelector('button')!.click());
		expect(container.textContent).toBe('?');
		expect(onChange).toHaveBeenCalledTimes(1);
	} finally {
		act(() => root.unmount());
		localStorage.removeItem(storageKey);
		Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT');
	}
});
