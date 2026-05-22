"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function SpeakButton({
  text,
  label = "Listen to Swedish pronunciation",
  className
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [played, setPlayed] = useState(false);

  function speak() {
    setPlayed(true);

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "sv-SE";
    utterance.rate = 0.88;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={speak}
      aria-label={played ? `Replay: ${text}` : label}
      title={played ? "Replay Swedish" : "Listen in Swedish"}
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-spruce text-white shadow-soft ring-1 ring-white/70 transition",
        "hover:-translate-y-0.5 hover:bg-spruce/92 focus:outline-none focus:ring-4 focus:ring-sage/30",
        played && "bg-fjord hover:bg-fjord/90",
        className
      )}
    >
      <Volume2 size={21} strokeWidth={2.35} />
    </motion.button>
  );
}

