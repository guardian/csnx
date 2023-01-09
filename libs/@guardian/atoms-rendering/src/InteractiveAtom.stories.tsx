import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import {
	BlockElement,
	MainMedia,
} from './fixtures/InteractiveAtomBlockElement';
import { InteractiveAtom } from './InteractiveAtom';

export default {
	title: 'InteractiveAtom',
	component: InteractiveAtom,
};

export const DefaultStory = (): JSX.Element => {
	const { id, html, js, css: atomCss } = BlockElement;
	return (
		<div
			css={css`
				width: 500px;
				height: 500px;
			`}
		>
			<InteractiveAtom
				id={id}
				elementHtml={html}
				elementJs={js}
				elementCss={atomCss}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			/>
		</div>
	);
};
DefaultStory.parameters = {
	// This interactive uses animation which is causing false negatives for Chromatic
	chromatic: { disable: true },
};

export const ImmersiveMainMediaStory = (): JSX.Element => {
	const { id, html, js, css: atomCss } = MainMedia;
	return (
		<div
			css={css`
				width: 1000px;
				height: 800px;
			`}
		>
			<InteractiveAtom
				id={id}
				elementHtml={html}
				elementJs={js}
				elementCss={atomCss}
				isMainMedia={true}
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			/>
		</div>
	);
};
ImmersiveMainMediaStory.parameters = {
	// This interactive uses animation which is causing false negatives for Chromatic
	chromatic: { disable: true },
};
