# Storefront Experience and Launch Backlog

## Purpose

This document preserves customer-experience ideas that are valuable but not yet ready to build. It
complements `roadmap.md`: the roadmap controls delivery order and domain dependencies, while this
backlog records the intended experience, prerequisites, and acceptance bar.

The storefront is considered launch-ready when all applicable **P0** and **P1** items are complete
or explicitly waived with a documented reason. **P2** ideas are experiments and do not delay launch.
"Fully complete" means the agreed release scope passes its gates; it does not mean shipping every
possible interaction.

## Product experience principles

1. **Clarity before spectacle.** Every interaction must help customers understand a frame, choose a
   lens, gain confidence, or complete a task.
2. **One dominant action.** Secondary choices use progressive disclosure rather than competing with
   the primary commerce path.
3. **Eyewear-specific utility.** Fit, measurements, lens compatibility, prescription state, and
   try-on metadata are designed deliberately instead of being generic product attributes.
4. **Editorial restraint.** Use space, typography, proportion, and photography before cards,
   shadows, badges, or decorative motion.
5. **Equivalent access.** Pointer enhancements need keyboard and touch equivalents. Essential
   meaning cannot depend on hover, color, animation, camera access, or perfect vision.
6. **Server-first and fast.** SEO content stays server-rendered. Client JavaScript, eager images,
   personalization, 3D, and camera code require a measured benefit and isolated loading boundary.
7. **Manageable by the store.** Campaigns, content, media, alt text, focal points, sequencing, and
   availability must eventually be owned through validated admin workflows rather than code edits.
8. **Honest persuasion.** Never use fake reviews, artificial scarcity, misleading countdowns,
   preselected paid upgrades, or inaccessible urgency patterns.

## Priority and readiness states

| Marker  | Meaning                                                              |
| ------- | -------------------------------------------------------------------- |
| P0      | Required for a safe, usable commerce launch.                         |
| P1      | Required for the premium showcase scope agreed for launch.           |
| P2      | Valuable experiment after the core journey is complete and measured. |
| Ready   | Dependencies exist and implementation may be planned.                |
| Blocked | A named product, content, data, or technical dependency is missing.  |

## Hero and campaign experience

### Implemented foundation

- Single editorial campaign rather than a conventional autoplay slider.
- Dedicated desktop and mobile art direction with the eyewear kept visible.
- One primary action and one quieter secondary action.
- Sub-second soft-to-sharp image resolve, staggered copy entrance, and reduced-motion fallback.
- Secondary CTA line and arrow movement on hover and keyboard focus.
- Server-rendered content and responsive image delivery with no hero client component.

### Deferred hero backlog

| Priority | Enhancement                     | Readiness and acceptance criteria                                                                                                                                                                                 |
| -------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | Exact-frame hotspot             | Blocked until a real product, variant, price, availability, and product route exist. Desktop hover and keyboard focus must reveal the same information; touch needs an explicit control. Never cover the glasses. |
| P1       | CMS campaign ownership          | Blocked until editorial administration exists. Support schedule, locale, audience, desktop/mobile assets, focal points, safe copy zones, alt text, CTA validation, preview, draft, publish, expiry, and rollback. |
| P1       | Next-section continuation       | Add only when the next homepage section exists. Test whether a small visible edge or restrained scroll cue improves discovery without suggesting false pagination.                                                |
| P1       | Campaign performance contract   | Monitor the hero as the LCP candidate on representative mobile networks. Enforce responsive dimensions, compression, no layout shift, and only one eagerly fetched campaign asset.                                |
| P2       | Optical focus/refraction study  | Prototype separately. It must remain subtle, desktop-pointer only, disabled for touch/reduced motion, and removed if it harms frame clarity, GPU cost, or comprehension.                                          |
| P2       | Multiple campaign mode          | Only when two or three equally strong campaigns exist. Manual controls first; crossfade only; announce changes accessibly; pause on focus/hover; no short autoplay interval.                                      |
| P2       | Contextual Virtual Try-On entry | Blocked by the isolated VTO milestone and real compatibility data. It may appear within exact-frame information, never as a third dominant hero CTA.                                                              |
| P2       | Campaign experimentation        | Requires consent-aware analytics, stable attribution, sufficient traffic, and a predefined success metric. Do not optimize only for clicks at the expense of downstream conversion or returns.                    |

Do not add conventional carousels, large pointer-following lenses, heavy parallax, looping video,
auto-playing audio, or an intro that delays access to navigation and shopping actions.

## Homepage composition

The homepage should become a calm decision path rather than a collection of unrelated promotional
blocks. The proposed order is:

1. **Hero campaign** — positioning and primary category choice.
2. **New and considered frames** — a small product-led edit using real availability and prices.
3. **Shop by intent** — shape, material, optical, sunglasses, or fit needs; keep the number of
   choices deliberately limited.
4. **Frame finder or fit guidance** — explain how face fit and measurements work before asking for
   personal data.
5. **Craft/material story** — one editorial feature with tangible product relevance.
6. **Optical services** — eye test, prescription help, adjustments, repairs, and store support.
7. **Trust and aftercare** — delivery, returns, warranty, and expert assistance without badge walls.
8. **Recently viewed** — personalized only after genuine browsing activity and loaded after primary
   content.
9. **Editorial signup and footer** — clear value proposition, consent language, and complete service
   navigation.

P1 acceptance: each section has a distinct customer job, one clear next action, managed content,
responsive designs, and complete loading/empty/error states. Remove any section that merely repeats
navigation or exists to fill vertical space.

### New and considered frame edit

The V0 proposal foundation is implemented with four server-rendered products, paired still-life and
on-face imagery, accurate image sizing, useful alt text, restrained product metadata, a responsive
four/two-column layout, and an isolated accessible wishlist preview control. Alternate imagery is a
progressive enhancement; no essential product detail depends on hover.

Before this section can move beyond V0:

- P0: replace proposal products, prices, colour counts, and dead routes with store-scoped catalogue,
  variant, price, availability, currency, and publication data from the Laravel API;
- P1: connect wishlist state across anonymous and authenticated sessions, including optimistic,
  failure, offline, and merge behavior;
- P1: give merchandising owners validated product sequencing, alternate-media selection, alt text,
  scheduling, preview, and rollback controls;
- P1: decide whether touch users benefit from an explicit "On face" media control after testing with
  real product imagery; do not add it solely to imitate desktop hover;
- P1: add consent-aware impression and product-selection analytics only after the shared event
  contract exists, and measure downstream shopping quality rather than card clicks alone.

## Navigation and search

### P0

- Replace preview search with a versioned provider-neutral backend contract.
- Debounce and cancel stale requests; handle loading, partial failure, empty results, and offline
  recovery without trapping focus.
- Search products, brands, collections, materials, shapes, and common customer language while
  preserving result relevance and store scope.
- Keep a server-rendered, canonical full-results page; suggestions are an enhancement, not the only
  route to results.
- Ensure every header and mega-menu destination resolves before launch; no proposal-only dead links.

### P1

- Search merchandising for popular queries, synonyms, redirects, zero-result recovery, and curated
  recommendations.
- Consent-aware query analytics with no prescription or sensitive account values.
- Admin ownership for menu order, promotional media, link validation, scheduling, and locale.
- Recent-search controls that remain understandable on shared devices and can be cleared.

## Catalog and product discovery

### P0

- Server-rendered collection, designer, category, and search routes with canonical URLs.
- URL-backed filters for frame type, shape, material, color, fit, size, price, availability, and
  lens compatibility; filters must survive refresh and sharing.
- Clear sort semantics, accurate result counts, removable active filters, no-results recovery, and
  pagination or measured incremental loading.
- Product cards with real price, currency, variant/colour state, availability, useful image alt
  text, and stable image dimensions.

### P1

- Accessible colour/finish previews, alternate product imagery, wishlist, compare, and recently
  viewed behavior.
- Fit-focused discovery: narrow/wide fit, low bridge options, measurement education, and frame-size
  comparison.
- Merchandising controls that never override unavailable variants or misrepresent prices.
- Avoid generic quick-add when lens or prescription decisions are still required; use a clear
  "Choose frame and lenses" path instead.

## Product detail experience

### P0

- Gallery with front, three-quarter, side, hinge, case, and on-face imagery where available.
- Variant selection with price, availability, selected-state clarity, and URL/deep-link behavior.
- Structured frame measurements, fit description, material, weight, included items, lens
  compatibility, delivery, returns, warranty, and care.
- A stable primary path into frame-only purchase or lens configuration, depending on store rules.
- Product, Offer, Review when genuine, and Breadcrumb structured data generated from server-known
  facts.

### P1

- Human-readable measurement diagram and "compare with your current frame" guidance.
- Accessible zoom that does not trap pointer/keyboard users or replace high-quality source images.
- Contextual styling, compatible lens guidance, related colours, and genuinely related frames.
- Exact-frame hero hotspot may be connected only after these product states exist.
- Reviews and questions only with verified moderation, truthful aggregation, and useful fit context.

## Lens and prescription journey

### P0

- Guided lens configuration based on real frame compatibility and store rules.
- Explicit choices for prescription method, lens type, material/index, coatings, tint, and required
  measurements; explain benefits and trade-offs in plain language.
- Validate right and left eye values independently and prevent impossible combinations.
- Allow save-and-return without exposing sensitive values in URLs, analytics, logs, or general
  storefront caches.
- Provide review/edit checkpoints and an unambiguous configured-product summary in basket and order.

### P1

- Prescription upload, manual entry, "send later", and store verification workflows with status and
  secure retention rules.
- PD education and measurement only after accuracy, device support, consent, and fallback review.
- Progressive explanations, comparison tools, and expert-help escalation without defaulting to the
  most expensive lens.

## Virtual Try-On and 3D

- Follow `virtual-try-on.md`; keep camera, MediaPipe, Three.js, GLB, and calibration assets outside
  ordinary bundles.
- P1 only after the non-camera purchase journey is stable: accessible launch control, informed
  consent, capability detection, denial/failure recovery, camera shutdown, and static/3D fallback.
- Track technical success and voluntary engagement without storing video, face landmarks, or
  prescription data.
- Calibrate each compatible frame against physical measurements and versioned assets before it can
  show a "Try on" action.

## Basket, checkout, and order confidence

### P0

- Basket line items preserve frame variant, lens configuration, prescription state, quantity, taxes,
  discounts, and currency as an auditable price snapshot.
- Customers can review and safely edit frame/lens choices without silent resets.
- Delivery estimates, shipping options, returns, warranty, totals, and payment status remain clear
  before commitment.
- Provider-neutral payment failure, duplicate submission, retry, cancellation, and recovery states.
- Guest checkout plus accessible account creation after purchase; never force account creation to
  reveal the final total.
- Order confirmation, email, status history, cancellation/return eligibility, and support route.

### P1

- Address assistance with manual fallback, saved addresses, store pickup where supported, and clear
  fulfilment separation for mixed items.
- Express payment only when it preserves all lens/prescription review requirements.
- Abandoned-basket communication only with consent, frequency limits, and a stable restoration link.

## Services, trust, and retention

- P1 eye-test booking with locations, practitioner/service availability, confirmation, reschedule,
  cancellation, timezone, reminder, and accessibility requirements.
- P1 store locator with list-first fallback, hours, services, directions, accessibility information,
  and temporary closure handling.
- P1 style consultation, frame adjustment, repairs, warranty, delivery/returns, contact, and useful
  self-service content.
- P1 wishlist and recently viewed across anonymous/authenticated transitions without surprising
  tracking.
- P2 replenishment or care reminders only where meaningful and consented; eyewear should not receive
  artificial repeat-purchase pressure.

## Account and customer care

- Secure authentication, recovery, session management, order history, returns, addresses, wishlist,
  communication preferences, and data export/deletion request entry points.
- Prescription data receives separate authorization, retention, masking, audit, and deletion rules;
  customer-support access must be purpose-limited and logged.
- Admin/customer-service tools need role-based access, reasoned overrides, internal notes, and an
  audit trail without exposing internal information to customers.

## Admin, content, and operations

### P0

- Store-scoped management for brand, product, variant, measurements, media, price, inventory, lens
  compatibility, and publication state.
- Validation prevents incomplete or inconsistent records from reaching the storefront.
- Draft/preview/publish workflows, role-based permissions, audit history, scheduled changes, and
  rollback for customer-facing content.
- Order, payment, fulfilment, cancellation, refund, return, prescription-verification, and customer
  support states with idempotent actions and traceability.

### P1

- Visual crop/focal-point preview for common desktop and mobile storefront placements.
- Required alt text and content-quality checks, broken-link detection, campaign conflicts, expiry
  warnings, and inventory-aware merchandising previews.
- Operational dashboards should prioritize exceptions and next actions rather than decorative cards.

## Cross-cutting launch quality

### Accessibility — P0

- Test keyboard-only, screen reader, zoom/reflow, contrast, touch targets, reduced motion, forced
  colors where relevant, form errors, focus restoration, and modal/drawer isolation.
- Complete accessible names, landmarks, headings, status announcements, alt text, captions, and
  non-color state indicators.
- Commission an independent accessibility audit before production launch and retest resolved issues.

### Performance and resilience — P0

- Define budgets for page weight, route JavaScript, image weight, fonts, API latency, cache
  behavior, and current Core Web Vitals thresholds before feature implementation.
- Test representative mobile hardware and constrained networks, not only desktop development
  machines.
- Reserve eager loading for the true LCP asset; lazy-load below-fold recommendations, analytics,
  support widgets, maps, 3D, and camera features.
- Provide useful timeout, retry, offline, empty, partial-data, and maintenance states.

### SEO and content — P0

- Canonicals, robots policy, sitemap segmentation, redirects, breadcrumbs, metadata, social images,
  and valid structured data for every indexable route class.
- Useful unique copy for products, collections, designers, guides, stores, and services; no
  generated filler or duplicated supplier descriptions.
- Content inventory with owner, review date, legal approval where needed, and removal/redirect plan.

### Security and privacy — P0

- Threat-model authentication, prescriptions, uploads, payments, admin actions, providers, camera,
  analytics, and multi-store isolation.
- Explicit consent, retention, export, deletion, encryption, audit, secret management, rate limits,
  validation, malware scanning for uploads, and incident procedures as applicable.
- Never place health-adjacent, payment, authentication, or private customer values in general
  analytics, URLs, client logs, or public caches.

### Analytics and marketing — P1

- Define a small event contract around discovery, product confidence, lens progression, checkout,
  search recovery, and service booking; include no sensitive values.
- Validate consent behavior and attribution before adding advertising tags.
- Measure downstream quality—conversion, configuration completion, returns, cancellations, support
  demand—not only clicks and time on page.
- Establish campaign naming, UTM governance, experiment ownership, stop conditions, and reporting.

## Release stages

| Stage                           | Exit criteria                                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| V0 — Static experience system   | Agreed desktop, tablet, and mobile designs; content model; reusable states; accessibility annotations; no unexplained placeholder interaction.                                  |
| V1 — Catalog vertical slice     | Store, brand, product, and variant flow through admin, API, collection, search, and product page using real scoped data.                                                        |
| V2 — Shopping foundation        | Wishlist/basket, pricing, inventory, customer/account foundation, and complete recoverable states.                                                                              |
| V3 — Optical commerce           | Lens compatibility, prescription journey, configured basket/order snapshots, privacy controls, and expert escalation.                                                           |
| V4 — Transaction and operations | Checkout, payment, delivery, fulfilment, email, returns/refunds, admin operations, and auditability.                                                                            |
| V5 — Premium differentiation    | Editorial CMS, service booking, frame finder, calibrated VTO/3D where approved, and measured personalization.                                                                   |
| V6 — Launch hardening           | Cross-device QA, accessibility audit, load/security testing, SEO validation, analytics/consent QA, content/legal review, backups, monitoring, runbooks, and rollback rehearsal. |

## Definition of ready for an experience item

Before implementation, record:

- customer problem and intended outcome;
- real data/content owner and dependencies;
- primary and secondary actions;
- desktop, tablet, mobile, touch, keyboard, screen-reader, and reduced-motion behavior;
- loading, empty, partial, error, retry, offline, permission-denied, and unavailable states as
  relevant;
- performance budget and loading boundary;
- analytics event and prohibited data;
- admin ownership, validation, preview, schedule, and rollback requirements;
- acceptance tests and removal criteria if the feature does not help.

## Production launch gate

Do not launch while any of the following remain:

- dead routes, dummy prices/inventory/reviews, placeholder legal text, or misleading unavailable
  actions;
- an incomplete frame-to-lens-to-basket-to-payment-to-order journey;
- unreviewed prescription, payment, camera, authentication, upload, or tenant-isolation handling;
- unresolved critical accessibility, security, data-loss, payment, or order-integrity defects;
- missing mobile/tablet states, weak low-bandwidth recovery, unacceptable measured performance, or
  unexplained layout shift;
- untested transactional communication, refund/return workflows, backups, monitoring, alerting,
  incident response, or rollback;
- content without an owner, analytics without consent validation, or admin changes without
  auditability.

The final launch decision requires written sign-off for product/UX, engineering, commerce
operations, accessibility, security/privacy, content/SEO, analytics/marketing, and business
ownership.
