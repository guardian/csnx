import { Global } from '@emotion/react';
import styles from '@guardian/pulse/pulse.css?inline';
import { createContext, type ReactNode, useContext } from 'react';

type Brand = 'core' | 'news';
type Mode = 'light' | 'dark';

type PulseConfig = {
	stylesImported: boolean;
	brand: Brand;
	mode: Mode;
};

const PulseContext = createContext<PulseConfig>({
	stylesImported: false,
	brand: 'core',
	mode: 'light',
});

export const PulseProvider = ({
	brand,
	mode,
	children,
}: {
	brand?: Brand;
	mode?: Mode;
	children: ReactNode;
}) => {
	const config = useContext(PulseContext);
	return (
		<PulseContext.Provider
			value={{
				stylesImported: true,
				brand: brand ?? config.brand,
				mode: mode ?? config.mode,
			}}
		>
			{!config.stylesImported && <Global styles={styles} />}
			<span data-brand={brand ?? config.brand} data-mode={mode ?? config.mode}>
				{children}
			</span>
		</PulseContext.Provider>
	);
};
