# Phase 1: Design System Contract + Shared Primitives - Research

**Researched:** 2026-07-29
**Domain:** Frontend design-token contract + reusable presentational React components (testimonials, process/how-it-works) for an existing React 19 + TypeScript + Vite + Tailwind v4 SPA
**Confidence:** HIGH

## Summary

This is an infrastructure phase inside a redesign of an already-working codebase, not a greenfield build. Every decision has already been made upstream: `01-UI-SPEC.md` (checker-reviewed) locks the exact spacing/radius/shadow/color/typography/motion tokens, and `01-CONTEXT.md` locks the visual direction (D-01 through D-10). This research's job is narrower than usual — confirm the net-new dependencies are real, current, and installable against React 19.2.7, confirm the exact import paths/APIs the planner's code needs to reference correctly, and re-ground the architecture/pitfalls already produced by upstream project research (`.planning/research/*.md`) specifically against this phase's two deliverables: `TestimonialsSection`/`TestimonialCard` and `ProcessSection`/`ProcessStepItem`.

All six new npm packages (`motion`, `tw-animate-css`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`) were re-verified live against the npm registry on 2026-07-29: correct names, current versions, clean peer-dependency ranges against React 19.2.7, no `postinstall` scripts, and `slopcheck` returned `[OK]` (not `[SLOP]`/`[SUS]`) for all six. One correction to prior research: `motion`'s canonical React import path is `motion/react` (not bare `motion`), and `tw-animate-css` is dev-dependency-appropriate (build-time CSS only, never imported at runtime) — the planner's install commands should reflect both.

**Primary recommendation:** Install the six packages exactly as specified in `.planning/research/STACK.md` (versions reconfirmed current), build `TestimonialCard`/`TestimonialsSection`/`ProcessStepItem`/`ProcessSection` as pure presentational components in `src/components/shared/` following the exact tokens in `01-UI-SPEC.md` (no new spacing/radius/shadow values), wire scroll-reveal motion via `motion/react`'s `whileInView` + `useReducedMotion` as the Success Criterion 4 proof-of-wiring interaction, and verify both components render correctly against an agency-tagged and a podcast-tagged sample data slice before considering the phase done — no page integration happens in this phase.

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Style direction is "minimal & precise" — tight grid, restrained color use, lets the orange/gold accents do the work; a studio/tech-adjacent feel rather than bold/editorial or warm/soft.
- **D-02:** Keep the existing shape language (rounded-2xl cards, gradient + scale-on-hover buttons) — elevate spacing/hierarchy/shadows around it rather than tightening to sharper corners.
- **D-03:** Orange/gold stay accent-only (CTAs, eyebrows, highlights, the existing `.bg-gradient-brand` utility) — no full-section color blocks. Backgrounds stay white/black.
- **D-04:** Placeholder imagery (portfolio thumbnails, future studio photos) keeps the current gold/orange gradient box treatment — no added texture/pattern layer.
- **D-05:** Motion is subtle only — fade/slide-in on scroll for sections, hover states on cards/buttons. No staggered reveals beyond a single stagger, parallax, or expressive motion; supports the "minimal & precise" direction.
- **D-06:** `prefers-reduced-motion` disables animations entirely (via `motion`'s `useReducedMotion`), not just toned down.
- **D-07:** No real client/renter testimonials exist yet. Write realistic, brand-voice placeholder testimonials for both Agency and Podcast lines.
- **D-08:** Placeholder testimonials use realistic fictional names and company/context, not obviously-fake markers like "[Client Name]" — reads as finished content.
- **D-09:** Maintain a balanced minimum split (2+ testimonials per service line) so the section never silently favors one side.
- **D-10:** The 4 `GraphicAccent` brand stroke elements are used as sparing signature accents — 1-2 deliberate placements per page (hero, section dividers), not a recurring background motif.

### Claude's Discretion

- Exact spacing scale, corner radius values, and shadow rules to formalize in the DESIGN.md contract (informed by D-01 through D-04, not re-litigated with the user) — **already resolved by `01-UI-SPEC.md`**, treat as locked for this phase, not open.
- Which specific scroll/hover interactions get motion treatment first — **resolved by `01-UI-SPEC.md`**: scroll-reveal on `TestimonialsSection`'s card grid is the designated first micro-interaction.
- Exact wording/details of placeholder testimonial copy (must follow D-07/D-08/D-09) — **draft copy provided in `01-UI-SPEC.md`**, executor may refine wording but must keep attribution realism + specificity.
- Icon usage details from `lucide-react` (chrome elements like chevrons/checkmarks) — genuinely open; see Code Examples below for guidance.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within Phase 1 scope (design contract + shared primitives infrastructure).

## Phase Requirements

No phase requirement IDs are directly delivered by Phase 1 (pure infrastructure phase, per ROADMAP.md and REQUIREMENTS.md traceability table). This phase enables downstream requirements by producing shared building blocks:

| Enabled Requirement | Delivered In | How Phase 1 Enables It |
|----------------------|---------------|--------------------------|
| TRUST-01 (Agency testimonials) | Phase 2 | `TestimonialsSection`/`TestimonialCard` built and proven here; Phase 2 wires agency-filtered data into it |
| TRUST-02 (Podcast testimonials) | Phase 3 | Same components, podcast-filtered data slice |
| TRUST-03 (balanced testimonial split) | Phase 4 (verification), but structurally guaranteed here | D-09's 2+-per-category minimum is baked into this phase's sample data and the `category` field on the `Testimonial` type |
| TRUST-04 (Agency "how it works") | Phase 2 | `ProcessSection`/`ProcessStepItem` built and proven here |
| TRUST-05 (Podcast "how it works") | Phase 3 | Same components, podcast process steps |
| DSGN-01 (elevated, polished, on-brand visual treatment) | Phase 4 (site-wide), foundational here | The design-token contract (`01-UI-SPEC.md`, ratified this phase) is what every later page-phase must consume identically to avoid drift |

## Project Constraints (from CLAUDE.md)

Extracted from `./CLAUDE.md` (GSD-managed sections):

- **Brand lock:** Gotham font family, orange `#c1622e`, gold `#d9a253`, and the 4 existing graphic elements must not change — redesign is elevation/polish, not rebrand.
- **Scope:** Frontend-only. No backend, no real integrations, no auth/payments. This phase's new components must remain purely presentational (props in, JSX out), consistent with the existing zero-backend architecture.
- **Tech stack lock:** Stay within React 19, TypeScript, Vite, Tailwind CSS v4, React Router, React Hook Form — no framework changes. New dependencies must be additive libraries only (animation, icons, class utilities), never a replacement framework or full UI kit.
- **No `@apply` / no component classes:** Tailwind usage is inline utility classes with local style-constant variables (`const cardStyles = {...}`) for repeated patterns — new shared components must follow this, not introduce CSS Modules or `@apply` abstractions.
- **No path aliases:** relative imports only.
- **Named exports only** (except `App.tsx`'s default export) — `TestimonialsSection`/`ProcessSection`/etc. must be named exports.
- **Props always typed via a dedicated `*Props` interface.**
- **File placement:** new shared components → `src/components/{ui,shared}/`; new data → `src/data/`; new types → the single `src/types/index.ts` file (no new types module).
- **Linting:** `oxlint` (`npm run lint`), TypeScript strict mode, target `es2023`.
- **GSD workflow enforcement:** file-changing work should route through a GSD command (`/gsd-execute-phase` for planned phase work) — informational for the planner, not something this research needs to act on.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Design token contract (spacing/radius/shadow/color/type/motion rules) | Frontend Client (build-time, CSS/Tailwind config) | — | Static, compiled at build time via Tailwind's `@theme` block and inline utility classes; no runtime/server involvement |
| `TestimonialsSection` / `TestimonialCard` rendering | Browser / Client | — | Pure presentational React components, no data fetching, no server dependency; render from props passed at build time |
| `ProcessSection` / `ProcessStepItem` rendering | Browser / Client | — | Same as above |
| Sample/placeholder testimonial + process data | Frontend Client (static bundled data) | — | `src/data/*.ts` — static TypeScript constants imported directly, bundled into the JS payload, no fetch/API layer exists or is needed |
| Scroll-reveal / hover micro-interactions | Browser / Client | — | Client-side only; `motion/react`'s `whileInView`/`useReducedMotion` run entirely in the browser, no SSR concerns (this is a Vite SPA, not a framework with server rendering) |
| Icon rendering (`lucide-react`) | Browser / Client | — | Tree-shaken SVG React components, bundled at build time, rendered client-side |

This is a fully client-tier phase — there is no backend, no SSR, no API layer in this project (confirmed: Vite SPA, static hosting, `src/pages` → `src/components` → `src/data` with zero fetch calls anywhere in the codebase). All capabilities above map to Browser/Client or build-time-static; no cross-tier ambiguity exists to resolve.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `motion` | 12.43.0 | Scroll-reveal (`whileInView`), reduced-motion gating (`useReducedMotion`) | Canonical post-rebrand Framer Motion package (rebranded Dec 2024). `[VERIFIED: npm registry]` current version, peer deps `react: "^18.0.0 \|\| ^19.0.0"` / `react-dom` same — installs clean against React 19.2.7, no `--legacy-peer-deps`. Import path for React is `motion/react`, confirmed via official docs `[CITED: motion.dev/docs/react]` |
| `tw-animate-css` | 1.4.0 | Tailwind v4-native CSS-first keyframe utilities (not used for this phase's primary scroll-reveal, which uses `motion`; available as a fallback for cheap CSS-only transitions) | `[VERIFIED: npm registry]` current version. Tailwind v4 moved to CSS-first `@theme` config; the legacy `tailwindcss-animate` JS-plugin package does not fit v4's architecture. `tw-animate-css` is the community-maintained v4-native successor `[CITED: github.com/Wombosvideo/tw-animate-css]`. Install as a **dev dependency** (`-D`) — it is imported once via `@import "tw-animate-css";` in `src/styles/index.css` and never referenced at runtime in JS |
| `clsx` | 2.1.1 | Conditional Tailwind class composition | `[VERIFIED: npm registry]`. Needed once `TestimonialCard`/`ProcessStepItem` introduce more conditional states (e.g., `highlighted`, `hover`) than ternary string interpolation comfortably handles |
| `tailwind-merge` | 3.6.0 | Resolves conflicting Tailwind utility classes when composing/overriding via `className` prop overrides | `[VERIFIED: npm registry]`. Standard pairing with `clsx` as a `cn()` helper — prevents silent utility class conflicts if a consumer passes an overriding `className` |
| `class-variance-authority` | 0.7.1 | Type-safe variant APIs, if this phase's cards need a `variant` prop | `[VERIFIED: npm registry]`. Per D-02, existing card shape (rounded-2xl, border-only rest state) is reused, not multiplied into many variants — likely low/no actual usage this phase, but installed per upstream stack research for consistency across the redesign |
| `lucide-react` | 1.27.0 | Icon chrome (chevrons, checkmarks) — never a substitute for the 4 `GraphicAccent` brand strokes | `[VERIFIED: npm registry]`, peer deps `react: "^16.5.1 \|\| ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0"` — clean against React 19.2.7 |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@radix-ui/react-accordion` | not installed this phase | Accessible accordion primitive | Only if a future phase's process/FAQ layout needs collapsible steps — `01-UI-SPEC.md` specifies a numbered/connected-step layout for `ProcessSection`, not an accordion, so this is **not needed for Phase 1's scope**. Do not install speculatively. |
| `@radix-ui/react-tabs` | not installed this phase | Accessible tabs primitive | Same — only if a future page-integration phase needs an Agency/Podcast toggle. Not needed to build/prove the shared components in this phase. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `motion` | `tw-animate-css`-only (no JS animation library) | Would satisfy "simple fade/slide" but `useReducedMotion` (D-06's explicit requirement — animations must be fully disabled, not CSS-media-query-only-toned-down) is a `motion` hook; CSS-only `@media (prefers-reduced-motion)` can achieve the same *effect* but the phase's UI-SPEC explicitly names `motion`'s hook as the mechanism — use `motion` as specified |
| Static grid for `TestimonialsSection` | `embla-carousel-react` | `01-UI-SPEC.md` explicitly specifies a static responsive grid (not carousel) since count stays ≤ ~6-8 per `.planning/research/STACK.md`'s sizing guidance — do not install Embla this phase |
| Numbered-step `ProcessSection` | `@radix-ui/react-accordion` | Only reach for accordion if copy length forces collapsing by default; `01-UI-SPEC.md` specifies numbered/connected layout as the default |

**Installation:**
```bash
npm install motion clsx tailwind-merge class-variance-authority lucide-react
npm install -D tw-animate-css
```

**Version verification:** All six versions above were re-confirmed live on 2026-07-29 via `npm view <package> version` against the npm registry (not training data) — see Package Legitimacy Audit below for full detail including publish dates.

## Package Legitimacy Audit

`slopcheck` (v0.6.1) installed successfully and ran via `slopcheck scan --pkg npm --json <package>` for all six candidates.

| Package | Registry | Age (first published) | Downloads (last week, npmjs.org API) | Source Repo | slopcheck | Disposition |
|---------|----------|------------------------|----------------------------------------|-------------|-----------|-------------|
| `motion` | npm | 2013-12-26 (long-established package name, current `motion` scope since the Dec 2024 rebrand) | 16.75M/wk | github.com/motiondivision/motion | `[OK]` | Approved |
| `tw-animate-css` | npm | 2025-03-10 | 35.71M/wk (note: high relative to package age/niche — see caveat below) | github.com/Wombosvideo/tw-animate-css | `[OK]` | Approved |
| `clsx` | npm | 2018-12-24 | 105.49M/wk | github.com/lukeed/clsx | `[OK]` | Approved |
| `tailwind-merge` | npm | 2021-07-18 | 77.69M/wk | github.com/dcastil/tailwind-merge | `[OK]` | Approved |
| `class-variance-authority` | npm | 2022-01-26 | 54.59M/wk | github.com/joe-bell/cva | `[OK]` | Approved |
| `lucide-react` | npm | 2020-10-19 | 84.78M/wk | github.com/lucide-icons/lucide | `[OK]` | Approved |

**Postinstall script check (Node.js phase):** `npm view <pkg> scripts.postinstall` returned empty for all six packages — no postinstall scripts, no network-call/filesystem-path risk signal.

**Packages removed due to slopcheck `[SLOP]` verdict:** none
**Packages flagged as suspicious `[SUS]`:** none

**Caveat on `tw-animate-css` download count:** the reported 35.71M/wk figure is disproportionately high for a young (created 2025-03), niche, single-purpose CSS utility package — plausibly inflated by an npm mirror/CI-cache artifact rather than genuine unique installs. This does not change the `[OK]` slopcheck verdict (which checks for hallucination/typosquat signals, not popularity), and the package has a real, actively-maintained GitHub repo matching its npm listing and zero suspicious install-time scripts. Flagged here for transparency, not as a blocker.

All six packages were discovered via prior project research (`.planning/research/STACK.md`, itself Context7/official-docs-verified) and re-confirmed against the live npm registry in this session — they meet the bar for `[VERIFIED: npm registry]` per the package name provenance rule (registry existence + Context7/official-docs origin, not WebSearch-only discovery).

## Architecture Patterns

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Phase 1 scope: build + prove, NOT wire into pages                │
└─────────────────────────────────────────────────────────────────┘

  Sample data (this phase's own fixtures, not yet page-consumed)
  ┌───────────────────────────────────────────┐
  │ src/data/testimonials.ts                    │
  │   Testimonial[] — category: "agency"|        │
  │   "podcast"|"both", 2+ per category (D-09)   │
  ├───────────────────────────────────────────┤
  │ src/data/process.ts                          │
  │   { agency: ProcessStep[], podcast: ... }     │
  └──────────────────┬────────────────────────┘
                     │ import (build-time, no fetch)
                     ▼
  ┌───────────────────────────────────────────┐
  │ src/components/shared/                       │
  │                                               │
  │  TestimonialsSection(testimonials, eyebrow…) │
  │   └─ SectionHeading (reused, unchanged)      │
  │   └─ grid.map(t => TestimonialCard)          │
  │        └─ motion whileInView + stagger        │
  │                                               │
  │  ProcessSection(steps, eyebrow, title…)      │
  │   └─ SectionHeading (reused, unchanged)      │
  │   └─ steps.map(s => ProcessStepItem)          │
  │        └─ motion whileInView + stagger        │
  └──────────────────┬────────────────────────┘
                     │ rendered where? — NOWHERE yet.
                     │ Phase 1's proof is an isolated
                     │ verification render (e.g., a temp
                     │ route/story, or direct render call
                     │ used only to confirm both components
                     │ accept agency- and podcast-tagged data
                     │ correctly), NOT a production page wire-up.
                     ▼
  ┌───────────────────────────────────────────┐
  │ Phases 2 (Agency) / 3 (Podcast) — LATER      │
  │  pages/Agency.tsx / pages/Podcast.tsx        │
  │  filter testimonials by category, import     │
  │  processSteps.agency / .podcast, render the   │
  │  same two components — THIS is out of scope  │
  │  for Phase 1.                                │
  └───────────────────────────────────────────┘

  Parallel, independent: dependency installation + first
  motion micro-interaction proof (Success Criterion 4)
  ┌───────────────────────────────────────────┐
  │ npm install motion clsx tailwind-merge cva   │
  │             lucide-react                     │
  │ npm install -D tw-animate-css                │
  │                                               │
  │ src/styles/index.css: @import "tw-animate-css"│
  │                                               │
  │ TestimonialsSection's card grid scroll-reveal │
  │ is the designated first proof this tooling    │
  │ is wired correctly (per 01-UI-SPEC.md)        │
  └───────────────────────────────────────────┘
```

### Recommended Project Structure

```
src/
├── types/
│   └── index.ts                    # ADD: Testimonial, ProcessStep interfaces (append to existing file — no new types module)
├── data/
│   ├── testimonials.ts             # NEW — flat array, category: "agency"|"podcast"|"both", 2+ per category
│   └── process.ts                  # NEW — { agency: ProcessStep[], podcast: ProcessStep[] }
├── components/
│   └── shared/
│       ├── TestimonialCard.tsx     # NEW — presentational, no state, no hover (not interactive)
│       ├── TestimonialsSection.tsx # NEW — SectionHeading + responsive grid + motion stagger
│       ├── ProcessStepItem.tsx     # NEW — presentational numbered step (may inline into ProcessSection if trivial)
│       └── ProcessSection.tsx      # NEW — SectionHeading + connected-step layout + motion stagger
└── styles/
    └── index.css                   # EDIT — add `@import "tw-animate-css";` near top, after `@import "tailwindcss";`
```

No new top-level directories, no new routes, no changes to `App.tsx`/`Header.tsx`/any page file in this phase — those are explicitly Phase 2-3 work.

### Pattern 1: Category-Filtered Shared Section (build for reuse, don't wire yet)

**What:** `TestimonialsSection` accepts a pre-filtered `Testimonial[]` array as a prop; it performs no filtering itself. This phase's job is to prove the component works correctly with *both* an agency-only slice and a podcast-only slice of the sample data — not to actually filter real page data (there's no page yet).
**When to use:** Building `TestimonialsSection` itself, and its verification step.
**Example:**
```tsx
// src/data/testimonials.ts
import type { Testimonial } from "../types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    category: "agency",
    quote: "Rouh didn't just make us look better — they rebuilt how we talk about the product. Our funnel numbers moved within the first month.",
    name: "Sarah Chen",
    role: "Founder, Lumen Skincare",
  },
  {
    id: "t2",
    category: "agency",
    quote: "We've worked with three agencies before Rouh. This is the first one that actually shipped on the timeline they gave us.",
    name: "Marcus Webb",
    role: "Marketing Director, Northfield Outdoor",
  },
  {
    id: "t3",
    category: "podcast",
    quote: "Booked the studio same week, showed up, and the crew had everything dialed in before we sat down. Zero setup stress.",
    name: "Priya Ramesh",
    role: "Host, The Build Sheet",
  },
  {
    id: "t4",
    category: "podcast",
    quote: "Rented the full kit for a two-day shoot — cameras, lighting, the works. Recordings came out broadcast-ready straight off the gear.",
    name: "David Okafor",
    role: "Co-host, Second Opinion Podcast",
  },
];
```
```tsx
// Verification usage (not a production page — proves both slices render correctly)
const agencySlice = testimonials.filter((t) => t.category === "agency" || t.category === "both");
const podcastSlice = testimonials.filter((t) => t.category === "podcast" || t.category === "both");
<TestimonialsSection testimonials={agencySlice} eyebrow="Client feedback" title="What clients say" />
<TestimonialsSection testimonials={podcastSlice} eyebrow="Renter feedback" title="What renters say" />
```

### Pattern 2: Parameterized Process Section (layout-only, page-owned copy)

**What:** `ProcessSection` accepts `steps: ProcessStep[]` plus heading props (`eyebrow`, `title`, `description`); it never hardcodes "Agency" or "Podcast" language internally.
**When to use:** Building `ProcessSection`, and verifying it against both `processSteps.agency` and `processSteps.podcast` sample data.
**Example:**
```tsx
// src/data/process.ts
import type { ProcessStep } from "../types";

export const processSteps: { agency: ProcessStep[]; podcast: ProcessStep[] } = {
  agency: [
    { step: 1, title: "Discovery call", description: "We learn your brand, goals, and where things are stuck." },
    { step: 2, title: "Scope & plan", description: "You get a clear plan — deliverables, timeline, no surprises." },
    { step: 3, title: "We build", description: "Strategy, content, and campaigns move from plan to shipped work." },
    { step: 4, title: "Launch & iterate", description: "We track what's working and refine as results come in." },
  ],
  podcast: [
    { step: 1, title: "Pick a package", description: "Choose your session length and gear tier." },
    { step: 2, title: "Book your session", description: "Reserve a date — dry-hire or staffed, your call." },
    { step: 3, title: "Show up & record", description: "The room and gear are dialed in before you arrive." },
    { step: 4, title: "Walk away with your files", description: "Leave with your raw recording, ready for post." },
  ],
};
```

### Pattern 3: Scroll-Reveal Motion (the phase's proof-of-wiring interaction)

**What:** `TestimonialsSection`'s card grid animates in on scroll using `motion/react`'s `whileInView`, gated by `useReducedMotion`.
**When to use:** This is the specific, designated first micro-interaction per `01-UI-SPEC.md` — build this before any other motion usage.
**Example:**
```tsx
// src/components/shared/TestimonialsSection.tsx
import { motion, useReducedMotion } from "motion/react";
import type { Testimonial } from "../../types";
import { SectionHeading } from "../ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  eyebrow?: string;
  title: string;
  description?: string;
}

export function TestimonialsSection({ testimonials, eyebrow, title, description }: TestimonialsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```
**Note on `useReducedMotion` gating:** per D-06, reduced-motion must disable animation entirely, not tone it down — the pattern above sets `initial={false}` and skips `whileInView` entirely when `shouldReduceMotion` is true, so content renders in its final state immediately with no transition, rather than a smaller/faster version of the same animation.

### Anti-Patterns to Avoid

- **Building `AgencyTestimonials.tsx`/`PodcastTestimonials.tsx` as separate components:** violates the entire purpose of this phase (structural parity enforcement). One component, fed different data.
- **Filtering testimonials/steps inside the shared component:** keep `TestimonialsSection`/`ProcessSection` pure — they accept pre-filtered/pre-selected data as props. Filtering-by-category belongs at the page boundary (Phase 2/3), not here.
- **Introducing a new spacing/radius/shadow value "because it looks better":** every value used in these two components must trace to a token already defined in `01-UI-SPEC.md`. This is the single highest-risk drift vector this phase exists to prevent (Pitfall 1 in `.planning/research/PITFALLS.md`).
- **Adding a hover state to `TestimonialCard`:** per `01-UI-SPEC.md`, it has no click target — a hover affordance on a non-interactive card is a false interactivity signal.
- **Installing Radix accordion/tabs speculatively:** not needed for this phase's numbered-step layout; only install if/when a later phase's requirements force it.
- **Rendering an empty-state message when data is empty:** per `01-UI-SPEC.md`'s Copywriting Contract, both sections must return `null` on an empty array, never a "nothing to show" message.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered reveal animation | A custom `IntersectionObserver` hook + manual CSS class toggling | `motion/react`'s `whileInView` + `viewport={{ once: true }}` | Handles observer lifecycle, cleanup, and "only animate once" semantics correctly out of the box; a hand-rolled version is a well-known source of memory leaks (observers never disconnected) and re-trigger bugs |
| Reduced-motion detection | A manual `window.matchMedia("(prefers-reduced-motion: reduce)")` listener with `useState`/`useEffect` | `motion/react`'s `useReducedMotion()` | Already handles the media-query subscription, SSR-safety (not relevant here but still correct), and re-render on preference change — reinventing this is unnecessary surface area for an accessibility-critical feature |
| Conditional/variant class composition | String-concatenation ternaries growing unwieldy (`${a ? "x" : ""} ${b ? "y" : ""}`) | `clsx` + `tailwind-merge` (`cn()` helper) | Prevents silently-conflicting utility classes when a consumer overrides `className` (e.g., `p-6` vs. a passed-in `p-8` both present — `tailwind-merge` resolves to the last one deterministically, plain string concat does not) |
| Icon SVGs for UI chrome (chevrons, checkmarks) | Inline hand-drawn SVG paths, or repurposing a `GraphicAccent` brand stroke as a checkmark | `lucide-react` | `GraphicAccent` is explicitly documented as "never used as a literal icon" — reusing it for functional UI chrome would violate the brand-asset contract; `lucide-react` is tree-shakeable and purpose-built for exactly this |

**Key insight:** every "don't hand-roll" item above already has a locked, verified library in the phase's own dependency list — there's no case in this phase's scope where a custom implementation is actually justified. The temptation to hand-roll typically comes from not knowing the library exists; this research closes that gap.

## Common Pitfalls

### Pitfall 1: New components introduce spacing/radius/shadow values not seen elsewhere in the codebase

**What goes wrong:** An executor building `TestimonialCard` reaches for `p-5` or `rounded-3xl` or `shadow-md` because it "looks fine" in isolation, without cross-checking `01-UI-SPEC.md`'s token table.
**Why it happens:** Tailwind makes arbitrary values trivially easy to reach for; without an explicit contract to check against, "looks fine" substitutes for "matches the system."
**How to avoid:** Every spacing/radius/shadow value in `TestimonialCard`/`ProcessStepItem`/`TestimonialsSection`/`ProcessSection` must map to a row in `01-UI-SPEC.md`'s Shape & Elevation / Spacing Scale tables. `rounded-2xl` for cards, `border border-black/10` at rest, `p-6` for card padding, `py-20 sm:py-28` for section padding — no exceptions without a documented reason.
**Warning signs:** Grep the new component files for Tailwind spacing/radius/shadow utilities not present in `01-UI-SPEC.md`'s tables.

### Pitfall 2: `motion` imported from the wrong path

**What goes wrong:** Code imports `from "motion"` (bare package root) or `from "framer-motion"` (deprecated legacy package name) instead of `from "motion/react"`.
**Why it happens:** Training data and older tutorials predate the package's React-specific entry point convention; `.planning/research/STACK.md` itself doesn't specify the exact import path.
**How to avoid:** Always `import { motion, useReducedMotion } from "motion/react"` — confirmed as the current, correct React import path via official docs `[CITED: motion.dev/docs/react]`.
**Warning signs:** TypeScript/build errors on `motion` imports, or (if `framer-motion` is bare-installed instead) a redundant second package showing up in `package.json`.

### Pitfall 3: Building this phase's proof-of-wiring interaction as a throwaway that never gets reused

**What goes wrong:** The Success Criterion 4 micro-interaction ("at least one micro-interaction visibly working somewhere in the app") gets implemented as an isolated demo/story that's disconnected from `TestimonialsSection`, then has to be rebuilt when Phase 2 actually wires the section into a real page.
**Why it happens:** "Prove the tooling works" and "build the real component" can be treated as two separate tasks when they should be the same task.
**How to avoid:** Build the scroll-reveal directly into `TestimonialsSection` itself (Pattern 3 above) — verifying it renders with sample data *is* the proof, not a separate throwaway spike. No rebuild needed in Phase 2.
**Warning signs:** A `/dev-preview` route or standalone demo component exists that duplicates logic already present in `TestimonialsSection`.

### Pitfall 4: `tw-animate-css` installed as a runtime dependency instead of a dev dependency

**What goes wrong:** `npm install tw-animate-css` (no `-D`) puts it in `dependencies` even though it's never imported in JS — only referenced via a single `@import` line in CSS, processed entirely at build time.
**Why it happens:** `.planning/research/STACK.md`'s original install snippet groups it with `motion` under a single `npm install` command without the `-D` flag.
**How to avoid:** `npm install -D tw-animate-css` — separate from the runtime-dependency install command. Doesn't functionally break anything if installed as a runtime dep, but it's a `package.json` hygiene issue the planner's task should get right the first time.
**Warning signs:** `tw-animate-css` appears under `"dependencies"` rather than `"devDependencies"` in `package.json`.

### Pitfall 5 (inherited from `.planning/research/PITFALLS.md` Pitfall 6, phase-specific instance): Shared component built with hidden page-awareness

**What goes wrong:** `TestimonialsSection` or `ProcessSection` gets an internal `if` branch checking something page-specific (e.g., a `variant="podcast"` prop that changes internal copy/logic rather than just being fed different data).
**Why it happens:** It can feel more convenient to encode "podcast mode" inside the shared component than to keep it a pure, data-driven layout — especially since there's no real page consuming it yet in this phase, so the temptation to hardcode "for now" is higher.
**How to avoid:** The component must have zero knowledge of which page will render it. All page-specific content flows in via props (`testimonials`, `steps`, `eyebrow`, `title`, `description`). Verify this by checking that the exact same component instance, given only different prop values, produces both an "agency-looking" and "podcast-looking" render — if it needs a special prop beyond data + heading copy to do that, the component has leaked page-awareness.
**Warning signs:** Any prop resembling `mode`, `variant: "agency" | "podcast"`, or a conditional inside the component body keyed on a page name.

## Code Examples

### `TestimonialCard` (presentational, non-interactive)

```tsx
// src/components/shared/TestimonialCard.tsx
// Source: token values per 01-UI-SPEC.md (Shape & Elevation, Typography, Color)
import type { Testimonial } from "../../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/10 p-6">
      <p className="text-base text-black/80">&ldquo;{testimonial.quote}&rdquo;</p>
      <div>
        <p className="text-sm font-bold text-black">{testimonial.name}</p>
        <p className="text-sm text-black/60">{testimonial.role}</p>
      </div>
    </div>
  );
}
```
Note: no `hover:` classes (per `01-UI-SPEC.md`: non-interactive cards get no hover affordance), `rounded-2xl` + `border-black/10` matches the locked default/rest card treatment exactly.

### `ProcessStepItem` (presentational, numbered)

```tsx
// src/components/shared/ProcessStepItem.tsx
interface ProcessStepItemProps {
  step: number;
  title: string;
  description: string;
}

export function ProcessStepItem({ step, title, description }: ProcessStepItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">Step {step}</span>
      <h3 className="text-2xl font-black text-black">{title}</h3>
      <p className="text-base text-black/60">{description}</p>
    </div>
  );
}
```

### `cn()` utility (clsx + tailwind-merge), if variant composition is needed

```ts
// src/lib/cn.ts (new file — only if a component ends up needing conditional/overridable classes)
// Source: standard shadcn/ui-popularized pattern, verified compatible with clsx 2.1.1 / tailwind-merge 3.6.0
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
Per the codebase's existing convention (no `src/lib/` or `src/utils/` directory currently exists), the planner should decide file placement — `src/lib/cn.ts` is a common convention but isn't yet established in this codebase; `src/components/ui/` (alongside `Button.tsx`) is an equally valid alternative given the existing flat structure. Flagged as an open question below.

### `tw-animate-css` wiring

```css
/* src/styles/index.css — add near the top, after the Tailwind import */
@import "tailwindcss";
@import "tw-animate-css";
```
Source: `[CITED: github.com/Wombosvideo/tw-animate-css]` README installation instructions.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| `framer-motion` package name | `motion` package name, `motion/react` import subpath | December 2024 rebrand | Any training-data-era code sample using `import { motion } from "framer-motion"` is stale; use `motion/react` |
| `tailwindcss-animate` (Tailwind v3 JS plugin) | `tw-animate-css` (Tailwind v4 CSS-first) | Tailwind v4's CSS-first `@theme` architecture | The old plugin doesn't register correctly under v4's plugin model; don't install it alongside `tw-animate-css` |

**Deprecated/outdated:** `framer-motion` as a package name still technically works (re-exports from `motion`) but should not be the import target for new code in this phase.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|----------------|
| A1 | `class-variance-authority` will see genuinely low/no usage in this specific phase (since D-02 locks the existing card shape rather than introducing new variants) | Standard Stack | Low — package is still correctly installed per upstream stack decision even if this phase's components don't end up needing `cva` directly; no functional risk, just a "why is this installed but unused" question a reviewer might ask |
| A2 | `src/lib/cn.ts` is a reasonable new-file location for the `cn()` helper, despite no `lib/`-style directory existing in the codebase yet | Code Examples | Low — purely a file-placement convention call; if the planner/executor prefers `src/components/ui/cn.ts` or inlining `clsx`/`tailwind-merge` calls directly without a shared helper, neither is wrong, just needs a single consistent choice |
| A3 | The `35.71M/wk` download figure for `tw-animate-css` reflects mirror/cache traffic rather than genuine unique installs, given the package's young age and narrow single-purpose scope | Package Legitimacy Audit | Low — does not affect the slopcheck `[OK]` verdict or the installation recommendation; flagged for transparency only, not a blocker |

## Open Questions

1. **Where should the `cn()` (`clsx` + `tailwind-merge`) helper live, if this phase's components end up needing it?**
   - What we know: no `src/lib/`, `src/utils/`, or similar shared-helper directory exists in the codebase today; `src/components/ui/` is the closest existing home for cross-cutting reusable code.
   - What's unclear: whether the planner wants to establish a new `src/lib/` convention now (since more helpers may follow in later redesign phases) or keep it minimal and colocate/inline for this phase only.
   - Recommendation: given `01-UI-SPEC.md`'s components (as specced) don't obviously need conditional class overriding beyond what plain template strings already handle (see `TestimonialCard`/`ProcessStepItem` examples above, which use zero conditional classes), the planner may reasonably decide the `cn()` helper isn't needed *at all* in this phase and defer establishing `src/lib/` until a component genuinely requires it — installing `clsx`/`tailwind-merge` now (per upstream stack research) doesn't obligate immediate usage.

2. **Does `ProcessStepItem` need connector/line visuals between steps ("connected-step layout" per `01-UI-SPEC.md`), and if so, is that CSS-only or does it need a wrapping `ProcessSection` grid treatment?**
   - What we know: `01-UI-SPEC.md`'s Component Inventory table describes `ProcessSection` as "connected-step layout (numbered, not accordion)" but doesn't specify the exact visual mechanism for the "connected" part (a vertical/horizontal line, a numbered badge only, etc.).
   - What's unclear: this is a visual-design decision below the granularity `01-UI-SPEC.md` locked — the checker-approved contract establishes tokens (spacing/radius/color/type) but not this specific compositional detail.
   - Recommendation: treat as Claude's discretion during planning/execution — a simple approach (numbered eyebrow label per step, as shown in the `ProcessStepItem` code example above, laid out in a responsive grid or flex row via `ProcessSection`) satisfies "connected-step" without requiring new visual elements (no new border/line tokens needed, avoiding Pitfall 1's drift risk). A literal connecting line would need a new token (border color/width) not currently in `01-UI-SPEC.md` — avoid introducing one without checking back against the contract.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|--------------|-----------|---------|----------|
| Node.js | Build/dev toolchain | ✓ | 24.18.0 (per `.planning/codebase/STACK.md`) | — |
| npm | Package install | ✓ | 11.16.0 | — |
| `motion` (npm registry) | Scroll-reveal, `useReducedMotion` | ✓ (registry-verified, not yet installed in `package.json`) | 12.43.0 | — |
| `tw-animate-css` (npm registry) | CSS-first animation utilities | ✓ (registry-verified, not yet installed) | 1.4.0 | — |
| `clsx` / `tailwind-merge` / `class-variance-authority` (npm registry) | Class composition | ✓ (registry-verified, not yet installed) | 2.1.1 / 3.6.0 / 0.7.1 | — |
| `lucide-react` (npm registry) | Icon chrome | ✓ (registry-verified, not yet installed) | 1.27.0 | — |
| `slopcheck` (Python/pip) | Package legitimacy verification (this research session only, not a project runtime dependency) | ✓ | 0.6.1 | — |

**Missing dependencies with no fallback:** none — all required packages are available on their registries and confirmed installable against the current toolchain.
**Missing dependencies with fallback:** none.

## Validation Architecture

Skipped — `.planning/config.json`'s `workflow.nyquist_validation` is explicitly set to `false`.

## Security Domain

`security_enforcement` is absent from `.planning/config.json` (treat as enabled per default), but this phase's scope has minimal security surface: purely presentational React components rendering static, build-time-bundled placeholder data, with zero forms, zero user input, zero network calls, and zero authentication/session concerns anywhere in this project (confirmed frontend-only, no backend, per `CLAUDE.md` constraints).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|----------------|---------|--------------------|
| V2 Authentication | No | No auth anywhere in this project |
| V3 Session Management | No | No sessions anywhere in this project |
| V4 Access Control | No | No access-controlled resources |
| V5 Input Validation | No | This phase introduces no user input — `TestimonialsSection`/`ProcessSection` only render developer-authored static data, never user-submitted content |
| V6 Cryptography | No | No cryptographic operations in this phase's scope |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|-----------------------|
| XSS via testimonial/step copy rendered as raw HTML | Tampering / Information Disclosure | Not applicable as designed — testimonial quotes and process step copy are plain strings rendered via JSX text interpolation (`{testimonial.quote}`), which React escapes automatically. Do not use `dangerouslySetInnerHTML` for this content; there is no requirement in `01-UI-SPEC.md` calling for rich-text/HTML testimonial copy |

No further security domain items apply to this phase's scope — the reservation-form/PII concerns flagged in `.planning/research/PITFALLS.md` (Pitfall 8) are out of scope for Phase 1 (no forms touched here) and will need re-checking whenever a later phase touches `ReservationForm`/`ReservationModal`.

## Sources

### Primary (HIGH confidence)
- `npm view <package> version / peerDependencies / repository.url / time.created / scripts.postinstall` for `motion`, `tw-animate-css`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` — live registry data pulled 2026-07-29, this session
- `slopcheck scan --pkg npm --json <package>` (slopcheck v0.6.1, installed this session) — `[OK]` verdict for all six packages
- Direct source reads (this session): `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/GraphicAccent.tsx`, `src/components/agency/PlanCard.tsx`, `src/components/podcast/GuestTierCard.tsx`, `src/components/agency/ServicesGrid.tsx`, `src/components/home/AboutSection.tsx`, `src/styles/index.css`, `src/types/index.ts`, `vite.config.ts`, `package.json` — used to confirm exact existing patterns/conventions rather than infer them
- `.planning/phases/01-design-system-contract-shared-primitives/01-UI-SPEC.md` — checker-approved design token contract, treated as locked source of truth for all styling values in this research
- `.planning/phases/01-design-system-contract-shared-primitives/01-CONTEXT.md` — locked user decisions D-01 through D-10
- `[CITED: motion.dev/docs/react]` — `motion/react` import path confirmation
- `[CITED: motion.dev/docs/react-use-reduced-motion]` — `useReducedMotion` API
- `[CITED: github.com/Wombosvideo/tw-animate-css]` — installation/`@import` instructions

### Secondary (MEDIUM confidence)
- `.planning/research/STACK.md`, `.planning/research/ARCHITECTURE.md`, `.planning/research/PITFALLS.md`, `.planning/research/SUMMARY.md` — prior project-level research (2026-07-29, same day), Context7/official-docs/WebSearch-verified at time of writing; re-validated in this session where directly checkable (package versions, peer deps)
- WebSearch: "motion library React useReducedMotion whileInView import from motion/react documentation" — cross-referenced against motion.dev official docs pages returned in results
- WebSearch: "tw-animate-css Tailwind v4 usage @import setup github" — cross-referenced against the package's own GitHub README

### Tertiary (LOW confidence)
- npmjs.org downloads API figures (`api.npmjs.org/downloads/point/last-week/<pkg>`) — used for the Package Legitimacy Audit table; the `tw-animate-css` figure specifically is flagged as possibly inflated (see Assumptions Log A3), does not affect any recommendation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all six packages independently re-verified live against the npm registry this session (not relying solely on prior research or training data), peer-dependency compatibility against React 19.2.7 confirmed directly
- Architecture: HIGH — grounded directly in the checker-approved `01-UI-SPEC.md` and direct reads of the actual existing component source files; no external speculation needed
- Pitfalls: HIGH for phase-specific pitfalls (motion import path, tw-animate-css dev-dependency placement — both independently verified); MEDIUM-HIGH for inherited cross-phase pitfalls (sourced from `.planning/research/PITFALLS.md`, itself MEDIUM-HIGH confidence per its own metadata)

**Research date:** 2026-07-29
**Valid until:** 30 days (2026-08-28) — npm package versions and peer-dependency ranges can shift; re-verify versions if planning is delayed significantly past this window. The design-token contract (`01-UI-SPEC.md`) itself is stable/locked and does not expire.

---
*Phase: 01-design-system-contract-shared-primitives*
*Researched: 2026-07-29*
