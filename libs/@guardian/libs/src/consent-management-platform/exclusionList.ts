const sectionExclusionList = ['info', 'help'];

export const isExcludedFromCMP = (pageSection: string | undefined): boolean => {
	return sectionExclusionList.some((section) => section === pageSection);
};
