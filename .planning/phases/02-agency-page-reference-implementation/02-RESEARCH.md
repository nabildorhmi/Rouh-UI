# Phase 2: Agency Page — Reference Implementation - Research

**Researched:** 2026-07-29
**Domain:** React/TypeScript SPA page composition, static data content authoring, existing shared-component consumption (no new libraries, no new components)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page Section Order**
- **D-01:** Reorder the Agency page so **Plans appears immediately after the hero**, before Services and Portfolio — explicit user instruction to surface the primary booking mechanism early and reduce friction to "book a call." Locked order: Hero → Plans → Services → Portfolio ("Selected work") → Testimonials (new) → Process/"How it works" (new). `ReservationModal` behavior is unchanged (opened via `PlanCard` selection).

**Copy Scope for Phase 2**
- **D-02:** Phase 2 writes final brand-voice copy for everything it touches on the Agency page — `services.ts`, `plans.ts` (taglines + feature bullets), and the portfolio case studies in `portfolio.ts`. No "Placeholder copy" / "placeholder cadence" / "placeholder budget tier" style text should remain on the Agency page after this phase, even though `COPY-01` is formally traced to Phase 4. Phase 4's copy work becomes a sitewide consistency/terminology pass, not a first draft for Agency. Rationale: Phase 2 is explicitly the "reference implementation" — it should read as genuinely finished, not half-placeholder pending another phase.

**Portfolio Content**
- **D-03:** Keep `PortfolioShowcase.tsx`'s existing 3-item `sm:grid-cols-3` layout and the gold/orange gradient-box placeholder-image treatment (locked by Phase 1 D-04 — no real photography exists yet). Write 3 realistic, specific case-study entries (concrete industry/client archetype + a result-oriented description, following the same "reads as finished" bar as Phase 1's placeholder testimonials — D-08) to replace "Placeholder Client A/B/C."
- **D-04:** Remove the literal visible "Placeholder image" label text inside the gradient box — it undercuts the "polished, complete" goal now that the section has real copy. Replace with something that doesn't announce placeholder status (e.g., just the category tag, or no text at all in the box).

**Testimonials & Process Content Reuse**
- **D-05:** Reuse `src/data/testimonials.ts` entries already tagged `category: "agency"` (currently 2 — Sarah Chen/Lumen Skincare, Marcus Webb/Northfield Outdoor) as-is for the Agency page's `TestimonialsSection`. These were written in Phase 1 (D-07/D-08) specifically to read as finished, realistic content — no rewrite needed.
- **D-06:** Reuse `src/data/process.ts`'s `processSteps.agency` 4-step array as-is for the Agency page's `ProcessSection` ("How it works"). Already realistic, phase-appropriate content from Phase 1.

**Plans Copy Polish**
- **D-07:** Tighten `PlanCard` taglines and feature bullets (`plans.ts`) as part of this phase's copy pass (covered by D-02) — remove "(placeholder cadence)" / "(placeholder budget tier)" annotations and write concrete final feature copy for Starter/Growth/Premium.

### Claude's Discretion
- Exact wording of the 3 new portfolio case-study entries, so long as each reads as a specific, finished case study (not generic) per D-03
- Whether to add 1-2 more agency-tagged testimonials to `testimonials.ts` if 2 feels thin for the reference page — optional, not required (D-05 only requires reuse, not expansion)
- Exact eyebrow/title/description copy passed to `TestimonialsSection` and `ProcessSection` on the Agency page
- Whether the "Selected work" section keeps its current gray/bordered full-bleed treatment or adopts a different container given the new page order

### Deferred Ideas (OUT OF SCOPE)
- **Podcast page should NOT show a list of individual podcast episodes** — user clarified during this discussion that the business is studio rental (client records their own podcast with their own guests), not Rouh's own show, so an episode list doesn't fit the corrected business model. This is entirely **Phase 3 (Podcast Page)** scope, not Phase 2 — noted here so it isn't lost, and should be surfaced again when Phase 3's `/gsd:discuss-phase 3` runs. Does not affect the Agency page.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-------------------|
| PORT-01 | Visitor can view a portfolio/case-study showcase of past Agency work on the Agency page | Already structurally satisfied by existing `PortfolioShowcase.tsx` wired into `Agency.tsx`; this phase's work is rewriting `portfolio.ts`'s 3 case studies with final specific copy (D-03) and removing the "Placeholder image" label (D-04) — see Architecture Pattern "Recommended Project Structure" and Code Examples |
| TRUST-01 | Visitor can read testimonials from Agency clients | Delivered by composing existing `TestimonialsSection` with `testimonials.filter(t => category === "agency" \|\| "both")` per D-05 — see Pattern 1 |
| TRUST-04 | Visitor can view a "how it works" process section explaining the steps for engaging the Agency | Delivered by composing existing `ProcessSection` with `processSteps.agency` per D-06 — see Pattern 2 |
</phase_requirements>

## Summary

This phase is almost entirely a **content and composition** phase, not a component-building phase. Every component this phase needs — `TestimonialsSection`, `ProcessSection`, `PortfolioShowcase`, `PlanCard`, `ServicesGrid`, `ReservationModal` — already exists in the codebase and was either built (in Phase 1) or already wired (pre-existing) specifically to be consumed exactly this way: pass typed data as props, render, done. No new npm packages, no new shared components, no new types are needed. `npm view`/registry checks are not applicable — this phase installs zero external packages.

The real work is threefold: (1) rewrite three data files (`services.ts`, `plans.ts`, `portfolio.ts`) with final brand-voice copy, replacing every "Placeholder..." string; (2) reorder `src/pages/Agency.tsx`'s JSX to the locked sequence (Hero → Plans → Services → Portfolio → Testimonials → Process) while keeping the `selectedPlan` state / `ReservationModal` wiring intact; (3) remove one literal label ("Placeholder image") from `PortfolioShowcase.tsx` without touching its layout, grid, or gradient-box treatment (that visual treatment is locked by Phase 1 D-04 — no real photography exists yet).

**Primary recommendation:** Treat this as a data-authoring + page-composition phase. Do not modify `TestimonialsSection.tsx`, `ProcessSection.tsx`, `TestimonialCard.tsx`, `ProcessStepItem.tsx`, `PlanCard.tsx`, or `ServicesGrid.tsx` — they take data as props and need zero code changes. Do not fork new agency-only data files for testimonials/process — filter/select from the existing shared `src/data/testimonials.ts` and `src/data/process.ts`, exactly as `DevDesignPreview.tsx` (Phase 1's proof-of-wiring scaffold) already demonstrates.

## Architectural Responsibility Map

This is a frontend-only static SPA (no backend, no API, no SSR — confirmed by `PROJECT.md`/`CLAUDE.md` constraints and `src/main.tsx`/`App.tsx`). Every capability in this phase lives entirely in the browser/client tier, backed by build-time static data modules.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Portfolio/case-study showcase (PORT-01) | Browser/Client | — | Renders `portfolio.ts` static array via existing `PortfolioShowcase` component; no data fetching, no backend |
| Testimonials display (TRUST-01) | Browser/Client | — | Filters shared `testimonials.ts` static array by `category`, passes to existing `TestimonialsSection` |
| Process/"how it works" section (TRUST-04) | Browser/Client | — | Passes shared `process.ts`'s `processSteps.agency` array to existing `ProcessSection` |
| Page section ordering / composition | Browser/Client | — | Pure JSX restructuring in `src/pages/Agency.tsx`; no routing or state-management changes beyond what already exists |
| Plan selection → booking CTA | Browser/Client | — | `useState` + existing `ReservationModal` (agency mode); Calendly link is a placeholder string in `src/data/config.ts`, no real integration this phase |
| Copy content (services/plans/portfolio) | Build-time static data | — | Content lives in `.ts` modules bundled at build time, not fetched at runtime |

## Standard Stack

No new libraries are introduced by this phase. All dependencies required were installed in Phase 1 and are confirmed present in `node_modules` in this repo.

### Core (already installed, reused as-is)
| Library | Version (installed) | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | ^19.2.7 | UI framework | Existing project stack, no change |
| react-router-dom | ^7.18.1 | Routing | Existing project stack, no change |
| motion | ^12.43.0 | Scroll-reveal animation inside `TestimonialsSection`/`ProcessSection` | Already wired in Phase 1; this phase only consumes the components, does not touch animation code |
| tailwindcss | ^4.3.3 (+ `@tailwindcss/vite` ^4.3.3) | Styling | Existing utility-first approach, no `@apply`, no component classes |
| tw-animate-css | ^1.4.0 | CSS animation utility import | Already wired into `src/styles/index.css` in Phase 1; do not touch |

### Supporting (available, not directly needed by this phase's new work)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^1.27.0 | Chrome icons (chevrons, checks) | Only if the planner decides a new icon affordance is needed somewhere on the page (not required by any locked decision in CONTEXT.md) |
| clsx / tailwind-merge / class-variance-authority | ^2.1.1 / ^3.6.0 / ^0.7.1 | Conditional className composition | Only relevant if a component needs new conditional style branching; existing components (`PlanCard`, `PortfolioShowcase`) already use plain template-literal conditionals, not these libraries — do not introduce them for this phase's minor edits |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static 3-item grid for portfolio (`sm:grid-cols-3`) | Carousel/slider (e.g. `embla-carousel-react`) | Not needed — Phase 1's `01-RESEARCH.md`/`01-UI-SPEC.md` already ruled this out for counts ≤ 6-8; CONTEXT.md D-03 locks the existing 3-item grid layout. Do not introduce a carousel library for 3 items. |
| Filtering shared `testimonials.ts` by category | Forking a new `agencyTestimonials.ts` file | Explicitly against the established pattern (CONTEXT.md "Established Patterns": "data files are flat arrays... testimonials/process data already centralized... Agency page should filter/select from the shared files, not fork new agency-only data files") |

**Installation:**
```bash
# No installation needed — all required packages already present.
# Verify (already confirmed in this repo):
npm ls motion tw-animate-css lucide-react clsx tailwind-merge class-variance-authority --depth=0
```

**Version verification:** All six Phase-1-installed packages were confirmed present via `ls node_modules/` in this repo during research (2026-07-29): `class-variance-authority`, `clsx`, `lucide-react`, `motion`, `tailwind-merge`, `tw-animate-css`. `package.json` lists exact semver ranges (`motion@^12.43.0`, `tw-animate-css@^1.4.0`, etc.) as installed by Phase 1 Plan 01 (`01-01-SUMMARY.md`, task commit `c0de5b3`). No version drift risk — this phase does not touch `package.json`.

## Package Legitimacy Audit

**Not applicable — this phase installs zero external packages.** All npm dependencies needed (motion, tw-animate-css, lucide-react, clsx, tailwind-merge, class-variance-authority) were already vetted and installed during Phase 1 (see `.planning/phases/01-design-system-contract-shared-primitives/01-RESEARCH.md`'s own Package Legitimacy Audit, if present, and `01-01-SUMMARY.md` confirming "zero peer dependency conflicts against React 19.2.7"). The Package Legitimacy Gate protocol (slopcheck, registry verification) does not need to run for this phase — there is nothing new to audit.

**Packages removed due to slopcheck [SLOP] verdict:** none (no new packages)
**Packages flagged as suspicious [SUS]:** none (no new packages)

## Architecture Patterns

### System Architecture Diagram

```
Visitor navigates to /agency
        │
        ▼
App.tsx (React Router) ──▶ Layout.tsx (Header + Footer shell)
        │
        ▼
Agency.tsx (page component)
        │
        ├──▶ SectionHeading (hero copy)                         [existing, unchanged]
        │
        ├──▶ Plans section ──▶ plans.map ──▶ PlanCard            [existing, data-only edit]
        │         │                              │
        │         │                              └─ onSelect(plan) ──▶ setSelectedPlan(plan)
        │         │                                                         │
        │         └── (moved to position 2, right after hero — D-01)       │
        │                                                                   ▼
        ├──▶ Services section ──▶ ServicesGrid ──▶ services.map      ReservationModal
        │         (existing, data-only edit)                        (open={!!selectedPlan}, mode="agency")
        │                                                            [unchanged]
        ├──▶ Portfolio section ("Selected work")
        │         └──▶ PortfolioShowcase ──▶ portfolio.map
        │                   (data-only edit + remove "Placeholder image" label)
        │
        ├──▶ TestimonialsSection (NEW composition, existing component)
        │         └── testimonials.filter(t => category === "agency" || "both")
        │
        └──▶ ProcessSection (NEW composition, existing component)
                  └── processSteps.agency (from src/data/process.ts)
```

A visitor's primary path: land on hero → see Plans immediately (low-friction path to `PlanCard`'s "Select this plan" → `ReservationModal` → Calendly link) → scroll further for Services/Portfolio/Testimonials/Process reinforcement, in that order, per CONTEXT.md D-01.

### Recommended Project Structure

No new files/folders are needed. Only existing files change:

```
src/
├── pages/
│   └── Agency.tsx           # RESTRUCTURE: reorder sections per D-01, add TestimonialsSection + ProcessSection composition
├── components/
│   └── agency/
│       └── PortfolioShowcase.tsx   # EDIT: remove "Placeholder image" label text only
├── data/
│   ├── services.ts          # REWRITE: final copy, remove "Placeholder copy:" prefixes
│   ├── plans.ts              # REWRITE: final copy, remove "(placeholder cadence)"/"(placeholder budget tier)"
│   └── portfolio.ts          # REWRITE: 3 real case-study entries, remove "Placeholder Client A/B/C"
└── (no other files touched — TestimonialsSection.tsx, ProcessSection.tsx, TestimonialCard.tsx,
     ProcessStepItem.tsx, testimonials.ts, process.ts, PlanCard.tsx, ServicesGrid.tsx,
     ReservationModal.tsx, types/index.ts all reused with zero code changes)
```

### Pattern 1: Composing a shared section with filtered shared data (TestimonialsSection)

**What:** Filter the centralized `testimonials` array by category at the page boundary, pass the filtered slice + page-specific copy into the shared component.
**When to use:** Any page (Agency now, Podcast in Phase 3) that needs a category-specific testimonial slice.
**Example (already proven in `src/pages/DevDesignPreview.tsx`, this repo):**
```tsx
// Source: src/pages/DevDesignPreview.tsx (Phase 1 proof-of-wiring scaffold, this repo)
import { testimonials } from "../data/testimonials";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";

const agencyTestimonials = testimonials.filter(
  (t) => t.category === "agency" || t.category === "both"
);

<TestimonialsSection
  testimonials={agencyTestimonials}
  eyebrow="Client feedback"       // page-specific copy, Claude's discretion per CONTEXT.md
  title="What clients say"
/>
```
Note: include `"both"` in the filter even though `testimonials.ts` currently has zero `category: "both"` entries — the type (`src/types/index.ts`) explicitly supports `"both"`, and CONTEXT.md's discretion note allows adding 1-2 more testimonials if 2 feels thin. Filtering only on `"agency"` would silently exclude a future `"both"`-tagged entry.

### Pattern 2: Composing ProcessSection with a pre-grouped data object

**What:** `process.ts` exports a grouped object (`{ agency: ProcessStep[]; podcast: ProcessStep[] }`), not a flat filterable array — select the `agency` key directly, no filter needed.
**Example:**
```tsx
// Source: src/data/process.ts + src/components/shared/ProcessSection.tsx (this repo)
import { processSteps } from "../data/process";
import { ProcessSection } from "../components/shared/ProcessSection";

<ProcessSection
  steps={processSteps.agency}
  eyebrow="How it works"          // Claude's discretion — exact wording per CONTEXT.md
  title="Working with the agency"
/>
```

### Pattern 3: Page-level state for plan selection → modal (unchanged, preserve exactly)

**What:** `Agency.tsx` already owns `selectedPlan` state and renders one `ReservationModal` instance at the bottom of the JSX tree, regardless of section order above it.
**Critical for this phase:** When reordering sections, the `useState` hook, the `PlanCard onSelect={setSelectedPlan}` wiring, and the single `<ReservationModal>` render must all be preserved — only the *position* of the `<section>` containing `PlanCard`s moves earlier in the JSX; the modal itself stays outside/after all sections (it's an overlay, position in JSX doesn't affect visual placement since it's fixed/absolute via `Modal.tsx`).
```tsx
// Source: src/pages/Agency.tsx (current, this repo) — preserve this wiring after reorder
const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
// ...
<PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} />
// ...
<ReservationModal
  open={!!selectedPlan}
  onClose={() => setSelectedPlan(null)}
  mode="agency"
  selectedTierName={selectedPlan?.name ?? ""}
  calendlyUrl={CALENDLY_LINKS.agency}
/>
```

### Anti-Patterns to Avoid
- **Rebuilding or modifying `TestimonialsSection`/`ProcessSection`/`TestimonialCard`/`ProcessStepItem`:** These are page-agnostic by design (Phase 1's explicit goal — "zero page-awareness leaks or mode/variant branching," per `01-02-SUMMARY.md`). Any Agency-specific logic belongs in `Agency.tsx`'s composition, never inside the shared component.
- **Forking `agencyTestimonials.ts` / `agencyProcess.ts`:** Breaks the single-source-of-truth pattern Phase 1 established and that Phase 3 (Podcast) depends on for parity.
- **Redesigning `PortfolioShowcase`'s layout/grid/gradient treatment:** CONTEXT.md D-03 explicitly locks the existing 3-item `sm:grid-cols-3` layout and gradient-box placeholder treatment — only the copy and one label change.
- **Adding a carousel, image gallery, or lightbox for portfolio:** Out of scope; no real photography exists yet (Phase 1 D-04), and only 3 items exist.
- **Introducing new Tailwind values (new spacing numbers, new border-radius, new shadow tokens, `text-gray-*`, `font-semibold`) not already in the Phase 1 token contract** (`01-UI-SPEC.md`): new sections/edits must reuse the existing scale exactly.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Testimonial display grid + scroll animation | A new agency-specific testimonial component | `src/components/shared/TestimonialsSection.tsx` (existing) | Already built, motion-wired, reduced-motion-aware, and explicitly designed to be page-agnostic — building a parallel component duplicates Phase 1's work and breaks the "equal weight" structural guarantee the project's `PROJECT.md` core value depends on |
| "How it works" step display | A new agency-specific process component | `src/components/shared/ProcessSection.tsx` (existing) | Same rationale as above |
| Portfolio/case-study grid | A new grid or carousel component | `src/components/agency/PortfolioShowcase.tsx` (existing, already wired into `Agency.tsx`) | PORT-01 is structurally already satisfied by existing code; this phase only needs new copy + one label removal, not new UI |
| Category filtering logic for testimonials | A new utility/hook for filtering | Inline `.filter()` at the page-composition boundary (already proven in `DevDesignPreview.tsx`) | Simple array filter, no abstraction warranted for a single filter call used identically in Phase 2 and Phase 3 |
| Booking CTA / modal flow | A new modal or CTA component for "book a call" | `src/components/shared/ReservationModal.tsx` (existing, `mode="agency"`) | Already fully built, unchanged per CONTEXT.md — reuse as-is |

**Key insight:** Every "Don't Hand-Roll" item here already exists in this exact codebase. This is not a domain where the risk is picking the wrong external library — it's the risk of an executor unnecessarily rebuilding or forking Phase 1's already-proven shared infrastructure instead of simply composing it with new data.

## Common Pitfalls

### Pitfall 1: Forgetting to remove placeholder annotations buried inside feature-bullet strings
**What goes wrong:** `plans.ts` has placeholder markers embedded *inside* otherwise-plausible-looking feature strings (e.g., `"Content calendar (placeholder cadence)"`, `"Paid media management (placeholder budget tier)"`) rather than as an obvious top-level "Placeholder" prefix — easy to miss on a quick scan since the rest of the bullet reads as real copy.
**Why it happens:** Only `plans.ts`'s title-level strings ("Placeholder Client A") are obviously placeholder; the parenthetical annotations are subtler.
**How to avoid:** Grep for `placeholder` (case-insensitive) across `plans.ts`, `services.ts`, `portfolio.ts` after the copy pass, not just visual scan.
**Warning signs:** Any remaining `(placeholder ...)` parenthetical, or the literal word "Placeholder" anywhere in these three files.

### Pitfall 2: Reordering JSX breaks the `selectedPlan` / `ReservationModal` wiring
**What goes wrong:** Moving the Plans `<section>` earlier in `Agency.tsx`'s JSX is a simple cut-paste, but it's easy to accidentally leave the `<ReservationModal>` render inside the moved section's fragment, or to duplicate/lose the `useState` declaration during the edit.
**Why it happens:** The current file has Plans as the last content section, immediately before the modal render — moving it changes its adjacency to the modal.
**How to avoid:** Keep `<ReservationModal>` as the last element in the returned JSX fragment regardless of where the Plans section moves to (it's an overlay; JSX position doesn't affect visual layout since `Modal.tsx` renders as a fixed/absolute overlay).
**Warning signs:** TypeScript error on `selectedPlan`/`setSelectedPlan` scope, or "Select this plan" button doing nothing after reorder.

### Pitfall 3: Removing the "Placeholder image" label breaks the category tag styling
**What goes wrong:** D-04 asks to remove the visible "Placeholder image" text inside the gradient box, but that text sits inside its own `<span>` inside the box `<div>` — separate from the `{item.category}` tag rendered below the box. An executor might accidentally delete the whole box's inner content or merge the category tag into the box.
**Why it happens:** The box currently contains only the placeholder label; once removed, the box may end up empty (which is one of the explicitly acceptable options per D-04 — "no text at all in the box").
**How to avoid:** Only remove the `<span>` containing "Placeholder image" (and its wrapping comment `{/* Placeholder visual — swap for a real project image */}` if desired); leave the `<div className="aspect-[4/3] rounded-2xl bg-gradient-to-br ...">` shell and the separate `category`/`title`/`description` block below it untouched.
**Warning signs:** Category tag disappearing, or the gradient box losing its `aspect-[4/3]`/`rounded-2xl` classes.

### Pitfall 4: Testimonial filter omitting `"both"` category
**What goes wrong:** Copy-pasting `testimonials.filter(t => t.category === "agency")` (without `|| category === "both"`) works today (no `"both"`-tagged entries exist yet) but silently breaks if the discretion note's optional "add 1-2 more testimonials" is exercised with a `"both"`-tagged entry later.
**How to avoid:** Match the exact filter already used in `DevDesignPreview.tsx`: `t.category === "agency" || t.category === "both"`.
**Warning signs:** A `"both"`-tagged testimonial added to `testimonials.ts` not appearing on the Agency page.

### Pitfall 5: Case-study copy reading as generic rather than specific (violates D-03's "reads as finished" bar)
**What goes wrong:** Writing case studies that are directionally real but still vague ("Helped a brand grow its social presence") fails the explicit bar CONTEXT.md sets: match the specificity of Phase 1's testimonial copy (named companies like "Lumen Skincare," "Northfield Outdoor," with a concrete result claim like "funnel numbers moved within the first month").
**How to avoid:** Each of the 3 portfolio entries needs a specific fictional client/industry archetype + a result-oriented description (concrete deliverable + concrete outcome), not generic "we helped a brand with X" phrasing. Mirror the specificity level of `testimonials.ts`'s existing entries as the copy bar.
**Warning signs:** Case-study description could apply to literally any client with minor word swaps — a sign it's still generic.

### Pitfall 6: Scope creep into Phase 3/4 territory
**What goes wrong:** `config.ts`'s `CALENDLY_LINKS.podcast` still contains stale guest-appearance language (`"podcast-guest"` in the URL slug) and `GuestTierCard.tsx` still says "Book this slot" / "per slot, placeholder" — these are visible while researching this phase but are explicitly Phase 3 scope (STUD-01/COPY-02), not Phase 2's.
**How to avoid:** Touch only `Agency.tsx`, `PortfolioShowcase.tsx`, `services.ts`, `plans.ts`, `portfolio.ts` — per CONTEXT.md's Integration Points list. Do not "fix" podcast-related files while in the area.
**Warning signs:** A plan task referencing `Podcast.tsx`, `guestTiers.ts`, or `episodes.ts`.

### Pitfall 7: `DevDesignPreview.tsx` / `/dev/design-preview` route disposition is ambiguous for this phase
**What goes wrong:** Phase 1's `01-03-SUMMARY.md` says the temporary scaffold "should be removed once Phase 2/3 wire these sections into the real Agency/Podcast pages" — but Phase 2 only wires the *Agency* half. Removing the whole route now would delete the only current demonstration of `TestimonialsSection`/`ProcessSection` with podcast-category data, which Phase 3 still needs as a reference until the real Podcast page is wired.
**How to avoid:** This is not addressed by CONTEXT.md's locked decisions or discretion list — treat as an open question for the planner (see below) rather than assuming removal is in scope. Safest default: leave `DevDesignPreview.tsx`/its route untouched in Phase 2; defer its removal to Phase 3 (when both pages are wired) or Phase 4 (final QA cleanup pass).
**Warning signs:** A plan task proposing to delete `DevDesignPreview.tsx` or its route in Phase 2.

## Code Examples

### Full recommended `Agency.tsx` composition shape (illustrative — exact JSX per planner/executor)

```tsx
// Source: derived from src/pages/Agency.tsx (current) + CONTEXT.md D-01 lock order + existing shared components
import { useState } from "react";
import { services } from "../data/services";
import { portfolio } from "../data/portfolio";
import { plans } from "../data/plans";
import { testimonials } from "../data/testimonials";
import { processSteps } from "../data/process";
import { CALENDLY_LINKS } from "../data/config";
import type { Plan } from "../types";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServicesGrid } from "../components/agency/ServicesGrid";
import { PortfolioShowcase } from "../components/agency/PortfolioShowcase";
import { PlanCard } from "../components/agency/PlanCard";
import { ReservationModal } from "../components/shared/ReservationModal";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";
import { ProcessSection } from "../components/shared/ProcessSection";

export function Agency() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const agencyTestimonials = testimonials.filter(
    (t) => t.category === "agency" || t.category === "both"
  );

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <SectionHeading eyebrow="ROUH Agency" title="..." description="..." />
      </section>

      {/* Plans — moved to position 2 per D-01 */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="Plans" title="..." description="..." />
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <h2 className="text-xl font-black text-black mb-6">Services</h2>
        <ServicesGrid services={services} />
      </section>

      {/* Portfolio ("Selected work") */}
      <section className="bg-black/[0.02] border-y border-black/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <h2 className="text-xl font-black text-black mb-6">Selected work</h2>
          <PortfolioShowcase items={portfolio} />
        </div>
      </section>

      {/* Testimonials (new composition) */}
      <TestimonialsSection
        testimonials={agencyTestimonials}
        eyebrow="Client feedback"
        title="..."
        description="..."
      />

      {/* Process (new composition) */}
      <ProcessSection
        steps={processSteps.agency}
        eyebrow="How it works"
        title="..."
        description="..."
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
```
Note: `TestimonialsSection`/`ProcessSection` already render their own `<section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">` wrapper internally — do not double-wrap them in an additional `<section>` element (unlike the hero/services/portfolio sections above, which are hand-rolled `<section>` blocks in `Agency.tsx` itself).

### `PortfolioShowcase.tsx` — minimal D-04 edit

```tsx
// Source: src/components/agency/PortfolioShowcase.tsx (current, this repo) — only this box's inner content changes
<div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20 flex items-center justify-center">
  {/* D-04: removed literal "Placeholder image" text; category tag below already covers labeling */}
</div>
```
Or, if a category tag inside the box is preferred (still satisfies D-04's "just the category tag" option):
```tsx
<div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20 flex items-center justify-center">
  <span className="text-xs font-bold uppercase tracking-widest text-orange/70">
    {item.category}
  </span>
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Agency.tsx section order: Hero → Services → Portfolio → Plans | Hero → Plans → Services → Portfolio → Testimonials → Process | This phase (D-01) | Surfaces the primary booking mechanism (Plans/PlanCard→ReservationModal) immediately after the hero, reducing friction to "book a call" per user's explicit framing |
| `portfolio.ts`/`plans.ts`/`services.ts` placeholder copy | Final brand-voice copy | This phase (D-02) | Agency page reads as genuinely finished, not pending Phase 4 |
| `PortfolioShowcase` gradient box with visible "Placeholder image" label | Same gradient box, no placeholder-announcing text | This phase (D-04) | Placeholder imagery no longer visually undercuts the "polished, complete" page goal |
| No testimonials/process content on Agency page | `TestimonialsSection`/`ProcessSection` wired with real filtered/selected shared data | This phase (new composition, components built in Phase 1) | Delivers TRUST-01/TRUST-04 |

**Deprecated/outdated:** None — this is the first time Agency.tsx receives its "final" build; there's no older approach to formally deprecate beyond the placeholder-era code this phase directly replaces.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `DevDesignPreview.tsx`/its route should NOT be touched/removed in this phase (deferred to Phase 3/4) | Common Pitfalls #7 | Low — if wrong, planner simply adds a removal task; no functional risk to Agency page either way since the route is additive and unrelated to `/agency` |
| A2 | Testimonial filter should include `category === "both"` even though no `"both"`-tagged entries currently exist | Pattern 1, Pitfall 4 | Low — filter is a one-line addition; omitting it only matters if a future `"both"` entry is added, which is explicitly optional per CONTEXT.md discretion |

**If this table is empty:** N/A — see entries above. Both assumptions are low-risk defensive/consistency recommendations, not claims about external facts, libraries, or compliance requirements — no user confirmation is required before planning proceeds.

## Open Questions (RESOLVED — see inline markers)

1. **Does Phase 2 need to trim or leave `DevDesignPreview.tsx` untouched?**
   - What we know: Phase 1's own summary says the scaffold "should be removed once Phase 2/3 wire these sections into the real Agency/Podcast pages" (implying after *both* phases). CONTEXT.md's canonical refs and decisions say nothing about this route.
   - What's unclear: Whether "Phase 2/3" means "after either" or "after both."
   - Recommendation: Leave it untouched in Phase 2 (safest, avoids removing Phase 3's remaining reference for podcast-category rendering); flag for Phase 3 or Phase 4 planning to make the final call.
   - **RESOLVED:** `DevDesignPreview.tsx` is left untouched by both 02-01-PLAN.md and 02-02-PLAN.md — no plan in this phase modifies or removes it.

2. **Exact number/content of portfolio case studies beyond the 3 required — any expansion?**
   - What we know: CONTEXT.md D-03 locks a 3-item grid; no discretion note suggests expanding beyond 3.
   - What's unclear: Nothing really — this is settled by D-03. Included here only to explicitly confirm: do not expand to 4+ items, since the `sm:grid-cols-3` layout is locked as-is.
   - Recommendation: Keep exactly 3 portfolio items.
   - **RESOLVED:** 02-01-PLAN.md's Task 2 rewrites `portfolio.ts` to exactly 3 entries (Lumen Skincare, Northfield Outdoor, Almora Home) with an explicit acceptance criterion (`grep -c "title:" src/data/portfolio.ts` returns 3) preventing expansion beyond 3.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build/dev tooling | Yes | v24.18.0 | — |
| npm | Package management | Yes | 11.16.0 | — |
| motion (npm package) | `TestimonialsSection`/`ProcessSection` scroll-reveal | Yes (installed) | ^12.43.0 | — |
| tw-animate-css (npm package) | CSS animation utility, already wired | Yes (installed) | ^1.4.0 | — |
| lucide-react, clsx, tailwind-merge, class-variance-authority | Available if needed, not required by locked decisions | Yes (installed) | ^1.27.0 / ^2.1.1 / ^3.6.0 / ^0.7.1 | — |
| vite dev/build tooling | Local dev server, production build | Yes (`node_modules/.bin/vite` present) | ^8.1.1 | — |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None — everything this phase needs is already installed and verified working (Phase 1's `01-03-SUMMARY.md` human-verified scroll-reveal, reduced-motion, and mobile layout for the exact components this phase reuses).

## Security Domain

`security_enforcement` is absent from `.planning/config.json`, so treated as enabled. However, this phase introduces **no new input surfaces, no new forms, no new authentication, and no new external data fetching** — it is a static-content/copy and JSX-reordering phase. `ReservationModal`/`ReservationForm` (the only form on the page) is reused completely unchanged.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth in this project (frontend-only, no accounts per `REQUIREMENTS.md` Out of Scope) |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No access-controlled resources |
| V5 Input Validation | No (unchanged) | `ReservationForm`'s existing `react-hook-form` + `EMAIL_PATTERN` validation is reused as-is; this phase adds zero new form fields or inputs |
| V6 Cryptography | No | No cryptographic operations anywhere in this project |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|----------------------|
| XSS via unescaped user content | Tampering | Not applicable — all content this phase adds (`services.ts`, `plans.ts`, `portfolio.ts`) is static, developer-authored copy rendered via JSX text interpolation (React auto-escapes), not user-supplied or `dangerouslySetInnerHTML` |
| Stale/broken Calendly link | Tampering/availability (low severity) | Not this phase's concern — `CALENDLY_LINKS.agency` is unchanged, already flagged as a known placeholder (`config.ts` comment: "TODO: replace with real Calendly links once available") |

## Sources

### Primary (HIGH confidence — direct codebase inspection, this repo)
- `src/pages/Agency.tsx` — current page structure to be reordered
- `src/components/shared/TestimonialsSection.tsx`, `TestimonialCard.tsx`, `ProcessSection.tsx`, `ProcessStepItem.tsx` — shared components' exact prop contracts and rendering behavior
- `src/components/agency/PortfolioShowcase.tsx`, `PlanCard.tsx`, `ServicesGrid.tsx` — existing agency-page components
- `src/data/testimonials.ts`, `src/data/process.ts`, `src/data/portfolio.ts`, `src/data/plans.ts`, `src/data/services.ts` — current data shape and content
- `src/types/index.ts` — `Testimonial`, `ProcessStep`, `Plan`, `Service`, `PortfolioItem` interfaces
- `src/pages/DevDesignPreview.tsx` — proven pattern for filtering `testimonials` by category and selecting `processSteps.agency`/`processSteps.podcast`
- `package.json` + `node_modules` inspection (`npm ls`/`ls node_modules`, run 2026-07-29) — confirmed all Phase 1 dependencies installed, no new packages needed
- `.planning/phases/01-design-system-contract-shared-primitives/01-UI-SPEC.md` — locked design token contract (spacing, radius, shadow, color, motion, copywriting rules)
- `.planning/phases/01-design-system-contract-shared-primitives/01-PATTERNS.md` — component pattern precedents
- `.planning/phases/01-design-system-contract-shared-primitives/01-01-SUMMARY.md`, `01-02-SUMMARY.md`, `01-03-SUMMARY.md` — what Phase 1 actually built and verified (human-verified in a live browser via Chrome DevTools MCP: scroll-reveal, reduced-motion, mobile layout at 375px)
- `.planning/phases/02-agency-page-reference-implementation/02-CONTEXT.md` — this phase's locked decisions (D-01–D-07) and discretion areas
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/config.json` — requirement traceability, phase goal/success criteria, workflow config (`nyquist_validation: false`, no `security_enforcement` key)

### Secondary (MEDIUM confidence)
- None used — no WebSearch was needed since this phase's entire scope is internal codebase composition/content work with zero new external technology.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new packages; all versions directly confirmed installed in this repo's `node_modules` and `package.json`
- Architecture: HIGH — directly read every component/data file this phase touches or composes; page reorder is a straightforward JSX restructuring of an already-simple page
- Pitfalls: HIGH — derived from direct inspection of the actual current code (e.g., the exact placeholder strings, the exact JSX adjacency risk between Plans and the modal) rather than generic domain knowledge

**Research date:** 2026-07-29
**Valid until:** Stable — this research is tied to a fixed snapshot of the codebase and locked CONTEXT.md decisions, not to an external ecosystem that moves independently. Re-research only if CONTEXT.md is amended or Phase 1's shared components change.
