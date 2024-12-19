import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';
import type { ReactNode } from 'react';

/** Hides children visually, while keeping them for screen readers etc */
export const VisuallyHidden = ({ children }: { children: ReactNode }) => {
	return <span css={css(visuallyHidden)}>{children}</span>;
};
