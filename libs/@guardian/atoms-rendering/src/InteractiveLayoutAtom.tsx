import { css } from '@emotion/react';

const containerStyles = css`
	margin: 0;
	padding: 0;
`;

type InteractiveLayoutAtomType = {
	id: string;
	elementUrl?: string;
	elementHtml?: string;
	elementJs?: string;
	elementCss?: string;
};

export const InteractiveLayoutAtom = ({
	id,
	elementHtml,
	elementJs,
	elementCss,
}: InteractiveLayoutAtomType): JSX.Element => (
	<figure
		className="interactive interactive-atom"
		css={containerStyles}
		data-atom-id={id}
		data-atom-type="interactive-layout"
	>
		{elementCss && (
			<style
				data-testid="style"
				dangerouslySetInnerHTML={{ __html: elementCss }}
			/>
		)}
		{elementHtml && (
			<div
				className="interactive-wrapper"
				dangerouslySetInnerHTML={{ __html: elementHtml }}
			/>
		)}
		{elementJs && (
			<script
				data-testid="script"
				dangerouslySetInnerHTML={{ __html: elementJs }}
			/>
		)}
	</figure>
);
