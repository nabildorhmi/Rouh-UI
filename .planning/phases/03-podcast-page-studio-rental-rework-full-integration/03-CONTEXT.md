# Phase 3: Podcast Page — Studio Rental Rework + Full Integration - Context

**Gathered:** 2026-07-29 (auto-drafted, then reviewed and revised interactively)
**Status:** Ready for planning

<domain>
## Phase Boundary

A visitor can land on the Podcast page and correctly understand it as "rent our studio + gear to record your own podcast" (not "pay to appear as a guest on Rouh's show"), see everything needed to trust and book a session, and experience the same completeness and polish as the Agency page (Phase 2's reference implementation). Covers: rental package data/copy rework, studio logistics, FAQ, photo gallery, testimonials/process integration, and full removal of guest-appearance language from the Podcast page and its reservation flow.

**Revised during discussion:** The Episodes list (the actual ROUH podcast show) is **removed entirely** from the Podcast page — the page becomes 100% about studio rental, with no show-episode content. This supersedes the original draft's assumption that Episodes would stay as separate, unrelated content.

</domain>

<decisions>
## Implementation Decisions

### Rental package structure (STUD-01, STUD-02, STUD-03)
- **D-01:** Replace the 2-tier `guestTiers` concept with **3 rental packages**, mirroring Agency's 3-tier Starter/Growth/Premium structure for structural parity (NAV-01 groundwork, even though NAV-01 itself is a Phase 4 requirement):
  - **"Solo Session"** — half-day (4hr), dry-hire (self-serve, no crew), core gear tier (2 mics, 1 camera, basic lighting kit), capacity 1–2 people
  - **"Crew Session"** (highlighted/most-popular, mirrors Agency's "Growth") — half-day (4hr), staffed (a Rouh crew member runs the gear), expanded gear tier (3 mics, 2 cameras, full lighting), capacity up to 4 people
  - **"Full Day Production"** — full day (8hr), staffed, premium gear tier (4+ mics, multi-cam, full lighting + backdrop), capacity up to 6 people
  - **Confirmed interactively** (2026-07-29): package count, names, durations, gear tiers, and capacity numbers below were reviewed one-by-one with the user and kept exactly as drafted. This resolves the earlier STATE.md blocker flagging this structure as needing stakeholder input — it is now a locked decision, not a placeholder guess.

### No price shown (STUD-03)
- **D-02:** Remove the `price` field entirely — replace `GuestTier` interface with a new `RentalPackage` interface: `{ id, name, tagline, duration: string, staffing: "dry-hire" | "staffed", gearTier: string, capacity: number, equipment: string[], features: string[], highlighted?: boolean }`. Matches Agency's no-price `Plan` pattern (D-02 from Phase 2 CONTEXT).

### Component reuse (STUD-01, STUD-02, STUD-03)
- **D-03:** Repurpose `GuestTierCard.tsx` → `PackageCard.tsx` (rename, same visual treatment: rounded-2xl border card, highlighted variant in black/orange). Remove the price display block entirely. Add an itemized equipment list (separate from the generic `features` bullet list) — a labeled "What's included" sub-list showing `equipment[]` items with the same bullet-dot styling used elsewhere. CTA button text changes from "Book this slot" to "Book this session".

### Studio location/logistics (STUD-04)
- **D-04:** New logistics section — static text block (address, parking notes, access instructions). No interactive map embed (avoids a new external dependency/API key, consistent with the frontend-only, no-backend project constraint). Placeholder address/notes are acceptable per project scope (real studio address TBD).

### FAQ section (STUD-05)
- **D-05:** New FAQ section covering: cancellation/reschedule policy, session length options, staffed vs. dry-hire choice, room capacity. Presentation format (accordion vs. static Q&A list) is Claude's discretion during planning — content requirement is locked, UI pattern is not.

### Photo gallery (STUD-06)
- **D-06:** Reuse the gradient-placeholder pattern established in Phase 2's `PortfolioShowcase.tsx` (aspect-ratio boxes with `bg-gradient-to-br from-gold/20 to-orange/20`, no image, no "Placeholder image" label text) for a grid gallery of studio photos. Keeps placeholder-imagery treatment consistent sitewide per D-04 precedent from Phase 2.

### Guest-appearance language removal (STUD-01, STUD-07)
- **D-07:** Full audit and rewrite of all guest-appearance framing on the Podcast page and its reservation flow: Hero copy, section headers ("Be a guest" → "Reserve the studio" or equivalent), CTA copy ("Book a guest slot" → "Reserve a session"), and `ReservationModal`/`ReservationForm` copy when `mode="podcast"`. `selectedTierName` prop flows into the modal — verify its display copy doesn't say "guest" anywhere.
  - Note: `CALENDLY_LINKS.podcast` URL slug (`.../podcast-guest`) still contains "guest" — this is a placeholder link string (not visitor-facing rendered copy) and is out of scope per the project's "real Calendly links deferred" constraint; left as Claude's discretion to clean up incidentally if trivial, not a blocking requirement.

### Testimonials/Process composition (TRUST-02, TRUST-05)
- **D-08:** Reuse the shared `TestimonialsSection` filtered by `category === "podcast" || category === "both"` (data already exists in `testimonials.ts` — Priya Ramesh, David Okafor) and `ProcessSection` with `processSteps.podcast` (data already exists in `process.ts` — 4 steps, "Pick a package" → "Walk away with your files"). Same composition pattern Agency.tsx used in Phase 2 — no new data needed, just wiring.

### Page section order
- **D-09:** Hero (short intro — title + one descriptive paragraph, unchanged length) → Packages → Studio Gallery → Logistics & FAQ → Testimonials → Process → ReservationModal. No Episodes section (removed — see D-10). Packages placed immediately after Hero (not last) so the primary booking CTA isn't buried, matching the Agency reference pattern's rationale.

### Episodes section removal
- **D-10:** Remove the Episodes section entirely from `Podcast.tsx` — delete the `episodes` import/map and the `EpisodeCard` usage. The Podcast page becomes 100% about studio rental; the ROUH podcast show's episode list is no longer displayed here. `src/data/episodes.ts` and `EpisodeCard.tsx` can be deleted if confirmed unused elsewhere, or left in place — Claude's discretion during planning/execution (verify no other page imports them first).

### Agency page — order verified, no change needed
- **D-11:** User requested packages/plans appear right after a short intro on **both** Podcast and Agency pages, and confirmed this should happen within Phase 3 even though Agency.tsx is a Phase 2 deliverable outside this phase's roadmap requirements. **Code inspection confirms `Agency.tsx` already satisfies this** — current order is Hero → Plans → Services → Portfolio → Testimonials → Process, i.e. Plans is already the 2nd section. User confirmed the existing Hero length ("title + one paragraph") already counts as "small intro." **No code changes to Agency.tsx are required for this decision** — only the Podcast page's order (D-09) and Episodes removal (D-10) are net-new work.

### Claude's Discretion
- FAQ accordion vs. static list UI pattern
- Exact studio address/parking placeholder copy (clearly marked as placeholder/TBD)
- Equipment list icon treatment (icon per item vs. plain bullet)
- Whether `CALENDLY_LINKS.podcast` slug gets a cosmetic rename

</decisions>

<specifics>
## Specific Ideas

- "Just a small intro then packages, everything else below" — user's own framing for page structure, applies to both Podcast and Agency (Agency already matches; Podcast needs Episodes removed and Packages moved to directly follow Hero).
- Structural specifics otherwise carried forward from Phase 2's established pattern (see canonical refs below) — Phase 3 should read as "the same page, different service," not a redesign.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Reference pattern (Phase 2 — what Phase 3 must match)
- `src/pages/Agency.tsx` — the proven reference implementation this phase mirrors (section order, composition pattern for TestimonialsSection/ProcessSection, ReservationModal wiring)
- `src/components/agency/PlanCard.tsx` — no-price card pattern `PackageCard.tsx` should mirror
- `.planning/phases/02-agency-page-reference-implementation/02-UI-SPEC.md` — design contract Phase 2 followed; Phase 3 inherits the same visual rules
- `.planning/phases/02-agency-page-reference-implementation/02-CONTEXT.md` — Phase 2's locked decisions (D-01 through D-07), several directly analogous to this phase's decisions above

### Requirements
- `.planning/REQUIREMENTS.md` — STUD-01 through STUD-07, TRUST-02, TRUST-05 (this phase's requirement set)

### Design system
- `.planning/phases/01-design-system-contract-shared-primitives/01-UI-SPEC.md` — spacing/color/graphic-element rules (Phase 1 design contract)

No external specs/ADRs exist for this project — requirements are fully captured in `.planning/REQUIREMENTS.md` and the decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `TestimonialsSection` + podcast-tagged data in `src/data/testimonials.ts` (t3, t4 — already written, no copy work needed)
- `ProcessSection` + `processSteps.podcast` in `src/data/process.ts` (4 steps already written, no copy work needed)
- `ReservationModal`/`ReservationForm` — already `mode`-aware (`"agency" | "podcast"`), reused as-is; only copy inside needs a guest-language audit
- `GraphicAccent`, `Button`, `SectionHeading` — shared UI primitives, same usage pattern as Agency

### Established Patterns
- No-price card pattern (Plan/PlanCard) — Phase 2 precedent for D-02/D-03 above
- Gradient-placeholder-box pattern (PortfolioShowcase) — Phase 2 precedent for D-06 above
- Filtered-by-category composition (`testimonials.filter(t => t.category === "X" || t.category === "both")`) — exact pattern to reuse for D-08

### Integration Points
- `src/types/index.ts` — `GuestTier` interface needs replacing with `RentalPackage`; `Testimonial` and `ProcessStep` types already support podcast category, no changes needed there
- `src/data/guestTiers.ts` → rework into `src/data/packages.ts` (or rename in place) with new `RentalPackage[]` shape
- `src/components/podcast/GuestTierCard.tsx` → `PackageCard.tsx`
- `src/pages/Podcast.tsx` — reorder sections per D-09, remove Episodes section per D-10, add Gallery/Logistics/FAQ, compose Testimonials/Process, rewrite all copy
- `src/data/episodes.ts`, `src/components/podcast/EpisodeCard.tsx` — check for other usages before deleting; if unused elsewhere, remove as part of D-10
- `src/pages/Agency.tsx` — verified during discussion, **no changes needed** (already Hero → Plans → rest, per D-11)

</code_context>

<deferred>
## Deferred Ideas

- Real studio address, real Calendly link, live booking integration — explicitly out of scope for this milestone (v2 territory per PROJECT.md)
- Real studio photography (replacing gradient placeholders) — flagged as v2 MEDIA-02 in STATE.md blockers
- NAV-01 (Agency/Podcast equal structural weight verification) and NAV-02 (cross-sell CTAs) — Phase 4 requirements, not this phase
- DSGN-01/02/03 (sitewide visual polish, mobile QA, CTA obviousness audit) — Phase 4 requirements

</deferred>

---

*Phase: 03-podcast-page-studio-rental-rework-full-integration*
*Context gathered: 2026-07-29*
