import { type ReactNode } from 'react';
// import { Global } from '@emotion/react';

export const PulseProvider = ({ children }: { children: ReactNode }) => (
	<div data-brand="core" data-mode="light">
		{children}
	</div>
);
