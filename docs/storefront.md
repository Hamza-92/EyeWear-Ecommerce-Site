# Storefront

## Rendering policy

The App Router storefront is server-first. Layouts, category pages, brand pages, collections,
product detail pages, editorial pages, canonical metadata, and structured data should render on the
server. Client Components are reserved for isolated interactions such as filters, drawers,
wishlists, compare controls, and camera/WebGL experiences.

Do not put a global client provider around the application unless the capability is genuinely
global. Prefer URL-backed filter state and server pagination so listing pages remain linkable and
indexable.

## Data access

Server code will call the versioned Laravel API using `BACKEND_API_URL`. Add a typed gateway per
domain, validate untrusted payloads at the boundary, and translate backend failures into stable
storefront errors. Browser-side mutations should target Laravel directly only when CSRF, CORS, and
authentication requirements are explicit.

Cache public catalog reads by store and locale. Invalidate with backend-driven tags or webhooks;
never cache personalized pricing, prescriptions, cart state, or account data publicly.

## SEO baseline

The root layout provides configurable metadata, canonical URLs, Open Graph data, robots, and a
sitemap entry. `NEXT_PUBLIC_INDEXABLE` defaults to false so a demo or unfinished client build is not
accidentally indexed. Product work must add Product/Offer and Breadcrumb JSON-LD with server-known
availability and price data.

## Performance baseline

- Use `next/image` with accurate `sizes`; reserve eager loading for the actual LCP asset.
- Keep third-party scripts consent-aware and loaded after critical content.
- Lazy-load drawers, recommendation widgets, 3D, and try-on code by interaction or viewport.
- Measure Core Web Vitals by route class and device tier.

## Store configuration

`src/config/store.ts` is a temporary environment-backed public identity. It uses a shared contract
and can later consume a host-resolved configuration endpoint. Never expose provider credentials or
private store settings through `NEXT_PUBLIC_*` variables.
