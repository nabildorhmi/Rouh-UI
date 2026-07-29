# Stack Research

**Domain:** Premium marketing site polish layer — React 19 + TypeScript + Vite + Tailwind CSS v4 (existing stack, no framework change)
**Researched:** 2026-07-29
**Confidence:** HIGH

> Scope note: This file does NOT re-recommend React/Vite/Tailwind/React Router/React Hook Form — those are locked (see `.planning/codebase/STACK.md`). It recommends the **additive** libraries needed to take the existing SPA from "functional" to "premium/polished" and to build the new testimonials + process sections. Verified against `package.json` (2026-07-29): no animation, carousel, icon, or class-utility library is currently installed — all recommendations below are net-new additions, not replacements.

## Recommended Stack

### Core Technologies (animation & interaction)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `motion` | 12.43.0 | Micro-interactions, scroll-triggered reveals, hover/tap states, page/section transitions | This is "Framer Motion" rebranded (Dec 2024) — the current canonical package name. Declares `react: "^18.0.0 \|\| ^19.0.0"` and `react-dom: "^18.0.0 \|\| ^19.0.0"` as peer deps, so it installs cleanly against React 19.2.7 with no `--legacy-peer-deps` workaround. It's the de facto standard for React 2026 marketing-site polish: declarative `whileInView`/`whileHover`/`whileTap` props map directly onto the "elevate micro-interactions" requirement, animations run off the main thread (hardware-accelerated transforms), and it ships a built-in `useReducedMotion` hook for accessibility. HIGH confidence — verified via Context7 (`/websites/motion_dev`) and `npm view`. |
| `tw-animate-css` | 1.4.0 | Utility-class keyframe animations (fade-in, slide-in, accordion-open/close) driven by CSS/data-attributes, no JS | Tailwind v4 moved to a CSS-first config (`@theme`, no `tailwind.config.js` plugin API by default). The old `tailwindcss-animate` plugin is JS-plugin-based and doesn't fit v4's architecture cleanly; `tw-animate-css` is the community-maintained, CSS-native replacement built specifically for v4. Use it for simple, cheap transitions (e.g., an accordion step opening in the "how it works" section) where a full Motion component would be overkill. MEDIUM confidence (WebSearch-verified across multiple sources, no official Tailwind Labs endorsement, but it's the de facto v4 successor and is what shadcn/ui's v4 branch adopted). |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` | 2.1.1 | Conditional class name composition | Any component with variant/state-driven Tailwind classes (buttons, cards, nav active states) — needed once "premium" styling introduces more conditional states than the current codebase has |
| `tailwind-merge` | 3.6.0 | Resolves conflicting Tailwind utility classes when composing/overriding | Pair with `clsx` as the standard `cn()` utility (`cn(...)` = `twMerge(clsx(...))`) so component-level class overrides (e.g., a `<Card variant="testimonial">` extending a base card) don't silently produce conflicting utilities |
| `class-variance-authority` | 0.7.1 | Type-safe variant APIs for components (e.g., button/card `variant`/`size` props) | Optional, but worth adopting if the redesign introduces multiple button/card styles (primary/secondary, agency/podcast theming) — keeps variant logic out of ad hoc ternaries and is framework-agnostic (works fine with Tailwind v4) |
| `lucide-react` | 1.27.0 | Icon set (chevrons, checkmarks, arrows, social icons) | Codebase currently has zero icon library — only the 4 locked brand graphic elements and logo SVGs exist. Needed for UI chrome (accordion chevrons in "how it works", checkmarks in plan/package cards, nav/menu icons) without touching the locked brand assets. Tree-shakeable (only imports icons actually used), peer deps confirm React 19 support (`^16.5.1 \|\| ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0`) |
| `embla-carousel-react` | 8.6.0 | Headless, unstyled carousel primitive | Use **only if** the testimonials section ends up with more items than comfortably fits a static grid (see Patterns below). Peer deps explicitly include `^19.0.0` and `^19.0.0-rc`. It's unstyled by design, so it composes with Tailwind v4 utilities directly rather than fighting a themed component library. It's also the carousel engine shadcn/ui ships under its `Carousel` component, so it's the closest thing to a 2026 community standard for React carousels |
| `@radix-ui/react-accordion` | 1.2.20 | Accessible, unstyled accordion primitive | Use for an FAQ-style or expandable "what happens after you book" pattern in the process section if a linear numbered-steps layout isn't expressive enough. Handles keyboard nav, `aria-expanded`, focus management for free — don't hand-roll this for an accessibility-sensitive interactive pattern |
| `@radix-ui/react-tabs` | 1.1.21 | Accessible, unstyled tabs primitive | Use if the "how it works" section needs an Agency-vs-Podcast toggle (matches the "equal weight" requirement — a tabbed process view keeps both flows visible without duplicating the whole page section) |
| `vite-plugin-image-optimizer` | 2.0.3 | Build-time compression of raster images (JPEG/PNG → optimized output, WebP/AVIF conversion via Sharp + SVGO for SVGs) | Add to `vite.config.ts` as a dev dependency. This is a static, backend-less site — there's no image CDN or on-request optimization, so compression has to happen at build time. This plugin wraps `sharp`/`svgo` and requires zero changes to how images are imported in components |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `sharp` (transitive via `vite-plugin-image-optimizer`) | Native image processing binary | Installs a platform-specific native binary — verify it installs cleanly in whatever CI/build environment Antigravity CLI uses; no code changes needed, it's a build-time-only dependency |

## Installation

```bash
# Animation & interaction
npm install motion tw-animate-css

# Class composition utilities
npm install clsx tailwind-merge class-variance-authority

# Icons
npm install lucide-react

# Accessible unstyled primitives (install only the ones you end up using)
npm install @radix-ui/react-accordion @radix-ui/react-tabs

# Carousel (only if testimonials grow beyond a static grid — see Patterns)
npm install embla-carousel-react

# Dev-only: build-time image optimization
npm install -D vite-plugin-image-optimizer
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|--------------|-------------|--------------------------|
| `motion` (Motion, formerly Framer Motion) | GSAP (now 100% free incl. ScrollTrigger/ScrollSmoother as of April 2025 under Webflow) | If the redesign wants complex pinned/scrubbed scroll sequences (parallax storytelling, timeline-scrubbed sections) beyond simple reveal/hover micro-interactions. GSAP is more powerful for that but has a more imperative, less React-idiomatic API and a steeper learning curve — overkill for a standard marketing site's polish pass |
| `embla-carousel-react` | Swiper (`swiper` 14.0.7) | If you need built-in modules (thumbnails gallery, coverflow, zoom) out of the box. Swiper is heavier and more opinionated about styling; Embla is lighter, unstyled, and composes better with a Tailwind-first, brand-locked design system |
| `embla-carousel-react` | `nuka-carousel` 8.2.0 | Markets itself as "accessibility-first" with less setup, but has a much smaller ecosystem/community (54 code snippets vs Embla's 7,400+) and is what shadcn/ui and most current component libraries do NOT standardize on — Embla has broader real-world validation for 2026 React projects |
| `vite-plugin-image-optimizer` | `vite-imagetools` 10.0.1 | If the redesign needs full responsive `srcset`/art-direction pipelines (different crops for mobile vs. desktop hero imagery) generated at import time via query-param transforms. Requires `vite >= 7.0.0` (satisfied by this project's Vite 8.1.1) — more powerful but more setup than this project's image count likely justifies for a first pass |
| Static grid for testimonials | `unpic` (`@unpic/react`) | Skip entirely for this project — Unpic is a wrapper around **external image CDNs** (Cloudinary, imgix, Netlify Image CDN, etc.). This site has no CDN/image service in its stack and is explicitly frontend-only/static-hosted; Unpic adds no value without a CDN behind it |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|--------------|
| `framer-motion` (package name) | Still works (re-exports from `motion`) but is the legacy/deprecated package name post-rebrand; new projects should target the canonical package | `motion` |
| `react-fast-marquee` | Declared peer dep is `react: ">= 16.8.0 \|\| ^18.0.0"` — does **not** explicitly include `^19.0.0`, which risks an `ERESOLVE` peer-dependency error on `npm install` against React 19.2.7 without `--legacy-peer-deps` | A CSS-only marquee using Tailwind `@keyframes` + `animate-*` utility (a handful of lines, zero dependency risk) if a logo/trust-strip marquee is wanted at all |
| `tailwindcss-animate` (the original, non-`tw-` package) | JS-plugin-based; built for Tailwind v3's `tailwind.config.js` plugin API, doesn't align with v4's CSS-first `@theme`/`@plugin` architecture | `tw-animate-css` |
| Any full component/UI kit (MUI, Chakra, Ant Design, Bootstrap) | Ships its own design system and theming layer that will fight the existing locked brand system (Gotham font, orange/gold palette, 4 fixed graphic elements) and Tailwind v4 utility-first approach; would mean re-theming a whole library just to match brand instead of building on the utilities already in place | Tailwind v4 utilities + the unstyled/headless primitives above (Radix, Embla) — style everything with the existing design tokens |
| `next/image`, `@next/font`, or other Next.js-specific optimization tooling | This is a Vite SPA, not Next.js — these packages don't apply and would be a wasted/broken dependency | `vite-plugin-image-optimizer` (or native `<img loading="lazy" decoding="async">` for the simplest cases) |
| GSAP as the *default* choice for this project | Fully free now, but its imperative timeline API and larger surface area (ScrollTrigger, SplitText, etc.) is more than a standard marketing-site polish pass needs; adds cognitive overhead for a handoff project where the next executor (Antigravity CLI) benefits from simpler, more declarative code | `motion` for 95% of needed effects; reach for GSAP only if a specific screen genuinely needs scroll-scrubbed/pinned sequences |

## Stack Patterns by Variant

**If testimonials count stays small (roughly ≤ 6 items, the realistic count for a young agency + studio):**
- Use a static responsive CSS grid (Tailwind `grid-cols-*` + `gap-*`), not a carousel
- Because: a grid is simpler, fully keyboard/screen-reader accessible with zero extra ARIA work, and is itself a "premium" 2026 pattern — many current premium marketing sites (Linear, Vercel-style testimonial sections) favor grids/mosaics over carousels, which read as dated on desktop. Carousels also hide content behind interaction, which hurts a small trust-building content set
- Combine with `motion`'s `whileInView` + a small stagger (`transition={{ staggerChildren: 0.08 }}`) on the grid container for a premium reveal-on-scroll effect

**If testimonials count grows past what a grid can show without excessive scrolling, or a "featured quote" rotating format is explicitly wanted:**
- Use `embla-carousel-react`, unstyled, with manual accessibility additions: `aria-roledescription="carousel"` on the viewport, `aria-label` per slide, visible (not just icon-only) prev/next buttons with `aria-label`, and a `aria-live="polite"` region announcing the current slide index — Embla does not add these for you, they must be wired in the component
- Because: Embla is the carousel engine most current React component ecosystems (shadcn/ui) build on, it's unopinionated about styling (fits the brand-locked Tailwind approach), and it supports native touch/swipe without extra libraries

**For the "how it works" process section, given the "Agency and Podcast get equal weight" constraint:**
- Use a numbered/connected-step layout (not a carousel) with `@radix-ui/react-tabs` to toggle between "Agency process" and "Podcast process" views if both are too long to show simultaneously, or side-by-side two-column steps if they fit
- Animate step entrance with `motion`'s `whileInView` + stagger, not `@radix-ui/react-accordion`, unless the copy for each step is long enough that collapsing it by default genuinely helps scannability
- Because: this keeps both service tracks visually equal (a tab toggle implies parity, not one being primary) while Radix Tabs handles keyboard/ARIA correctness that a hand-rolled toggle component would need to reimplement

**For all new interactive/animated components, regardless of which library:**
- Gate non-essential motion behind `motion`'s `useReducedMotion()` (or the CSS `@media (prefers-reduced-motion: reduce)` equivalent for `tw-animate-css` cases) — this is a correctness requirement, not a nice-to-have, given the site's trust-building/conversion goal shouldn't alienate motion-sensitive visitors

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|------------------|-------|
| `motion@12.43.0` | `react@19.2.7`, `react-dom@19.2.7` | Peer dep range `^18.0.0 \|\| ^19.0.0` — installs clean, no flags needed |
| `embla-carousel-react@8.6.0` | `react@19.2.7` | Peer dep range explicitly lists `^19.0.0 \|\| ^19.0.0-rc` |
| `@radix-ui/react-accordion@1.2.20` / `@radix-ui/react-tabs@1.1.21` | `react@19.2.7` | Peer dep ranges explicitly list `^19.0` and `^19.0.0-rc` |
| `lucide-react@1.27.0` | `react@19.2.7` | Peer dep range `^16.5.1 \|\| ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0` |
| `vite-imagetools@10.0.1` (if chosen over `vite-plugin-image-optimizer`) | `vite@8.1.1` | Requires `vite >= 7.0.0` — satisfied |
| `tw-animate-css@1.4.0` | `tailwindcss@4.3.3` | Built specifically for v4's CSS-first architecture; do not pair with `tailwindcss-animate` (v3-era, JS plugin) in the same project |
| `react-fast-marquee@1.6.5` | `react@19.2.7` | **Not declared compatible** — peer range is `^18.0.0`, will likely trigger `npm install` `ERESOLVE` against React 19 without `--legacy-peer-deps`. Avoid; see "What NOT to Use" |

## Sources

- Context7 `/websites/motion_dev` — `useReducedMotion`, `whileInView` scroll animation patterns, performance guidance (HIGH confidence, official docs)
- Context7 `/davidjerleke/embla-carousel`, `/websites/embla-carousel` — carousel library identification (used to confirm Embla is the actively maintained, high-reputation option vs. alternatives)
- `npm view <package> version` / `peerDependencies` for `motion`, `framer-motion`, `embla-carousel-react`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`, `react-intersection-observer`, `vite-plugin-image-optimizer`, `vite-imagetools`, `@unpic/react`, `sharp`, `@radix-ui/react-accordion`, `@radix-ui/react-tabs`, `react-fast-marquee`, `keen-slider`, `swiper`, `nuka-carousel`, `tw-animate-css` — HIGH confidence, live registry data pulled 2026-07-29
- `package.json` at project root — confirmed zero animation/carousel/icon/class-utility dependencies currently installed (all recommendations are additive)
- WebSearch: "tailwindcss-animate vs tw-animate-css Tailwind CSS v4 compatibility" — [tw-animate-css GitHub](https://github.com/Wombosvideo/tw-animate-css), [tw-animate-css npm](https://www.npmjs.com/package/tw-animate-css) — MEDIUM confidence, cross-referenced across multiple community sources, no single official Tailwind Labs source
- WebSearch: "GSAP fully free all plugins 2025 Webflow acquisition license change" — [Webflow blog: GSAP becomes free](https://webflow.com/blog/gsap-becomes-free), [CSS-Tricks: GSAP is now completely free](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) — MEDIUM-HIGH confidence, multiple independent sources agree (Webflow's own announcement + third-party coverage)
- WebSearch: "Vite static site image optimization 2026 vite-plugin-image-optimizer vs unpic responsive images" — [vite-plugin-image-optimizer GitHub](https://github.com/FatehAK/vite-plugin-image-optimizer), [Unpic](https://unpic.pics/) — MEDIUM confidence, used to confirm Unpic's CDN dependency (making it inapplicable here) and vite-plugin-image-optimizer's Sharp/SVGO-based approach

---
*Stack research for: Premium marketing site polish (React 19 + Tailwind v4 + Vite, frontend-only)*
*Researched: 2026-07-29*
