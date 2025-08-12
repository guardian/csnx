import type { EditorState } from 'prosemirror-state';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const getPlaceholder = (text: string) => {
	const span = document.createElement('span');
	span.innerHTML = text;
	span.className = 'placeholder';

	return span;
};

export const createPlaceholderPlugin = (text: string) => {
	const shouldDisplayPlaceholder = (state: EditorState) =>
		text !== '' && state.doc.childCount < 1;

	return new Plugin({
		props: {
			decorations: (editorState) => {
				const { doc } = editorState;
				if (shouldDisplayPlaceholder(editorState)) {
					return DecorationSet.create(doc, [
						Decoration.widget(0, getPlaceholder(text)),
					]);
				}
				return DecorationSet.empty;
			},
		},
	});
};
