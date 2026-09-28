import { type ReactNode, useContext } from 'react';
import type { PulseMode } from '../@types/mode';
import type { PulseTheme } from '../@types/theme';
import { PulseContext } from './Pulse';

export const Theme = ({
	theme,
	mode,
	children,
}: {
	theme?: PulseTheme;
	mode?: PulseMode;
	children: ReactNode;
}) => {
	const config = useContext(PulseContext);
	return (
		<PulseContext.Provider
			value={{
				theme: theme ?? config.theme,
				mode: mode ?? config.mode,
			}}
		>
			<span
				data-pulse-brand={theme ?? config.mode}
				data-pulse-mode={mode ?? config.mode}
			>
				{children}
			</span>
		</PulseContext.Provider>
	);
};
