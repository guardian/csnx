import { Global } from '@emotion/react';
import styles from '@guardian/pulse/pulse.css?inline';
import { createContext, type ReactNode, useContext } from 'react';

type Theme =
	| 'core'
	| 'core-alt'
	| 'core-support'
	| 'culture'
	| 'lifestyle'
	| 'news'
	| 'opinion'
	| 'sport';

type Mode = 'light' | 'dark';

type PulseConfig = {
	stylesImported: boolean;
	theme: Theme;
	mode: Mode;
};

const PulseContext = createContext<PulseConfig>({
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
			<span data-brand={theme ?? config.theme} data-mode={mode ?? config.mode}>
				{children}
			</span>
		</PulseContext.Provider>
	);
};
