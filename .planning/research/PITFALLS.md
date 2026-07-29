# Pitfalls Research

**Domain:** Redesign/rebrand-lite of a two-sided (agency + podcast studio rental) marketing site, executed by an AI coding agent from a written plan, brand assets locked
**Researched:** 2026-07-29
**Confidence:** MEDIUM-HIGH (synthesis of verified web sources + direct inspection of this codebase's known state; domain is well-covered but no single source addresses this exact combination)

## Critical Pitfalls

### Pitfall 1: "Elevation" drifts into an undeclared rebrand

**What goes wrong:**
The brief says "keep fonts/colors/graphics locked, just elevate polish." In practice, agents (and humans) chasing a "premium" feel gravitate toward generic-agency visual tropes — large glassy gradient panels, oversized rounded cards, stock-feeling hero sections, a subtly different orange/gold ratio, new spacing scale that doesn't match old — and by the fifth page the site no longer reads as the same brand, even though no single color hex was technically changed. The locked tokens survive; the *character* doesn't.

**Why it happens:**
"Premium" and "polished" are vague target states. Without a concrete visual reference or explicit constraints (spacing scale, corner radius, shadow depth, which of the 4 graphic elements appear where), an executor fills gaps with whatever "looks premium" in generic training-data patterns — which regresses to sameness across unrelated products.

**How to avoid:**
Before implementation, produce a short DESIGN.md / style contract that codifies: exact hex values for locked colors + their allowed usage ratios, the type scale (sizes/weights per heading level), spacing scale (e.g., 4/8px grid, section padding values), corner-radius and shadow rules, and where/how each of the 4 existing graphic elements may recur. Roadmap should include a phase gate: "define visual system contract" before "apply visual system to pages."

**Warning signs:**
- New components introduce spacing/radius/shadow values not seen anywhere else in the codebase.
- Screenshots of Agency vs Podcast vs Home pages, viewed side-by-side, feel like different products.
- Orange/gold appear in new proportions or contexts (e.g., a page suddenly reads mostly gold when the brand has always been orange-led).

**Phase to address:**
Early phase — establish/document the visual system contract before any page-level redesign work begins.

---

### Pitfall 2: Reframing "guest tiers" to "studio rental packages" is a data rename, not a business-model rewrite

**What goes wrong:**
The current `guestTiers` data models "pay to appear as a guest on Rouh's show." The real business is "client rents the studio + gear to produce their own podcast with their own guest." A shallow fix renames tier labels and swaps a few nouns ("guest" → "renter") while leaving pricing logic, inclusions, and CTA copy that still assume Rouh is producing/hosting. This produces copy that contradicts itself: a package might say "includes editing by our team" (leftover from guest-appearance framing) next to "you bring your own guest and record independently" (new framing) — two irreconcilable service models on one card.

**Why it happens:**
Renaming fields feels like it satisfies "re-model the podcast page" while being far less work than actually re-deriving what a rental package should include (hours of studio time, gear included, crew/operator or self-serve, add-ons like editing). An AI agent following a plan will do exactly what's specified — if the plan says "rename guestTiers to rentalPackages" without specifying new inclusions per tier, it will preserve old field values under new labels.

**How to avoid:**
The roadmap/plan must define the *actual* rental package structure before implementation: what varies between packages (duration, gear tier, add-on crew/editing, room size), not just what each is called. Every existing sentence referencing "guest," "appear on the show," "our host," "featured episode," etc. must be found and re-evaluated line by line — a find-and-replace on nouns is not sufficient. Treat this as a content model change (new schema/fields), not a copy edit.

**Warning signs:**
- Package descriptions still reference "hosting," "our show," "being featured," or imply Rouh books the guest.
- Inclusions list items that only make sense for produced content (e.g., "distribution to our audience") rather than rental (e.g., "4 hours studio access, 3-camera setup, on-site technician").
- The reservation form's mode-aware copy ("podcast" mode) still uses guest-appearance language while the pricing cards use rental language — same page, contradictory framing.
- No field for room/gear tier or duration exists anywhere in the new data — the old field shapes were kept and only labels changed.

**Phase to address:**
Dedicated phase for podcast content-model rework, before or in parallel with visual redesign of the Podcast page — copy/data must be settled before the AI agent lays out cards around it, otherwise layout work has to be redone when the model changes.

---

### Pitfall 3: Repositioning language leaks inconsistently across the site (not just the Podcast page)

**What goes wrong:**
The guest-tier → rental reframe is scoped to the Podcast page, but references to the old framing exist elsewhere: Home page teasers, Contact page dropdown/context copy, footer or nav microcopy, meta descriptions/SEO tags, the reservation modal's mode-aware text, testimonials that (if reused from a template) imply guest appearances. If only the Podcast page's primary tier cards are rewritten, a visitor can land on Home, read "book your appearance," then click through to Podcast and read "rent our studio" — an inconsistency that undermines trust more than either framing alone would.

**Why it happens:**
Plans that scope work "per page" (a common way to structure implementation phases) create seams at page boundaries. An AI agent executing "redesign the Podcast page" will not necessarily audit Home, Contact, Footer, and shared components for stale references unless explicitly told to grep for them.

**How to avoid:**
Before/during the podcast reframe phase, do a full-repo text search for guest-appearance language ("guest," "appear," "our show," "featured," "host you," episode-centric copy) across every file, not just the Podcast page/data files. Include this as an explicit verification step ("search entire codebase for X, confirm zero stale references") in the phase's done-criteria, not just "Podcast page updated."

**Warning signs:**
- Grep for old terminology returns hits outside `src/pages/Podcast.tsx` and `src/data/` after the phase is marked complete.
- Home page's podcast teaser/CTA and the Podcast page itself use different verbs for the same action (e.g., Home says "book a guest slot," Podcast says "reserve the studio").
- SEO meta tags / page titles still describe the old business model.

**Phase to address:**
Verification step at the end of the podcast-reframe phase, and again as a cross-cutting check before final QA/handoff.

---

### Pitfall 4: One service line gets richer treatment through incremental drift, not intent

**What goes wrong:**
Nobody decides "Agency is primary" — it just ends up that way because Agency is the more familiar/default business type (more training-data precedent for "agency website" than "podcast studio rental site"), so when the AI agent has judgment calls to make (how many sections, how much supporting content, imagery density, testimonial count), it unconsciously produces more/richer content for Agency. Podcast ends up shorter, thinner, with fewer supporting sections — objectively "less" even if nothing was explicitly deprioritized.

**Why it happens:**
"Equal prominence" is a qualitative goal that's easy to state and hard to verify without an explicit structural checklist. Section-count parity, word-count parity, and image-density parity are not things an agent self-checks unless told to.

**How to avoid:**
Define a literal parity checklist the two pages must both satisfy: same section types (hero, how-it-works, packages/plans, testimonials, FAQ, CTA), same nav weight (identical treatment in header/footer — not one listed before the other by default with no reason, not one getting a "featured" badge), same testimonial-section presence/count, comparable copy density per section. Home page must also give both services equal visual weight (not one above the fold and one requiring a scroll, not one with a bigger CTA button).
Explicitly treat this as a QA gate: "compare Agency page and Podcast page side by side against the parity checklist" as a phase deliverable, not an assumption.

**Warning signs:**
- Section count differs between the two pages without a documented reason.
- Home page CTA order, size, or position consistently favors one service (e.g., Agency CTA is primary/solid, Podcast CTA is secondary/outline).
- Testimonials section only has agency-client quotes, or podcast quotes are visibly fewer/shorter.
- Nav or footer lists Agency before Podcast in every instance with Podcast treated as the "also" item.

**Phase to address:**
Should be an explicit success criterion baked into both the Agency-page and Podcast-page redesign phases, plus a final cross-page parity QA phase/checklist before considering the milestone done.

---

### Pitfall 5: Shared components silently diverge to serve one service's needs, breaking the other

**What goes wrong:**
`ReservationForm.tsx`, `ReservationModal.tsx`, and `ConfirmationStep.tsx` are already mode-aware (agency/podcast) and are called out in CONCERNS.md as a large, monolithic, untested component mixing both modes' logic. When new package/tier data models change shape (Pitfall 2) and new copy/layout is added (Pitfall 1), it's easy for an agent to patch the podcast-mode branch of a shared component without verifying agency-mode still renders correctly, or vice versa — since there's zero test coverage, a broken branch can ship silently.

**Why it happens:**
Shared, mode-branching components are exactly where scoped "redesign this page" instructions produce cross-contamination: editing shared code to serve Podcast's new needs can regress Agency's rendering path, and nothing catches it without manual re-check of both modes.

**How to avoid:**
Any phase touching `ReservationForm`, `ReservationModal`, `ConfirmationStep`, or other shared components must explicitly require manual verification of *both* modes (agency and podcast) after the change, not just the mode being actively worked on. Consider the CONCERNS.md-flagged refactor (splitting into `AgencyReservationForm`/`PodcastReservationForm`) as a prerequisite if the redesign significantly changes either mode's fields — reduces risk of one mode's changes breaking the other.

**Warning signs:**
- A change described as "podcast reservation flow" touches a file with no "podcast" or "agency" in its name/path.
- After a podcast-related change, nobody re-tested the agency reservation flow (or vice versa).
- `ConfirmationStep`'s known name-parsing bug (single-word names showing "Thanks, !") is still present after copy changes — a sign the component wasn't touched carefully.

**Phase to address:**
Any phase modifying shared/reservation components — add "verify both modes" to done-criteria explicitly.

---

### Pitfall 6: AI agent executes the plan literally and loses coherence across files/pages

**What goes wrong:**
Coding agents working from a written plan without a human designer reviewing each step tend to solve visually-similar problems differently in different files: card component styled one way on Agency, a near-duplicate but subtly different card built from scratch on Podcast; spacing tokens re-invented per page instead of reused; a new "how it works" section pattern built twice with different structure because the agent didn't recognize the second instance as "the same component, reused." This is a documented failure mode: agents lose architectural consistency as scope grows, solving the same problem multiple ways across files.

**Why it happens:**
Without a design-system contract (component inventory, token file, explicit "reuse this, don't rebuild") the agent has no forcing function to check "does this pattern already exist" before creating a new one. Plans that are organized page-by-page (rather than component-first) encourage this, since each page's phase looks self-contained.

**How to avoid:**
Structure the plan so shared UI patterns (card, section header, CTA button, "how it works" step, testimonial card) are built/updated once as reusable components in an early phase, and later page-phases explicitly reference "use the existing X component" rather than "build a card for this section." Include a design-token/contract file (colors, spacing, radii, shadows, type scale) that every phase's plan explicitly points the agent to, as recommended by current agentic-coding design guidance (DESIGN.md pattern) — this gives the agent a single source of truth instead of letting it infer per-file.

**Warning signs:**
- Grep for similar-looking JSX/class patterns (e.g., card wrapper styles) turns up near-duplicates with slightly different Tailwind classes across pages.
- New sections added to Home, Agency, Podcast that serve the same purpose (e.g., "how it works") are structurally different components rather than one shared component with different content.
- Tailwind spacing/color values appear as raw literals in multiple places instead of referencing the same token/class consistently.

**Phase to address:**
Plan structure itself (roadmap phase ordering) — component/token phase before page-content phases; include a design-contract file phase 0/early.

---

### Pitfall 7: No human-in-the-loop step to catch the plan's own gaps before/after execution

**What goes wrong:**
Because implementation happens in a separate tool (Antigravity CLI) from planning (this GSD session), and the plan is meant to be executed without a designer reviewing each step, any ambiguity or gap left in the roadmap/phase plans becomes a silent judgment call made by the agent — with no correction loop until a human reviews the finished output, by which point multiple pages may share the same mistaken interpretation.

**Why it happens:**
The workflow is intentionally plan-then-execute with a tooling gap in between (documented in PROJECT.md: "planning happens here... implementation will be done separately"). This is efficient but removes the fast human feedback that normally catches drift early (Pitfall 1, 6) mid-stream.

**How to avoid:**
Roadmap phases should be scoped small enough that a human can do a quick visual/content review between phases (e.g., after the design-contract phase, after the first page is redesigned as a reference implementation, before the pattern is applied to remaining pages) rather than one large "redesign everything" phase reviewed only at the very end. Explicitly recommend in the roadmap that the first fully-redesigned page (whichever is picked as the template) gets a manual human checkpoint before the same treatment is replicated across the rest of the site — catches Pitfall 1/4/6 while the cost of correction is still low.

**Warning signs:**
- Roadmap has one giant "redesign all pages" phase with no intermediate checkpoint.
- The plan doesn't name which page is the reference/template for the new visual pattern.

**Phase to address:**
Roadmap structure itself — sequence phases so one page (Home or Agency, whichever is simpler) becomes the reference implementation and gets reviewed before Podcast (which also carries the content-model change) and remaining pages follow the validated pattern.

---

### Pitfall 8: Existing known bugs and stubs get carried forward or copy-pasted into new sections

**What goes wrong:**
CONCERNS.md documents specific existing issues: stubbed form submission with `console.info` (including a PII-leak concern), a name-parsing bug in `ConfirmationStep`, and no error boundaries. A redesign focused on visuals can easily copy the existing (broken) form/JS patterns into new sections (e.g., a new "how it works" CTA, new testimonial submission if any exists) without addressing or even noticing the pre-existing flaws, since the task framing is "make it look better," not "fix behavior."

**Why it happens:**
Visual redesign tasks implicitly scope attention to CSS/layout/copy, so functional debt sitting in the components being restyled is easy to leave untouched — or worse, propagated into new instances of the same pattern.

**How to avoid:**
Explicitly scope out of this milestone (already correct per PROJECT.md: backend/real submission is out of scope) but flag the console.info/PII concern for microcopy review — ensure no new form or CTA copy implies data was actually received/stored ("We'll be in touch shortly" is fine if truthful about the flow; anything implying confirmation-email-sent would be misleading given the stub). Don't let new sections quietly assume submission works when authoring copy for confirmation states.

**Warning signs:**
- New/redesigned confirmation copy promises actions (email confirmation, calendar invite) that the stubbed backend cannot actually perform.
- New form fields are added to the reservation flow that inherit the same permissive email regex without review.

**Phase to address:**
Copy-writing phase for confirmation/success states — cross-check claims made in new copy against what the stubbed frontend can actually do.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|-----------------|------------------|
| Renaming `guestTiers` fields/labels instead of redesigning the data model | Fast, looks "done" quickly | Copy contradictions ship to production (Pitfall 2), requires a second rework pass | Never for this milestone — the whole point is correcting the business-model mismatch |
| One large "redesign everything" phase instead of page-by-page checkpoints | Fewer roadmap phases, feels efficient | Drift (Pitfall 1, 6) discovered late, expensive to unwind across all pages | Never — checkpoint cost is low relative to rework cost |
| Skipping the design-token/contract doc and letting the agent infer spacing/color usage per file | Saves an upfront planning phase | Visual inconsistency across pages (Pitfall 1, 6), hard to retrofit consistency later | Never for a redesign whose explicit goal is polish/consistency |
| Leaving shared reservation components untouched structurally, patching only the podcast-mode branch | Less refactoring work now | Risk of silently breaking agency-mode with no tests to catch it (Pitfall 5) | Acceptable only if both modes are manually verified after every touch |

## Integration Gotchas

N/A for this milestone — no external service integrations are in scope (backend, Calendly, email are explicitly deferred per PROJECT.md). The one "integration" surface that matters is internal: shared components serving two modes (see Pitfall 5).

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| Adding new imagery/graphic-element usage for "premium feel" without optimization | Slower page loads, especially if new hero imagery is added on top of existing unoptimized SVG logos (already flagged in CONCERNS.md) | Compress/optimize any new image assets introduced during redesign; keep SVGs as SVGs, don't add large raster heroes without compression | Noticeable on mobile/slow connections once more than 1-2 new heavy assets are added per page |
| New sections (testimonials, how-it-works) added without route-level code splitting | Larger initial bundle since `App.tsx` already imports all pages eagerly (per CONCERNS.md) | Not required for this milestone's scope, but avoid making the eager-import problem worse; flag for a later phase if bundle size becomes visibly slow | Becomes a real user-facing issue once total page weight grows materially from new sections/images |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| New copy in confirmation/success states implies real data persistence or notification (email sent, request logged) | Misleads users into believing their reservation was received when it's only `console.info`'d (per CONCERNS.md) — erodes trust once discovered, and is a PII-adjacent concern since form data is only logged to console | Write confirmation copy that's honest about the current flow ("we'll follow up" language tied to what's actually verifiable) and flag explicitly that real backend wiring is a future milestone |
| Reusing the existing permissive email regex in any newly-added form fields | Same validation gap propagates to new surfaces | Not required to fix in this milestone (existing debt), but don't add net-new instances of the same pattern without at least matching existing (weak) validation — flag to fix later, don't make it worse |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|------------------|
| Podcast page's new package cards don't make clear whether Rouh staff operate the equipment or the client self-serves | Visitor can't tell what they're actually paying for, may book expecting help that isn't included (or vice versa) | Every package's inclusion list should explicitly state crew/operator presence, hours, and gear included — no ambiguity about self-serve vs. staffed |
| "Equal prominence" implemented as identical templates with different words, ignoring that agency and podcast rental have genuinely different buyer journeys (agency = ongoing retainer relationship; podcast = one-off/recurring space booking) | Podcast visitors get sold agency-style "tiers/plans" language that doesn't map to how people think about renting a room ("per session," "per day," "add-ons") — feels off even if visually equal | Structural parity (same section types, same visual weight) does not mean identical content shape — each service's package/plan section should use language and structure that fits its actual buying pattern while remaining visually consistent |
| Home page treats Podcast as a secondary teaser/card under a primary Agency hero | First impression establishes hierarchy before a visitor even scrolls, undermining "equal weight" no matter how equal the dedicated pages are | Home page hero/above-the-fold must present both services as co-equal entry points (e.g., split hero, dual CTA, or alternating dedicated sections) — this is the single highest-leverage place equal prominence is won or lost |

## "Looks Done But Isn't" Checklist

- [ ] **Podcast reframe:** Package cards look complete but often still contain leftover guest-appearance nouns ("guest," "our show," "featured") — verify with a full-repo text search, not just a visual read of the tier cards.
- [ ] **Equal prominence:** Both pages look "redesigned" but section-count/testimonial-count/CTA-styling parity was never explicitly checked side-by-side — verify with the parity checklist (Pitfall 4).
- [ ] **Visual consistency:** Every page looks individually polished but was never compared against a shared token/contract doc — verify by diffing spacing/color/radius values used across Agency, Podcast, Home, Contact.
- [ ] **Shared components:** Podcast reservation flow looks fixed but agency-mode of the same shared component was never re-tested after the change — verify by manually running both modes end-to-end after any shared-component edit.
- [ ] **Confirmation/success copy:** New copy reads polished and reassuring but implies backend actions (emails, saved requests) that don't exist — verify copy claims against the actual stubbed behavior.
- [ ] **Reference-page rollout:** The "first page redesigned" pattern looks great but was never explicitly checkpointed with a human before being replicated to the remaining pages — verify the roadmap names a reference page and a review point.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|----------------|-----------------|
| Visual drift into undeclared rebrand (Pitfall 1) | MEDIUM | Write the design-token contract retroactively from the reference/first-completed page, then audit remaining pages against it and correct deviations — cheaper the earlier it's caught |
| Guest-tier reframe left inconsistent (Pitfall 2, 3) | MEDIUM | Full-repo grep for stale terminology, rewrite affected copy in one pass rather than piecemeal; treat as a dedicated copy-QA pass, not folded into unrelated work |
| Unequal service prominence (Pitfall 4) | LOW-MEDIUM | Run the parity checklist against both pages, add/balance missing sections; usually a content-addition fix, not a structural rebuild, if caught before too much divergent styling has accumulated |
| Shared-component regression (Pitfall 5) | MEDIUM-HIGH | Manually test both reservation-flow modes end-to-end; if agency-mode broke, the fix may require re-splitting the component (as CONCERNS.md already recommends) rather than another patch |
| Architectural drift / duplicated patterns (Pitfall 6) | MEDIUM-HIGH | Consolidate duplicated card/section implementations into one shared component after the fact, then re-point all usages — more expensive the more pages already reference the duplicated pattern |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|-------------------|----------------|
| Undeclared rebrand drift (1) | Design-system/token-contract phase, before page redesigns | Compare Agency/Podcast/Home screenshots side-by-side; audit for spacing/color/radius values not in the contract |
| Guest-tier → rental model gap (2) | Dedicated podcast content-model rework phase | New package data explicitly models duration/gear/crew — not a renamed guest-tier schema |
| Inconsistent repositioning language sitewide (3) | End of podcast-reframe phase + final cross-cutting QA phase | Full-repo text search for stale guest-appearance terminology returns zero hits |
| Unequal service prominence (4) | Both page-redesign phases + final parity QA phase | Section-count/testimonial-count/CTA-treatment checklist passes for both pages and Home |
| Shared reservation component regression (5) | Any phase touching ReservationForm/Modal/ConfirmationStep | Both agency-mode and podcast-mode manually verified end-to-end after each touch |
| Agent architectural drift (6) | Early "build/update shared components + design contract" phase, before page-content phases | Grep for duplicate card/section patterns across pages; confirm shared components are reused, not reinvented |
| No human checkpoint mid-execution (7) | Roadmap structure — name a reference page, insert a review checkpoint after it | Roadmap explicitly sequences one page as reference + review before replication to remaining pages |
| Carrying forward known bugs into new copy/sections (8) | Copy-writing phase for confirmation/success states | New copy claims cross-checked against actual (stubbed) submission behavior; no new promises the frontend can't keep |

## Sources

- [Common Website Redesign Mistakes to Avoid — Spiral Scout](https://spiralscout.com/blog/common-website-redesign-mistakes-to-avoid)
- [18 Worst Website Redesign Mistakes to Avoid — Blacksmith Agency](https://blacksmith.agency/resources/web-design/website-redesign-mistakes/)
- [Website Redesign During Rebranding: UX Risks and Best Practices — Shakuro](https://shakuro.com/blog/website-redesign-during-rebranding)
- [Do You Need a Full Rebrand or Just a Website Refresh? — Blankboard Studio](https://www.blankboard.studio/originals/blog/rebrand-or-just-a-website-refresh-2025-guide)
- [Breaking down the top brand repositioning failures — SmashBrand](https://www.smashbrand.com/articles/brand-repositioning-failures/)
- [Understanding The Distinctions Between Repositioning And Rebranding — Forbes Agency Council](https://www.forbes.com/councils/forbesagencycouncil/2024/07/15/understanding-the-distinctions-between-repositioning-and-rebranding/)
- [Why Most Repositioning Efforts Fail in Product Marketing — Courageous Careers](https://www.courageous-careers.com/why-most-repositioning-efforts-fail-in-product-marketing-and-what-to-do-instead)
- [Nine Dangerous Mistakes When Designing Value Propositions — Isaac Jeffries](https://isaacjeffries.com/blog/2017/8/24/nine-dangerous-mistakes-when-designing-value-propositions)
- [Fixing Visual AI Slop: Front-End Design Standards and Skills for AI Coding Agents — Trilogy AI](https://trilogyai.substack.com/p/fixing-visual-ai-slop)
- [Your AI coding agent is only as good as your design system — Ali Afsah-Noudeh, Medium](https://medium.com/@aliafsah1988/your-ai-coding-agent-is-only-as-good-as-your-design-system-6055e4667fa9)
- [How to Price Studio Rental Time — The Studio Hero](https://thestudiohero.com/how-to-price-studio-rental-time/)
- [Beyond the Hourly: A Guide to Podcast Studio Rental Rates — Flexwork Studios](https://flexworkstudios.com/podcast-studio-rental-rates/)
- Direct inspection: `.planning/PROJECT.md`, `.planning/codebase/CONCERNS.md` (this repo — known stubs, bugs, and fragile shared components)

---
*Pitfalls research for: Rouh — agency + podcast studio rental marketing site redesign (rebrand-lite, AI-agent-executed)*
*Researched: 2026-07-29*
