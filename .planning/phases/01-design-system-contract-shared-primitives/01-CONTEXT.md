# Phase 1: Design System Contract + Shared Primitives - Context

**Gathered:** 2026-07-29
**Status:** Ready for planning

<domain>
## Phase Boundary

A documented visual/design-token contract exists and reusable, page-agnostic trust components (testimonials, "how it works" process) are built and proven — ready for Agency and Podcast to consume identically, so "equal weight" and "elevated but on-brand" are enforced structurally rather than left to drift. Pure infrastructure phase: no v1 requirements are delivered directly here, but TRUST-01/02/04/05 (Phases 2-3) and DSGN-01 (Phase 4) depend on what this phase produces. No page gets its final content in this phase.

</domain>

<decisions>
## Implementation Decisions

### Visual Direction
- **D-01 [informational]:** Style direction is "minimal & precise" — tight grid, restrained color use, lets the orange/gold accents do the work; a studio/tech-adjacent feel rather than bold/editorial or warm/soft. Not independently task-tracked — this is the meta-principle that 01-UI-SPEC.md's token contract (spacing scale, D-02, D-03) structurally implements; no discrete Phase 1 task asserts it directly.
- **D-02:** Keep the existing shape language (rounded-2xl cards, gradient + scale-on-hover buttons) — elevate spacing/hierarchy/shadows around it rather than tightening to sharper corners.
- **D-03:** Orange/gold stay accent-only (CTAs, eyebrows, highlights, the existing `.bg-gradient-brand` utility) — no full-section color blocks. Backgrounds stay white/black.
- **D-04 [informational]:** Placeholder imagery (portfolio thumbnails, future studio photos) keeps the current gold/orange gradient box treatment — no added texture/pattern layer. Out of scope for Phase 1 — no plan touches `portfolio.ts` or studio photos. Applies when Phase 2 (Agency) / Phase 3 (Podcast) work on imagery.

### Motion & Micro-interactions
- **D-05:** Motion is subtle only — fade/slide-in on scroll for sections, hover states on cards/buttons. No staggered reveals, parallax, or expressive motion; supports the "minimal & precise" direction.
- **D-06:** `prefers-reduced-motion` disables animations entirely (via `motion`'s `useReducedMotion`), not just toned down.

### Testimonial Content Source
- **D-07:** No real client/renter testimonials exist yet. Write realistic, brand-voice placeholder testimonials for both Agency and Podcast lines — same approach as the studio photography decision (placeholder now, real content swaps in later).
- **D-08:** Placeholder testimonials use realistic fictional names and company/context (e.g., "Sarah Chen, Founder, Lumen Skincare"), not obviously-fake markers like "[Client Name]" — reads as finished content, restructuring not required when real quotes arrive.
- **D-09:** Per research's dependency note, maintain a balanced minimum split (2+ testimonials per service line) so the section never silently favors one side — applies to both this phase's sample data and Phases 2-3's real page content.

### Graphic Element Usage
- **D-10:** The 4 `GraphicAccent` brand stroke elements are used as sparing signature accents — 1-2 deliberate placements per page (hero, section dividers), not a recurring background motif. Consistent with the minimal direction.

### Claude's Discretion
- Exact spacing scale, corner radius values, and shadow rules to formalize in the DESIGN.md contract (informed by D-01 through D-04, not re-litigated with the user)
- Which specific scroll/hover interactions get motion treatment first
- Exact wording/details of placeholder testimonial copy (must follow D-07/D-08/D-09)
- Icon usage details from `lucide-react` (chrome elements like chevrons/checkmarks)

</decisions>

<specifics>
## Specific Ideas

- User's own framing for the visual gap: "lacks polish/premium feel" and "not sure yet — show me" (from project init questioning) — this phase's DESIGN.md is effectively the concrete proposal that answers that "show me."
- Testimonial attribution should read as genuinely finished content (D-08), not a visible placeholder — mirrors the "generic pictures for now" approach already agreed for studio photography (PROJECT.md, STUD-06).

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & requirements
- `.planning/PROJECT.md` — Core value, locked brand constraints (Gotham font, orange #c1622e / gold #d9a253, existing graphic elements), frontend-only scope, Antigravity CLI handoff constraint
- `.planning/REQUIREMENTS.md` — Full v1 requirement list; this phase enables TRUST-01/02/04/05 and DSGN-01 without delivering them directly
- `.planning/ROADMAP.md` §Phase 1 — Goal, success criteria, dependency chain into Phases 2-4

### Research
- `.planning/research/STACK.md` — Verified library choices (`motion` 12.43.0, `tw-animate-css` 1.4.0, `clsx`/`tailwind-merge`/`class-variance-authority`, `lucide-react` 1.27.0, optional `embla-carousel-react`/Radix primitives) with React 19 peer-dep confirmation
- `.planning/research/ARCHITECTURE.md` — Component boundaries and data flow for `TestimonialsSection`/`ProcessSection` (shared, prop-driven, filtered at page boundary not inside components) and suggested build order
- `.planning/research/PITFALLS.md` — Pitfall 1 (elevation drifting into undeclared rebrand) and Pitfall 6 (agent-driven architectural inconsistency) are the two risks this phase exists to prevent
- `.planning/research/SUMMARY.md` — Executive synthesis; Phase 1 rationale section

### Codebase maps
- `.planning/codebase/CONVENTIONS.md` — Naming, Tailwind patterns (no `@apply`, style-constant pattern), accessibility patterns already in use
- `.planning/codebase/STRUCTURE.md` — Directory layout; where new shared components/data files belong (`src/components/shared/`, `src/data/`)
- `.planning/codebase/STACK.md` — Existing dependency baseline (confirms zero animation/icon/carousel libs currently installed)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/SectionHeading.tsx` — eyebrow/title/description pattern already used across pages; `TestimonialsSection`/`ProcessSection` should likely compose this for consistent heading treatment
- `src/components/ui/GraphicAccent.tsx` — 4 SVG brand-stroke variants (1-4), explicitly documented as "never used as a literal icon" — use per D-10 (sparing signature accents)
- `src/components/ui/Button.tsx` — variant pattern (`primary`/`secondary`/`ghost`) with gradient + hover-scale already established; reuse for any new CTAs rather than introducing a new button style
- `src/components/agency/PortfolioShowcase.tsx` + `src/data/portfolio.ts` — **already exist and are already wired into `Agency.tsx`** (PORT-01 is largely satisfied structurally; Phase 2 work is real copy + design polish, not building a new section from scratch)
- `src/components/podcast/GuestTierCard.tsx` — proven tier→card pattern research recommends renaming in-place for Phase 3's `StudioPackageCard`

### Established Patterns
- No component classes / no `@apply` — inline Tailwind with local style-constant variables (`const cardStyles = {...}`) for repeated patterns; new shared components should follow this, not introduce a new styling approach
- No path aliases — relative imports only
- Named exports only (except `App.tsx` default export) — `TestimonialsSection`/`ProcessSection` should be named exports
- Props always typed via a dedicated `*Props` interface

### Integration Points
- New shared components belong in `src/components/shared/` alongside `ReservationForm`/`ReservationModal`/`ConfirmationStep`
- New data files belong in `src/data/` following the existing flat-array-of-typed-objects pattern (e.g., `testimonials.ts` with a `category: "agency" | "podcast" | "both"` field per ARCHITECTURE.md research)
- New types get added to the single `src/types/index.ts` file, not a new types module
- `@theme` block in `src/styles/index.css` is where any new design tokens (spacing/shadow scale, if formalized as CSS custom properties) would be added, alongside the existing `--color-gold`/`--color-orange`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 1 scope (design contract + shared primitives infrastructure).

</deferred>

---

*Phase: 01-design-system-contract-shared-primitives*
*Context gathered: 2026-07-29*
