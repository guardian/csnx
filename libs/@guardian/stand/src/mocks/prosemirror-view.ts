// prosemirror's functions for finding what point in a document a user clicked on
// throw excepetions in the test enviroment, so need to be mocked out.
// Unclear if the exception is due to userEvent using mocked pointer events
// without co-ordinates, or JSdom not supporting the DOM methods used under the hood.
const mockEditorViewMethods = {
	posAtCoords: () => {
		return null;
	},
	coordsAtPos: () => {
		return {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		};
	},
};
export { mockEditorViewMethods };
