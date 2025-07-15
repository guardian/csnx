import { Schema } from 'prosemirror-model';

export const bylineEditorSchema = new Schema({
	nodes: {
		doc: {
			content: 'inline*',
		},
		chip: {
			group: 'inline',
			inline: true,
			atom: false,
			selectable: true, // allows selection for deletion
			attrs: {
				label: { default: '' },
				type: { default: 'untagged' },
			},
			parseDOM: [
				{
					tag: 'chip[data-chip][data-type]',
					getAttrs(dom: HTMLElement) {
						return {
							label: dom.getAttribute('data-chip'),
							type: dom.getAttribute('data-type'),
						};
					},
				},
			],
			toDOM(node) {
				return [
					'chip',
					{
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- label exists as string on chip node
						'data-chip': node.attrs.label,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- type exists as string on chip node
						'data-type': node.attrs.type,
					},
					node.attrs.label,
				];
			},
		},
		text: {
			group: 'inline',
		},
	},
});
