import { headline, body, textSans } from '@guardian/source-foundations';

const headline1 = css`
	${headline.large({ fontStyle: 'italic' })};
`;

const body1 = css`
	${body.medium({ fontStyle: 'italic' })};
`;

const textSans1 = css`
	${textSans.xsmall({ fontStyle: 'italic', fontWeight: 'bold' })};
`;

const textSans2 = css`
	${textSans.medium()};
`;

const textSans3 = css`
	${textSans.xxlarge()};
`;

const textSans4 = css`
	${textSans.medium({ test: 'test' })};
`;

const textSans5 = css`
	${textSans.xxlarge({ fontWeight: 'foo' })};
`;

const textSans6 = css`
	${textSans.medium(options)};
`;
