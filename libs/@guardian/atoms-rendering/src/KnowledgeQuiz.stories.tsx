import { Pillar, ArticleSpecial } from '@guardian/libs';
import {
	exampleKnowledgeQuestions,
	natureQuestions,
	natureResultGroups,
	resultGroups,
} from './fixtures/knowledgeQuizAtom';
import { sharingUrls } from './fixtures/sharingUrls';
import { KnowledgeQuizAtom } from './KnowledgeQuiz';

export default {
	title: 'KnowledgeQuizAtom',
	component: KnowledgeQuizAtom,
};

export const DefaultRendering = (): JSX.Element => (
	<KnowledgeQuizAtom
		id="2c6bf552-2827-4256-b3a0-f557d215c394"
		questions={exampleKnowledgeQuestions}
		resultGroups={resultGroups}
		sharingUrls={sharingUrls}
		theme={Pillar.News}
	/>
);

export const BatchedResults = (): JSX.Element => (
	<KnowledgeQuizAtom
		id="2c6bf552-2827-4256-b3a0-f557d215c394"
		questions={natureQuestions}
		resultGroups={natureResultGroups}
		sharingUrls={sharingUrls}
		theme={Pillar.News}
	/>
);

export const LabsTheme = (): JSX.Element => (
	<KnowledgeQuizAtom
		id="2c6bf552-2827-4256-b3a0-f557d215c394"
		questions={exampleKnowledgeQuestions}
		resultGroups={resultGroups}
		sharingUrls={sharingUrls}
		theme={ArticleSpecial.Labs}
	/>
);
