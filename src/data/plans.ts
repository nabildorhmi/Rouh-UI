import type { Plan } from "../types";

// Agency plans intentionally show no pricing — the flow is "pick a plan, tell us
// about you, book a call." Replace feature lists with final scope per plan.
export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For brands getting their foundations in place.",
    features: [
      "Brand & social audit",
      "Content calendar (placeholder cadence)",
      "1 core platform managed",
      "Monthly performance report",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For brands ready to scale reach and output.",
    features: [
      "Everything in Starter",
      "Multi-platform content production",
      "Paid media management (placeholder budget tier)",
      "Quarterly strategy review",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For brands wanting a full embedded team.",
    features: [
      "Everything in Growth",
      "Dedicated account & creative team",
      "Influencer & partnership sourcing",
      "Priority turnaround & reporting",
    ],
  },
];
