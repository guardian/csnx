import type { HTMLAttributes } from 'react';
import styles from './box.module.css';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export const Box = ({ children, ...props }: BoxProps) => (
	<div {...props} className={styles.box}>
		the following text is in a <code>em</code> <em>{children}</em>
	</div>
);
