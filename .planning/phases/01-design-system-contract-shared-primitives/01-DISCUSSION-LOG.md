# Phase 1: Design System Contract + Shared Primitives - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-29
**Phase:** 1-design-system-contract-shared-primitives
**Areas discussed:** Visual direction, Motion & micro-interactions, Testimonial content source, Graphic element usage

---

## Visual Direction

| Option | Description | Selected |
|--------|-------------|----------|
| Bold & editorial | Big confident type, high-contrast blocks, generous whitespace, strong hero moments — magazine/creative-agency energy | |
| Warm & refined | Softer spacing, rounded corners, subtle depth, premium but approachable | |
| Minimal & precise | Tight grid, sharp corners, restrained color use, lets orange/gold accents do the work — studio/tech-adjacent feel | ✓ |

**User's choice:** Minimal & precise

| Option | Description | Selected |
|--------|-------------|----------|
| Keep rounded + gradient (Recommended) | Elevate the existing language — refine spacing/shadows around it rather than changing base shape vocabulary | ✓ |
| Tighten to sharper corners | Move toward smaller radii and flatter surfaces for a more precise, editorial feel | |

**User's choice:** Keep rounded + gradient

| Option | Description | Selected |
|--------|-------------|----------|
| Accent-only (Recommended) | Color reserved for CTAs, eyebrows, highlights, and the existing gradient — backgrounds stay white/black | ✓ |
| Bolder color blocks | Some full sections use gold/orange as background color, more visually dominant | |

**User's choice:** Accent-only

| Option | Description | Selected |
|--------|-------------|----------|
| Keep gradient placeholder (Recommended) | Stays minimal and on-brand — refine spacing/proportions rather than adding texture | ✓ |
| Add subtle texture/pattern | Layer in a subtle pattern or GraphicAccent strokes over placeholders | |

**User's choice:** Keep gradient placeholder

**Notes:** User's own framing for the design gap was "lacks polish/premium feel" and "not sure yet — show me" during project init questioning. The combination of "minimal & precise" + "keep existing rounded/gradient shape language" reads as: elevate through spacing/hierarchy/restraint, not through changing the base visual vocabulary.

---

## Motion & Micro-interactions

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle (Recommended) | Fade/slide-in on scroll for sections, hover states on cards/buttons — motion supports content, never distracts | ✓ |
| Expressive | Staggered reveals, parallax-ish accents, more pronounced hover/tap feedback | |

**User's choice:** Subtle

| Option | Description | Selected |
|--------|-------------|----------|
| Disable entirely (Recommended) | Respect prefers-reduced-motion by skipping animations outright | ✓ |
| Tone down only | Keep minimal opacity fades but remove movement/transforms | |

**User's choice:** Disable entirely

---

## Testimonial Content Source

| Option | Description | Selected |
|--------|-------------|----------|
| No, write realistic placeholders | Claude drafts brand-voice, realistic-sounding placeholder testimonials for both service lines | ✓ |
| Yes, I'll provide real quotes | User has actual client/renter testimonials to supply | |

**User's choice:** No, write realistic placeholders

| Option | Description | Selected |
|--------|-------------|----------|
| Realistic fictional names (Recommended) | e.g. "Sarah Chen, Founder, Lumen Skincare" — reads as finished content | ✓ |
| Obviously placeholder | e.g. "[Client Name], [Company]" — clearly marked as not-yet-real | |

**User's choice:** Realistic fictional names

**Notes:** Mirrors the earlier project-init decision to use generic/placeholder studio photography (STUD-06) — consistent "polished placeholder, not obviously fake" approach across the whole redesign.

---

## Graphic Element Usage

| Option | Description | Selected |
|--------|-------------|----------|
| Sparing signature accents (Recommended) | Used deliberately in 1-2 key moments per page — rare enough to feel intentional | ✓ |
| Recurring motif | Used more frequently as a background/decorative layer across most sections | |

**User's choice:** Sparing signature accents

---

## Claude's Discretion

- Exact spacing scale, corner radius values, and shadow rules to formalize in the DESIGN.md contract
- Which specific scroll/hover interactions get motion treatment first
- Exact wording of placeholder testimonial copy (within the agreed constraints)
- Icon usage details from `lucide-react`

## Deferred Ideas

None — discussion stayed within Phase 1 scope.
