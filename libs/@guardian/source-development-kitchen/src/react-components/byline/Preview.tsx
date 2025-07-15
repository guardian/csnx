import type { Node } from 'prosemirror-model';
import { previewContributorStyles, previewFreeTextStyles } from './styles';

export const Preview = ({ doc }: { doc: Node | null }) => {
	if (doc === null) {
		return null;
	}

	const parts: Node[] = [];

	doc.descendants((node) => {
		parts.push(node);
	});

	return (
		<>
			{parts.map((node, i) => {
				if (node.isText) {
					return (
						<span key={`${node.text}${i}`} css={previewFreeTextStyles}>
							{node.text}
						</span>
					);
				} else if (node.type.name === 'chip') {
					return (
						<span key={`${node.text}${i}`} css={previewContributorStyles(node)}>
							{node.attrs.label as string}
						</span>
					);
				}
				return null;
			})}
		</>
	);
};
