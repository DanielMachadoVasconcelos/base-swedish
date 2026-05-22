"use client";

import { create } from "zustand";
import { CardResult } from "./types";

interface FeedState {
  currentIndex: number;
  momentsCompleted: number;
  correctMoments: number;
  gentleStreak: number;
  lastResult?: CardResult;
  submitResult: (result: CardResult) => void;
  advance: (totalCards: number) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  currentIndex: 0,
  momentsCompleted: 0,
  correctMoments: 0,
  gentleStreak: 2,
  submitResult: (result) =>
    set((state) => ({
      lastResult: result,
      momentsCompleted: state.momentsCompleted + 1,
      correctMoments: state.correctMoments + (result.correct ? 1 : 0),
      gentleStreak: result.correct ? state.gentleStreak + 1 : state.gentleStreak
    })),
  advance: (totalCards) =>
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % totalCards,
      lastResult: undefined
    }))
}));

