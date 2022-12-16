import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import { neutral, text } from '@guardian/source-foundations';
import { Summary } from './Summary';

const containerStyling = css`
	display: block;
	position: relative;
`;

const detailStyling = css`
	margin: 16px 0 36px;
	background: ${neutral[93]};
	color: ${text.primary};
	padding: 0 5px 6px;
	border-image: repeating-linear-gradient(
			to bottom,
			${neutral[86]},
			${neutral[86]} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid black;
	position: relative;
	summary {
		list-style: none;
		margin: 0 0 16px;
	}

	/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Customizing_the_disclosure_widget */
	summary::-webkit-details-marker {
		display: none;
	}

	summary:focus {
		outline: none;
	}
`;

export const Container = ({
	id,
	title,
	children,
	pillar,
	expandForStorybook,
	atomType,
	atomTypeTitle,
	expandCallback,
}: {
	id: string;
	title: string;
	pillar: ArticleTheme;
	expandForStorybook?: boolean;
	atomType: string;
	atomTypeTitle: string;
	children: React.ReactNode;
	expandCallback: () => void;
}): JSX.Element => (
	<div css={containerStyling} data-atom-id={id} data-atom-type={atomType}>
		<details
			css={detailStyling}
			data-atom-id={id}
			data-snippet-type={atomType}
			open={expandForStorybook}
		>
			<Summary
				sectionTitle={atomTypeTitle}
				pillar={pillar}
				title={title}
				expandCallback={expandCallback}
			/>
			{children}
		</details>
	</div>
);
