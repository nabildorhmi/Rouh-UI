/**
 * TEMPORARY Phase 1 walking-skeleton verification scaffolding.
 * To be removed once Phase 2/3 wire TestimonialsSection and ProcessSection into
 * the real Agency and Podcast pages with real page copy — not production content.
 */

import { testimonials } from "../data/testimonials";
import { processSteps } from "../data/process";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";
import { ProcessSection } from "../components/shared/ProcessSection";

export function DevDesignPreview() {
  const agencyTestimonials = testimonials.filter(
    (t) => t.category === "agency" || t.category === "both"
  );
  const podcastTestimonials = testimonials.filter(
    (t) => t.category === "podcast" || t.category === "both"
  );

  return (
    <main>
      <TestimonialsSection
        testimonials={agencyTestimonials}
        eyebrow="Client feedback"
        title="What clients say"
      />
      <ProcessSection
        steps={processSteps.agency}
        eyebrow="How it works"
        title="Working with the agency"
      />
      <TestimonialsSection
        testimonials={podcastTestimonials}
        eyebrow="Renter feedback"
        title="What renters say"
      />
      <ProcessSection
        steps={processSteps.podcast}
        eyebrow="How it works"
        title="Booking the studio"
      />
    </main>
  );
}
