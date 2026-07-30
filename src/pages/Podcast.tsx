import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { packages } from "../data/packages";
import { gallery } from "../data/gallery";
import { faqItems } from "../data/faq";
import { testimonials } from "../data/testimonials";
import { processSteps } from "../data/process";
import { CALENDLY_LINKS } from "../data/config";
import type { RentalPackage } from "../types";
import { GraphicAccent } from "../components/ui/GraphicAccent";
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
  const location = useLocation();

  useEffect(() => {
    const autoOpenPackageId = (location.state as { autoOpenPackageId?: string } | null)?.autoOpenPackageId;
    if (autoOpenPackageId) {
      const pkg = packages.find((p) => p.id === autoOpenPackageId);
      if (pkg) {
        setSelectedPackage(pkg);
      }
    }
  }, [location.state]);

  const podcastTestimonials = testimonials.filter(
    (t) => t.category === "podcast" || t.category === "both"
  );

  return (
    <>
      <section className="relative overflow-hidden mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 pb-6">
        <GraphicAccent
          variant={4}
          className="absolute top-2 right-[4%] sm:right-[8%] w-24 h-24 sm:w-32 sm:h-32 opacity-40 pointer-events-none"
        />
        <div className="relative z-10 max-w-2xl">
          <span className="eyebrow text-orange">ROUH Studio</span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black text-black">
            Rent the studio and gear — pick a package, tell us about your session, book a time.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onSelect={setSelectedPackage} />
          ))}
        </div>
        <p className="mt-6 text-sm text-black/40">
          No prices shown — every booking starts with a short conversation so the setup actually fits your session.
        </p>
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
