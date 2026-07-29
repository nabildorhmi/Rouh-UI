import type { ProcessStep } from "../types";

// Sample step data for the shared ProcessSection component, grouped by service line.
export const processSteps: { agency: ProcessStep[]; podcast: ProcessStep[] } = {
  agency: [
    {
      step: 1,
      title: "Discovery call",
      description: "We learn your brand, goals, and where things are stuck.",
    },
    {
      step: 2,
      title: "Scope & plan",
      description: "You get a clear plan — deliverables, timeline, no surprises.",
    },
    {
      step: 3,
      title: "We build",
      description: "Strategy, content, and campaigns move from plan to shipped work.",
    },
    {
      step: 4,
      title: "Launch & iterate",
      description: "We track what's working and refine as results come in.",
    },
  ],
  podcast: [
    {
      step: 1,
      title: "Pick a package",
      description: "Choose your session length and gear tier.",
    },
    {
      step: 2,
      title: "Book your session",
      description: "Reserve a date — dry-hire or staffed, your call.",
    },
    {
      step: 3,
      title: "Show up & record",
      description: "The room and gear are dialed in before you arrive.",
    },
    {
      step: 4,
      title: "Walk away with your files",
      description: "Leave with your raw recording, ready for post.",
    },
  ],
};
