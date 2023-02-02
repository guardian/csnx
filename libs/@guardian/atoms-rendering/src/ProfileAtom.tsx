import { Body } from './expandableAtom/Body';
import { Container } from './expandableAtom/Container';
import { Footer } from './expandableAtom/Footer';
import { submitComponentEvent } from './lib/ophan';
import type { ProfileAtomType } from './types';

export const ProfileAtom = ({
	id,
	title,
	image,
	html,
	credit,
	pillar,
	expandForStorybook,
	likeHandler,
	dislikeHandler,
	expandCallback,
}: ProfileAtomType): JSX.Element => {
	return (
		<Container
			id={id}
			title={title}
			pillar={pillar}
			atomType="profile"
			atomTypeTitle="Profile"
			expandForStorybook={expandForStorybook}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent({
						component: {
							componentType: 'PROFILE_ATOM',
							id,
							products: [],
							labels: [],
						},
						action: 'EXPAND',
					}))
			}
		>
			<Body html={html} image={image} credit={credit} pillar={pillar} />
			<Footer
				pillar={pillar}
				dislikeHandler={
					dislikeHandler ??
					(() =>
						submitComponentEvent({
							component: {
								componentType: 'PROFILE_ATOM',
								id,
								products: [],
								labels: [],
							},
							action: 'DISLIKE',
						}))
				}
				likeHandler={
					likeHandler ??
					(() =>
						submitComponentEvent({
							component: {
								componentType: 'PROFILE_ATOM',
								id,
								products: [],
								labels: [],
							},
							action: 'LIKE',
						}))
				}
			></Footer>
		</Container>
	);
};
