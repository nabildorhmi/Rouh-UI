import { useState } from "react";
import { services } from "../data/services";
import { portfolio } from "../data/portfolio";
import { plans } from "../data/plans";
import { testimonials } from "../data/testimonials";
import { processSteps } from "../data/process";
import { CALENDLY_LINKS } from "../data/config";
import type { Plan } from "../types";
import { GraphicAccent } from "../components/ui/GraphicAccent";
import { ServicesGrid } from "../components/agency/ServicesGrid";
import { PortfolioShowcase } from "../components/agency/PortfolioShowcase";
import { PlanCard } from "../components/agency/PlanCard";
import { ReservationModal } from "../components/shared/ReservationModal";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";
import { ProcessSection } from "../components/shared/ProcessSection";
import { CrossSellBanner } from "../components/shared/CrossSellBanner";

export function Agency() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const agencyTestimonials = testimonials.filter(
    (t) => t.category === "agency" || t.category === "both"
  );

  return (
    <>
      <section className="relative overflow-hidden mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 pb-6">
        <GraphicAccent
          variant={1}
          className="absolute top-2 right-[4%] sm:right-[8%] w-24 h-24 sm:w-32 sm:h-32 opacity-40 pointer-events-none"
        />
        <div className="relative z-10 max-w-2xl">
          <span className="eyebrow text-orange">ROUH Agency</span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-black text-black">
            Brands built with intent — pick a plan, tell us about you, book a call.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} />
          ))}
        </div>
        <p className="mt-6 text-sm text-black/40">
          No prices here — every engagement starts with a short conversation so the scope actually fits.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <h2 className="text-xl font-black text-black mb-6">Services</h2>
        <ServicesGrid services={services} />
      </section>

      <section className="relative overflow-hidden bg-charcoal text-white py-20">
        <GraphicAccent
          variant={3}
          className="absolute -bottom-10 right-4 sm:right-[4%] w-60 h-60 sm:w-72 sm:h-72 opacity-40 pointer-events-none"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <span className="eyebrow text-gold">ROUH Agency</span>
          <h2 className="mt-2 text-3xl font-black text-white mb-8">Selected work</h2>
          <PortfolioShowcase items={portfolio} dark />
        </div>
      </section>

      <CrossSellBanner to="/podcast">Also need a podcast studio? See how it works →</CrossSellBanner>

      <TestimonialsSection
        testimonials={agencyTestimonials}
        eyebrow="Client feedback"
        title="What clients say about working with us"
        description="A few words from brands we've helped move faster."
      />

      <ProcessSection
        steps={processSteps.agency}
        eyebrow="How it works"
        title="From first call to shipped work"
        description="No lengthy onboarding — just a clear path from conversation to results."
      />

      <ReservationModal
        open={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        mode="agency"
        selectedTierName={selectedPlan?.name ?? ""}
        calendlyUrl={CALENDLY_LINKS.agency}
      />
    </>
  );
}

