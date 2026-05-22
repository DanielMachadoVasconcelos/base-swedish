import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CardAccent } from "@/features/feed/types";

const accentStyles: Record<CardAccent, string> = {
  sage: "bg-sage/12 text-spruce ring-sage/20",
  fjord: "bg-fjord/12 text-spruce ring-fjord/20",
  butter: "bg-butter/22 text-spruce ring-butter/30",
  lingon: "bg-lingon/12 text-spruce ring-lingon/20",
  spruce: "bg-spruce/10 text-spruce ring-spruce/15"
};

export function CardFrame({
  context,
  accent,
  microcopy,
  children
}: {
  context: string;
  accent: CardAccent;
  microcopy?: string;
  children: ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-card bg-white/82 px-6 py-7 shadow-card ring-1 ring-white/70 backdrop-blur md:px-8 md:py-8">
      <div className="absolute inset-x-10 -top-24 h-40 rounded-full bg-sage/10 blur-3xl" />
      <div className="relative">
        <div className="mb-7 flex items-center justify-between gap-4">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1",
              accentStyles[accent]
            )}
          >
            {context}
          </span>
          {microcopy ? (
            <span className="max-w-36 text-right text-xs leading-relaxed text-ink/45">
              {microcopy}
            </span>
          ) : null}
        </div>
        {children}
      </div>
    </article>
  );
}

