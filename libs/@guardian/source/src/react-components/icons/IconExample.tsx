import * as icons from './icons';

export const IconExample = ({ icon }: { icon: keyof typeof icons }) => {
	const Icon = icons[icon];
	return <Icon size="medium" />;
};
