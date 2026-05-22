"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Sparkle } from "lucide-react";
import { CardRenderer } from "@/features/cards/CardRenderer";
import { FeedbackPanel } from "@/features/cards/FeedbackPanel";
import { getFeedCards } from "./feed-service";
import { seedLearningCards } from "./seed-cards";
import { CardResult } from "./types";
import { useFeedStore } from "./useFeedStore";
import { cn } from "@/lib/cn";

export function FeedExperience() {
  const { data: cards = seedLearningCards } = useQuery({
    queryKey: ["feed-cards"],
    queryFn: getFeedCards,
    initialData: seedLearningCards
  });

  const {
    currentIndex,
    momentsCompleted,
    correctMoments,
    gentleStreak,
    lastResult,
    submitResult,
    advance
  } = useFeedStore();

  const currentCard = cards[currentIndex % cards.length];
  const answered = Boolean(lastResult);
  const progressWidth = Math.min(100, (momentsCompleted % 8) * 12.5);

  function completeCard(result: CardResult) {
    if (lastResult) {
      return;
    }

    submitResult(result);
  }

  function nextCard() {
    advance(cards.length);
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-[440px] flex-col justify-between gap-5 md:max-w-[480px]">
        <FeedTopBar
          momentsCompleted={momentsCompleted}
          correctMoments={correctMoments}
          gentleStreak={gentleStreak}
          progressWidth={progressWidth}
        />

        <section className="flex flex-1 items-center">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCard.id}-${currentIndex}`}
                initial={{ opacity: 0, y: 34, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -34, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  if (answered && info.offset.y < -70) {
                    nextCard();
                  }
                }}
                className="space-y-4"
              >
                <CardRenderer
                  card={currentCard}
                  answered={answered}
                  onComplete={completeCard}
                />
                <AnimatePresence>
                  {lastResult ? <FeedbackPanel result={lastResult} /> : null}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <FeedActionBar answered={answered} onNext={nextCard} />
      </div>
    </main>
  );
}

function FeedTopBar({
  momentsCompleted,
  correctMoments,
  gentleStreak,
  progressWidth
}: {
  momentsCompleted: number;
  correctMoments: number;
  gentleStreak: number;
  progressWidth: number;
}) {
  return (
    <header className="space-y-4 pt-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black tracking-[-0.02em] text-spruce">Base Swedish</p>
          <p className="text-xs font-semibold text-ink/42">Real Swedish, tiny moments.</p>
        </div>
        <div className="rounded-full bg-white/65 px-3 py-2 text-right shadow-sm ring-1 ring-white/70 backdrop-blur">
          <p className="text-xs font-black text-spruce">{gentleStreak} day rhythm</p>
          <p className="text-[11px] font-semibold text-ink/42">gentle, not strict</p>
        </div>
      </div>
      <div className="rounded-full bg-white/50 p-1 shadow-sm ring-1 ring-white/70">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-sage via-fjord to-butter transition-all duration-500"
          style={{ width: `${progressWidth || 8}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-bold text-ink/48">
        <span>{momentsCompleted} Swedish moments today</span>
        <span>{correctMoments} familiar</span>
      </div>
    </header>
  );
}

function FeedActionBar({
  answered,
  onNext
}: {
  answered: boolean;
  onNext: () => void;
}) {
  return (
    <footer className="pb-[max(0.35rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        disabled={!answered}
        onClick={onNext}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-[1.75rem] px-5 py-4 text-base font-black shadow-soft transition focus:outline-none focus:ring-4",
          answered
            ? "bg-ink text-white hover:-translate-y-0.5 hover:bg-ink/90 focus:ring-sage/25"
            : "bg-white/42 text-ink/32 ring-1 ring-white/70"
        )}
      >
        {answered ? (
          <>
            One more Swedish moment
            <ArrowUp size={19} />
          </>
        ) : (
          <>
            <Sparkle size={17} />
            Answer when ready
          </>
        )}
      </button>
    </footer>
  );
}
