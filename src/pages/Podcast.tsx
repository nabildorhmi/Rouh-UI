import { useState } from "react";
import { packages } from "../data/packages";
import { gallery } from "../data/gallery";
import { faqItems } from "../data/faq";
import { testimonials } from "../data/testimonials";
import { processSteps } from "../data/process";
import { CALENDLY_LINKS } from "../data/config";
import type { RentalPackage } from "../types";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PackageCard } from "../components/podcast/PackageCard";
import { StudioGallery } from "../components/podcast/StudioGallery";
import { StudioFaq } from "../components/podcast/StudioFaq";
import { ReservationModal } from "../components/shared/ReservationModal";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";
import { ProcessSection } from "../components/shared/ProcessSection";
import { CrossSellBanner } from "../components/shared/CrossSellBanner";

export function Podcast() {
  const [selectedPackage, setSelectedPackage] = useState<RentalPackage | null>(null);
  const podcastTestimonials = testimonials.filter(
    (t) => t.category === "podcast" || t.category === "both"
  );

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <SectionHeading
          eyebrow="ROUH Studio"
          title="Rent our studio and gear to record your own podcast."
          description="Book the room, the mics, and as much crew support as you need — dry-hire it and run your own session, or let a Rouh crew member handle the gear while you focus on the conversation."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Packages"
          title="Pick a package, tell us about your session, book a time."
          description="No prices shown — every booking starts with a short conversation so the setup actually fits your session."
        />

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={setSelectedPackage} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <SectionHeading
          eyebrow="The studio"
          title="A look inside the room"
          description="Real photography is on the way — here's a preview of the space you'll be recording in."
        />
        <div className="mt-10">
          <StudioGallery items={gallery} />
        </div>
      </section>

      <section className="bg-black/[0.02] border-y border-black/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 flex flex-col gap-12">
          <div>
            <SectionHeading
              eyebrow="Location & logistics"
              title="Getting to the studio"
            />
            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8">
              <p className="text-sm text-black/80">
                <strong className="font-bold text-black">Address:</strong> Provided after booking — a Rouh crew member will send exact directions and parking info by email.
              </p>
              <p className="mt-4 text-sm text-black/80">
                <strong className="font-bold text-black">Parking:</strong> Free street parking on Studio Row after 6pm; a paid lot is directly across the street for daytime sessions.
              </p>
              <p className="mt-4 text-sm text-black/80">
                <strong className="font-bold text-black">Access:</strong> Buzz in at the street-level door — someone from the crew will meet you if you booked a staffed session; dry-hire bookings get an entry code by email ahead of time.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Good to know before you book"
            />
            <div className="mt-8">
              <StudioFaq items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      <CrossSellBanner to="/agency">Also need a creative agency? See how it works →</CrossSellBanner>

      <TestimonialsSection
        testimonials={podcastTestimonials}
        eyebrow="Renter feedback"
        title="What renters say about the space"
        description="A few words from hosts who've recorded here."
      />

      <ProcessSection
        steps={processSteps.podcast}
        eyebrow="How it works"
        title="From booking to walking out with your files"
        description="Four steps, no guesswork — pick a package and you're most of the way there."
      />

      <ReservationModal
        open={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
        mode="podcast"
        selectedTierName={selectedPackage?.name ?? ""}
        calendlyUrl={CALENDLY_LINKS.podcast}
      />
    </>
  );
}

