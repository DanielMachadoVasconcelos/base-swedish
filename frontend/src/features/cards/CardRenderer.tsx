"use client";

import { useMemo, useState } from "react";
import { Headphones, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { CardFrame } from "./CardFrame";
import { ChoiceButton } from "./ChoiceButton";
import { SpeakButton } from "./SpeakButton";
import {
  CardResult,
  Choice,
  LearnCardData,
  LearningCard,
  ListeningCardData,
  MiniDialogueCardData,
  MultipleChoiceCardData,
  OrderWordsCardData,
  ReviewCardData,
  SituationCardData
} from "@/features/feed/types";
import { cn } from "@/lib/cn";

export function CardRenderer({
  card,
  answered,
  onComplete
}: {
  card: LearningCard;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  switch (card.type) {
    case "learn":
      return <LearnCard card={card} answered={answered} onComplete={onComplete} />;
    case "multiple-choice":
      return <MultipleChoiceCard card={card} answered={answered} onComplete={onComplete} />;
    case "situation":
      return <SituationCard card={card} answered={answered} onComplete={onComplete} />;
    case "order-words":
      return <OrderWordsCard card={card} answered={answered} onComplete={onComplete} />;
    case "listening":
      return <ListeningCard card={card} answered={answered} onComplete={onComplete} />;
    case "mini-dialogue":
      return <MiniDialogueCard card={card} answered={answered} onComplete={onComplete} />;
    case "review":
      return <ReviewCard card={card} answered={answered} onComplete={onComplete} />;
  }
}

function LearnCard({
  card,
  answered,
  onComplete
}: {
  card: LearnCardData;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  return (
    <CardFrame context={card.context} accent={card.accent} microcopy={card.microcopy}>
      <div className="space-y-8">
        <div>
          <PhraseWithAudio
            text={card.swedish}
            className="text-5xl font-black leading-none tracking-[-0.06em] text-ink md:text-6xl"
          />
          <p className="mt-4 text-2xl font-semibold text-ink/58">{card.portuguese}</p>
        </div>
        {card.note ? (
          <p className="max-w-sm text-base leading-relaxed text-ink/62">{card.note}</p>
        ) : null}
        <button
          type="button"
          disabled={answered}
          onClick={() =>
            onComplete({
              cardId: card.id,
              cardType: card.type,
              correct: true,
              message: "Nice.",
              detail: "One Swedish moment is already enough to start."
            })
          }
          className="w-full rounded-3xl bg-spruce px-5 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-spruce/92 focus:outline-none focus:ring-4 focus:ring-sage/30 disabled:cursor-default disabled:opacity-70"
        >
          {card.primaryAction ?? "Continue"}
        </button>
      </div>
    </CardFrame>
  );
}

function MultipleChoiceCard({
  card,
  answered,
  onComplete
}: {
  card: MultipleChoiceCardData;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  return (
    <ChoiceCardShell
      card={card}
      answered={answered}
      onComplete={onComplete}
      question={
        <>
          <p className="text-lg font-semibold text-ink/62">{card.prompt}</p>
          <PhraseWithAudio
            text={card.quote}
            className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] text-ink"
          />
        </>
      }
    />
  );
}

function SituationCard({
  card,
  answered,
  onComplete
}: {
  card: SituationCardData;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  return (
    <ChoiceCardShell
      card={card}
      answered={answered}
      onComplete={onComplete}
      question={
        <>
          <p className="text-base leading-relaxed text-ink/60">{card.setup}</p>
          <PhraseWithAudio
            text={card.quote}
            className="mt-4 text-3xl font-black leading-tight tracking-[-0.05em] text-ink"
          />
          <p className="mt-5 text-lg font-semibold text-ink/64">{card.prompt}</p>
        </>
      }
    />
  );
}

function ListeningCard({
  card,
  answered,
  onComplete
}: {
  card: ListeningCardData;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  return (
    <CardFrame context={card.context} accent={card.accent} microcopy={card.microcopy}>
      <div className="space-y-7">
        <div>
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-spruce text-white shadow-soft">
            <Headphones size={24} strokeWidth={2.4} />
          </div>
          <p className="text-xl font-bold leading-snug text-ink">{card.prompt}</p>
        </div>
        <div className="flex w-full items-center justify-between gap-4 rounded-3xl bg-ink px-5 py-4 text-left text-base font-bold text-white shadow-soft">
          <span>Play phrase</span>
          <SpeakButton
            text={card.transcript}
            label="Play listening phrase in Swedish"
            className="h-11 w-11 bg-white text-ink shadow-none hover:bg-white"
          />
        </div>
        <ChoiceList
          choices={card.choices}
          correctChoiceId={card.correctChoiceId}
          answered={answered}
          onChoose={(choiceId) =>
            completeChoice(card, choiceId, card.correctChoiceId, onComplete)
          }
        />
        {answered ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-3xl bg-cloud/80 p-5 ring-1 ring-sage/15"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-ink/40">
              What you heard
            </p>
            <PhraseWithAudio
              text={card.transcript}
              className="mt-3 text-2xl font-black leading-snug tracking-[-0.04em] text-ink"
              buttonClassName="h-10 w-10"
            />
            <div className="mt-4 border-t border-mist/80 pt-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-ink/36">
                Portuguese
              </p>
              <p className="mt-1 text-lg font-semibold leading-snug text-ink/60">
                {card.portuguese}
              </p>
            </div>
          </motion.div>
        ) : null}
      </div>
    </CardFrame>
  );
}

function MiniDialogueCard({
  card,
  answered,
  onComplete
}: {
  card: MiniDialogueCardData;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  return (
    <CardFrame context={card.context} accent={card.accent} microcopy={card.microcopy}>
      <div className="space-y-6">
        <div className="space-y-3">
          {card.lines.map((line) => (
            <div key={`${line.speaker}-${line.swedish}`} className="rounded-3xl bg-cloud/70 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/40">
                {line.speaker}
              </p>
              <PhraseWithAudio
                text={line.swedish}
                className="mt-1 text-2xl font-black tracking-[-0.04em] text-ink"
                buttonClassName="h-10 w-10"
              />
              {line.portuguese ? (
                <p className="mt-1 text-sm font-semibold text-ink/48">{line.portuguese}</p>
              ) : null}
            </div>
          ))}
        </div>
        <p className="text-lg font-bold text-ink/70">{card.prompt}</p>
        <ChoiceList
          choices={card.choices}
          correctChoiceId={card.correctChoiceId}
          answered={answered}
          onChoose={(choiceId) =>
            completeChoice(card, choiceId, card.correctChoiceId, onComplete)
          }
        />
      </div>
    </CardFrame>
  );
}

function ReviewCard({
  card,
  answered,
  onComplete
}: {
  card: ReviewCardData;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  return (
    <ChoiceCardShell
      card={card}
      answered={answered}
      onComplete={onComplete}
      question={
        <>
          <p className="text-base font-semibold text-ink/54">{card.prompt}</p>
          <PhraseWithAudio
            text={card.quote}
            className="mt-4 text-5xl font-black leading-none tracking-[-0.06em] text-ink"
          />
        </>
      }
    />
  );
}

function OrderWordsCard({
  card,
  answered,
  onComplete
}: {
  card: OrderWordsCardData;
  answered: boolean;
  onComplete: (result: CardResult) => void;
}) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [completedCorrect, setCompletedCorrect] = useState<boolean>();
  const selectedWords = selectedIndexes.map((index) => card.words[index]);
  const selectedSentence = selectedWords.join(" ");
  const answerSentence = card.answer.join(" ");
  const isComplete = selectedWords.length === card.answer.length;
  const showCorrection = answered && completedCorrect === false;

  function chooseWord(index: number) {
    if (answered || selectedIndexes.includes(index)) {
      return;
    }

    const nextIndexes = [...selectedIndexes, index];
    const nextWords = nextIndexes.map((wordIndex) => card.words[wordIndex]);
    setSelectedIndexes(nextIndexes);

    if (nextWords.length === card.answer.length) {
      const correct = nextWords.join(" ") === answerSentence;
      setCompletedCorrect(correct);
      onComplete({
        cardId: card.id,
        cardType: card.type,
        correct,
        message: correct ? card.correctFeedback : card.incorrectFeedback,
        detail: correct
          ? card.translation
          : `${card.answer.join(" ")} — ${card.translation}`
      });
    }
  }

  return (
    <CardFrame context={card.context} accent={card.accent} microcopy={card.microcopy}>
      <div className="space-y-7">
        <p className="text-xl font-bold leading-snug text-ink">{card.prompt}</p>
        <div
          className={cn(
            "min-h-24 rounded-3xl bg-cloud/80 p-4 ring-1 ring-transparent transition",
            answered && completedCorrect === true && "bg-sage/10 ring-sage/22",
            showCorrection && "bg-butter/18 ring-butter/40"
          )}
        >
          {selectedWords.length > 0 ? (
            <>
              {showCorrection ? (
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-ink/38">
                  Your try
                </p>
              ) : null}
              <PhraseWithAudio
                text={selectedSentence}
                className={cn(
                  "text-2xl font-black leading-snug tracking-[-0.04em] text-ink",
                  showCorrection && "text-ink/58"
                )}
                buttonClassName="h-10 w-10"
              />
            </>
          ) : (
            <p className="text-base font-semibold text-ink/38">Tap words below.</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {card.words.map((word, index) => {
            const selected = selectedIndexes.includes(index);
            return (
              <motion.button
                key={`${word}-${index}`}
                type="button"
                whileTap={{ scale: 0.96 }}
                disabled={answered || selected}
                onClick={() => chooseWord(index)}
                className={cn(
                  "rounded-2xl border border-mist bg-white px-4 py-3 text-base font-bold text-ink shadow-sm transition",
                  "focus:outline-none focus:ring-4 focus:ring-sage/25",
                  selected && "border-sage/30 bg-sage/12 text-ink/35",
                  answered && !selected && "opacity-45"
                )}
              >
                {word}
              </motion.button>
            );
          })}
        </div>
        {!answered && selectedWords.length > 0 && !isComplete ? (
          <button
            type="button"
            onClick={() => setSelectedIndexes([])}
            className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-bold text-ink/45 transition hover:text-ink"
          >
            <RotateCcw size={15} />
            Clear
          </button>
        ) : null}
        {showCorrection ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="rounded-3xl bg-sage/12 p-5 ring-1 ring-sage/24"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-spruce/55">
              Correct Swedish
            </p>
            <PhraseWithAudio
              text={answerSentence}
              className="mt-3 text-2xl font-black leading-snug tracking-[-0.04em] text-spruce"
              buttonClassName="h-10 w-10"
            />
            <div className="mt-4 border-t border-sage/18 pt-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-ink/36">
                Meaning
              </p>
              <p className="mt-1 text-lg font-semibold leading-snug text-ink/60">
                {card.translation}
              </p>
            </div>
          </motion.div>
        ) : null}
      </div>
    </CardFrame>
  );
}

function ChoiceCardShell({
  card,
  answered,
  question,
  onComplete
}: {
  card:
    | MultipleChoiceCardData
    | SituationCardData
    | ReviewCardData;
  answered: boolean;
  question: React.ReactNode;
  onComplete: (result: CardResult) => void;
}) {
  return (
    <CardFrame context={card.context} accent={card.accent} microcopy={card.microcopy}>
      <div className="space-y-7">
        <div>{question}</div>
        <ChoiceList
          choices={card.choices}
          correctChoiceId={card.correctChoiceId}
          answered={answered}
          onChoose={(choiceId) =>
            completeChoice(card, choiceId, card.correctChoiceId, onComplete)
          }
        />
      </div>
    </CardFrame>
  );
}

function ChoiceList({
  choices,
  correctChoiceId,
  answered,
  onChoose
}: {
  choices: Choice[];
  correctChoiceId: string;
  answered: boolean;
  onChoose: (choiceId: string) => void;
}) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string>();

  const selectedCorrectness = useMemo(() => {
    if (!selectedChoiceId) {
      return undefined;
    }

    return selectedChoiceId === correctChoiceId;
  }, [correctChoiceId, selectedChoiceId]);

  function choose(choiceId: string) {
    if (answered) {
      return;
    }

    setSelectedChoiceId(choiceId);
    onChoose(choiceId);
  }

  return (
    <div className="space-y-3">
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.id}
          label={choice.label}
          statusLabel={
            answered && choice.id === correctChoiceId
              ? "Correct"
              : answered && selectedChoiceId === choice.id
                ? "Your answer"
                : undefined
          }
          selected={selectedChoiceId === choice.id}
          correct={
            choice.id === correctChoiceId
              ? true
              : selectedChoiceId === choice.id
                ? selectedCorrectness
                : false
          }
          answered={answered}
          onClick={() => choose(choice.id)}
        />
      ))}
    </div>
  );
}

function PhraseWithAudio({
  text,
  className,
  buttonClassName
}: {
  text: string;
  className: string;
  buttonClassName?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className={cn("min-w-0 flex-1", className)}>{text}</p>
      <SpeakButton text={text} className={buttonClassName} />
    </div>
  );
}

function completeChoice(
  card:
    | MultipleChoiceCardData
    | SituationCardData
    | ListeningCardData
    | MiniDialogueCardData
    | ReviewCardData,
  choiceId: string,
  correctChoiceId: string,
  onComplete: (result: CardResult) => void
) {
  const correct = choiceId === correctChoiceId;

  onComplete({
    cardId: card.id,
    cardType: card.type,
    correct,
    message: correct ? card.correctFeedback : card.incorrectFeedback,
    detail: correct ? "Swedish is getting closer." : "The feed will gently bring this back."
  });
}
