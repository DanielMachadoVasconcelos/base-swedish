import { LearningCard } from "./types";

export const seedLearningCards: LearningCard[] = [
  {
    id: "learn-hej",
    type: "learn",
    context: "First second",
    accent: "sage",
    level: "survival",
    swedish: "Hej",
    portuguese: "Oi",
    note: "The lightest possible Swedish opening.",
    primaryAction: "Continue Swedish",
    microcopy: "One tiny Swedish moment."
  },
  {
    id: "ica-kvitto",
    type: "situation",
    context: "ICA",
    accent: "fjord",
    level: "practical",
    setup: "You are paying at ICA. The cashier asks:",
    quote: "Vill du ha kvitto?",
    prompt: "What does it mean?",
    choices: [
      { id: "a", label: "Do you want a receipt?" },
      { id: "b", label: "Do you need a bag?" },
      { id: "c", label: "Are you paying by card?" }
    ],
    correctChoiceId: "a",
    correctFeedback: "Nice. This one shows up constantly at ICA.",
    incorrectFeedback: "Almost. \"Kvitto\" means receipt. You will see this again soon.",
    microcopy: "Real Sweden, immediately useful."
  },
  {
    id: "coffee-want",
    type: "multiple-choice",
    context: "Coffee",
    accent: "butter",
    level: "survival",
    prompt: "What does this mean?",
    quote: "Jag vill ha kaffe.",
    choices: [
      { id: "a", label: "I have coffee." },
      { id: "b", label: "I want coffee." },
      { id: "c", label: "I like coffee." },
      { id: "d", label: "I made coffee." }
    ],
    correctChoiceId: "b",
    correctFeedback: "You got it. \"Vill ha\" is very useful.",
    incorrectFeedback: "Almost. \"Jag vill ha kaffe\" means \"I want coffee.\"",
    microcopy: "Useful at cafes and at work."
  },
  {
    id: "listen-say-again",
    type: "listening",
    context: "Phone",
    accent: "spruce",
    level: "practical",
    prompt: "Listen and choose the meaning.",
    transcript: "Kan du säga det igen?",
    portuguese: "Você pode dizer isso de novo?",
    choices: [
      { id: "a", label: "Can you say that again?" },
      { id: "b", label: "Can you write it down?" },
      { id: "c", label: "Can you call later?" }
    ],
    correctChoiceId: "a",
    correctFeedback: "Good ear. This phrase protects conversations.",
    incorrectFeedback: "Almost. This means \"Can you say that again?\"",
    microcopy: "Replay as much as you want."
  },
  {
    id: "order-coffee",
    type: "order-words",
    context: "Cafe",
    accent: "sage",
    level: "survival",
    prompt: "Tap the words in order.",
    words: ["ha", "Jag", "kaffe", "vill", "en"],
    answer: ["Jag", "vill", "ha", "en", "kaffe"],
    translation: "I want a coffee.",
    correctFeedback: "Nice rhythm. You built a real sentence.",
    incorrectFeedback: "Almost. Swedish order: \"Jag vill ha en kaffe.\"",
    microcopy: "Production without typing."
  },
  {
    id: "sl-pendeltag",
    type: "situation",
    context: "SL",
    accent: "fjord",
    level: "practical",
    setup: "You are at the station in Vega. Someone asks:",
    quote: "När går nästa pendeltåg?",
    prompt: "What are they asking?",
    choices: [
      { id: "a", label: "Where is the next bus?" },
      { id: "b", label: "When does the next commuter train leave?" },
      { id: "c", label: "Is the train delayed?" }
    ],
    correctChoiceId: "b",
    correctFeedback: "Exactly. \"När går\" is a daily-life pattern.",
    incorrectFeedback: "Almost. They are asking when the next commuter train leaves.",
    microcopy: "Stockholm commuting Swedish."
  },
  {
    id: "dialogue-bag",
    type: "mini-dialogue",
    context: "ICA",
    accent: "lingon",
    level: "survival",
    lines: [
      { speaker: "Cashier", swedish: "Behöver du en påse?" },
      { speaker: "You", swedish: "Ja tack.", portuguese: "Sim, obrigado." }
    ],
    prompt: "What did the cashier offer?",
    choices: [
      { id: "a", label: "A bag" },
      { id: "b", label: "A receipt" },
      { id: "c", label: "A discount" }
    ],
    correctChoiceId: "a",
    correctFeedback: "Nice. \"Påse\" is bag.",
    incorrectFeedback: "Almost. \"Påse\" means bag.",
    microcopy: "A tiny real-life exchange."
  },
  {
    id: "healthcare-appointment",
    type: "learn",
    context: "Healthcare",
    accent: "spruce",
    level: "practical",
    swedish: "Jag behöver boka en tid.",
    portuguese: "Eu preciso marcar um horário.",
    note: "Useful for vårdcentral, dentist, and official calls.",
    primaryAction: "Keep this phrase",
    microcopy: "One phrase that opens doors."
  },
  {
    id: "work-explain-again",
    type: "multiple-choice",
    context: "Work",
    accent: "sage",
    level: "functional",
    prompt: "Choose the meaning.",
    quote: "Kan du förklara det igen?",
    choices: [
      { id: "a", label: "Can you explain that again?" },
      { id: "b", label: "Can you deploy it again?" },
      { id: "c", label: "Can you check the meeting?" }
    ],
    correctChoiceId: "a",
    correctFeedback: "Good. This is meeting-safe Swedish.",
    incorrectFeedback: "Almost. \"Förklara\" means explain.",
    microcopy: "For software meetings."
  },
  {
    id: "review-kvitto",
    type: "review",
    context: "Quick revisit",
    accent: "butter",
    level: "survival",
    prompt: "Let’s quickly revisit this one.",
    quote: "Kvitto",
    choices: [
      { id: "a", label: "Receipt" },
      { id: "b", label: "Bag" },
      { id: "c", label: "Milk" }
    ],
    correctChoiceId: "a",
    correctFeedback: "There it is. \"Kvitto\" is getting familiar.",
    incorrectFeedback: "Almost. \"Kvitto\" means receipt. No stress.",
    microcopy: "Review is just familiarity returning."
  },
  {
    id: "apartment-moving",
    type: "order-words",
    context: "Apartment",
    accent: "fjord",
    level: "functional",
    prompt: "Build the sentence.",
    words: ["flytta", "ska", "Jag", "den", "maj", "25"],
    answer: ["Jag", "ska", "flytta", "den", "25", "maj"],
    translation: "I am moving on May 25.",
    correctFeedback: "Great. This is useful apartment Swedish.",
    incorrectFeedback: "Almost. The sentence is \"Jag ska flytta den 25 maj.\"",
    microcopy: "For real logistics."
  },
  {
    id: "migration-documents",
    type: "situation",
    context: "Migration",
    accent: "spruce",
    level: "functional",
    setup: "You call about an application and ask:",
    quote: "Har ni fått mina dokument?",
    prompt: "What are you asking?",
    choices: [
      { id: "a", label: "Have you received my documents?" },
      { id: "b", label: "Can I send my documents later?" },
      { id: "c", label: "Do I need more documents?" }
    ],
    correctChoiceId: "a",
    correctFeedback: "Exactly. Practical bureaucracy Swedish, calmly handled.",
    incorrectFeedback: "Almost. You are asking if they received your documents.",
    microcopy: "Useful, not academic."
  },
  {
    id: "phone-slower",
    type: "listening",
    context: "Phone",
    accent: "lingon",
    level: "practical",
    prompt: "Listen. What does this help you ask?",
    transcript: "Kan du prata långsammare?",
    portuguese: "Você pode falar mais devagar?",
    choices: [
      { id: "a", label: "Can you speak more slowly?" },
      { id: "b", label: "Can you call me tomorrow?" },
      { id: "c", label: "Can you send it by email?" }
    ],
    correctChoiceId: "a",
    correctFeedback: "Good ear. This phrase gives you breathing room.",
    incorrectFeedback: "Almost. It means \"Can you speak more slowly?\"",
    microcopy: "A confidence phrase."
  }
];
