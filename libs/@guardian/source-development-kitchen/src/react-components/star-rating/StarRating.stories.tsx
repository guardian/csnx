import type { Meta, StoryFn } from '@storybook/react';
import type { StarRatingProps } from './StarRating';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
	title: 'React Components/Star Rating',
	component: StarRating,
	args: {
		size: 'medium',
		rating: 3,
	},
};

export default meta;

const Template: StoryFn<typeof StarRating> = (args: StarRatingProps) => (
	<StarRating {...args} />
);

export const NoStar: StoryFn<typeof StarRating> = Template.bind({});
NoStar.args = {
	rating: 0,
};

// *****************************************************************************

export const OneStar: StoryFn<typeof StarRating> = Template.bind({});
OneStar.args = {
	rating: 1,
};

// *****************************************************************************

export const TwoStars: StoryFn<typeof StarRating> = Template.bind({});
TwoStars.args = {
	rating: 2,
};

// *****************************************************************************

export const ThreeStars: StoryFn<typeof StarRating> = Template.bind({});
ThreeStars.args = {
	rating: 3,
};

// *****************************************************************************

export const FourStars: StoryFn<typeof StarRating> = Template.bind({});
FourStars.args = {
	rating: 4,
};

// *****************************************************************************

export const FiveStars: StoryFn<typeof StarRating> = Template.bind({});
FiveStars.args = {
	rating: 5,
};

// *****************************************************************************

export const SmallStars: StoryFn<typeof StarRating> = Template.bind({});
SmallStars.args = {
	size: 'small',
};

// *****************************************************************************

export const MediumStars: StoryFn<typeof StarRating> = Template.bind({});
MediumStars.args = {
	size: 'medium',
};

// *****************************************************************************

export const LargeStars: StoryFn<typeof StarRating> = Template.bind({});
LargeStars.args = {
	size: 'large',
};
