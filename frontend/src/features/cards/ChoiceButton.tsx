import { cn } from "@/lib/cn";

export function ChoiceButton({
  label,
  statusLabel,
  selected,
  correct,
  answered,
  onClick
}: {
  label: string;
  statusLabel?: string;
  selected: boolean;
  correct?: boolean;
  answered: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={answered}
      onClick={onClick}
      className={cn(
        "w-full rounded-3xl border px-5 py-4 text-left text-base font-semibold text-ink shadow-sm transition",
        "focus:outline-none focus:ring-4 focus:ring-sage/25 active:scale-[0.99]",
        answered
          ? "cursor-default"
          : "border-mist bg-white/80 hover:-translate-y-0.5 hover:border-sage/40 hover:bg-white",
        selected && correct && "border-sage/70 bg-sage/15 text-spruce",
        selected && correct === false && "border-lingon/40 bg-lingon/10 text-ink",
        !selected && answered && correct && "border-sage/45 bg-sage/10",
        !selected && answered && !correct && "opacity-55"
      )}
    >
      <span className="flex items-center justify-between gap-4">
        <span>{label}</span>
        {statusLabel ? (
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.14em]",
              correct ? "bg-sage/18 text-spruce" : "bg-butter/35 text-ink/62"
            )}
          >
            {statusLabel}
          </span>
        ) : null}
      </span>
    </button>
  );
}
