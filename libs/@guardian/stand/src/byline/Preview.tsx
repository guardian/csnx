import type { Node } from 'prosemirror-model';
import {
	previewContributorStyles,
	previewFreeTextStyles,
	previewStyles,
} from './styles';

export const Preview = ({ doc }: { doc: Node | null }) => {
	if (doc?.childCount === undefined || doc.childCount === 0) {
		return null;
	}

	const parts: Node[] = [];

	doc.descendants((node) => {
		parts.push(node);
	});

	return (
		<div css={previewStyles}>
			{parts.map((node, i) => {
				if (node.isText) {
					return (
						<span key={`${node.text}${i}`} css={previewFreeTextStyles}>
							{node.text}
						</span>
					);
				} else if (node.type.name === 'chip') {
					if (node.attrs.tagId) {
						return (
							<a
								key={`${node.text}${i}`}
								css={previewContributorStyles(node)}
								href={`https://theguardian.com/${node.attrs.tagId}`}
								target="_blank"
							>
								{node.attrs.label as string}
							</a>
						);
					} else {
						return (
							<span
								key={`${node.text}${i}`}
								css={previewContributorStyles(node)}
							>
								{node.attrs.label as string}
							</span>
						);
					}
				}
				return null;
			})}
		</div>
	);
};
