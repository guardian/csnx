import { css } from '@emotion/react';

const styles = css`
	color: red;
`;

export interface Props {
	/**
	 * lorem ipsum dolor sit amet
	 */
	foo: string;
	bar?: number;
}

export const Test = ({ foo, bar = 0 }: Props) => (
	<div css={styles}>
		Test {foo} {bar}
	</div>
);
