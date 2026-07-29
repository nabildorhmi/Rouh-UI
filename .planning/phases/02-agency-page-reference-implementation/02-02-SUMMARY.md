---
phase: 02-agency-page-reference-implementation
plan: 02
subsystem: ui
tags: [react, typescript, tailwind, agency-page]

# Dependency graph
requires:
  - phase: 01-design-system-contract-shared-primitives
    provides: shared TestimonialsSection, ProcessSection, testimonials.ts, process.ts data modules
provides:
  - PortfolioShowcase gradient box with no visible "Placeholder image" label
  - Agency.tsx page reordered to Hero -> Plans -> Services -> Portfolio -> Testimonials -> Process -> ReservationModal
  - Agency page composing shared TestimonialsSection (agency-filtered) and ProcessSection (processSteps.agency) for the first time
  - Final, non-placeholder Hero description copy on the Agency page
affects: [02-agency-page-reference-implementation (later plans in this phase), 04-sitewide-qa]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Section composition: shared TestimonialsSection/ProcessSection own their own <section> wrapper and are placed directly in page JSX without an extra wrapping <section>"]

key-files:
  created: []
  modified:
    - src/components/agency/PortfolioShowcase.tsx
    - src/pages/Agency.tsx

key-decisions:
  - "Hero description grep in the plan's acceptance criteria (\"already some momentum\") had a word-order typo relative to both the plan's own <action> prose and 02-UI-SPEC.md (\"already have some momentum\"); implemented the UI-SPEC/action wording verbatim since it is the authoritative source, not the mismatched grep pattern"

patterns-established:
  - "Pattern: page sections composed from shared components (TestimonialsSection, ProcessSection) are placed as top-level JSX siblings with no extra <section> wrapper, since the shared components render their own section wrapper internally"

requirements-completed: [PORT-01, TRUST-01, TRUST-04]

# Metrics
duration: ~10min
completed: 2026-07-29
---

# Phase 02 Plan 02: Portfolio placeholder removal, Agency page reorder, and Hero copy finalization Summary

**PortfolioShowcase gradient box stripped of its "Placeholder image" label, and Agency.tsx reordered to Hero -> Plans -> Services -> Portfolio -> Testimonials -> Process with agency-filtered TestimonialsSection, processSteps.agency-driven ProcessSection, and a finalized non-placeholder Hero description.**

## Performance

- **Duration:** ~10 min
- **Completed:** 2026-07-29
- **Tasks:** 2 completed
- **Files modified:** 2

## Accomplishments
- Removed the literal "Placeholder image" span and its accompanying comment from `PortfolioShowcase.tsx`, leaving the gradient box shell (`aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20`) and the category/title/description block untouched
- Reordered `Agency.tsx`'s JSX to Hero -> Plans -> Services -> Portfolio -> Testimonials -> Process -> ReservationModal, matching D-01 exactly, with `ReservationModal` remaining the unconditional last element
- Composed the shared `TestimonialsSection` (filtered to `category === "agency" || category === "both"`) and `ProcessSection` (`processSteps.agency`) on the Agency page for the first time, delivering TRUST-01 and TRUST-04
- Rewrote the Hero's `description` prop from the literal placeholder string to final brand-voice copy, while leaving `eyebrow` and `title` untouched
- Preserved `selectedPlan` state (`useState<Plan | null>(null)`) and `ReservationModal` wiring (`open={!!selectedPlan}`, plan-name/mode/calendly props) exactly, with the Plans section moved but its internal PlanCard `onSelect` wiring unchanged

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove "Placeholder image" label from PortfolioShowcase.tsx (D-04)** - `27e3b3b` (fix)
2. **Task 2: Reorder Agency.tsx to Hero→Plans→Services→Portfolio→Testimonials→Process, wire new sections (D-01), and finalize the Hero description copy (D-02)** - `7733feb` (feat)

## Files Created/Modified
- `src/components/agency/PortfolioShowcase.tsx` - Gradient placeholder box now renders empty (self-closing `<div>`), no label text; layout/grid/gradient classes and the category/title/description block unchanged
- `src/pages/Agency.tsx` - Reordered to Hero → Plans → Services → Portfolio → Testimonials → Process → ReservationModal; adds `TestimonialsSection` (agency-filtered) and `ProcessSection` (processSteps.agency) compositions; Hero `description` prop rewritten to final copy; `selectedPlan` state and modal wiring unchanged; stale "Placeholder portfolio" comment removed

## Decisions Made
- Trusted `02-UI-SPEC.md`'s and the plan's `<action>` prose wording ("already have some momentum") over a mismatched word-order in the plan's own acceptance-criteria grep pattern ("already some momentum") — see Deviations below.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking, verification pattern typo] Plan's acceptance-criteria grep for the Hero description used different word order than the plan's own required copy**
- **Found during:** Task 2 verification
- **Issue:** The plan's `<action>` text and `02-UI-SPEC.md` both specify the Hero description must read "...brands that already have some momentum..." but the Task 2 `<acceptance_criteria>` grep checks for the substring `"already some momentum"` (missing "have"), which will never match the correctly-implemented copy.
- **Fix:** Implemented the description exactly as specified in the plan's `<action>` prose and 02-UI-SPEC.md (the authoritative copy), i.e. "We work best with brands that already have some momentum and want a partner to sharpen it — clear positioning, consistent execution, and a team that treats deadlines like commitments, not suggestions." Verified via `grep -c "already have some momentum" src/pages/Agency.tsx` returning 1, rather than the plan's literal (typo'd) grep string.
- **Files modified:** src/pages/Agency.tsx
- **Verification:** `grep -c "already have some momentum" src/pages/Agency.tsx` → 1; `grep -ci "placeholder" src/pages/Agency.tsx` → 0; `npx tsc --noEmit -p tsconfig.app.json` → exit 0
- **Committed in:** 7733feb (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking/verification-typo)
**Impact on plan:** No scope creep — implemented copy matches the plan's own authoritative sources (action prose + UI-SPEC.md) verbatim; only the plan's literal acceptance-criteria grep string (as written) would have failed to match correct output.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Verification Performed

- `grep -ci "placeholder" src/components/agency/PortfolioShowcase.tsx` → 0 (observed)
- `grep -c "aspect-\[4/3\] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20" src/components/agency/PortfolioShowcase.tsx` → 1 (observed)
- `grep -c "item.category" src/components/agency/PortfolioShowcase.tsx` → 1 (observed)
- `npx tsc --noEmit -p tsconfig.app.json` → exit 0, run twice (after each task) (observed)
- `npm run lint` (oxlint) → clean, no errors (observed)
- `grep -n "SectionHeading\|TestimonialsSection\|ProcessSection\|ServicesGrid\|PortfolioShowcase\|ReservationModal" src/pages/Agency.tsx` → confirmed ascending line-number order matching Hero(SectionHeading) → Plans(SectionHeading) → ServicesGrid → PortfolioShowcase → TestimonialsSection → ProcessSection → ReservationModal (observed)
- `grep -c "useState<Plan | null>(null)" src/pages/Agency.tsx` → 1 (observed)
- `grep -c "open={!!selectedPlan}" src/pages/Agency.tsx` → 1 (observed)
- `grep -c "py-16 sm:py-20" src/pages/Agency.tsx` → 1 (observed)
- `grep -c "move with intent" src/pages/Agency.tsx` → 1 (observed)
- `grep -c "already have some momentum" src/pages/Agency.tsx` → 1 (observed; plan's literal grep string omitted "have" — see Deviations)
- `grep -ci "placeholder" src/pages/Agency.tsx` → 0 (observed)
- Post-commit deletion check on both commits: no unexpected file deletions (observed)
- `git status --short | grep '^??'`: no untracked files left behind (observed)

**Not verified (no browser/live host available in this environment):** The plan's top-level `<verification>` step calling for `npm run dev` + manual browser load of `/agency` to visually confirm section order, testimonial/process card rendering, and the "Select this plan" → `ReservationModal` click flow was not run. Structural/behavioral equivalents (grep-based order/wiring checks above, plus tsc and lint) were run instead as the closest available proxy; a manual visual pass is still recommended before this plan is considered fully signed off end-to-end.

## Next Phase Readiness
- Agency page now has zero "placeholder" strings remaining and composes both shared trust-building sections (testimonials, process) for the first time
- Ready for subsequent plans in this phase (if any) or Phase 4 sitewide QA parity checks against the Podcast page equivalent

---
*Phase: 02-agency-page-reference-implementation*
*Completed: 2026-07-29*
