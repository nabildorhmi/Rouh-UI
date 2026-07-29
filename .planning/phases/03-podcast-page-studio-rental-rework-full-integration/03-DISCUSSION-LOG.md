# Phase 3: Podcast Page — Studio Rental Rework + Full Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-29 (auto-drafted, then reviewed interactively same day)
**Phase:** 03-podcast-page-studio-rental-rework-full-integration
**Mode:** auto draft → interactive follow-up review
**Areas discussed:** Rental package structure, No-price data model, Component reuse, Studio logistics, FAQ section, Photo gallery, Guest-language removal, Testimonials/Process composition, Page section order, Episodes removal (new), Agency page order (new)

---

## Rental package structure (STUD-01, STUD-02, STUD-03)

| Option | Description | Selected |
|--------|-------------|----------|
| 2 packages (keep current guestTiers shape, just rename) | Minimal change, less parity with Agency's 3-tier structure | |
| 3 packages, duration × staffing × gear-tier dimensions | Mirrors Agency's proven Starter/Growth/Premium pattern; supports NAV-01 parity groundwork | ✓ |
| Single configurable package (à la carte) | More flexible but no precedent in codebase, higher planning risk | |

**Selected:** 3 packages — Solo Session / Crew Session (highlighted) / Full Day Production — mirroring Agency's 3-tier card pattern.
**Notes:** STATE.md blockers flagged this specific decision as needing stakeholder input, not further research. Auto-selected a concrete, reasonable default per `--auto` mode contract; CONTEXT.md flags this for human review before Phase 3 execution.

---

## No-price data model (STUD-03)

**Selected:** Remove `price` field entirely, new `RentalPackage` interface replacing `GuestTier`, matching Agency's no-price `Plan` pattern from Phase 2.
**Notes:** Direct precedent exists (Phase 2 D-02) — low-ambiguity, high-confidence auto-selection.

---

## Component reuse (STUD-01, STUD-02, STUD-03)

**Selected:** Rename `GuestTierCard.tsx` → `PackageCard.tsx`, same card chrome, remove price block, add itemized equipment sub-list, CTA text "Book this session".
**Notes:** Follows the "reuse existing visual treatment, change data shape" approach used successfully in Phase 2.

---

## Studio logistics (STUD-04)

| Option | Description | Selected |
|--------|-------------|----------|
| Interactive map embed | Visually richer, requires new external dependency/API key | |
| Static text block (address, parking, access) | No new dependency, consistent with frontend-only project scope | ✓ |

**Selected:** Static text block.
**Notes:** Avoids scope creep into a mapping API integration not requested by requirements.

---

## FAQ section (STUD-05)

**Selected:** Content locked (cancellation/reschedule, session length, staffing choice, capacity); UI pattern (accordion vs. static list) left to Claude's Discretion.
**Notes:** No strong precedent in codebase either way; low-stakes UI choice, deferred to planning/execution.

---

## Photo gallery (STUD-06)

**Selected:** Reuse Phase 2's gradient-placeholder-box pattern from `PortfolioShowcase.tsx`.
**Notes:** Direct precedent, keeps placeholder-imagery treatment consistent sitewide.

---

## Guest-appearance language removal (STUD-01, STUD-07)

**Selected:** Full audit of Podcast page + ReservationModal/Form copy under `mode="podcast"`.
**Notes:** `CALENDLY_LINKS.podcast` URL slug still contains "guest" but is a placeholder link string, not rendered visitor-facing copy — noted as Claude's Discretion cleanup, not a blocking requirement.

---

## Testimonials/Process composition (TRUST-02, TRUST-05)

**Selected:** Reuse existing shared components with existing podcast-tagged data (`testimonials.ts`, `process.ts`) — no new data needed.
**Notes:** Both data files already contain podcast-ready entries from Phase 1 scaffolding; this is pure wiring work, high-confidence auto-selection.

---

## Page section order (original auto-draft, superseded below)

**Selected:** Hero → Packages → Episodes → Studio Gallery → Logistics & FAQ → Testimonials → Process → ReservationModal.
**Notes:** Packages placed second (not buried) to mirror Agency's Hero→Plans CTA-prominence rationale from Phase 2 D-01.

---

## Interactive review session (2026-07-29)

User selected "Rental package structure" to discuss from the presented gray-area list.

### Rental package structure — confirmed
Three follow-up questions asked one at a time:
1. Keep 3-package structure (Solo/Crew/Full Day) vs. 2 packages vs. different dimensions → **Keep 3 packages**
2. Keep names/durations (4hr/4hr/8hr) as drafted vs. change → **Keep as drafted**
3. Keep gear tiers/capacity numbers as drafted vs. adjust vs. mark placeholder → **Keep as drafted**

**Outcome:** All three sub-decisions confirmed as originally auto-drafted. This resolves the STATE.md blocker — the structure is now a user-confirmed decision, not an unverified guess. See CONTEXT.md D-01.

### Scope change raised by user mid-wrapup
When asked "ready to write CONTEXT.md, or more to discuss?", user introduced two unplanned changes:
> "before writing context.md just for podcast page remove episode list etc and i want package list to show up first in page both in podcast area and agency area"

**Follow-up 1 — Episodes removal:** Original phase boundary explicitly kept Episodes as separate, untouched content. Asked to confirm: delete entirely vs. keep-but-reorder. **User: remove Episodes entirely.** See CONTEXT.md D-10.

**Follow-up 2 — Package position:** Asked whether "first" meant above Hero or right after Hero. **User: right after a small intro, everything else below.** See CONTEXT.md D-09.

**Follow-up 3 — Agency reorder scope flag:** Applying this to Agency.tsx touches a Phase 2 deliverable outside Phase 3's roadmap requirements (STUD-*/TRUST-02/TRUST-05 only). Asked whether to do it now in Phase 3 or defer to Phase 4 (which already owns cross-page parity work). **User: do it now in Phase 3.**

**Investigation finding:** Reading `Agency.tsx` showed it already has Hero → Plans → Services → Portfolio → Testimonials → Process — Plans is already the 2nd section. Asked user to confirm current Hero length ("title + one paragraph") counts as "small intro." **User: current length is fine.** Net result: **no code changes needed to Agency.tsx** — the decision to "do it now in Phase 3" ended up being a no-op once verified against the actual code. See CONTEXT.md D-11.

---

## Claude's Discretion

- FAQ accordion vs. static list UI pattern
- Exact studio address/parking placeholder copy wording
- Equipment list icon treatment
- Whether to cosmetically rename the `CALENDLY_LINKS.podcast` slug

## Deferred Ideas

- Real studio address, real Calendly link, live booking integration — v2/out of scope
- Real studio photography — v2 MEDIA-02
- NAV-01, NAV-02, DSGN-01/02/03 — Phase 4 requirements, not this phase
