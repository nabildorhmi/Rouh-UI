# Rouh

## What This Is

Rouh is a two-sided brand website: a marketing/creative agency offering branded services (strategy, content, social, paid media, web, influencer partnerships) and a podcast studio that clients rent — with cameras and gear — to record their own podcast episodes with their own guests. The site currently exists as a React/TypeScript SPA (Agency, Podcast, Home, Contact pages) but is largely placeholder: generic copy, a podcast pricing model that doesn't match the actual studio-rental business, and no trust-building content. This project redesigns and re-scopes the frontend to feel premium, correctly represent the podcast studio offering, and promote both services with equal weight.

## Core Value

A visitor immediately understands Rouh does two distinct things well — brand/marketing services and podcast studio rental — and the site feels polished and trustworthy enough to convert them into a booked call.

## Requirements

### Validated

- ✓ SPA with React Router navigation across Home, Agency, Podcast, Contact — existing
- ✓ Agency page with 3-tier plan cards (Starter/Growth/Premium), no pricing shown, "book a call" flow — existing
- ✓ Podcast page with episode list and tier cards, reservation modal + form (mode-aware: agency/podcast) — existing
- ✓ Brand system: Gotham font family, orange (#c1622e) / gold (#d9a253) theme, 4 custom graphic elements, Tailwind CSS v4 — existing
- ✓ Reservation flow UI: form → confirmation step → Calendly link handoff — existing (submission itself is stubbed, no backend)
- ✓ Agency page reference implementation: final brand-voice copy (services/plans/portfolio), portfolio/case-study showcase, testimonials, "how it works" process section, no placeholder content — Validated in Phase 2 (PORT-01, TRUST-01, TRUST-04)

### Active

- [ ] Re-model the Podcast page's "guest tiers" as studio rental packages (client rents space + cameras/gear to produce their own podcast with their own guest) — replaces the current "pay to be featured on Rouh's show" framing
- [ ] Elevate visual design across all pages to feel premium and polished (better spacing, hierarchy, imagery treatment, micro-interactions) while keeping existing fonts, colors, and graphic elements unchanged — done for Agency (Phase 2); Podcast, Home, Contact remain
- [ ] Give Agency and Podcast equal visual and structural weight — neither page/service reads as secondary to the other
- [ ] Write final marketing copy (brand voice) replacing all "Placeholder copy" content — Agency services/plans/portfolio done (Phase 2); Podcast studio packages and remaining section copy outstanding
- [ ] Add a testimonials / social proof section (covers both agency clients and podcast studio renters) — Agency side done (Phase 2); Podcast side outstanding (TRUST-02, TRUST-03)
- [ ] Add a "how it works" / process section (what booking and working with Rouh actually looks like, for both services) — Agency side done (Phase 2); Podcast side outstanding (TRUST-05)
- [ ] Improve overall UX — clear navigation, obvious CTAs, mobile-friendly, easy path to booking for both services

### Out of Scope

- Backend / real form submission — reservation and contact forms stay frontend-only (UI + validation), no email service or API integration — explicitly deferred; this project is frontend-only
- Real Calendly links / live booking integration — placeholder links remain until backend work happens
- Authentication, payments, or any account system — not part of a marketing/booking site
- Automated test suite — noted as a codebase gap but not part of this redesign's scope
- Code implementation in this session — this GSD project produces plans/roadmap only; actual coding happens in Antigravity CLI

## Context

- Existing codebase mapped at `.planning/codebase/` (React 19 + TypeScript + Vite + Tailwind v4 + React Router + React Hook Form; zero test coverage; forms stubbed with `console.info`).
- Brand assets (logo variants, typography, graphic elements) live in `ID_ROUH/` at the project root — source of truth for what "same colors/graphics" means.
- The `guestTiers` and `plans` data files are placeholder-priced and, for `guestTiers`, modeled around the wrong business concept (guest-pays-to-appear vs. client-rents-studio) — needs both data and copy rework.
- Workflow constraint: planning happens here with Claude (this GSD project), but implementation will be done separately in Antigravity CLI — deliverables should be handoff-ready (clear roadmap + phase plans), not executed in this session.

## Constraints

- **Design**: Must keep existing brand identity locked — Gotham font family, orange (#c1622e) and gold (#d9a253) theme colors, and the 4 existing graphic elements. Redesign is about elevation/polish and structure, not a rebrand.
- **Scope**: Frontend-only. No backend, no real integrations, no auth/payments.
- **Handoff**: Output of this GSD project is planning artifacts (PROJECT.md, REQUIREMENTS.md, ROADMAP.md, phase plans) for execution in Antigravity CLI, not code written in this Claude session.
- **Tech stack**: Stay within the existing stack (React 19, TypeScript, Vite, Tailwind CSS v4, React Router, React Hook Form) — no framework changes.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Podcast "guest tiers" reframed as studio rental packages | Current data modeled a different business (paid guest appearance) than what Rouh actually offers (studio + gear rental for client's own podcast) | — Pending |
| Keep brand colors/fonts/graphics locked, elevate polish instead | User wants a more appealing site without losing brand recognition | — Pending |
| Agency and Podcast get equal site weight | Both are core revenue lines; site shouldn't imply one is primary | — Pending |
| Write real marketing copy (not just placeholders) | Placeholder copy throughout undermines the "premium, trustworthy" goal | — Pending |
| This project stops at planning; Antigravity CLI executes | User's chosen workflow split between planning tool and coding tool | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-29 after Phase 2 completion*
