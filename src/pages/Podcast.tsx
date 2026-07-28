import { useState } from "react";
import { episodes } from "../data/episodes";
import { guestTiers } from "../data/guestTiers";
import { CALENDLY_LINKS } from "../data/config";
import type { GuestTier } from "../types";
import { SectionHeading } from "../components/ui/SectionHeading";
import { EpisodeCard } from "../components/podcast/EpisodeCard";
import { GuestTierCard } from "../components/podcast/GuestTierCard";
import { ReservationModal } from "../components/shared/ReservationModal";

export function Podcast() {
  const [selectedTier, setSelectedTier] = useState<GuestTier | null>(null);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <SectionHeading
          eyebrow="ROUH Podcast"
          title="Honest conversations on creativity, business, and culture."
          description="Placeholder intro copy about the podcast's tone, topics, and who it's for."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <h2 className="text-xl font-black text-black mb-6">Episodes</h2>
        <div className="flex flex-col gap-6">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>

      <section className="bg-black/[0.02] border-y border-black/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <SectionHeading
            eyebrow="Be a guest"
            title="Book a guest slot"
            description="Pricing shown up front — pick a tier, tell us about your topic, then grab a time on the calendar."
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-2 max-w-3xl">
            {guestTiers.map((tier) => (
              <GuestTierCard key={tier.id} tier={tier} onSelect={setSelectedTier} />
            ))}
          </div>
        </div>
      </section>

      <ReservationModal
        open={!!selectedTier}
        onClose={() => setSelectedTier(null)}
        mode="podcast"
        selectedTierName={selectedTier?.name ?? ""}
        calendlyUrl={CALENDLY_LINKS.podcast}
      />
    </>
  );
}
