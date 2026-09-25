import { Global } from '@emotion/react';
import { createContext, type ReactNode, useContext } from 'react';
import styles from '@guardian/pulse/pulse.css?inline';

export type Theme =
	| 'core'
	| 'core-alt'
	| 'core-support'
	| 'culture'
	| 'lifestyle'
	| 'news'
	| 'opinion'
	| 'sport';

export type Mode = 'light' | 'dark';

export type PulseConfig = {
	stylesImported: boolean;
	theme: Theme;
	mode: Mode;
};

export const PulseContext = createContext<PulseConfig>({
	stylesImported: false,
	theme: 'core',
	mode: 'light',
});

export const PulseProvider = ({
	theme,
	mode,
	children,
}: {
	theme?: Theme;
	mode?: Mode;
	children: ReactNode;
}) => {
	const config = useContext(PulseContext);
	return (
		<PulseContext.Provider
			value={{
				stylesImported: true,
				theme: theme ?? config.theme,
				mode: mode ?? config.mode,
			}}
		>
			{!config.stylesImported && <Global styles={styles} />}
			{children}
		</PulseContext.Provider>
	);
};
