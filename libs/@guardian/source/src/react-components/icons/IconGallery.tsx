import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import { palette, space } from '../../foundations';

export const IconGallery = ({ children }: { children: ReactNode }) => {
	const styles = css`
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30ch, 1fr));
		gap: ${space[4]}px;
	`;

	return <div css={styles}>{children}</div>;
};

export const IconItem = ({
	name,
	children,
}: {
	name: string;
	children: ReactNode;
}) => {
	const container = css`
		display: flex;
		align-items: center;

		code {
			font-size: 0.875rem;
			word-break: break-word;
		}
	`;

	const icon = css`
		display: flex;
		padding: ${space[2]}px;
		margin-right: ${space[2]}px;
		border: 1px solid ${palette.neutral[86]};
		border-radius: 4px;
	`;

	return (
		<div css={container}>
			<div css={icon}>{children}</div>
			<code>{name}</code>
		</div>
	);
};
