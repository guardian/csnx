import { Body } from './expandableAtom/Body';
import { Container } from './expandableAtom/Container';
import { Footer } from './expandableAtom/Footer';
import { submitComponentEvent } from './lib/ophan';
import type { GuideAtomType } from './types';

export const GuideAtom = ({
	id,
	title,
	image,
	html,
	credit,
	design,
	pillar,
	expandForStorybook,
	likeHandler,
	dislikeHandler,
	expandCallback,
}: GuideAtomType): JSX.Element => {
	return (
		<Container
			id={id}
			title={title}
			design={design}
			pillar={pillar}
			atomType="guide"
			atomTypeTitle="Quick Guide"
			expandForStorybook={expandForStorybook}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent({
						component: {
							componentType: 'GUIDE_ATOM',
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
								componentType: 'GUIDE_ATOM',
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
								componentType: 'GUIDE_ATOM',
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
