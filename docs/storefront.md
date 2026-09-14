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

## Header prototype

The current customer-facing build intentionally contains only the storefront header. Navigation
content lives in `src/config/navigation.ts`, separate from the interactive component, so a CMS or
store-scoped API can replace the proposal copy without changing the header structure. The links
describe planned storefront routes; their destination pages are deliberately outside this
header-only design stage.

Desktop navigation uses full-width editorial panels with three link groups and two promotional
images. The same information becomes expandable sections in a focus-trapped mobile dialog. The menu
supports pointer, click, Escape, Home/End, left/right arrow navigation between triggers, and Arrow
Down into the active panel. Search is a separate, labelled region and receives focus when it opens.
All motion honors the user's reduced-motion preference.

The header search currently behaves like a predictive AJAX search while remaining proposal-only. Its
replaceable sample catalogue lives in `src/config/search-preview.ts`; the client panel simulates a
short request delay and renders popular, loading, filtered, and empty states without calling a
backend. The form retains a `/search?q=` destination for the future server-rendered results route.
Replace the sample content with a typed Laravel catalogue gateway during the vertical catalog slice,
without changing the presentation component.

### Replaceable brand and image assets

- Logo: supply SVG where possible. The desktop artwork slot is `180 × 48 px`; provide a transparent
  `360 × 96 px` PNG if raster artwork is required. On narrow screens it is contained within a
  `124 × 44 px` area without changing the artwork ratio.
- Mega-menu photography: use portrait `4:5` images, ideally at least `1600 × 2000 px`, with the main
  subject kept away from the outer edges. Final WebP or AVIF files should normally remain below
  `350 KB` after visual review.
- Temporary proposal images are stored in `public/images/navigation`. They are original AI test
  assets with no embedded brand marks and may be replaced by changing only the image paths and alt
  text in `src/config/navigation.ts`.
