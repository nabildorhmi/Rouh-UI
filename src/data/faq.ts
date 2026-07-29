import type { FaqItem } from "../types";

export const faqItems: FaqItem[] = [
  {
    id: "cancellation",
    question: "What's your cancellation and reschedule policy?",
    answer:
      "Reschedule up to 48 hours before your session at no cost. Cancellations inside 48 hours forfeit the booking — reach out as early as you can and we'll always try to find a new slot.",
  },
  {
    id: "session-length",
    question: "How long is a session?",
    answer:
      "Solo and Crew sessions run 4 hours; Full Day Production runs 8 hours. Need more time? Ask when you book — we can sometimes extend on the day.",
  },
  {
    id: "staffing-choice",
    question: "Should I book dry-hire or staffed?",
    answer:
      "Dry-hire if you're comfortable running your own gear and want full control. Staffed if you'd rather focus on hosting while a Rouh crew member handles setup, mics, and camera during the session.",
  },
  {
    id: "capacity",
    question: "How many people fit in the room?",
    answer:
      "Up to 2 for Solo Session, up to 4 for Crew Session, and up to 6 for Full Day Production — capacity includes hosts and guests.",
  },
];
