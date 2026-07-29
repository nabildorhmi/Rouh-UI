# Walking Skeleton — Rouh

**Phase:** 1
**Generated:** 2026-07-29

## Capability Proven End-to-End

A site visitor loading the running app can see a reusable, page-agnostic testimonials section and process ("how it works") section — populated from real static data fixtures, driven entirely by props, with a visible scroll-reveal micro-interaction — proving the design-token contract, new dependency stack (motion, tw-animate-css, clsx, tailwind-merge, class-variance-authority, lucide-react), and shared-component architecture all work end-to-end before any production page adopts them.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | React 19 + TypeScript + Vite (existing, unchanged) | Locked project constraint (CLAUDE.md) — this phase extends the existing SPA, no framework change |
| Data layer | Static, build-time-bundled TypeScript fixtures in `src/data/*.ts` (no DB, no fetch) | Project is frontend-only with zero backend (CLAUDE.md constraint); "real read/write" in this context means real typed data flowing from `src/data/` through props into rendered JSX, not a database operation |
| Styling system | Tailwind CSS v4 utility classes + local style-constant variables, no `@apply`, no component-class abstraction, no shadcn/CLI | Existing, locked convention (`01-UI-SPEC.md`: "no shadcn... bespoke hand-rolled system") |
| Motion | `motion` (`motion/react` import path) for scroll-reveal + `useReducedMotion`; `tw-animate-css` installed as a dev-dependency build-time CSS import only | Verified live against npm registry and React 19.2.7 peer-deps in `01-RESEARCH.md`; `useReducedMotion` is the explicit mechanism D-06 requires for fully disabling (not toning down) animation |
| Component architecture | Pure presentational, prop-driven shared components in `src/components/shared/` (`TestimonialsSection`/`TestimonialCard`, `ProcessSection`/`ProcessStepItem`) — zero page-awareness, filtering happens at the page boundary (Phase 2/3), not inside the components | Structural enforcement of "equal weight" between Agency and Podcast (Pitfall 5/6 in project research) |
| Deployment target | Local dev server (`npm run dev`) — no live deployment configured this milestone | Frontend-only static site; deployment target ("any static file server or CDN") is set at project level but not exercised until a later milestone/phase actually ships |
| Directory layout | `src/components/shared/` (new shared primitives), `src/data/` (new fixtures), `src/types/index.ts` (single types file, extended not replaced), `src/pages/` (one new temporary verification route) | Matches existing, established project structure exactly — no new top-level directories |

## Stack Touched in Phase 1

- [x] Project scaffold (framework, build, lint) — already existed prior to this phase; this phase only adds dependencies (`npm install`) and new files following existing conventions, no scaffold changes
- [x] Routing — one real route added: `/dev/design-preview` (temporary, additive-only registration in `src/App.tsx`)
- [x] Data — one real "read": static `Testimonial[]`/`ProcessStep[]` fixtures (`src/data/testimonials.ts`, `src/data/process.ts`) imported and rendered through typed props (this project has no database; static build-time data is the closest equivalent, per the frontend-only constraint)
- [x] UI — one real interactive element: scroll-reveal motion (`motion/react`'s `whileInView` + `useReducedMotion`) on `TestimonialsSection`'s and `ProcessSection`'s card/step grids, visually confirmed via the Plan 01-03 human-verify checkpoint
- [x] Deployment — documented local full-stack run command: `npm run dev` (dev server), `npm run build` (production build validation); no live deployment target configured this milestone

## Out of Scope (Deferred to Later Slices)

- Wiring `TestimonialsSection`/`ProcessSection` into any real production page (`Home.tsx`, `Agency.tsx`, `Podcast.tsx`, `Contact.tsx`) — that is Phase 2 (Agency) and Phase 3 (Podcast) work
- Real client/renter testimonial content — Phase 1 ships realistic placeholder copy (D-07/D-08); real quotes are a future-milestone concern, not scoped anywhere in this project's v1/v2 requirements
- Removing the temporary `/dev/design-preview` route and `src/pages/DevDesignPreview.tsx` — should be deleted once Phase 2 or 3 renders these shared components on a real page; flagged here so that cleanup isn't silently forgotten
- Any new CSS custom properties / `@theme` tokens — this phase intentionally introduces zero new design tokens; all spacing/radius/shadow/color values reuse existing Tailwind utilities per `01-UI-SPEC.md`
- Radix UI primitives (`@radix-ui/react-accordion`, `@radix-ui/react-tabs`) — not installed this phase; only add if a later phase's FAQ/toggle layout genuinely requires them
- Automated test suite — explicitly out of scope for this entire project (REQUIREMENTS.md), verification in this phase relies on `tsc`/`grep`/`npm run build` plus one human-verify checkpoint

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2 (Agency Page — Reference Implementation): filters `testimonials`/`processSteps` by `"agency"` and renders the shared `TestimonialsSection`/`ProcessSection` on the real Agency page, alongside portfolio and real Agency copy
- Phase 3 (Podcast Page — Studio Rental Rework + Full Integration): same shared components, `"podcast"`-filtered data, plus the studio rental content-model rework (guest tiers → rental packages)
- Phase 4 (Sitewide Copy, Terminology & Parity QA): finalizes copy everywhere, verifies the testimonial split stays balanced sitewide, and is the natural point to delete the Phase 1 `/dev/design-preview` scaffolding if not already removed in Phase 2/3
