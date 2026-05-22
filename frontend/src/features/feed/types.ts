export type LearningCardType =
  | "learn"
  | "multiple-choice"
  | "situation"
  | "order-words"
  | "listening"
  | "mini-dialogue"
  | "review";

export type CardAccent = "sage" | "fjord" | "butter" | "lingon" | "spruce";

export interface Choice {
  id: string;
  label: string;
}

interface BaseLearningCard {
  id: string;
  type: LearningCardType;
  context: string;
  accent: CardAccent;
  level: "survival" | "practical" | "functional";
  microcopy?: string;
}

export interface LearnCardData extends BaseLearningCard {
  type: "learn";
  swedish: string;
  portuguese: string;
  note?: string;
  primaryAction?: string;
}

export interface MultipleChoiceCardData extends BaseLearningCard {
  type: "multiple-choice";
  prompt: string;
  quote: string;
  choices: Choice[];
  correctChoiceId: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface SituationCardData extends BaseLearningCard {
  type: "situation";
  setup: string;
  quote: string;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface OrderWordsCardData extends BaseLearningCard {
  type: "order-words";
  prompt: string;
  words: string[];
  answer: string[];
  translation: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface ListeningCardData extends BaseLearningCard {
  type: "listening";
  prompt: string;
  transcript: string;
  portuguese: string;
  choices: Choice[];
  correctChoiceId: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface MiniDialogueCardData extends BaseLearningCard {
  type: "mini-dialogue";
  lines: Array<{
    speaker: string;
    swedish: string;
    portuguese?: string;
  }>;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface ReviewCardData extends BaseLearningCard {
  type: "review";
  prompt: string;
  quote: string;
  choices: Choice[];
  correctChoiceId: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export type LearningCard =
  | LearnCardData
  | MultipleChoiceCardData
  | SituationCardData
  | OrderWordsCardData
  | ListeningCardData
  | MiniDialogueCardData
  | ReviewCardData;

export interface CardResult {
  cardId: string;
  cardType: LearningCardType;
  correct: boolean;
  message: string;
  detail?: string;
}
