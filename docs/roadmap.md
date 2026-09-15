# Roadmap

This delivery sequence is complemented by the prioritized customer-experience and launch criteria in
[`storefront-experience-backlog.md`](storefront-experience-backlog.md). The backlog does not
override domain dependencies in this roadmap; it defines when experience work becomes credible and
how it must be accepted.

## Step 1 — Foundation (current)

Monorepo, Next.js storefront shell, Laravel REST/API base, Inertia React admin shell, PostgreSQL and
Redis configuration, shared tokens/types/config, documentation, and quality checks.

## Step 2 — Vertical catalog slice (recommended next)

Implement `Store`, `Brand`, `Product`, and `Variant` as one thin end-to-end slice:

1. Confirm tenant scoping, money representation, identifiers, slugs, and media ownership.
2. Add PostgreSQL migrations, domain/application services, factories, policies, and API resources.
3. Add admin authentication and authorization, then minimal brand/product management.
4. Add one server-rendered collection route and one product-detail route using real API data.
5. Add Product/Offer/Breadcrumb structured data, cache invalidation, and integration tests.

Do not add lenses, checkout, or WebAR during this slice.

## Later sequence

- Catalog breadth: categories, collections, inventory, prices, search indexing, and media.
- Shopping utility: cart, wishlist, compare, recently viewed, and account foundation.
- Lens and prescription domain with privacy review and a guided configurator.
- Checkout, provider-neutral payments, shipping, order workflows, and transactional email.
- Editorial CMS, campaigns, homepage composition, and navigation.
- 3D viewer and Virtual Try-On spike, then calibrated production integration.
- Multi-store host resolution and operations only after single-store workflows are proven.
