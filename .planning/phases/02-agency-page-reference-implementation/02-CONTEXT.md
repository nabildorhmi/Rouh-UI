# Phase 2: Agency Page — Reference Implementation - Context

**Gathered:** 2026-07-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Bring the Agency page to a fully polished, complete, visitable state — proof of past work (portfolio), a clear engagement process, real client voices, and real copy — establishing the reference pattern Podcast (Phase 3) will follow. Delivers PORT-01, TRUST-01, TRUST-04. Podcast page changes (including anything about episode lists) are explicitly Phase 3's scope, not this phase's.

</domain>

<decisions>
## Implementation Decisions

### Page Section Order
- **D-01:** Reorder the Agency page so **Plans appears immediately after the hero**, before Services and Portfolio — explicit user instruction to surface the primary booking mechanism early and reduce friction to "book a call." Locked order: Hero → Plans → Services → Portfolio ("Selected work") → Testimonials (new) → Process/"How it works" (new). `ReservationModal` behavior is unchanged (opened via `PlanCard` selection).

### Copy Scope for Phase 2
- **D-02:** Phase 2 writes final brand-voice copy for everything it touches on the Agency page — `services.ts`, `plans.ts` (taglines + feature bullets), and the portfolio case studies in `portfolio.ts`. No "Placeholder copy" / "placeholder cadence" / "placeholder budget tier" style text should remain on the Agency page after this phase, even though `COPY-01` is formally traced to Phase 4. Phase 4's copy work becomes a sitewide consistency/terminology pass, not a first draft for Agency. Rationale: Phase 2 is explicitly the "reference implementation" — it should read as genuinely finished, not half-placeholder pending another phase.

### Portfolio Content
- **D-03:** Keep `PortfolioShowcase.tsx`'s existing 3-item `sm:grid-cols-3` layout and the gold/orange gradient-box placeholder-image treatment (locked by Phase 1 D-04 — no real photography exists yet). Write 3 realistic, specific case-study entries (concrete industry/client archetype + a result-oriented description, following the same "reads as finished" bar as Phase 1's placeholder testimonials — D-08) to replace "Placeholder Client A/B/C."
- **D-04:** Remove the literal visible "Placeholder image" label text inside the gradient box — it undercuts the "polished, complete" goal now that the section has real copy. Replace with something that doesn't announce placeholder status (e.g., just the category tag, or no text at all in the box).

### Testimonials & Process Content Reuse
- **D-05:** Reuse `src/data/testimonials.ts` entries already tagged `category: "agency"` (currently 2 — Sarah Chen/Lumen Skincare, Marcus Webb/Northfield Outdoor) as-is for the Agency page's `TestimonialsSection`. These were written in Phase 1 (D-07/D-08) specifically to read as finished, realistic content — no rewrite needed.
- **D-06:** Reuse `src/data/process.ts`'s `processSteps.agency` 4-step array as-is for the Agency page's `ProcessSection` ("How it works"). Already realistic, phase-appropriate content from Phase 1.

### Plans Copy Polish
- **D-07:** Tighten `PlanCard` taglines and feature bullets (`plans.ts`) as part of this phase's copy pass (covered by D-02) — remove "(placeholder cadence)" / "(placeholder budget tier)" annotations and write concrete final feature copy for Starter/Growth/Premium.

### Claude's Discretion
- Exact wording of the 3 new portfolio case-study entries, so long as each reads as a specific, finished case study (not generic) per D-03
- Whether to add 1-2 more agency-tagged testimonials to `testimonials.ts` if 2 feels thin for the reference page — optional, not required (D-05 only requires reuse, not expansion)
- Exact eyebrow/title/description copy passed to `TestimonialsSection` and `ProcessSection` on the Agency page
- Whether the "Selected work" section keeps its current gray/bordered full-bleed treatment or adopts a different container given the new page order

</decisions>

<specifics>
## Specific Ideas

- User: "apply best approach that will bring users to book easily" — drove the plans-first reordering (D-01); the whole page should be structured to reduce friction to booking, not just contain a CTA somewhere on the page.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & requirements
- `.planning/PROJECT.md` — Core value, locked brand constraints (Gotham font, orange #c1622e / gold #d9a253, existing graphic elements), frontend-only scope, Antigravity CLI handoff constraint
- `.planning/REQUIREMENTS.md` — PORT-01, TRUST-01, TRUST-04 (this phase's requirements); note COPY-01 is formally Phase 4 but D-02 above front-loads Agency copy in this phase
- `.planning/ROADMAP.md` §Phase 2 — Goal, success criteria, dependency on Phase 1

### Phase 1 outputs (this phase builds directly on these)
- `.planning/phases/01-design-system-contract-shared-primitives/01-CONTEXT.md` — D-01–D-10, especially D-04 (placeholder imagery treatment), D-07–D-09 (testimonial content bar)
- `.planning/phases/01-design-system-contract-shared-primitives/01-UI-SPEC.md` — Design token contract (spacing, corner radius, shadow rules) this page must follow
- `.planning/phases/01-design-system-contract-shared-primitives/01-01-SUMMARY.md`, `01-02-SUMMARY.md`, `01-03-SUMMARY.md` — What was actually built (shared components, sample data, verification route)

### Codebase maps
- `.planning/codebase/CONVENTIONS.md` — Naming, Tailwind patterns (no `@apply`, style-constant pattern), accessibility patterns already in use
- `.planning/codebase/STRUCTURE.md` — Directory layout

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/shared/TestimonialsSection.tsx` + `TestimonialCard.tsx` — ready to consume, takes `testimonials: Testimonial[]` (already filterable by `category`), `eyebrow`, `title`, `description` — scroll-reveal motion built in, reduced-motion aware
- `src/components/shared/ProcessSection.tsx` + `ProcessStepItem.tsx` — same pattern, takes `steps: ProcessStep[]`
- `src/components/agency/PortfolioShowcase.tsx` — already exists and wired into `Agency.tsx`; takes `items: PortfolioItem[]`, no props changes needed, only data content changes
- `src/components/agency/PlanCard.tsx`, `ServicesGrid.tsx` — existing, reused as-is structurally; only their data source (`plans.ts`, `services.ts`) content changes
- `src/components/shared/ReservationModal.tsx` — existing agency-mode flow, unchanged

### Established Patterns
- Data files are flat arrays of typed objects in `src/data/`; testimonials/process data already centralized (not per-page duplicated) — Agency page should filter/select from the shared files, not fork new agency-only data files
- No component classes / no `@apply` — inline Tailwind with local style-constant variables
- Page components in `src/pages/` compose section-level components; `Agency.tsx` (`src/pages/Agency.tsx`) is the file whose section order changes per D-01

### Integration Points
- `Agency.tsx` is the only page file that needs restructuring for section order (D-01) and to add the two new sections (`TestimonialsSection` filtered to `category === "agency"`, `ProcessSection` with `processSteps.agency`)
- `portfolio.ts`, `plans.ts`, `services.ts` are the three data files needing copy updates (D-02, D-03, D-07)
- `PortfolioShowcase.tsx` needs the placeholder-image label text change (D-04)

</code_context>

<deferred>
## Deferred Ideas

- **Podcast page should NOT show a list of individual podcast episodes** — user clarified during this discussion that the business is studio rental (client records their own podcast with their own guests), not Rouh's own show, so an episode list doesn't fit the corrected business model. This is entirely **Phase 3 (Podcast Page)** scope, not Phase 2 — noted here so it isn't lost, and should be surfaced again when Phase 3's `/gsd:discuss-phase 3` runs. Does not affect the Agency page.

</deferred>

---

*Phase: 02-agency-page-reference-implementation*
*Context gathered: 2026-07-29*
