# Architecture Research

**Domain:** Marketing/creative agency + podcast studio rental site (React SPA redesign — additive milestone)
**Researched:** 2026-07-29
**Confidence:** HIGH (grounded directly in the existing, mapped codebase — no external domain speculation needed for this question)

## Context

This is not a "what does the ecosystem do" research question — it's "how do these three additions fit the *existing* architecture." The existing codebase (`.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`) already defines a clean, working pattern:

```
pages/  →  components/{ui,layout,home,agency,podcast,shared}/  →  data/ (+ types/)
```

No global state, no backend, static data as typed constants, page components own selection state (`useState`), shared components (`ReservationModal`/`ReservationForm`/`ConfirmationStep`) are mode-aware (`"agency" | "podcast"`) rather than duplicated. Every recommendation below reuses this pattern exactly — the goal is zero new architectural concepts, only new leaves on the existing tree.

## Standard Architecture (This Project, Extended)

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│  Pages (src/pages/)                                                   │
│  Home.tsx │ Agency.tsx │ Podcast.tsx │ Contact.tsx                    │
│  — own page-level selection state (useState) — no new pages/routes    │
└───────────────┬─────────────────────────────────┬─────────────────────┘
                │                                 │
                ▼                                 ▼
┌───────────────────────────┐   ┌───────────────────────────────────────┐
│  components/shared/        │   │  components/{agency,podcast}/          │
│  (cross-page, reusable)    │   │  (page-specific)                       │
│  ┌───────────────────────┐ │   │  ┌────────────────────────────────┐   │
│  │ TestimonialsSection    │ │   │  │ StudioPackageCard (was          │   │
│  │  └ TestimonialCard     │ │   │  │  GuestTierCard) — podcast/       │   │
│  ├───────────────────────┤ │   │  ├────────────────────────────────┤   │
│  │ ProcessSection         │ │   │  │ PlanCard — agency/               │   │
│  │  └ ProcessStepItem     │ │   │  └────────────────────────────────┘   │
│  ├───────────────────────┤ │   └───────────────────────────────────────┘
│  │ ReservationModal/Form  │ │                (unchanged, existing)
│  │ (existing, mode-aware) │ │
│  └───────────────────────┘ │
└───────────────┬─────────────┘
                │  (props: filtered data slices)
                ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Data Layer (src/data/) — static constants, no fetch, never mutated  │
│  testimonials.ts │ process.ts │ studioPackages.ts (was guestTiers.ts)│
│  + existing: services, plans, episodes, portfolio, config            │
└───────────────┬────────────────────────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────────────────────────────────────────┐
│  Types (src/types/index.ts) — Testimonial, ProcessStep, StudioPackage│
└──────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Location |
|-----------|----------------|----------|
| `TestimonialCard` | Render one quote/author/role; purely presentational, no state | `components/shared/TestimonialCard.tsx` (new) |
| `TestimonialsSection` | Layout wrapper: heading + grid of `TestimonialCard`s; accepts a pre-filtered `testimonials` array as a prop | `components/shared/TestimonialsSection.tsx` (new) |
| `ProcessStepItem` | Render one numbered step (title + description); purely presentational | `components/shared/ProcessStepItem.tsx` (new, optional — can be inlined in `ProcessSection` if steps are simple) |
| `ProcessSection` | Layout wrapper: heading + ordered list of steps; accepts `steps: ProcessStep[]` and heading copy as props | `components/shared/ProcessSection.tsx` (new) |
| `StudioPackageCard` | Render one studio rental package (price, duration, gear/features, CTA); replaces `GuestTierCard` | `components/podcast/StudioPackageCard.tsx` (rename of `GuestTierCard.tsx`) |
| `Agency.tsx` / `Podcast.tsx` | Compose page: import data, filter/slice it, pass to `TestimonialsSection`/`ProcessSection`/package grid, own `selectedPackage` state, render `ReservationModal` | `pages/Agency.tsx`, `pages/Podcast.tsx` (edited, not new) |

**Why `shared/` for testimonials and process, not `agency/`+`podcast/` duplicates:** both features are explicitly required to "cover both agency clients and podcast renters" and to give both services **equal weight**. A single reusable section component consumed identically by both pages *enforces* that parity structurally — if Agency gets a nicer testimonial layout, Podcast automatically gets it too, because they share the component. Duplicating the component per-domain (as was done for `PlanCard`/`GuestTierCard`, which have genuinely different data shapes) would let the two pages visually drift apart, which fights the "equal weight" requirement.

**Why `StudioPackageCard` stays podcast-domain-specific, not shared:** it displays a fundamentally different shape (rental packages) with no agency equivalent — same reasoning that already justifies `PlanCard` living in `agency/` today. Don't force it into `shared/` just for symmetry.

## Recommended Project Structure (Delta Only)

```
src/
├── types/
│   └── index.ts                    # ADD: Testimonial, ProcessStep, StudioPackage interfaces
│                                    # RENAME: GuestTier → StudioPackage (or add StudioPackage, deprecate GuestTier)
├── data/
│   ├── testimonials.ts             # NEW — flat array, category-tagged
│   ├── process.ts                  # NEW — one object export: { agency: ProcessStep[], podcast: ProcessStep[] }
│   ├── studioPackages.ts           # RENAME of guestTiers.ts — same shape, new fields (duration, gear)
│   └── guestTiers.ts               # DELETE after migration (no longer represents the business)
├── components/
│   ├── shared/
│   │   ├── TestimonialCard.tsx     # NEW
│   │   ├── TestimonialsSection.tsx # NEW
│   │   ├── ProcessStepItem.tsx     # NEW (optional split)
│   │   ├── ProcessSection.tsx      # NEW
│   │   └── ReservationForm.tsx     # EDIT — podcast-mode field labels/copy only (see below)
│   └── podcast/
│       ├── StudioPackageCard.tsx   # RENAME of GuestTierCard.tsx
│       └── GuestTierCard.tsx       # DELETE after migration
└── pages/
    ├── Agency.tsx                  # EDIT — add <TestimonialsSection>, <ProcessSection>
    ├── Podcast.tsx                 # EDIT — add <TestimonialsSection>, <ProcessSection>;
    │                                #        swap GuestTierCard grid → StudioPackageCard grid
    └── Home.tsx                    # OPTIONAL EDIT — see "Home page" note below
```

No new routes, no new top-level directories, no new dependencies. `App.tsx` and `Header.tsx` are untouched — these are in-page sections, not pages.

### Structure Rationale

- **`data/process.ts` as a single object export (not two files):** mirrors the existing `config.ts` pattern (`CALENDLY_LINKS` is a single exported object, not per-key files). Process steps genuinely differ in *content* between Agency and Podcast, but they're the same *kind* of data — one file, one type, two labeled arrays, is easier to keep in sync than two files that could drift in shape.
- **`data/testimonials.ts` as one flat array with a `category` field (not two files):** testimonials are a single content type where the only variance is *which page shows which subset*. A `category: "agency" | "podcast" | "both"` field lets one component (`TestimonialsSection`) filter with `.filter()` at the page level — no new abstraction, matches how filtering-by-prop already doesn't exist elsewhere in this codebase but requires nothing beyond `Array.prototype.filter`.
- **Rename over addition for `guestTiers.ts`/`GuestTierCard.tsx`:** this is the same list conceptually (an array of purchasable tiers with features + a highlighted flag) but for a different real-world thing. Renaming preserves the proven, working pattern (grid → card → `onSelect` callback → modal) instead of inventing a second competing pattern. Confirmed via source read: `GuestTier` and the target `StudioPackage` shape are structurally near-identical (`id, name, price, tagline, features[], highlighted?`) — only content and 1-2 new fields (e.g. `duration`) change.

## Architectural Patterns

### Pattern 1: Category-Filtered Shared Section

**What:** One presentational component (`TestimonialsSection`) consumes a pre-filtered array passed as a prop. The *page* component does the filtering (`testimonials.filter(t => t.category === "agency" || t.category === "both")`), not the section component itself.
**When to use:** Any content type that appears on multiple pages with page-specific subsets (testimonials here; would also apply if FAQs or case studies were added later).
**Trade-offs:** Filtering logic lives in the page component (matches existing convention where `Agency.tsx`/`Podcast.tsx` already own page-level data wiring), keeping `TestimonialsSection` a pure, easily-reused, easily-tested presentational component. Con: if filtering logic needs to change, it must be updated in both `Agency.tsx` and `Podcast.tsx` — acceptable at this scale (2 call sites); would warrant a small `getTestimonialsFor(category)` helper in `data/testimonials.ts` only if a third consumer appears.

**Example:**
```tsx
// pages/Agency.tsx
import { testimonials } from "../data/testimonials";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";

const agencyTestimonials = testimonials.filter(
  (t) => t.category === "agency" || t.category === "both"
);

// ...
<TestimonialsSection testimonials={agencyTestimonials} eyebrow="Client feedback" />
```

### Pattern 2: Parameterized Process Section (shared layout, page-owned copy)

**What:** `ProcessSection` accepts `steps: ProcessStep[]` plus heading props (`eyebrow`, `title`, `description`) — it owns *layout only*, never hardcodes "Agency" or "Podcast" language.
**When to use:** Sections with identical visual structure across pages but page-specific content, where the content genuinely diverges (unlike testimonials, which is one dataset split by tag, process steps are two independently-authored lists).
**Trade-offs:** Slightly more props than a zero-config component, but keeps `data/process.ts` as the single source of truth for both flows' copy, and keeps the component reusable without page-name conditionals inside it (avoids the "Too Much Logic in Page Components" anti-pattern already flagged in the codebase's own `ARCHITECTURE.md`).

**Example:**
```tsx
// data/process.ts
export const processSteps = {
  agency: [
    { step: 1, title: "Discovery call", description: "..." },
    { step: 2, title: "Scope & plan", description: "..." },
  ],
  podcast: [
    { step: 1, title: "Pick a package", description: "..." },
    { step: 2, title: "Book your session", description: "..." },
  ],
};

// pages/Podcast.tsx
<ProcessSection
  eyebrow="How it works"
  title="From booking to recording"
  steps={processSteps.podcast}
/>
```

### Pattern 3: Rename-in-Place for Re-modeled Data (Studio Packages)

**What:** Reuse the existing tier-card pattern (`array of {id, name, price, tagline, features[], highlighted?}` → grid → `onSelect(item)` callback → page-level `useState` → `ReservationModal`) verbatim, only renaming the type/file/component and updating field content to match the studio-rental business model.
**When to use:** When re-modeling data that is conceptually "still a list of purchasable tiers" — the mistake to avoid is treating this as a new feature requiring new architecture, when it's actually a content/domain correction to an existing, working pattern.
**Trade-offs:** None significant — this is the lowest-risk path. The one real change worth deliberately scoping: `ReservationForm`'s `mode === "podcast"` branch currently asks for "Topic / bio" (guest appearing on Rouh's show) and "Preferred dates." For studio rental this should become something like "What are you recording?" / session details and a preferred date/time field — a **copy and label change only**, not a new form mode. Do not add a third `ReservationMode`; `"agency" | "podcast"` still correctly describes the two flows.

## Data Flow

### Testimonials Flow

```
data/testimonials.ts (flat array, category: "agency"|"podcast"|"both")
    ↓ import + .filter(category) in page component
pages/Agency.tsx  ──┐
pages/Podcast.tsx ──┤→ <TestimonialsSection testimonials={filtered} />
                     ↓
        components/shared/TestimonialsSection.tsx (grid layout)
                     ↓ .map()
        components/shared/TestimonialCard.tsx (one quote each)
```

### Process Flow

```
data/process.ts ({ agency: ProcessStep[], podcast: ProcessStep[] })
    ↓ import processSteps.agency / processSteps.podcast
pages/Agency.tsx / pages/Podcast.tsx
    ↓
components/shared/ProcessSection.tsx (heading + steps prop)
    ↓ .map()
components/shared/ProcessStepItem.tsx (one numbered step each)
```

### Studio Package Flow (re-modeled, mirrors existing Plan/GuestTier flow exactly)

```
data/studioPackages.ts (StudioPackage[])
    ↓ import
pages/Podcast.tsx
    ↓ useState<StudioPackage | null>(null)  — same pattern as selectedPlan/selectedTier today
    ↓ .map()
components/podcast/StudioPackageCard.tsx
    ↓ onSelect(pkg) callback → setSelectedPackage(pkg)
components/shared/ReservationModal.tsx (mode="podcast", selectedTierName={selectedPackage?.name})
    ↓
components/shared/ReservationForm.tsx (podcast-mode fields — labels updated for rental context)
```

**No new state pattern.** `selectedPackage` replaces `selectedTier` 1:1 in `Podcast.tsx`; everything downstream of `onSelect` (modal open/close, form submit stub, confirmation step) is unchanged.

### Key Data Flows Summary

1. **Static import, never fetch:** every new data file (`testimonials.ts`, `process.ts`, `studioPackages.ts`) follows the existing convention exactly — `export const x = [...]` or `export const x = {...}`, imported directly by pages, never mutated, no loading state, no error state (there is no I/O to fail).
2. **Filtering/slicing happens at the page boundary, not inside shared components** — keeps `TestimonialsSection`/`ProcessSection` dumb and reusable; keeps domain logic (which content belongs to which page) visible in the page file where a reader already expects to find "what does this page show."
3. **Selection state stays page-local (`useState`)** — no global state library is needed or justified by this milestone; the existing per-page `selectedPlan`/`selectedTier` → `selectedPackage` pattern scales fine to one more instance.

## Scaling Considerations

This is a static marketing site with a handful of data arrays (a dozen testimonials, 2 process flows of ~4 steps each, 2-4 studio packages) — traditional "scaling" concerns (query load, caching, sharding) do not apply. The only realistic scale axis is **content volume growth**:

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (a few testimonials/steps/packages) | Flat static arrays as designed above — no changes needed. |
| Content grows to 20-30+ testimonials | Still fine as a static array; consider adding simple client-side pagination or a "show more" toggle inside `TestimonialsSection` (local `useState`, no new architecture) rather than loading all at once visually. |
| Content becomes editor-managed (non-developer updates) | This is the point at which a headless CMS (Sanity, Contentful) or MDX-based content layer would become justified — explicitly **out of scope** for this milestone per `PROJECT.md` ("no backend"). Flag for a future milestone only if content-editing pain becomes real. |

### Scaling Priorities

1. **First real friction point:** non-technical stakeholders wanting to edit testimonial/process copy without a code change — not a technical scaling problem, a workflow one. Solve later with a CMS migration if it recurs; do not pre-build for it now (YAGNI).
2. **Second:** none anticipated at this project's scope. A marketing site with static data does not need a second scaling tier.

## Anti-Patterns

### Anti-Pattern 1: Duplicating `TestimonialsSection`/`ProcessSection` per page

**What people do:** Build `AgencyTestimonials.tsx` and `PodcastTestimonials.tsx` as separate components because "the content is different."
**Why it's wrong:** Content being different doesn't mean structure should be. Duplicated layout components drift visually over time (exactly the failure mode the "equal weight" requirement is trying to prevent), and double the maintenance surface for a redesign that's explicitly about *elevating and unifying* presentation.
**Do this instead:** One layout component per feature, fed different data/props per page (Pattern 1 and Pattern 2 above).

### Anti-Pattern 2: Introducing a state library or React Context for these additions

**What people do:** Reach for Context or Zustand to "manage" testimonials/process state because it feels like "app state."
**Why it's wrong:** This data is static, read-only, and each page needs a different slice of it once, at render time — there's no cross-component mutation, no need for subscription semantics. The existing codebase explicitly has zero global state and that's correct for a site this size (per its own `ARCHITECTURE.md`).
**Do this instead:** Import the data module directly where needed, exactly as `services`, `plans`, `episodes` already do.

### Anti-Pattern 3: Fetching testimonials/process data asynchronously "to future-proof for a CMS"

**What people do:** Wrap static array imports in a `useEffect` + `useState` fetch simulation, or add a loading skeleton for data that's actually bundled at build time.
**Why it's wrong:** Adds complexity (loading states, error states, effect dependencies) for zero benefit today — the data ships in the JS bundle regardless. It also creates a flash-of-empty-content risk that a static import never has.
**Do this instead:** Plain static import, same as every other `data/` module in this codebase. If a CMS is ever introduced, that's a deliberate, isolated future migration — not something to half-build now.

### Anti-Pattern 4: Treating the studio package remodel as a "new feature" requiring new components

**What people do:** Build a whole new `StudioRental/` component subtree, a new modal, a new form mode, because the business concept changed.
**Why it's wrong:** The *data model and UI pattern* barely change (still tiers → cards → select → reserve). Building parallel infrastructure duplicates `ReservationModal`/`ReservationForm`/`Modal` for no reason and risks the two reservation flows (agency, podcast) silently diverging in UX.
**Do this instead:** Rename in place (Pattern 3), update field copy inside the existing `mode === "podcast"` branch of `ReservationForm`, done.

### Anti-Pattern 5 (pre-existing, still relevant): Inlining page-name conditionals inside shared components

**What people do:** `if (pageName === "agency") { ... } else { ... }` inside `TestimonialsSection` or `ProcessSection`.
**Why it's wrong:** Already flagged in the codebase's own architecture doc as "Too Much Logic in Page Components" — the inverse mistake (too much page-awareness in shared components) is equally bad: it makes the "shared" component secretly page-coupled and harder to reuse for a third context later (e.g., Home page).
**Do this instead:** Pass everything page-specific in as props (copy, filtered data). The component itself should have no idea which page rendered it.

## Integration Points

### External Services

None new. This milestone introduces no backend, no API, no CMS. The only existing "external" touchpoint remains the static Calendly URL handoff (`data/config.ts` → `CALENDLY_LINKS`), untouched by this work.

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `pages/Agency.tsx` ↔ `components/shared/TestimonialsSection.tsx` | Props (`testimonials: Testimonial[]`, heading copy) | Page filters `data/testimonials.ts` by `category === "agency" \| "both"` before passing down |
| `pages/Podcast.tsx` ↔ `components/shared/TestimonialsSection.tsx` | Props | Same component, filters by `"podcast" \| "both"` — enforces visual parity |
| `pages/Agency.tsx` / `pages/Podcast.tsx` ↔ `components/shared/ProcessSection.tsx` | Props (`steps: ProcessStep[]`, heading copy) | Each page passes its own slice of `data/process.ts` |
| `pages/Podcast.tsx` ↔ `components/podcast/StudioPackageCard.tsx` | Props (`pkg: StudioPackage`, `onSelect` callback) | Direct 1:1 replacement of the existing `GuestTierCard` boundary — no new contract shape |
| `pages/Podcast.tsx` ↔ `components/shared/ReservationModal.tsx` | Props (`mode="podcast"`, `selectedTierName`) | Unchanged contract; only the *content* flowing through it (package name instead of guest-tier name) changes |
| `components/shared/ReservationForm.tsx` internal `mode === "podcast"` branch | N/A (internal conditional, existing pattern) | Field labels/placeholders need updating for rental context; branch structure itself does not change |
| `pages/Home.tsx` ↔ new sections | **Undecided — flag for roadmap** | See note below |

### Home Page Note (Flag for Roadmap, Not a Blocker)

`PROJECT.md`'s Active requirements say "Add a testimonials section" and "Add a how-it-works section" without specifying which page(s). Given the "equal weight" and "trust-building" goals, both Agency and Podcast pages are the clear required placements (each service needs its own proof and process). Whether Home *also* gets a condensed testimonials strip or process teaser (reusing the same `TestimonialsSection`/`ProcessSection` components with a smaller data slice or a `compact` layout variant) is a scope decision, not an architecture blocker — the components as designed support it trivially (just another consumer passing props) if the roadmap decides to include it. Recommend the roadmap treat "Home integration" as an explicit, separately-sequenced sub-task rather than assuming it's bundled into the Agency/Podcast phase work.

## Suggested Build Order

This order minimizes rework and lets later steps validate against real, working earlier steps rather than against assumptions:

1. **Types first** (`src/types/index.ts`): add `Testimonial`, `ProcessStep`, `StudioPackage` (rename or supersede `GuestTier`). Zero risk, unblocks everything else, no visual output yet.
2. **Data layer** (`src/data/testimonials.ts`, `src/data/process.ts`, `src/data/studioPackages.ts`): can be built and even filled with placeholder/final copy in parallel with step 1's type definitions, since this is where the copywriting work (also in scope per `PROJECT.md`) lands. Delete `guestTiers.ts` only once `studioPackages.ts` fully replaces its usages.
3. **Studio package migration** (`components/podcast/StudioPackageCard.tsx` renamed from `GuestTierCard.tsx`, wired into `Podcast.tsx`): do this as an isolated, self-contained swap before touching testimonials/process — it's a rename of a proven pattern with a clear "done" state (Podcast page renders correctly, reservation flow still works end-to-end), and de-risks the reservation flow changes independently of the two new section types.
4. **Shared presentational primitives** (`TestimonialCard`, `TestimonialsSection`, `ProcessStepItem`, `ProcessSection`): build these against the real data from step 2, but without wiring into pages yet — verify each renders correctly with both an "agency" data slice and a "podcast" data slice before either page depends on them.
5. **Wire into Agency page first**: `Agency.tsx` gets `<TestimonialsSection>` and `<ProcessSection>`. Agency is a slightly simpler integration (no existing reservation-item grid to reconcile with, unlike Podcast) — validates the shared components against one real page before doubling up.
6. **Wire into Podcast page**: same two sections, plus this is where the `StudioPackageCard` grid (from step 3) and the new sections coexist on one page — validates full-page composition and layout ordering (episodes → studio packages → process → testimonials, or whatever order the visual-design work specifies).
7. **`ReservationForm` podcast-mode copy pass**: update field labels/placeholders in the existing `mode === "podcast"` branch to reflect studio rental language instead of "guest appearing on the show." Do this last since it's copy-only and has no dependency on the section work above — sequencing it after steps 3-6 just avoids touching the same file twice.
8. **(Optional, roadmap-gated) Home page integration**: only if the roadmap explicitly decides Home should surface a condensed testimonials/process teaser. Lowest priority, purely additive, no risk to the required Agency/Podcast integrations above.

**Dependency summary:** step 1 blocks everything; step 2 blocks 3-6; step 3 is independent of steps 4-6 and can run in parallel with them if split across two people/sessions; step 4 blocks 5 and 6; step 5 and 6 are independent of each other but sequencing Agency-then-Podcast is recommended to catch integration issues once rather than twice; step 7 is independent of 4-6 and could be done anytime after step 2; step 8 depends on 4 only.

## Sources

- `.planning/codebase/ARCHITECTURE.md` — existing system architecture (layers, data flow, anti-patterns already identified)
- `.planning/codebase/STRUCTURE.md` — existing directory layout and file-placement conventions
- `.planning/PROJECT.md` — requirements driving this milestone (testimonials, process section, studio-package remodel, equal-weight constraint, frontend-only constraint)
- Direct source reads: `src/pages/Podcast.tsx`, `src/pages/Agency.tsx`, `src/pages/Home.tsx`, `src/data/guestTiers.ts`, `src/data/plans.ts`, `src/types/index.ts`, `src/components/podcast/GuestTierCard.tsx`, `src/components/shared/ReservationForm.tsx`, `src/components/shared/ReservationModal.tsx`, `src/components/home/AboutSection.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/GraphicAccent.tsx` — used to confirm existing patterns (props shapes, state ownership, styling conventions) rather than infer them

---
*Architecture research for: Rouh marketing site — testimonials, process section, studio rental data remodel*
*Researched: 2026-07-29*
