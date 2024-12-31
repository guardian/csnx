import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	type ComponentType,
	type ReactNode,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Progress, Theme } from '../@types/crossword';
import type { LayoutProps } from '../@types/Layout';
import { ContextProvider } from '../context/ContextProvider';
import { focusTargets } from '../context/Focus';
import { useFocus } from '../context/Focus';
import { useProgress } from '../context/Progress';
import { ScreenLayout } from '../layouts/ScreenLayout';
import { defaultTheme } from '../theme';
import { AnagramHelper } from './AnagramHelper';
import { Clues } from './Clues';
import { Controls } from './Controls';
import { Grid } from './Grid';

type TabDirection = 'back' | 'forward';

export type CrosswordProps = {
	data: CAPICrossword;
	progress?: Progress;
	children?: ReactNode;
	Layout?: ComponentType<LayoutProps>;
} & Partial<Theme>;

const SavedMessage = () => {
	const { isStored } = useProgress();

	return (
		<p>
			{isStored
				? 'Crosswords are saved automatically.'
				: 'Crossword will not be saved.'}
		</p>
	);
};

const layoutComponents: Omit<LayoutProps, 'gridWidth'> = {
	Grid,
	Controls,
	AnagramHelper,
	Clues,
	SavedMessage,
};

const TabWrangler = ({ children }: { children: ReactNode }) => {
	const { currentFocus, focusOn } = useFocus();
	const previousDirectionRef = useRef<TabDirection | undefined>(undefined);
	const tabWrapperRef = useRef<HTMLDivElement | null>(null);

	const getTarget = (direction: 'back' | 'forward') => {
		// If direction is the same and we're on 'application', reset previousDirection and return
		if (
			direction === previousDirectionRef.current &&
			currentFocus === 'application'
		) {
			previousDirectionRef.current = undefined;
			return undefined;
		}

		// Update previousDirection if needed
		if (previousDirectionRef.current !== direction) {
			previousDirectionRef.current = direction;
		}

		const currentIndex = focusTargets.findIndex(
			(target) => target === currentFocus,
		);

		// Move one step forward or backward
		const step = direction === 'forward' ? 1 : -1;

		// Use modulo to wrap around the array: (index + step + length) % length
		// In JavaScript, the remainder of a negative number still comes out negative.
		// For example, -1 % 5 is -1 instead of 4 (hence the + length).
		const nextIndex =
			(currentIndex + step + focusTargets.length) % focusTargets.length;

		return focusTargets[nextIndex];
	};

	useEffect(() => {
		if (currentFocus === 'application') {
			tabWrapperRef.current?.focus();
		}
	}, [currentFocus]);

	return (
		<div
			id={'tab-wrapper'}
			ref={tabWrapperRef}
			tabIndex={0}
			onKeyDown={(event) => {
				if (event.key === 'Tab') {
					let nextTarget;
					if (event.shiftKey) {
						nextTarget = getTarget('back');
					} else {
						nextTarget = getTarget('forward');
					}
					if (isUndefined(nextTarget)) {
						return;
					}
					focusOn(nextTarget);
					event.preventDefault();
				}
			}}
			onFocus={() => {
				if (isUndefined(currentFocus)) {
					focusOn('application');
				}
			}}
		>
			{children}
		</div>
	);
};

export const Crossword = ({
	children,
	data,
	progress,
	Layout,
	...userTheme
}: CrosswordProps) => {
	const LayoutComponent = Layout ?? ScreenLayout;

	const theme = useMemo<Theme>(
		() => ({ ...defaultTheme, ...userTheme }),
		[userTheme],
	);

	const gridWidth = useMemo(
		() =>
			(theme.gridCellSize + theme.gridGutterSize) * data.dimensions.cols +
			theme.gridGutterSize,
		[theme.gridCellSize, theme.gridGutterSize, data.dimensions.cols],
	);

	return (
		<ContextProvider
			theme={theme}
			data={data}
			userProgress={progress}
			selectedEntryId={data.entries[0].id}
		>
			<TabWrangler>
				<div
					role="application"
					css={css`
						*,
						*::before,
						*::after {
							box-sizing: border-box;
							padding: 0;
							margin: 0;
						}
						height: 100%;
						width: 100%;
						container-type: inline-size;
					`}
				>
					{children ?? (
						<LayoutComponent {...layoutComponents} gridWidth={gridWidth} />
					)}
				</div>
			</TabWrangler>
		</ContextProvider>
	);
};
