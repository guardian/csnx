import { css } from '@emotion/react';
import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import {
	body,
	neutral,
	space,
	text,
	textSans,
} from '@guardian/source-foundations';
import { Button, Radio, RadioGroup } from '@guardian/source-react-components';
import type { KeyboardEvent, MouseEvent } from 'react';
import { memo, useEffect, useState } from 'react';
import { radioButtonWrapperStyles } from './Answers';
import { SharingIcons } from './SharingIcons';
import type { SharingUrlsType } from './types';

type ResultsBucket = {
	id: string;
	title: string;
	description: string;
};

type AnswerType = {
	id: string;
	text: string;
	revealText?: string;
	isCorrect: boolean;
	answerBuckets: string[];
};

type QuestionType = {
	id: string;
	text: string;
	answers: AnswerType[];
	imageUrl?: string;
	imageAlt?: string;
};

type QuizAtomType = {
	id: string;
	questions: QuestionType[];
	resultBuckets: ResultsBucket[];
	sharingUrls: SharingUrlsType;
	theme: ArticleTheme;
};

const answersWrapperStyle = (theme: ArticleTheme) => css`
	margin-bottom: 12px;
	border: 0px;
	padding: 0px;
	${theme === ArticleSpecial.Labs ? textSans.medium() : body.medium()};
`;

export const findMostReferredToBucketId = ({
	selectedGlobalAnswers,
	questions,
}: {
	selectedGlobalAnswers: Record<string, string>;
	questions: QuestionType[];
}): string => {
	const bucketCounter: Record<string, number> = {};

	const answersFromQuestion: AnswerType[] = Object.keys(selectedGlobalAnswers)
		.map((questionId: string): AnswerType | undefined => {
			const selectedQuestion = questions.find(
				(question) => question.id === questionId,
			);
			const answerId = selectedGlobalAnswers[questionId];
			const selectedAnswer = selectedQuestion?.answers.find(
				(answer) => answer.id === answerId,
			);
			return selectedAnswer;
		})
		.filter(
			(selectedAnswer): boolean => selectedAnswer !== undefined,
		) as AnswerType[];

	answersFromQuestion.forEach((answerFromQuestion) => {
		answerFromQuestion.answerBuckets.forEach((answerBucket) => {
			if (answerBucket in bucketCounter) {
				bucketCounter[answerBucket] += 1;
			} else {
				bucketCounter[answerBucket] = 1;
			}
		});
	});

	let bucketIdWithHighestCount: string | undefined;
	Object.keys(bucketCounter).forEach((bucketId) => {
		if (!bucketIdWithHighestCount) {
			bucketIdWithHighestCount = bucketId;
			return;
		}
		const thisBucket = bucketCounter[bucketId];
		const currentHighestBucket = bucketCounter[bucketIdWithHighestCount];

		if (thisBucket && currentHighestBucket) {
			bucketIdWithHighestCount =
				thisBucket > currentHighestBucket ? bucketId : bucketIdWithHighestCount;
		}
	});

	return bucketIdWithHighestCount as string;
};

export const PersonalityQuizAtom = ({
	id,
	questions,
	resultBuckets,
	sharingUrls,
	theme,
}: QuizAtomType): JSX.Element => {
	const [selectedGlobalAnswers, setSelectedGlobalAnswers] = useState<
		Record<string, string>
	>({});

	const [hasSubmittedAnswers, setHasSubmittedAnswers] =
		useState<boolean>(false);
	const [hasMissingAnswers, setHasMissingAnswers] = useState<boolean>(false);

	const [topSelectedResult, setTopSelectedResult] =
		useState<ResultsBucket | null>();

	const onSubmit = (e: MouseEvent | KeyboardEvent) => {
		e.preventDefault();
		// check all answers have been selected
		const missingAnswers = questions.some((question) =>
			question.id in selectedGlobalAnswers ? false : true,
		);

		if (missingAnswers) {
			setHasMissingAnswers(true);
		} else {
			setHasSubmittedAnswers(true);
		}
	};

	useEffect(() => {
		if (hasSubmittedAnswers && Object.keys(selectedGlobalAnswers).length) {
			const bucketIdWithHighestCount = findMostReferredToBucketId({
				selectedGlobalAnswers,
				questions,
			});
			setTopSelectedResult(
				resultBuckets.find(
					(resultBucket) => resultBucket.id === bucketIdWithHighestCount,
				),
			);
		} else {
			setTopSelectedResult(null);
		}
	}, [
		hasSubmittedAnswers,
		selectedGlobalAnswers,
		setTopSelectedResult,
		resultBuckets,
	]);

	return (
		<form data-atom-id={id} data-atom-type="personalityquiz">
			{hasSubmittedAnswers && topSelectedResult && (
				<div data-testid="quiz-results-block-top">
					<Result resultBuckets={topSelectedResult} sharingUrls={sharingUrls} />
				</div>
			)}
			<ol>
				{questions.map((question, idx) => (
					<PersonalityQuizAnswers
						key={question.id}
						id={question.id}
						questionNumber={idx + 1}
						text={question.text}
						imageUrl={question.imageUrl}
						imageAlt={question.imageAlt}
						answers={question.answers}
						updateSelectedAnswer={(selectedAnswerId: string) => {
							setHasMissingAnswers(false);
							setSelectedGlobalAnswers({
								...selectedGlobalAnswers,
								[question.id]: selectedAnswerId,
							});
						}}
						globallySelectedAnswer={
							question.id in selectedGlobalAnswers
								? selectedGlobalAnswers[question.id]
								: undefined
						}
						hasSubmittedAnswers={hasSubmittedAnswers}
						theme={theme}
					/>
				))}
			</ol>
			{hasMissingAnswers && <MissingAnswers />}
			{hasSubmittedAnswers && topSelectedResult && (
				<div data-testid="quiz-results-block-bottom">
					<Result resultBuckets={topSelectedResult} sharingUrls={sharingUrls} />
				</div>
			)}
			<div
				css={css`
					display: flex;
					flex-direction: row;
					button {
						margin-right: 10px;
					}
				`}
			>
				<Button
					type="submit"
					onClick={onSubmit}
					onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
						const spaceKey = 32;
						const enterKey = 13;
						if (e.keyCode === spaceKey ?? e.keyCode === enterKey) {
							onSubmit(e);
						}
					}}
					data-testid="submit-quiz"
				>
					Submit
				</Button>
				<Button
					priority="secondary"
					onClick={() => {
						setSelectedGlobalAnswers({});
						setHasSubmittedAnswers(false);
						setTopSelectedResult(null);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
						const spaceKey = 32;
						const enterKey = 13;
						if (e.keyCode === spaceKey ?? e.keyCode === enterKey) {
							setSelectedGlobalAnswers({});
							setHasSubmittedAnswers(false);
							setTopSelectedResult(null);
						}
					}}
					data-testid="reset-quiz"
				>
					Reset
				</Button>
			</div>
		</form>
	);
};

type PersonalityQuizAnswersProps = {
	id: string;
	questionNumber: number;
	text: string;
	imageUrl?: string;
	imageAlt?: string;
	answers: AnswerType[];
	updateSelectedAnswer: (selectedAnswerId: string) => void;
	globallySelectedAnswer?: string;
	hasSubmittedAnswers: boolean;
	theme: ArticleTheme;
};

const PersonalityQuizAnswers = ({
	id: questionId,
	questionNumber,
	text,
	imageUrl,
	imageAlt,
	answers,
	updateSelectedAnswer,
	globallySelectedAnswer,
	hasSubmittedAnswers,
	theme,
}: PersonalityQuizAnswersProps) => {
	// use local state to avoid re-renders of AnswersGroup from updates due to: updateSelectedAnswer & selectedAnswer
	const [selectedAnswer, setSelectedAnswers] = useState<string | undefined>();

	useEffect(() => {
		if (selectedAnswer && selectedAnswer !== globallySelectedAnswer) {
			updateSelectedAnswer(selectedAnswer);
		}
	}, [updateSelectedAnswer, selectedAnswer]);

	// in order to reset selection
	useEffect(() => {
		if (!globallySelectedAnswer) setSelectedAnswers(undefined);
	}, [globallySelectedAnswer, setSelectedAnswers]);

	return (
		<li css={answersWrapperStyle(theme)}>
			<fieldset>
				<legend
					css={css`
						margin-bottom: 12px;
					`}
				>
					<span
						css={css`
							padding-right: 12px;
						`}
					>
						{`${questionNumber}.`}
					</span>
					{text}
				</legend>
				{imageUrl && (
					<img
						css={css`
							width: 100%;
						`}
						src={imageUrl}
						alt={imageAlt ?? ''}
					/>
				)}
				<AnswersGroup
					hasSubmittedAnswers={hasSubmittedAnswers}
					questionId={questionId}
					answers={answers}
					selectedAnswer={selectedAnswer}
					setSelectedAnswers={setSelectedAnswers}
					theme={theme}
				/>
			</fieldset>
		</li>
	);
};

type AnswersGroupProp = {
	hasSubmittedAnswers: boolean;
	questionId: string;
	answers: AnswerType[];
	selectedAnswer: string | undefined;
	setSelectedAnswers: (selectedAnswerId: string) => void;
	theme: ArticleTheme;
};

const AnswersGroup = memo(
	({
		hasSubmittedAnswers,
		questionId,
		answers,
		selectedAnswer,
		setSelectedAnswers,
		theme,
	}: AnswersGroupProp) => (
		<div
			css={[
				radioButtonWrapperStyles(theme),
				css`
					label {
						:hover {
							background-color: ${hasSubmittedAnswers
								? neutral[97]
								: neutral[86]};
						}
						/* TODO: apply same styles on focus (requires source update) */
					}
				`,
			]}
		>
			<RadioGroup name={questionId}>
				{answers.map((answer) => (
					<Radio
						key={answer.id}
						value={answer.text}
						label={answer.text}
						data-testid={answer.id}
						data-answer-type={
							selectedAnswer === answer.id
								? 'selected-enabled-answer'
								: 'unselected-enabled-answer'
						}
						disabled={hasSubmittedAnswers}
						onChange={() => setSelectedAnswers(answer.id)}
						checked={selectedAnswer === answer.id}
					/>
				))}
			</RadioGroup>
		</div>
	),
);
AnswersGroup.displayName = 'AnswersGroup';

const missingAnswersStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
	padding-bottom: ${space[3]}px;
	color: ${text.error};
`;

export const MissingAnswers = (): JSX.Element => (
	<div css={missingAnswersStyles}>You have not answered all the questions.</div>
);

const resultWrapperStyles = css`
	background-color: ${neutral[93]};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;
`;

const resultHeaderStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
	color: ${neutral[20]};
	padding-bottom: ${space[1]}px;
`;

const resultDescriptionStyles = css`
	${textSans.medium()}
	color: ${neutral[46]};
`;

export const Result = ({
	resultBuckets,
	sharingUrls,
}: {
	resultBuckets: ResultsBucket;
	sharingUrls: SharingUrlsType;
}): JSX.Element => (
	<div css={resultWrapperStyles}>
		<div css={resultHeaderStyles}>{resultBuckets.title}</div>
		<div css={resultDescriptionStyles}>{resultBuckets.description}</div>
		<hr />
		<div css={resultHeaderStyles}>Challenge your friends</div>
		<SharingIcons
			sharingUrls={sharingUrls}
			displayIcons={[
				'facebook',
				'twitter',
				'email',
				'whatsApp',
				'messenger',
				'linkedIn',
				'pinterest',
			]}
		/>
	</div>
);
