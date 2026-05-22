import { motion } from "framer-motion";
import { CardResult } from "@/features/feed/types";
import { cn } from "@/lib/cn";

export function FeedbackPanel({ result }: { result: CardResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={cn(
        "rounded-3xl px-5 py-4 shadow-soft ring-1",
        result.correct
          ? "bg-sage/14 text-spruce ring-sage/20"
          : "bg-butter/22 text-spruce ring-butter/30"
      )}
    >
      <p className="text-sm font-bold">{result.message}</p>
      {result.detail ? (
        <p className="mt-1 text-sm leading-relaxed text-ink/60">{result.detail}</p>
      ) : null}
    </motion.div>
  );
}

