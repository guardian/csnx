import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	type ComponentType,
	type ReactNode,
	useCallback,
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
	const tabWrapperRef = useRef<HTMLDivElement | null>(null);
	const getTarget = (direction: 'back' | 'forward') => {
		if (!currentFocus) {
			if (direction === 'forward') {
				return focusTargets[0];
			} else {
				return focusTargets[focusTargets.length - 1];
			}
		}
		const currentIndex = focusTargets.findIndex(
			(target) => target === currentFocus,
		);
		const nextIndex = currentIndex + (direction === 'forward' ? 1 : -1);
		return focusTargets[nextIndex];
	};

	const handleFocusOut = useCallback(() => {
		focusOn(undefined);
	}, [focusOn]);

	useEffect(() => {
		const tabWrapper = tabWrapperRef.current;
		tabWrapper?.addEventListener('focusout', handleFocusOut);
		return () => {
			tabWrapper?.removeEventListener('focusout', handleFocusOut);
		};
	}, [handleFocusOut]);

	return (
		<div
			ref={tabWrapperRef}
			tabIndex={currentFocus ? -1 : 0}
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
