import type { RentalPackage } from "../types";

// Rental packages — studio + gear, no pricing shown (every booking starts with a conversation).
export const packages: RentalPackage[] = [
  {
    id: "solo",
    name: "Solo Session",
    tagline: "For solo hosts who just need the room and the gear.",
    duration: "4 hours (half-day)",
    staffing: "dry-hire",
    gearTier: "Core",
    capacity: 2,
    equipment: ["2 microphones", "1 camera", "Basic lighting kit"],
    features: [
      "Self-serve setup — the gear is ready when you arrive",
      "Full 4-hour block, start whenever you booked",
      "Raw files handed over at the end of your session",
    ],
  },
  {
    id: "crew",
    name: "Crew Session",
    tagline: "For hosts who want a crew member running the gear.",
    duration: "4 hours (half-day)",
    staffing: "staffed",
    gearTier: "Expanded",
    capacity: 4,
    equipment: ["3 microphones", "2 cameras", "Full lighting kit"],
    features: [
      "Everything in Solo Session",
      "A Rouh crew member runs the gear so you can focus on the conversation",
      "Room for up to 4 people",
    ],
    highlighted: true,
  },
  {
    id: "full-day",
    name: "Full Day Production",
    tagline: "For multi-guest recordings and longer shoots.",
    duration: "8 hours (full day)",
    staffing: "staffed",
    gearTier: "Premium",
    capacity: 6,
    equipment: ["4+ microphones", "Multi-camera setup", "Full lighting + backdrop"],
    features: [
      "Everything in Crew Session",
      "Full-day access — record multiple episodes back to back",
      "Room for up to 6 people",
    ],
  },
];
