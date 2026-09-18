import { Global } from '@emotion/react';
import styles from '@guardian/pulse/pulse.css?inline';
import { type ReactNode } from 'react';

export const PulseProvider = ({ children }: { children: ReactNode }) => (
	<>
		<Global styles={styles} />
		{children}
	</>
);
