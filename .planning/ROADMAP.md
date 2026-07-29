# Roadmap: Rouh

## Overview

Rouh's frontend goes from a placeholder-copy, structurally-lopsided, business-model-mismatched SPA to a premium two-sided site where a visitor immediately understands both the Agency and Podcast studio-rental offerings and trusts either enough to book a call. The journey runs as four vertical-MVP phases: first a shared design contract and reusable trust/process components are built once so nothing downstream drifts into generic-agency visual tropes; then the Agency page is brought to a fully polished, visitable end state as the reference pattern (portfolio, testimonials, process, real copy); then the Podcast page follows the same pattern while simultaneously correcting its core business-model mismatch (guest-appearance tiers become studio rental packages, with gear lists, logistics, and FAQ); finally a sitewide pass locks in final copy everywhere (including Home and Contact, which get no dedicated phase of their own), hunts down every remaining trace of stale guest-appearance language, and verifies Agency and Podcast truly carry equal structural weight.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design System Contract + Shared Primitives** - Establish the visual token contract and build reusable, page-agnostic testimonials/process components before any page is touched
- [ ] **Phase 2: Agency Page — Reference Implementation** - Bring the Agency page to a fully polished, complete, visitable state (portfolio, testimonials, process, real copy) as the pattern the rest of the site follows
- [ ] **Phase 3: Podcast Page — Studio Rental Rework + Full Integration** - Correct the podcast business model (guest tiers → rental packages) and bring the Podcast page to the same complete, polished state as Agency
- [ ] **Phase 4: Sitewide Copy, Terminology & Parity QA** - Finalize copy and design polish across every remaining page (Home, Contact, nav, footer), eliminate all stale guest-appearance language, and verify Agency/Podcast equal weight

## Phase Details

### Phase 1: Design System Contract + Shared Primitives
**Goal**: A documented visual/design-token contract exists and reusable, page-agnostic trust components (testimonials, "how it works" process) are built and proven — ready for Agency and Podcast to consume identically, so "equal weight" and "elevated but on-brand" are enforced structurally rather than left to drift.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: None — infrastructure phase. Enables TRUST-01, TRUST-02, TRUST-04, TRUST-05 (Phases 2-3) and DSGN-01 (Phase 4) by providing the shared building blocks and rules they consume.
**Success Criteria** (what must be TRUE):
  1. A written design contract (spacing scale, corner radius, shadow rules, color usage ratios, graphic-element placement rules) exists and is specific enough to guide Agency/Podcast page work without re-litigating "what does premium mean" per page
  2. A reusable `TestimonialsSection` component renders a balanced-looking set of quote cards correctly when given either agency-tagged or podcast-tagged sample data, with no page-specific code required
  3. A reusable `ProcessSection` component renders a "how it works" step sequence correctly when given either agency or podcast sample data, with no page-specific code required
  4. The new dependencies (motion, tw-animate-css, clsx/tailwind-merge/class-variance-authority, lucide-react) are installed and at least one micro-interaction (e.g. scroll-reveal or hover state) is visibly working somewhere in the app, confirming the tooling is wired up correctly
**Plans**: TBD

### Phase 2: Agency Page — Reference Implementation
**Goal**: A visitor can land on the Agency page and get a complete, trustworthy, premium impression of the agency service — proof of past work, a clear engagement process, real client voices, and real copy — establishing the reference pattern Podcast will follow.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: PORT-01, TRUST-01, TRUST-04
**Success Criteria** (what must be TRUE):
  1. Visitor can view a portfolio/case-study showcase of past Agency work on the Agency page
  2. Visitor can read testimonials from Agency clients on the Agency page, rendered via the shared `TestimonialsSection`
  3. Visitor can view a "how it works" process section explaining the concrete steps of engaging the Agency, rendered via the shared `ProcessSection`
  4. Visitor experiences the Agency page as elevated and polished per the Phase 1 design contract, can use it fully on mobile without layout breakage, and sees an obvious CTA to book a call
**Plans**: TBD
**UI hint**: yes

### Phase 3: Podcast Page — Studio Rental Rework + Full Integration
**Goal**: A visitor can land on the Podcast page and correctly understand it as "rent our studio + gear to record your own podcast" (not "pay to appear as a guest on Rouh's show"), see everything needed to trust and book a session, and experience the same completeness and polish as the Agency page.
**Mode:** mvp
**Depends on**: Phase 1, Phase 2
**Requirements**: STUD-01, STUD-02, STUD-03, STUD-04, STUD-05, STUD-06, STUD-07, TRUST-02, TRUST-05
**Success Criteria** (what must be TRUE):
  1. Visitor sees rental packages correctly framed as studio+gear rental for their own podcast — with itemized equipment lists (mics, cameras, lighting, capacity), session duration, gear tier, and dry-hire vs. staffed options — and no price shown, matching the Agency page's no-price pattern
  2. Visitor can find studio location/logistics (address, parking, access notes) and read a studio-specific FAQ (cancellation/reschedule policy, session length, staffing option, room capacity) on the Podcast page
  3. Visitor can browse a photo gallery of the studio space using placeholder imagery
  4. Visitor booking a studio session completes the existing reservation flow driven by the corrected package data, with zero guest-appearance language remaining anywhere in the form copy
  5. Visitor can read testimonials from Podcast studio renters and view a "how it works" process section explaining the steps of booking the studio, both rendered via the same shared components used on Agency
**Plans**: TBD
**UI hint**: yes

### Phase 4: Sitewide Copy, Terminology & Parity QA
**Goal**: Every page on the site — including Home and Contact, which receive no dedicated build phase of their own — carries final brand-voice copy, zero stale guest-appearance language, and demonstrable equal structural weight between Agency and Podcast, closing the milestone.
**Mode:** mvp
**Depends on**: Phase 2, Phase 3
**Requirements**: COPY-01, COPY-02, TRUST-03, DSGN-01, DSGN-02, DSGN-03, NAV-01, NAV-02
**Success Criteria** (what must be TRUE):
  1. Visitor reads final brand-voice copy (no placeholder text) across Agency services/plans, Podcast studio packages, and all section copy sitewide, including Home and Contact
  2. A full-site check (every page, nav, footer, and form copy) confirms zero stale guest-appearance language ("guest," "our show," "featured guest," etc.) remains anywhere
  3. The testimonials section shows a balanced number of quotes for Agency vs. Podcast, not skewed toward either service
  4. Every page (Home, Agency, Podcast, Contact) reflects the Phase 1 design contract's elevated treatment, works on mobile without layout breakage or unusable controls, and shows an obvious CTA to book a call/session
  5. Agency and Podcast have matching nav treatment, comparable homepage real estate, and comparable content depth (portfolio/gear list, pricing structure, testimonials); a visitor on either page can find a cross-sell CTA pointing to the other service
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System Contract + Shared Primitives | 0/TBD | Not started | - |
| 2. Agency Page — Reference Implementation | 0/TBD | Not started | - |
| 3. Podcast Page — Studio Rental Rework + Full Integration | 0/TBD | Not started | - |
| 4. Sitewide Copy, Terminology & Parity QA | 0/TBD | Not started | - |
