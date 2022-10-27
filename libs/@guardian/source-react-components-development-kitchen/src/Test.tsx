import { css } from '@emotion/react';

const styles = css`
	color: red;
	font-family: GuardianTextEgyptian, Guardian Text Egyptian Web, Georgia, serif;
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
