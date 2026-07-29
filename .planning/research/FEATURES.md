# Feature Research

**Domain:** Dual-service marketing site — creative/marketing agency + podcast studio rental
**Researched:** 2026-07-29
**Confidence:** MEDIUM-HIGH (WebSearch-sourced, cross-checked across multiple agency/studio-rental sites; no Context7-eligible libraries in this domain since this is a content/UX research question, not a framework question)

## Feature Landscape

### Table Stakes — Agency Side

Features prospects expect from any credible creative/marketing agency site. Missing these reads as "not a real agency."

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear services list with tiers/packages | Visitors scan for "what do they actually sell and at what commitment level" before reading anything else | LOW | Already exists (Starter/Growth/Premium cards) — needs real copy, not placeholder |
| Portfolio / work showcase (even without full case studies) | Credibility signal; agencies without visible work look unproven | MEDIUM | Rouh's PROJECT.md doesn't mention a portfolio page currently — flag as gap to confirm with user, since best-in-class agency sites lean heavily on shown work, not just service descriptions |
| "How we work" / process section | Reduces anxiety about what happens after "book a call"; sets expectations for engagement length and steps | LOW-MEDIUM | Explicitly in Active requirements already — confirmed by research as standard (definition → creation → review → launch pattern) |
| Testimonials / social proof | Buyers default to skepticism for services with no visible price; testimonials are the primary trust substitute | LOW | Explicitly in Active requirements; needs to cover both business lines (see cross-cutting section) |
| Obvious, low-friction CTA to "book a call" | Agencies live and die on lead capture; every page should have one clear next action | LOW | Already exists as reservation/booking flow pattern — extend consistently across Agency page sections, not just at top/bottom |
| Mobile-responsive layout | Majority of first-touch traffic on service sites is mobile; a broken mobile agency site actively signals incompetence (ironic for a company selling web/marketing services) | MEDIUM | Explicitly in Active requirements |
| Fast load / no jank | Agencies are judged on their own site's technical polish as a proxy for their output quality | LOW-MEDIUM | Framed in Active requirements as "elevate visual design" + "micro-interactions" — must not come at the cost of performance |
| Contact page / method beyond the CTA | Some visitors want a direct channel (email, socials) even if the primary path is book-a-call | LOW | Already exists as Contact page |

### Table Stakes — Podcast Studio Rental Side

Features prospects expect from a studio/venue rental site. This is a *space rental* purchase decision, closer to booking a venue than commissioning creative work — expectations differ from the agency side.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| What's included: gear/equipment list | Renters need to know exactly what they get (mics, cameras, lighting, mixers) before booking — this is the #1 differentiator between "just a room" and "a real studio" | LOW | Should be itemized (mic model tier, camera count/type, lighting, capacity), not vague "professional gear" copy |
| Clear rental packages (hourly/half-day/full-day, or membership-style tiers) | Studio rental pricing conventions are hourly ($40–150/hr typical, $90–250/hr for premium/immersive) or block/package based; visitors expect to see structure even if exact price is hidden behind "book a call" | LOW-MEDIUM | Rouh's current data models this as "guest tiers" (wrong concept per PROJECT.md) — must be reframed as rental packages: what's included per package (hours, gear tier, add-ons), not "tiers of guest fame" |
| Photos/gallery of the actual space | Renters are booking a physical room sight-unseen most of the time; visual proof of quality (lighting setup, room aesthetics, camera angles) is the primary trust driver, more than for the agency side | MEDIUM | Needs real studio photography — a content/asset dependency, flag for phase planning |
| "Who it's for" framing that avoids the "appear as a guest" confusion | Category confusion risk called out explicitly in PROJECT.md — must be unambiguous that the client brings their own guest and rents the room+gear | LOW | This is the single most important copy correction in the whole project; treat as a dedicated requirement, not a nice-to-have |
| Booking/reservation flow with date, package, add-ons | Standard for any rental business — visitor picks date/package, submits request, gets confirmation | MEDIUM | Already exists as reservation modal + form (frontend-only, stubbed) — no change needed structurally, just correct package data driving it |
| Location/logistics info (address, parking, access) | Physical rental requires knowing where and how to get there and what's around it | LOW | Not currently mentioned as existing — flag as likely gap |
| FAQ covering studio-specific logistics | Cancellation/rescheduling policy, session length, whether an on-site engineer/facilitator is included ("wet hire" vs "dry hire"), max people in room, file/footage delivery after the session | LOW-MEDIUM | Common across every studio rental site researched (CTRL Collective has 12 FAQ items); Rouh should adopt at least a condensed version |

### Differentiators — Agency Side

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Named/branded process with distinct steps (not generic "discover, design, deliver") | Turns a commodity workflow into IP that reinforces "premium" positioning — matches Rouh's stated goal of feeling polished/trustworthy | LOW | Pure copywriting exercise; pairs directly with the "how it works" requirement already active |
| Cross-sell moments between the two business lines (e.g., agency client sees "need to record something? use our studio" and vice versa) | Since PROJECT.md's core value is that visitors understand Rouh does two things well, contextual cross-linking reinforces the dual-service story instead of treating pages as silos | LOW | Structural/nav feature — a card or CTA at bottom of Agency page pointing to Podcast, and vice versa |
| Distinct visual identity per plan tier or service category (without breaking locked brand colors/fonts) | Helps visitors self-select the right tier faster, increases perceived sophistication | LOW-MEDIUM | Must respect the "no rebrand" constraint — achieved via layout/iconography variation, not new colors |

### Differentiators — Podcast Studio Side

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Equipment specificity (brand/model-level detail, not generic "pro gear") | Podcasters researching studios are gear-literate; naming actual mic/camera/lighting models signals real production quality over competitors who stay vague | LOW | Copy-only; pure content improvement |
| "Dry hire vs. wet hire" clarity (self-run vs. staffed session) | Uncommon for smaller studio sites to spell this out clearly — doing so removes a common point of confusion/support-email friction and reads as more professional | LOW | Directly informs the package data model rework already flagged as Active |
| Visual gallery/virtual walkthrough of the room | Sets the studio apart from a generic bookable room; strongest trust builder for a rental decision made mostly online | MEDIUM-HIGH | True 360/virtual-tour tech is likely overkill for this project's frontend-only, no-backend scope — a well-shot photo gallery is the pragmatic version; flag full virtual tour as a "future consideration," not this milestone |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|------------------|-------------|
| Live/real-time booking calendar with actual availability | Feels like "professional" venue rental UX | Explicitly out of scope per PROJECT.md — no backend, no live integrations this milestone; building calendar UI that implies real-time availability without a backend behind it would be misleading | Keep the existing reservation modal → confirmation → Calendly handoff pattern; make it visually confident so it doesn't read as a stub |
| AI-powered portfolio filtering / AR/VR case study experiences (2026 agency trend) | Surfaced in current agency-site trend research as an emerging differentiator | High implementation cost, no backend/data layer to power AI filtering, and doesn't match Rouh's actual stated goal (premium polish + correct information, not cutting-edge experimental tech) | Skip; invest the same effort in editorial case-study/portfolio quality instead |
| Splitting Agency and Podcast onto separate domains/subdomains | Multi-brand site research shows this is one valid pattern when service lines are unrelated audiences | Contradicts the explicit "one site, one brand, equal weight" direction in PROJECT.md; would also require infra/DNS work outside a frontend-only React SPA scope | Single site, strong top-level nav separation (see cross-cutting section), shared brand chrome |
| Real payment collection / deposit-to-book | Common on high-end studio rental sites (rescheduling/cancellation fees, deposits) | Explicitly out of scope — no payments/auth this milestone | Reservation form stays inquiry-based; policy language (cancellation, rescheduling) can still be *described* in FAQ copy even though not enforced by the system |
| Automated test suite for new UI | Reasonable engineering hygiene ask | Explicitly called out as out of scope for this redesign in PROJECT.md | Leave as documented gap for a future milestone |
| Full 360°/VR virtual studio tour | Sounds like the ultimate trust-builder for a rental decision | Needs specialized photography/tooling and third-party embed (Klapty, WPVR, etc.) — disproportionate cost for a frontend-only content redesign milestone | Ship a strong static photo gallery now; note VR tour as a v2+ idea only if studio photography assets later support it |

## Feature Dependencies

```
Studio rental package reframing (data model)
    └──requires──> Equipment/gear list content (what's actually included per package)
                       └──requires──> Studio photography assets (to show, not just tell)

Reservation flow (existing, mode-aware agency/podcast)
    └──requires──> Correct package/tier data feeding it (currently wrong for podcast side)

Testimonials section (cross-cutting)
    └──requires──> Real or realistic testimonial content for BOTH agency clients and studio renters
                       └──conflicts with──> Generic/single-source testimonials (would silently favor one service)

"How it works" process section
    └──enhances──> Booking CTA conversion (reduces pre-booking anxiety on both sides)

Equal-weight navigation/homepage structure
    └──requires──> Both service lines having comparably complete content (portfolio/gear list, pricing structure, testimonials) — an unequal nav with one thin page defeats the purpose
```

### Dependency Notes

- **Studio rental reframing requires gear list + photography:** The single most load-bearing content fix in this project (per PROJECT.md) is correcting "guest tiers" → "rental packages." That reframe is hollow without concrete gear/equipment detail and real studio photos to back it up — otherwise the new copy is just different placeholder text.
- **Reservation flow requires correct data:** The reservation modal/form UI itself doesn't need rebuilding — it's already mode-aware (agency/podcast). It requires the underlying `guestTiers`/`plans` data to be replaced with correct rental-package data so the existing flow presents accurate options.
- **Testimonials conflict risk:** Because this is a dual-service trust play, a testimonials section that leans 80% agency / 20% podcast (or vice versa) undermines the "equal weight" requirement. Plan for a minimum split (e.g., 2+ testimonials per line) rather than a single pooled list.
- **Nav/homepage equal-weight requires equal content depth:** Structural parity (identical-looking nav items, matching hero treatment) is necessary but not sufficient — if the Podcast page ends up thinner in actual content (no gear list, no gallery, no FAQ) than the Agency page, the "equal weight" goal fails at the content layer even if the layout is symmetric.

## MVP Definition

Since this is a redesign of an existing site (not greenfield), "MVP" here maps to what this milestone must ship vs. what can wait.

### Launch With (this milestone)

- [ ] Corrected podcast studio rental package data (replacing "guest tiers") — core business-accuracy fix, everything else on the podcast side depends on this being right
- [ ] Itemized equipment/gear list per package — table stakes for any studio rental decision
- [ ] Real marketing copy across Agency + Podcast (services, plans, studio packages, section copy) — already Active
- [ ] Testimonials/social proof section, balanced across both service lines — already Active
- [ ] "How it works"/process section, covering both booking paths — already Active
- [ ] Equal visual/structural weight between Agency and Podcast (nav, homepage real estate, page depth) — already Active
- [ ] Mobile-friendly, obvious-CTA UX polish — already Active

### Add After Validation (near-term follow-up, still frontend-only)

- [ ] Studio location/logistics block (address, parking, access notes) — cheap addition, high trust value, currently likely missing
- [ ] Condensed FAQ section for studio logistics (cancellation/reschedule policy language, session length, dry-hire vs wet-hire, capacity) — reduces pre-booking friction, low complexity
- [ ] Cross-sell CTAs between Agency and Podcast pages (structural nav/content addition reinforcing dual-service story)
- [ ] Studio photo gallery (depends on photography assets being available)

### Future Consideration (v2+, likely needs backend or paid tooling)

- [ ] Live/real availability calendar — requires backend, explicitly out of scope this milestone
- [ ] Real payment/deposit collection — requires backend + payment processor, out of scope
- [ ] Full 360°/virtual studio tour — disproportionate cost for current scope; revisit only if studio photography/videography budget expands
- [ ] AI-assisted portfolio search/filtering — emerging 2026 agency trend, not aligned with Rouh's stated near-term goals

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|----------------------|----------|
| Studio rental package data correction | HIGH | MEDIUM | P1 |
| Gear/equipment list (podcast) | HIGH | LOW | P1 |
| Real marketing copy (agency + podcast) | HIGH | MEDIUM | P1 |
| Testimonials (balanced both lines) | HIGH | LOW-MEDIUM | P1 |
| Process/"how it works" section | MEDIUM-HIGH | LOW-MEDIUM | P1 |
| Equal-weight nav/homepage structure | HIGH | MEDIUM | P1 |
| Mobile/CTA UX polish | HIGH | MEDIUM | P1 |
| Studio location/logistics info | MEDIUM | LOW | P2 |
| Studio-specific FAQ | MEDIUM | LOW | P2 |
| Cross-sell CTAs between services | MEDIUM | LOW | P2 |
| Studio photo gallery | HIGH | MEDIUM-HIGH (asset-dependent) | P2 |
| Portfolio/case study showcase (agency) | MEDIUM-HIGH | MEDIUM-HIGH | P2 (flag with user — not explicitly in Active requirements but common table-stakes elsewhere) |
| Live booking calendar | LOW (this milestone) | HIGH | P3 (blocked — needs backend) |
| Full virtual/360 tour | LOW-MEDIUM | HIGH | P3 |
| AI portfolio filtering | LOW | HIGH | P3 |

## Competitor / Reference Site Analysis

| Feature | Agency-side reference pattern | Studio-rental reference pattern (CTRL Collective, Giggster, Peerspace-listed studios) | Rouh's approach |
|---------|-------------------------------|----------------------------------------------------------------------------------------|------------------|
| Hero | Bold statement + immersive visuals/case-study teaser, dual CTA sometimes ("see work" / "start a project") | Headline + dual CTA ("book a tour" / "reserve session") | Keep dual CTA pattern per service page; hero should state the specific value prop, not generic branding |
| Proof of quality | Case studies with strategic approach → execution → results structure | Portfolio of podcasts recorded in the space (logos/links to shows produced there), not testimonials about the space itself | For podcast side, consider a lightweight "recorded here" showcase in addition to renter testimonials — distinct from agency case studies |
| Pricing presentation | Tiered service cards, often no exact price shown ("book a call" gate) — matches Rouh's existing Agency page pattern | Either explicit hourly/package rates shown, or same "contact for rate" gate (CTRL Collective shows no explicit pricing) | Rouh can keep pricing gated on both sides for consistency, but podcast package *contents* (hours, gear, add-ons) should still be visible even if price isn't |
| Trust/FAQ | Rare on agency sites — testimonials do the trust work instead | Near-universal on studio rental sites (booking policy, staffing, capacity, delivery) — CTRL Collective has 12 FAQ items | Add a condensed FAQ block on the Podcast page; agency page can rely on testimonials + process section instead |
| Location | Not applicable (agency work is remote-friendly) | Address, parking, accessibility notes standard | Add for Podcast page only — asymmetry here is fine since it reflects a genuine difference in what each service needs, not unequal effort |

## Sources

- [25 Best Creative Agency Website Examples 2026 - Colorlib](https://colorlib.com/wp/creative-agency-website-examples/)
- [Agency websites - 87+ Best Agency Web Design Ideas 2026 | 99designs](https://99designs.com/inspiration/websites/agency)
- [10 of the best marketing agency websites in 2026 | Teamwork.com](https://www.teamwork.com/blog/marketing-agency-websites/)
- [12 Best Creative Agency Website Designs for Inspiration in 2026 | Krishaweb](https://www.krishaweb.com/blog/best-creative-agency-websites/)
- [Best Web Agencies Websites | Awwwards](https://www.awwwards.com/websites/design-agencies/)
- [8 Brilliant Best Digital Agency Websites to Inspire in 2026 | Cam Gomersall](https://www.camgomersall.com/blog/best-digital-agency-websites)
- [Giggster — Rent Podcast Studio Near Me](https://giggster.com/book/podcast-studio)
- [Podcast Rental Studios](https://studios.podcastrental.com/)
- [32 Best Podcast Recording Studios for Rent Near Me | Peerspace](https://www.peerspace.com/plan/podcast-recording)
- [Book Your Podcast Studio | CTRL Collective](https://www.ctrlcollective.com/podcast/) (fetched directly for page-section structure)
- [How Much Does It Cost to Rent a Podcast Studio? | Peerspace](https://www.peerspace.com/resources/how-much-cost-rent-podcast-studio/)
- [Beyond the Hourly: A Guide to Podcast Studio Rental Rates | Flexwork Studios](https://flexworkstudios.com/podcast-studio-rental-rates/)
- [Cost Guide to Podcast Studio Sessions | CTRL Collective](https://www.ctrlcollective.com/podcast/cost-guide-to-podcast-studio-sessions/)
- [Site Structuring for Dual Plumbing and HVAC Sites | BizIQ](https://biziq.com/blog/how-your-pages-fit-together-the-web-structure-guide-for-dual-plumbing-and-hvac-contractors/)
- [One Website or Two? | Courageous](https://courageous.co.uk/2026/03/one-website-or-two-how-to-decide/)
- [Multi-Brand Websites: Strategies & Examples | FINE](https://www.wearefine.com/news/insights/your-website-bigger-than-a-brand-box/)
- [How to Structure a Website for Multiple Company Divisions | Graticle](https://graticle.com/blog/how-to-structure-a-website-for-multiple-company-divisions/)
- [Multi Brand Website Management Guide | Webstacks](https://www.webstacks.com/blog/multi-brand-websites)
- [Top Multi-Brand Website Examples | Alokai](https://alokai.com/blog/multibrand-website-examples)
- [From Brief to Launch: The Creative Agency Workflow Guide | Smartsheet](https://www.smartsheet.com/content/creative-agency-process-workflows)
- [Creative agency website case studies that win work | TYPZA](https://www.typza.com/insights/creative-agency-website-case-studies)
- [10 Critical Website Design Mistakes That Kill Conversions | Webstacks](https://www.webstacks.com/blog/website-design-mistakes)
- [Agency Website Do's and Don'ts | Proposify](https://www.proposify.com/blog/agency-website-dos-donts-design-mistakes)
- Project context: `.planning/PROJECT.md` (existing feature inventory, constraints, Active requirements)

---
*Feature research for: Rouh dual-service marketing site (creative agency + podcast studio rental)*
*Researched: 2026-07-29*
