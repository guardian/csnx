import type { Meta, StoryFn } from '@storybook/react';
import type { StarRatingProps } from './StarRatingV2';
import { StarRatingV2 } from './StarRatingV2';

const meta: Meta<typeof StarRatingV2> = {
	title: 'React Components/Star Rating V2',
	component: StarRatingV2,
	args: {
		size: 'medium',
		rating: 3,
		use: 'Default Card',
	},
};

export default meta;

const Template: StoryFn<typeof StarRatingV2> = (args: StarRatingProps) => (
	<StarRatingV2 {...args} />
);

export const NoStar: StoryFn<typeof StarRatingV2> = Template.bind({});
NoStar.args = {
	rating: 0,
};

export const OneStar: StoryFn<typeof StarRatingV2> = Template.bind({});
OneStar.args = {
	rating: 1,
};

export const TwoStars: StoryFn<typeof StarRatingV2> = Template.bind({});
TwoStars.args = {
	rating: 2,
};

export const ThreeStars: StoryFn<typeof StarRatingV2> = Template.bind({});
ThreeStars.args = {
	rating: 3,
};

export const FourStars: StoryFn<typeof StarRatingV2> = Template.bind({});
FourStars.args = {
	rating: 4,
};

export const FiveStars: StoryFn<typeof StarRatingV2> = Template.bind({});
FiveStars.args = {
	rating: 5,
};

export const SmallStars: StoryFn<typeof StarRatingV2> = Template.bind({});
SmallStars.args = {
	size: 'small',
};

export const MediumStars: StoryFn<typeof StarRatingV2> = Template.bind({});
MediumStars.args = {
	size: 'medium',
};

export const LargeStars: StoryFn<typeof StarRatingV2> = Template.bind({});
LargeStars.args = {
	size: 'large',
};

export const FeatureCardStars: StoryFn<typeof StarRatingV2> = Template.bind({});
FeatureCardStars.args = {
	use: 'Feature Card',
};

export const DefaultArticleStars: StoryFn<typeof StarRatingV2> = Template.bind(
	{},
);
DefaultArticleStars.args = {
	use: 'Default Article',
};

export const ImmersiveArticleStars: StoryFn<typeof StarRatingV2> =
	Template.bind({});
ImmersiveArticleStars.args = {
	use: 'Immersive Article',
};
