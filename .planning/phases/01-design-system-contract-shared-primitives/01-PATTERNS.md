# Phase 1: Design System Contract + Shared Primitives - Pattern Map

**Mapped:** 2026-07-29
**Files analyzed:** 8 (4 new components, 2 new data files, 1 types edit, 1 styles edit)
**Analogs found:** 8 / 8

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|------------------|----------------|
| `src/components/shared/TestimonialCard.tsx` | component (presentational card) | CRUD (render-only, no mutation) | `src/components/podcast/GuestTierCard.tsx` (structure) + `src/components/agency/ServicesGrid.tsx`'s card cell (rest-state styling) | role-match |
| `src/components/shared/TestimonialsSection.tsx` | component (section wrapper) | CRUD (render-only) + streaming-esque (scroll-triggered reveal) | `src/components/home/AboutSection.tsx` (section shell + `SectionHeading`/`GraphicAccent` composition) | role-match |
| `src/components/shared/ProcessStepItem.tsx` | component (presentational item) | CRUD (render-only) | `src/components/agency/PortfolioShowcase.tsx`'s item cell (typed-list `.map()` item pattern) | role-match |
| `src/components/shared/ProcessSection.tsx` | component (section wrapper) | CRUD (render-only) + event-driven (scroll reveal) | `src/components/home/AboutSection.tsx` | role-match |
| `src/data/testimonials.ts` | data (static fixture) | CRUD (static array) | `src/data/portfolio.ts` (flat typed array, same file shape) | exact |
| `src/data/process.ts` | data (static fixture, grouped) | CRUD (static object keyed by category) | `src/data/guestTiers.ts` (typed array with `highlighted`/discretionary fields) — shape difference (grouped object, not flat array) noted below | role-match |
| `src/types/index.ts` (edit: append `Testimonial`, `ProcessStep`) | model (type definitions) | CRUD (type-only) | same file, existing `PortfolioItem`/`GuestTier`/`Plan` interfaces | exact |
| `src/styles/index.css` (edit: add `@import "tw-animate-css";`) | config (global stylesheet) | batch (build-time CSS) | same file, existing `@import "tailwindcss";` line | exact |

## Pattern Assignments

### `src/components/shared/TestimonialCard.tsx` (component, CRUD/render-only)

**Analog:** `src/components/podcast/GuestTierCard.tsx` (structure/props/typing conventions) — but note the UI-SPEC (01-UI-SPEC.md lines 44-46, 108) explicitly says `TestimonialCard` gets **no hover state and no shadow** (non-interactive), unlike `GuestTierCard`'s `highlighted` shadow variant. Use `ServicesGrid.tsx`'s rest-state card treatment (`rounded-2xl border border-black/10 p-6`, no hover) as the styling source of truth instead, and `GuestTierCard.tsx` only for prop-typing/structure conventions.

**Imports pattern** (`src/components/podcast/GuestTierCard.tsx` lines 1-3):
```tsx
import type { GuestTier } from "../../types";
import { Button } from "../ui/Button";
import { GraphicAccent } from "../ui/GraphicAccent";
```
Adapt for `TestimonialCard`: only needs `import type { Testimonial } from "../../types";` — no `Button`/`GraphicAccent` needed per-card (GraphicAccent budget is spent at the section level, not per-card, per D-10 and UI-SPEC line 48).

**Props typing pattern** (`GuestTierCard.tsx` lines 5-8):
```tsx
interface GuestTierCardProps {
  tier: GuestTier;
  onSelect: (tier: GuestTier) => void;
}

export function GuestTierCard({ tier, onSelect }: GuestTierCardProps) {
```
`TestimonialCard` has no callback (non-interactive, presentational only) — mirror `PortfolioShowcase.tsx`'s simpler `{ items }: { items: PortfolioItem[] }` destructure style instead, or a dedicated `TestimonialCardProps { testimonial: Testimonial }`.

**Card shell — rest-state only, no hover** (`src/components/agency/ServicesGrid.tsx` lines 7 vs `GuestTierCard.tsx` line 13-16):
```tsx
// ServicesGrid.tsx — rest-state border card (correct base for TestimonialCard, minus the hover)
<div className="rounded-2xl border border-black/10 p-6 hover:border-orange/40 transition-colors">
```
For `TestimonialCard`, drop the `hover:border-orange/40 transition-colors` (UI-SPEC line 108: non-interactive cards get zero hover affordance) — use exactly `rounded-2xl border border-black/10 p-6`.

**Item-cell + attribution block pattern** (`src/components/agency/PortfolioShowcase.tsx` lines 6-20):
```tsx
{items.map((item) => (
  <div key={item.title} className="flex flex-col gap-3">
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-orange">
        {item.category}
      </span>
      <h3 className="text-base font-black text-black mt-1">{item.title}</h3>
      <p className="text-sm text-black/60 mt-1">{item.description}</p>
    </div>
  </div>
))}
```
This `flex flex-col` + label/title/body stack is the pattern to reuse for the quote/name/role block inside `TestimonialCard`. Note RESEARCH.md's own code example (already-verified against `01-UI-SPEC.md`) at `01-RESEARCH.md` lines 425-436 is the most directly copyable source — treat it as the primary template, with `GuestTierCard.tsx`/`ServicesGrid.tsx` as the confirming analogs for conventions (typed props, no `@apply`, style via inline Tailwind).

---

### `src/components/shared/TestimonialsSection.tsx` (component, section wrapper + scroll-reveal)

**Analog:** `src/components/home/AboutSection.tsx`

**Full analog** (`src/components/home/AboutSection.tsx` lines 1-17):
```tsx
import { GraphicAccent } from "../ui/GraphicAccent";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden">
      <GraphicAccent variant={2} className="absolute left-0 top-0 h-32 w-32 -translate-x-1/3 -translate-y-1/4 opacity-10" />

      <SectionHeading
        eyebrow="About ROUH"
        title="Rouh means soul — that's the point."
        align="center"
        description="Placeholder brand story..."
      />
    </section>
  );
}
```
**Copy for `TestimonialsSection`:** the `<section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 ...">` shell + `SectionHeading` composition + at-most-one `GraphicAccent` (UI-SPEC line 48) verbatim. `TestimonialsSection` additionally needs the grid + `motion` wiring, for which the canonical source is `01-RESEARCH.md` Pattern 3 (lines 304-352) — already checker-aligned against `01-UI-SPEC.md`'s Motion table (lines 105, 109-110):
```tsx
import { motion, useReducedMotion } from "motion/react";
// ...
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
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {testimonials.map((t) => (
        <motion.div key={t.id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
          <TestimonialCard testimonial={t} />
        </motion.div>
      ))}
    </motion.div>
  </section>
);
```

**Empty-array guard (Copywriting Contract, UI-SPEC line 123):** `if (testimonials.length === 0) return null;` — no existing component in the codebase has this guard today (all current sections receive non-empty static data), so this is new-but-simple defensive code, not an analog gap of concern.

**Grid pattern precedent** (`src/components/agency/ServicesGrid.tsx` line 5, `src/components/agency/PortfolioShowcase.tsx` line 5):
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">   // ServicesGrid
<div className="grid gap-6 sm:grid-cols-3">                    // PortfolioShowcase
```
Confirms `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` + `gap-6` is the established responsive-grid idiom — the `motion.div` in the section above should carry these same classes (already does, per RESEARCH.md's example).

---

### `src/components/shared/ProcessStepItem.tsx` (component, presentational numbered item)

**Analog:** `src/components/agency/PortfolioShowcase.tsx`'s item-cell (`.map()` render body, lines 6-21) for the typed-props + flex-col stack convention; `01-RESEARCH.md` lines 449-458 for the exact numbered-step content shape (already checker-verified against UI-SPEC typography rows — eyebrow/title/body).

**Props + shell pattern** (adapted from `PortfolioShowcase.tsx` conventions + `01-RESEARCH.md`):
```tsx
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
The eyebrow-style `text-xs font-bold uppercase tracking-[0.2em] text-orange` label is copied directly from `SectionHeading.tsx` line 14 — same eyebrow token reused at the item level (UI-SPEC Typography table row 1, line 77).

---

### `src/components/shared/ProcessSection.tsx` (component, section wrapper + scroll-reveal)

**Analog:** `src/components/home/AboutSection.tsx` (section shell/heading composition, same as `TestimonialsSection`) + `01-RESEARCH.md` Pattern 3 (motion wiring, same mechanism as `TestimonialsSection` — stagger + `whileInView` + `useReducedMotion`, applied to `steps.map()` instead of `testimonials.map()`).

**Connected-step layout note (Open Question 2 in RESEARCH.md, lines 507-510):** no existing codebase analog has a "connected" multi-step visual (no connector lines/badges exist anywhere in `src/components/`). Per RESEARCH.md's own recommendation, the simplest compliant approach — numbered eyebrow label per step (as in `ProcessStepItem` above) laid out in a responsive flex/grid row via `ProcessSection` — avoids introducing an undocumented border/line token. Treat this as Claude's discretion during planning, not a pattern to search further for.

**Props pattern**, mirroring `TestimonialsSection`:
```tsx
interface ProcessSectionProps {
  steps: ProcessStep[];
  eyebrow?: string;
  title: string;
  description?: string;
}
```

---

### `src/data/testimonials.ts` (data, static fixture)

**Analog:** `src/data/portfolio.ts` (exact structural match — flat typed array, one-line placeholder-sourcing comment at top, named export).

**Full analog** (`src/data/portfolio.ts` lines 1-20):
```ts
import type { PortfolioItem } from "../types";

// Placeholder case studies — swap in real client work when available.
export const portfolio: PortfolioItem[] = [
  {
    title: "Placeholder Client A",
    category: "Brand Launch",
    description: "Placeholder case study copy describing scope, approach, and results.",
  },
  // ...
];
```
Apply the exact same shape for `testimonials.ts`: `import type { Testimonial } from "../types";`, a top comment noting placeholder-content status (per D-07/D-08, phrase it as "realistic placeholder testimonials, not final client quotes" rather than "TBD" — content is meant to read as finished per D-08), then `export const testimonials: Testimonial[] = [...]` using the exact 4 sample records from `01-UI-SPEC.md` lines 133-136 (Sarah Chen/Lumen Skincare, Marcus Webb/Northfield Outdoor, Priya Ramesh/The Build Sheet, David Okafor/Second Opinion Podcast) as the copy source — this table is the checker-approved content deliverable, not just an example.

---

### `src/data/process.ts` (data, static fixture — grouped object, not flat array)

**Analog:** `src/data/guestTiers.ts` (closest for typed-array-with-comment conventions and `id`-per-item shape), but the **shape differs**: `process.ts` is a grouped `{ agency: ProcessStep[]; podcast: ProcessStep[] }` object per `01-RESEARCH.md` lines 280-297 and the Architecture Patterns diagram (lines 152-156), not a flat array like every other file in `src/data/`. This is a deliberate, RESEARCH-specified deviation — flag it in the plan as intentional, not a drift from convention.

**Conventions to carry over from `guestTiers.ts`** (lines 1-4):
```ts
import type { GuestTier } from "../types";

// Placeholder pricing — TBD, replace with real guest slot pricing.
export const guestTiers: GuestTier[] = [ ... ];
```
i.e., `import type` for the type, a top-of-file placeholder-status comment, `export const <camelCase-plural>`. Apply directly to `process.ts`'s grouped-object export, using `01-RESEARCH.md`'s Pattern 2 code block (lines 283-297) as the literal content source (already contains both agency and podcast 4-step sequences).

---

### `src/types/index.ts` (edit — append `Testimonial`, `ProcessStep`)

**Analog:** same file, existing interfaces (`PortfolioItem` lines 6-10, `GuestTier` lines 28-35).

**Pattern to follow** (existing conventions in this file):
```ts
export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
}

export interface GuestTier {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}
```
Data-model interfaces are PascalCase, no `Props` suffix (that suffix is reserved for component prop interfaces, per `CLAUDE.md`'s naming conventions), optional fields via `?:`. Add:
```ts
export interface Testimonial {
  id: string;
  category: "agency" | "podcast" | "both";
  quote: string;
  name: string;
  role: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
```
Append after the existing `GuestTier` block (or after `ReservationFormData` at end of file) — do not create a new types module (CLAUDE.md is explicit: single `src/types/index.ts` file).

---

### `src/styles/index.css` (edit — add `@import "tw-animate-css";`)

**Analog:** same file, existing `@import "tailwindcss";` (line 1).

**Exact edit location** (`src/styles/index.css` line 1):
```css
@import "tailwindcss";
```
becomes:
```css
@import "tailwindcss";
@import "tw-animate-css";
```
Per `01-RESEARCH.md` lines 476-481 and Pitfall 4 (lines 398-403) — must be installed as `npm install -D tw-animate-css` (dev dependency, build-time-only CSS, never imported in JS). Rest of file (`@font-face`, `@theme`, `@layer base`, `@layer utilities`) is unrelated to this phase and must not be touched — the `--color-gold`/`--color-orange` tokens in `@theme` (lines 27-31) are the pattern new design tokens would follow if any were added, but per CONTEXT.md/RESEARCH.md, this phase introduces no new CSS custom properties — all new spacing/radius/shadow/color values reuse existing Tailwind utilities directly (no `@theme` edit needed beyond the `tw-animate-css` import).

---

## Shared Patterns

### Section shell (heading + container)
**Source:** `src/components/home/AboutSection.tsx` (verbatim shell), `src/components/ui/SectionHeading.tsx` (composed, unchanged)
**Apply to:** `TestimonialsSection.tsx`, `ProcessSection.tsx`
```tsx
<section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden">
  <GraphicAccent variant={N} className="absolute ... opacity-10" /> {/* optional, at most 1 per section */}
  <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />
  {/* grid/list content */}
</section>
```

### Rest-state bordered card (non-interactive)
**Source:** `src/components/agency/ServicesGrid.tsx` line 7 (minus the `hover:` classes)
**Apply to:** `TestimonialCard.tsx`
```tsx
<div className="rounded-2xl border border-black/10 p-6">
```

### Responsive grid
**Source:** `src/components/agency/ServicesGrid.tsx` line 5, `src/components/agency/PortfolioShowcase.tsx` line 5
**Apply to:** `TestimonialsSection.tsx`'s card grid
```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

### Eyebrow label token
**Source:** `src/components/ui/SectionHeading.tsx` line 14
**Apply to:** `ProcessStepItem.tsx` (per-step "Step N" label), any new eyebrow-style text
```tsx
<span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">{label}</span>
```

### Scroll-reveal motion (new pattern this phase, no prior codebase analog — sourced from RESEARCH.md, checker-verified against UI-SPEC)
**Source:** `01-RESEARCH.md` Pattern 3 (lines 304-352), `01-UI-SPEC.md` Motion table (lines 101-112)
**Apply to:** `TestimonialsSection.tsx` (designated first proof-of-wiring interaction), `ProcessSection.tsx`
```tsx
import { motion, useReducedMotion } from "motion/react";
const shouldReduceMotion = useReducedMotion();
// initial={shouldReduceMotion ? false : "hidden"}, whileInView={shouldReduceMotion ? undefined : "visible"}
// viewport={{ once: true, margin: "-80px" }}, staggerChildren: 0.08, child: opacity 0→1 + y 16→0, duration 0.4, ease "easeOut"
```
**Critical:** import from `motion/react`, never bare `motion` or `framer-motion` (Pitfall 2, RESEARCH.md lines 384-389).

### Static data file shape
**Source:** `src/data/portfolio.ts` (flat array), `src/data/guestTiers.ts` (flat array with placeholder-status comment)
**Apply to:** `src/data/testimonials.ts` (flat array — follow exactly), `src/data/process.ts` (grouped object — deliberate deviation, see file section above)
```ts
import type { X } from "../types";
// <placeholder-status comment>
export const xs: X[] = [ /* ... */ ];
```

### Type definitions
**Source:** `src/types/index.ts` existing interfaces
**Apply to:** `Testimonial`, `ProcessStep` additions to the same file
```ts
export interface X {
  id: string;
  // fields, PascalCase interface name, no `Props` suffix
}
```

## No Analog Found

No files in this phase lack an analog — every new file has at least a role-match precedent in the existing codebase. The one genuinely novel pattern (scroll-reveal motion via `motion/react`) has no codebase analog because no animation library is installed yet anywhere in the repo, but it is fully specified and checker-verified in `01-RESEARCH.md`/`01-UI-SPEC.md`, so it is not a gap — see "Shared Patterns" above for the concrete source to copy from instead of a codebase file.

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| (none) | — | — | All 8 files have at least a role-match analog; motion wiring sourced from RESEARCH.md/UI-SPEC.md instead of a codebase file since no prior animation usage exists |

## Conventions

Derived via `gsd-tools.cjs verify conventions --derive --scope src` (shared deterministic module, same as `gsd-code-reviewer` uses).

| Axis | Dominant | Share | Entropy | Status |
|------|----------|-------|---------|--------|
| File-name casing | PascalCase | 75% (24/32) | 0.811 | contested hotspot |
| Identifier casing | PascalCase | 100% (25/25) | 0 | named contract |
| Export style | ESM | 100% (30/30) | 0 | named contract |
| Import style | ESM | 100% (29/29) | 0 | named contract |

**File-name casing detail:** the 25% camelCase minority is `src/data/*.ts` (e.g. `portfolio.ts`, `guestTiers.ts`, `episodes.ts`) — data/utility modules are camelCase by convention (confirmed in `CLAUDE.md`'s own naming table: "Data/utility modules: camelCase or descriptive lowercase" vs. "React components: PascalCase"). This is a **within-repo two-population split, each internally consistent**, not true contention: components are 100% PascalCase, data files are 100% camelCase. New files in this phase should follow the same split — `TestimonialCard.tsx`/`TestimonialsSection.tsx`/`ProcessStepItem.tsx`/`ProcessSection.tsx` PascalCase (components), `testimonials.ts`/`process.ts` camelCase (data).

**Contested hotspots (author's choice):** this repo does not currently exhibit the CJS↔SDK dual-resolver split (no `bin/lib/**`-style CJS directory exists in this frontend-only project) — that pattern is specific to the GSD plugin's own tooling repo, not applicable here. The one axis flagged "contested" by the raw share threshold (file-name casing, 75% < 70%... actually 75% ≥ 70%, so it is at the boundary) resolves cleanly once split by directory role (components vs. data), matching the same "match the local directory's style" principle: new component files go PascalCase, new data files go camelCase — author's choice only applies within each population, and both populations are locked at 100% internally.

## Metadata

**Analog search scope:** `src/components/{ui,shared,agency,podcast,home}/`, `src/data/`, `src/types/`, `src/styles/`
**Files scanned:** `SectionHeading.tsx`, `GraphicAccent.tsx`, `Button.tsx`, `PortfolioShowcase.tsx`, `GuestTierCard.tsx`, `ServicesGrid.tsx`, `AboutSection.tsx`, `types/index.ts`, `data/portfolio.ts`, `data/guestTiers.ts`, `styles/index.css`, `package.json`, `01-UI-SPEC.md`
**Pattern extraction date:** 2026-07-29
