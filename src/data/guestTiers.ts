import type { GuestTier } from "../types";

// Placeholder pricing — TBD, replace with real guest slot pricing.
export const guestTiers: GuestTier[] = [
  {
    id: "standard",
    name: "Standard Feature",
    price: "$299", // placeholder price
    tagline: "A standard episode appearance.",
    features: [
      "Full-length episode feature",
      "Distributed across all platforms",
      "Guest clips for social (placeholder count)",
    ],
  },
  {
    id: "premium",
    name: "Premium / Sponsored Feature",
    price: "$799", // placeholder price
    tagline: "An extended, promoted appearance.",
    features: [
      "Everything in Standard",
      "Dedicated promo push across ROUH channels",
      "Extended cut + bonus clips",
      "Priority scheduling",
    ],
    highlighted: true,
  },
];
