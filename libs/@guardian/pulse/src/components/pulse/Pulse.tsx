import { Global } from '@emotion/react';
import { createContext, type ReactNode } from 'react';
import styles from '@guardian/pulse/pulse.css?inline';
import type { PulseMode } from '../@types/mode';
import type { PulseTheme } from '../@types/theme';

export type PulseConfig = {
	theme: PulseTheme;
	mode: PulseMode;
};

export const PulseContext = createContext<PulseConfig>({
	theme: 'core',
	mode: 'light',
});

export const Pulse = ({
	theme,
	mode,
	children,
}: {
	theme: PulseTheme;
	mode: PulseMode;
	children: ReactNode;
}) => {
	return (
		<PulseContext.Provider
			value={{
				theme: theme,
				mode: mode,
			}}
		>
			<Global styles={styles} />
			<span data-pulse-brand={theme} data-pulse-mode={mode}>
				{children}
			</span>
		</PulseContext.Provider>
	);
};
