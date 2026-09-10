# Premium Eyewear Platform Agent Guide

This repository is a reusable premium eyewear commerce platform. It is not tied to a particular
optical shop. Read the relevant file in `docs/` before changing an application boundary.

## Non-negotiable architecture

- Storefront: Next.js App Router, React, strict TypeScript, Tailwind CSS, and Server Components by
  default. Add `"use client"` only at the smallest interactive boundary.
- Backend: Laravel owns commerce rules and exposes versioned REST APIs. PostgreSQL is the system of
  record; Redis is the default cache, queue, and session backend.
- Admin: Laravel + Inertia + React + TypeScript. Do not create a separate Next.js admin.
- Shared code belongs in `packages/ui`, `packages/types`, or `packages/config` only when at least
  two consumers benefit. Do not abstract speculatively.
- Preserve a replaceable store-context boundary. New store-owned records must be designed to scope
  by store, even while the first deployment remains single-store.
- Payment, email, search, analytics, and object-storage providers must sit behind application
  contracts. Domain code must not import vendor SDKs directly.

## Product and experience rules

- This is eyewear commerce. Model frame measurements, variants, lens compatibility, prescription
  workflows, and try-on metadata deliberately; do not flatten them into generic product metadata.
- Maintain quiet-luxury, editorial, minimal, product-led design. Avoid generic dashboards, heavy
  shadows, excessive cards, rounded containers, pills, and champagne used as a primary color.
- Use Instrument Serif for editorial display text and Manrope for functional UI and body copy.
- Use the locked tokens in `packages/ui/src/styles.css`; do not introduce one-off brand palettes.
- Accessibility is a release criterion: semantic structure, keyboard support, visible focus,
  contrast, reduced motion, touch targets, useful alt text, and managed modal/drawer focus.
- SEO commerce routes must be server-rendered and indexable with canonical metadata and structured
  data. Preview/foundation environments default to `noindex`.
- Performance is part of UX. Keep client JavaScript small, use optimized images, and do not preload
  non-critical assets.

## Virtual Try-On isolation

- Do not import MediaPipe, Three.js, GLTFLoader, camera code, or GLB assets into ordinary storefront
  layouts or product bundles.
- Load the try-on feature behind an explicit dynamic client boundary only after user intent.
- Camera access requires clear consent, graceful capability failure, and no video persistence by
  default. See `docs/virtual-try-on.md`.

## Engineering workflow

- Keep TypeScript strict and PHP formatted with Pint. Prefer small components and bounded domain
  modules; avoid controllers containing business rules.
- Update `.env.example` and documentation when configuration changes. Never commit real secrets.
- Add or update tests with behavior changes. Run `npm run verify` before handoff.
- Do not build placeholder product pages or fake large feature sets. Follow `docs/roadmap.md`.
