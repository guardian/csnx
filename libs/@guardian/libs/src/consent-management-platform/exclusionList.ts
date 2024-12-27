const sectionExclusionList = ['info', 'help'];

export const isExcludedFromCMP = (pageSection: string): boolean => {
	return sectionExclusionList.some((section) => section === pageSection);
};
