// @ts-check

/** @param {string} tokenId */
export const getCommentId = (tokenId) => {
	const [, ...commentID] = tokenId.split('.');
	return commentID.join('.');
};
