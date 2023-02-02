import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import {
	body,
	brandAlt,
	neutral,
	remSpace,
	space,
} from '@guardian/source-foundations';
import { Body } from './expandableAtom/Body';
import { Container } from './expandableAtom/Container';
import { Footer } from './expandableAtom/Footer';
import { submitComponentEvent } from './lib/ophan';
import type { TimelineAtomType, TimelineEvent } from './types';

const Snippet = css`
	:not(:last-child) {
		border-left: 0.0625rem solid ${neutral[60]};
		padding-bottom: ${remSpace[4]};
	}
	padding-left: ${space[4]}px;
	margin-left: ${space[2]}px;
`;

const EventTitle = css`
	${body.medium({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})};
`;

const EventDateBullet = css`
	content: '';
	width: ${space[4]}px;
	height: ${space[4]}px;
	border-radius: 100%;
	float: left;
	position: relative;
	left: -24px;
	background-color: #121212;
`;

const EventDate = css`
	::before {
		${EventDateBullet}
	}
	margin-left: -16px;
	background: ${brandAlt[400]};
	${body.medium({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})};
`;

const EventToDate = css`
	background: ${brandAlt[400]};
	${body.medium({
		lineHeight: 'tight',
		fontWeight: 'bold',
	})};
`;

const TimelineContents = ({
	events,
	pillar,
}: {
	events: TimelineEvent[];
	pillar: ArticleTheme;
}): JSX.Element => {
	return (
		<div>
			{events.map((event, index) => {
				const time = new Date(event.unixDate).toISOString();
				const toTime = event.toUnixDate
					? new Date(event.toUnixDate).toISOString()
					: '';
				return (
					<div key={index} data-type="event-snippet" css={Snippet}>
						<div>
							<time dateTime={time} css={EventDate}>
								{event.date}
							</time>
							{event.toDate && (
								<span>
									{' '}
									-{' '}
									<time dateTime={toTime} css={EventToDate}>
										{event.toDate}
									</time>
								</span>
							)}
						</div>
						{event.title && <div css={EventTitle}>{event.title}</div>}
						{event.body && <Body html={event.body} pillar={pillar} />}
					</div>
				);
			})}
		</div>
	);
};

export const TimelineAtom = ({
	id,
	events,
	description,
	title,
	pillar,
	expandForStorybook,
	likeHandler,
	dislikeHandler,
	expandCallback,
}: TimelineAtomType): JSX.Element => {
	return (
		<Container
			atomType="timeline"
			atomTypeTitle="Timeline"
			id={id}
			pillar={pillar}
			expandForStorybook={expandForStorybook}
			title={title}
			expandCallback={
				expandCallback ??
				(() =>
					submitComponentEvent({
						component: {
							componentType: 'TIMELINE_ATOM',
							id,
							products: [],
							labels: [],
						},
						action: 'EXPAND',
					}))
			}
		>
			{description && <Body html={description} pillar={pillar} />}
			{events && <TimelineContents events={events} pillar={pillar} />}
			<Footer
				pillar={pillar}
				dislikeHandler={
					dislikeHandler ??
					(() =>
						submitComponentEvent({
							component: {
								componentType: 'TIMELINE_ATOM',
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
								componentType: 'TIMELINE_ATOM',
								id,
								products: [],
								labels: [],
							},
							action: 'LIKE',
						}))
				}
			/>
		</Container>
	);
};
