import type { Testimonial } from "../types";

// Realistic sample testimonials representing agency services clients and podcast studio renters.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    category: "agency",
    quote:
      "Rouh didn't just make us look better — they rebuilt how we talk about the product. Our funnel numbers moved within the first month.",
    name: "Sarah Chen",
    role: "Founder, Lumen Skincare",
  },
  {
    id: "t2",
    category: "agency",
    quote:
      "We've worked with three agencies before Rouh. This is the first one that actually shipped on the timeline they gave us.",
    name: "Marcus Webb",
    role: "Marketing Director, Northfield Outdoor",
  },
  {
    id: "t3",
    category: "podcast",
    quote:
      "Booked the studio same week, showed up, and the crew had everything dialed in before we sat down. Zero setup stress.",
    name: "Priya Ramesh",
    role: "Host, The Build Sheet",
  },
  {
    id: "t4",
    category: "podcast",
    quote:
      "Rented the full kit for a two-day shoot — cameras, lighting, the works. Recordings came out broadcast-ready straight off the gear.",
    name: "David Okafor",
    role: "Co-host, Second Opinion Podcast",
  },
];
