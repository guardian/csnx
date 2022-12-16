import {
	defaultStoryExpanded,
	imageStoryExpanded,
	lifestylePillarStoryExpanded,
	listStoryExpanded,
	orderedListStoryExpanded,
} from './fixtures/guideAtom';
import { GuideAtom } from './GuideAtom';

export default {
	title: 'GuideAtom',
	component: GuideAtom,
};

export const DefaultStoryExpanded = (): JSX.Element => {
	// Modelled after: https://www.theguardian.com/sport/2020/may/19/pinatubo-has-probably-trained-on-for-the-2000-guineas-says-charlie-appleby
	return <GuideAtom {...defaultStoryExpanded} />;
};

export const ListStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/business/2020/jan/27/global-markets-slide-on-back-of-coronavirus-concerns-in-china-stocks
	return <GuideAtom {...listStoryExpanded} />;
};

export const OrderedListStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/environment/2020/aug/01/plan-to-curb-englands-most-polluted-spot-divides-residents
	return <GuideAtom {...orderedListStoryExpanded} />;
};

export const ImageStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/politics/2019/jul/06/tory-member-questions-boris-johnsons-ability-to-represent-minorities
	return <GuideAtom {...imageStoryExpanded} />;
};

export const LifestylePillarStoryExpanded = (): JSX.Element => {
	//Modelled after: https://www.theguardian.com/money/2020/aug/07/energy-bills-to-be-cut-by-84-pounds-for-11m-uk-households-ofgem
	return <GuideAtom {...lifestylePillarStoryExpanded} />;
};
