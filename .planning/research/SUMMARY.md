# Project Research Summary

**Project:** Rouh — dual-service marketing site (creative/marketing agency + podcast studio rental)
**Domain:** Premium marketing-site redesign/rebrand-lite of an existing React SPA, executed against a locked brand system, no backend, no framework change
**Researched:** 2026-07-29
**Confidence:** HIGH

## Executive Summary

Rouh is a redesign, not a greenfield build: a working React 19 + TypeScript + Vite + Tailwind v4 SPA already exists with the right structural pattern (pages -> components -> typed static data, mode-aware shared reservation components, no global state, no backend). The research converges on a single throughline -- every recommended addition (animation library, testimonials, process section, studio-package data remodel) should be additive to this existing pattern, not a rearchitecture. The stack layer is settled with high confidence: `motion` (Framer Motion rebranded) for micro-interactions, `tw-animate-css` for Tailwind v4-native utility animations, `clsx`/`tailwind-merge`/`class-variance-authority` for variant styling, `lucide-react` for icons, and optionally `embla-carousel-react` and Radix primitives (`accordion`, `tabs`) -- all verified as React 19-compatible via live peer-dependency checks. No full UI kit, no state library, no CMS -- all correctly out of scope for this milestone.

The two hardest problems are not technical, they're content/parity problems. First, the podcast page's "guest tiers" data model fundamentally misrepresents the business (it currently reads as "pay to appear on Rouh's show" when the real product is "rent our studio + gear to record your own show") -- this requires a genuine content-model rework (new fields: duration, gear tier, crew/self-serve), not a find-and-replace rename, and stale guest-appearance language must be hunted down sitewide (Home, Contact, footer, reservation form copy), not just on the Podcast page. Second, "equal weight" between Agency and Podcast is a qualitative goal that reliably erodes through unconscious drift (agency being the more familiar business type in training data/precedent) unless enforced structurally -- via shared, prop-driven components (`TestimonialsSection`, `ProcessSection`) consumed identically by both pages, plus an explicit parity checklist (section count, testimonial count, CTA treatment, Home above-the-fold hierarchy) checked as a QA gate, not assumed.

The recommended approach: establish a visual/design-token contract and build shared presentational primitives *before* touching individual pages, remodel the podcast package data as a dedicated content-model phase (not folded into visual polish), wire the new shared sections into Agency first as a reference implementation with a human checkpoint, then replicate to Podcast (where the content-model change and the new sections land together), and close with a sitewide terminology grep + cross-page parity QA phase. This sequencing directly avoids the two dominant failure modes surfaced by pitfalls research: undeclared visual drift into generic-agency tropes, and inconsistent/contradictory business-model language shipping across page boundaries.

## Key Findings

### Recommended Stack

The existing stack (React 19.2.7, TypeScript, Vite 8.1.1, Tailwind v4.3.3, React Router, React Hook Form) is locked and correct -- research only covers additive libraries needed to reach "premium/polished." All recommendations were verified against the live `package.json` (zero animation/carousel/icon/class-utility libraries currently installed) and live npm peer-dependency data for React 19 compatibility.

**Core technologies:**
- `motion` (12.43.0) -- micro-interactions, scroll reveals, hover/tap states -- canonical post-rebrand Framer Motion package; declarative `whileInView`/`useReducedMotion` API fits a React 19 marketing site with zero peer-dep friction
- `tw-animate-css` (1.4.0) -- utility-class keyframe animations for simple transitions -- Tailwind v4-native CSS-first replacement for the legacy JS-plugin `tailwindcss-animate`
- `clsx` + `tailwind-merge` + `class-variance-authority` -- standard `cn()` utility and type-safe variant APIs for buttons/cards as the redesign introduces more conditional styling states
- `lucide-react` (1.27.0) -- tree-shakeable icon set for UI chrome (chevrons, checkmarks, nav icons); codebase currently has zero icon library
- `embla-carousel-react` / `@radix-ui/react-accordion` / `@radix-ui/react-tabs` -- conditional-use unstyled primitives (carousel only if testimonials outgrow a static grid; tabs if Agency/Podcast process needs a toggle to preserve equal-weight framing)
- `vite-plugin-image-optimizer` (dev-only) -- build-time image compression, necessary because this is a static-hosted site with no CDN/on-request optimization

Explicitly avoid: any full UI kit (MUI/Chakra/Bootstrap -- would fight the locked brand system), `react-fast-marquee` (no React 19 peer-dep support), GSAP as a default choice (overkill for this scope), and the legacy `framer-motion` package name.

### Expected Features

Research treats this as two distinct buyer journeys sharing one site -- agency = ongoing retainer relationship, podcast rental = one-off/recurring space booking -- and both need equal structural weight without forcing identical content shape.

**Must have (table stakes):**
- Corrected studio rental package data (replacing "guest tiers") with itemized gear/equipment list -- the single highest-priority content-accuracy fix in the whole project
- Real marketing copy across both service lines (already Active in PROJECT.md)
- Testimonials/social-proof section, balanced across both service lines (minimum split, not a pooled list that silently favors one)
- "How it works"/process section covering both booking paths
- Equal visual/structural weight between Agency and Podcast (nav, homepage real estate, page depth)
- Mobile-friendly, obvious low-friction CTA to book a call, on every page

**Should have (competitive differentiators):**
- Named/branded process steps (not generic "discover, design, deliver") reinforcing premium positioning
- Cross-sell CTAs between Agency and Podcast pages
- Equipment specificity (brand/model-level gear detail) and explicit dry-hire vs. wet-hire clarity for the podcast side
- Studio location/logistics info and a condensed studio-specific FAQ (cancellation policy, session length, capacity)

**Defer (v2+):**
- Live/real-time availability calendar and real payment/deposit collection (both require a backend, explicitly out of scope)
- Full 360°/VR virtual studio tour (disproportionate cost; a strong photo gallery is the pragmatic version now)
- AI-assisted portfolio filtering (not aligned with stated goals)
- Portfolio/case-study showcase for the agency side is flagged as a possible gap worth confirming with the user -- common table stakes elsewhere but not explicitly in Active requirements

### Architecture Approach

Extend the existing `pages/ -> components/{shared,agency,podcast}/ -> data/ (+ types/)` pattern with zero new architectural concepts. New cross-cutting content (testimonials, process) becomes shared, prop-driven presentational components consumed identically by Agency and Podcast pages -- this is the mechanism that structurally enforces "equal weight" rather than leaving it to chance. The podcast package remodel is a rename-in-place of the existing proven tier-card pattern (`GuestTierCard` -> `StudioPackageCard`, `guestTiers.ts` -> `studioPackages.ts`), not a new subsystem -- same grid -> card -> `onSelect` -> modal flow, just correct field content (duration, gear, crew/self-serve) instead of guest-appearance framing.

**Major components:**
1. `TestimonialsSection` / `TestimonialCard` (new, `components/shared/`) -- page-agnostic layout consuming a pre-filtered `Testimonial[]` array; filtering by `category: "agency"|"podcast"|"both"` happens at the page boundary, not inside the component
2. `ProcessSection` / `ProcessStepItem` (new, `components/shared/`) -- same pattern, consumes `steps: ProcessStep[]` plus heading props; each page passes its own slice of `data/process.ts`
3. `StudioPackageCard` (rename of `GuestTierCard`, `components/podcast/`) -- re-modeled rental package data flowing through the unchanged `ReservationModal`/`ReservationForm` contract (mode="podcast"); only field content and podcast-mode form copy change, not the component architecture

Recommended build order: types -> data layer (parallel with copywriting) -> studio package migration (isolated, de-risks reservation flow first) -> shared presentational primitives -> wire into Agency (reference implementation) -> wire into Podcast (content-model change lands here too) -> reservation form copy pass -> optional Home integration (roadmap-gated, not required).

### Critical Pitfalls

1. **"Elevation" drifts into an undeclared rebrand** -- without a concrete design-token contract (spacing scale, corner radius, shadow rules, exact color usage ratios), "premium" polish regresses toward generic-agency visual tropes even with locked hex values technically unchanged. Avoid by producing a DESIGN.md/style contract as an early phase gate, before any page-level redesign work.
2. **Guest-tier -> rental-package reframe treated as a rename, not a business-model rewrite** -- shallow noun swaps leave contradictory copy (e.g., "includes editing by our team" next to "you bring your own guest and record independently"). Avoid by treating this as a new content schema (duration, gear tier, crew/self-serve) and line-by-line re-evaluating every sentence referencing "guest," "our show," "featured," etc.
3. **Repositioning language leaks inconsistently sitewide** -- fixing only the Podcast page's tier cards leaves stale guest-appearance framing on Home, Contact, footer, reservation-form copy, and meta tags. Avoid with a full-repo text search for stale terminology as an explicit done-criterion, not just "Podcast page updated."
4. **One service line gets richer treatment through incremental drift, not intent** -- "equal prominence" silently fails as Agency (more training-data precedent) accumulates more sections/imagery/testimonials than Podcast. Avoid with a literal parity checklist (section types, nav weight, testimonial count, CTA treatment, above-the-fold hierarchy on Home) checked as an explicit QA gate.
5. **Shared reservation components (`ReservationForm`/`Modal`/`ConfirmationStep`) silently diverge** -- these are already mode-aware and untested; patching the podcast-mode branch for new package data can regress agency-mode with nothing to catch it. Avoid by requiring manual verification of *both* modes after any change to shared reservation components.

## Implications for Roadmap

Based on combined research, suggested phase structure:

### Phase 1: Design System Contract + Shared Primitives
**Rationale:** Pitfalls 1 and 6 (undeclared rebrand drift, agent-driven architectural inconsistency) are both prevented by the same fix -- a documented visual contract and reusable shared components built once, before any page is touched. This must come first because everything downstream (Agency, Podcast, Home) consumes it.
**Delivers:** DESIGN.md-style token contract (spacing scale, corner radius, shadow rules, color usage ratios, graphic-element placement rules); new shared components (`TestimonialsSection`, `TestimonialCard`, `ProcessSection`, `ProcessStepItem`) built and verified against both an agency and podcast data slice, but not yet wired into pages; new dependencies installed (`motion`, `tw-animate-css`, `clsx`/`tailwind-merge`/`class-variance-authority`, `lucide-react`).
**Addresses:** Testimonials and "how it works" section requirements (structurally, not yet content-populated)
**Avoids:** Pitfall 1 (rebrand drift), Pitfall 6 (architectural drift/duplicated patterns)

### Phase 2: Podcast Content-Model Rework
**Rationale:** Pitfall 2 is the highest-cost-if-late mistake in the whole project -- package data must be correctly re-derived (duration, gear tier, crew/self-serve, add-ons) before any card layout is built around it, or layout work has to be redone. This is a content/schema phase, not a visual phase, and should run before or in parallel with Phase 3's Podcast-page visual work.
**Delivers:** New `StudioPackage` type and `data/studioPackages.ts` (rename of `guestTiers.ts`) with correct rental-package fields; `StudioPackageCard` component (rename of `GuestTierCard`); updated `ReservationForm` podcast-mode field labels/copy (self-serve session details instead of guest-appearance bio/dates).
**Uses:** Architecture Pattern 3 (Rename-in-Place for Re-modeled Data) -- reuses the proven tier->card->select->reserve flow verbatim
**Implements:** `StudioPackageCard` component, `ReservationForm`/`Modal` internal `mode === "podcast"` branch

### Phase 3: Agency Page -- Reference Implementation
**Rationale:** Per pitfall research, the roadmap should name one page as the reference implementation and get a human checkpoint before replicating the pattern -- Agency is the simpler integration (no reservation-item grid to reconcile with, unlike Podcast) and validates the shared components/design contract against one real page first.
**Delivers:** Agency page wired with `TestimonialsSection` (agency-filtered testimonials) and `ProcessSection` (agency process steps), real marketing copy, mobile/CTA polish applied using the Phase 1 design contract.
**Addresses:** Testimonials, process section, real copy, mobile/UX polish (all Active requirements) for the Agency side
**Avoids:** Pitfall 7 (no human-in-the-loop checkpoint) -- this phase's completion is the designated review point before Podcast/remaining pages follow

### Phase 4: Podcast Page -- Full Integration + Parity Pass
**Rationale:** This is where the Phase 2 content-model change and the Phase 1 shared sections coexist on one page, plus where the highest-risk pitfall combination (business-model correction + equal-weight requirement) needs to be validated together.
**Delivers:** Podcast page wired with `TestimonialsSection`/`ProcessSection` (podcast-filtered), `StudioPackageCard` grid replacing `GuestTierCard`, real copy, layout ordering resolved (episodes -> packages -> process -> testimonials).
**Addresses:** Studio rental package correction, testimonials, process section, equal-weight requirement -- applied against the validated Phase 3 pattern
**Avoids:** Pitfall 4 (unequal service prominence), Pitfall 5 (shared-component regression -- requires re-verifying agency mode after this phase's changes)

### Phase 5: Sitewide Terminology + Parity QA
**Rationale:** Pitfalls 3 and 4 are cross-cutting and cannot be caught by page-scoped work alone -- they require an explicit verification pass across the whole site (Home, Contact, footer, nav, meta tags) after the page-level phases are "done."
**Delivers:** Full-repo grep confirming zero stale guest-appearance terminology; side-by-side Agency/Podcast/Home parity checklist (section counts, testimonial counts, CTA treatment, above-the-fold hierarchy) passed; Home page integration decision made explicitly (whether Home surfaces a condensed testimonials/process teaser) rather than left ambiguous.
**Addresses:** Sitewide consistency, equal-weight verification, Home page's undecided integration point flagged in ARCHITECTURE.md

### Phase Ordering Rationale

- Design contract and shared components must precede page work because every subsequent phase depends on them (Pitfall 1, 6) -- building them twice or retrofitting consistency later is the most expensive recovery path per PITFALLS.md.
- Podcast content-model correction is sequenced as its own phase, separable from Podcast's visual redesign, because getting the data model right is a prerequisite for laying out cards around it correctly (Architecture "Suggested Build Order" step 2-3).
- Agency-before-Podcast ordering exists specifically to create a low-risk, low-complexity reference implementation with a human checkpoint (Pitfall 7) before the higher-risk Podcast phase (which carries both the new-sections work and the content-model change simultaneously).
- A dedicated final QA phase exists because parity and terminology-consistency pitfalls are explicitly cross-page/cross-component and are not naturally caught by any single page-scoped phase's done-criteria.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Podcast Content-Model Rework):** Needs concrete rental-package structure decisions (duration tiers, gear tiers, crew vs. self-serve pricing conventions) -- FEATURES.md provides competitor patterns but the actual Rouh package structure/pricing still needs to be defined collaboratively, likely via `--research-phase` or direct stakeholder input during phase planning.
- **Phase 5 (Sitewide Parity QA):** The Home page's integration scope is explicitly flagged as undecided in ARCHITECTURE.md ("flag for roadmap, not a blocker") -- needs a scope decision before this phase can be planned in detail.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Design Contract + Shared Primitives):** Stack and architecture are both HIGH confidence, directly grounded in the existing codebase and verified library compatibility -- no additional research needed.
- **Phase 3 / Phase 4 (Agency/Podcast page integration):** Architecture pattern (rename-in-place, prop-driven shared sections) is fully specified with code examples in ARCHITECTURE.md; standard React composition, no novel patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified via Context7 official docs and live npm peer-dependency data against the actual `package.json`; all recommendations confirmed React 19-compatible |
| Features | MEDIUM-HIGH | WebSearch-sourced and cross-checked across multiple agency/studio-rental reference sites; no Context7-eligible libraries apply to this content/UX question, so confidence is inherently capped below the stack/architecture layers |
| Architecture | HIGH | Grounded directly in the existing, mapped codebase (direct source reads of actual components/pages/types) rather than external speculation -- this was an internal-fit question, not a "what does the ecosystem do" question |
| Pitfalls | MEDIUM-HIGH | Synthesis of verified web sources (redesign/rebranding failure patterns, AI-agent design-system guidance) plus direct inspection of this repo's own CONCERNS.md -- well-covered domain but no single source addresses this exact agency+studio-rental combination |

**Overall confidence:** HIGH

### Gaps to Address

- **Actual studio rental package structure/pricing:** FEATURES.md surfaces competitor conventions (hourly $40-250/hr, gear-tier packages) but Rouh's specific package definitions (duration options, gear tiers, crew/self-serve split, add-ons) are not yet decided -- must be resolved during Phase 2 planning, likely with direct stakeholder input, not further research.
- **Agency portfolio/case-study showcase:** Flagged as a common table-stakes feature in competitor research but not explicitly listed in PROJECT.md's Active requirements -- needs a scope confirmation with the user before roadmap treats it as in/out of this milestone.
- **Home page integration scope:** Whether Home gets a condensed testimonials/process teaser is architecturally trivial to support but a genuine open scope decision -- should be resolved explicitly during roadmap creation rather than left implicit.
- **Studio photography assets:** Several podcast-side trust features (photo gallery, "recorded here" showcase) depend on real studio photography that may not yet exist -- flag as an asset dependency to confirm availability/timeline before committing it to an early phase.

## Sources

### Primary (HIGH confidence)
- Context7 `/websites/motion_dev` -- `useReducedMotion`, `whileInView` scroll animation patterns
- Context7 `/davidjerleke/embla-carousel`, `/websites/embla-carousel` -- carousel library validation
- Live `npm view` peer-dependency data for `motion`, `embla-carousel-react`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`, `@radix-ui/react-accordion`, `@radix-ui/react-tabs`, `tw-animate-css`, `react-fast-marquee` -- pulled 2026-07-29 against this project's actual `package.json`
- Direct source reads: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`, `.planning/codebase/CONCERNS.md`, `.planning/PROJECT.md`, `src/pages/Podcast.tsx`, `src/pages/Agency.tsx`, `src/pages/Home.tsx`, `src/data/guestTiers.ts`, `src/data/plans.ts`, `src/types/index.ts`, `src/components/podcast/GuestTierCard.tsx`, `src/components/shared/ReservationForm.tsx`, `src/components/shared/ReservationModal.tsx`

### Secondary (MEDIUM confidence)
- WebSearch: "tailwindcss-animate vs tw-animate-css Tailwind CSS v4 compatibility" -- cross-referenced across community sources
- WebSearch: agency-site and studio-rental-site feature landscape (Colorlib, 99designs, Teamwork, Krishaweb, Awwwards, Giggster, CTRL Collective, Peerspace) -- 20+ sources cross-checked for table-stakes and differentiator patterns
- WebSearch: AI-agent design-system/consistency failure patterns (Trilogy AI, Medium) and website redesign/rebranding failure patterns (Spiral Scout, Blacksmith Agency, Shakuro, SmashBrand, Forbes Agency Council) -- synthesized into pitfalls, well-covered but not domain-exact

### Tertiary (LOW confidence)
- None flagged -- all findings were corroborated by at least two independent sources or direct codebase inspection.

---
*Research completed: 2026-07-29*
*Ready for roadmap: yes*
