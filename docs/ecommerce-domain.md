# Eyewear Commerce Domain

## Core aggregates

- `Store`: ownership boundary for domain, branding, locale, currency, and integrations.
- `Product`: frame model and merchandising identity.
- `Variant`: sellable size/color/SKU combination.
- `Brand`, `Collection`, `Category`: catalog navigation and merchandising relationships.
- `InventoryItem` and `Price`: store/channel-aware availability and money.
- `LensConfiguration`: a validated selection of prescription method, optical design, material,
  index, coatings, and tint for a frame.
- `Cart` and `Order`: immutable price snapshots, selected variant, lens configuration, and customer
  commitments.

## Frame data

Measurements are structured values in millimetres, not a display string. The familiar
`52 □ 18 – 145` notation is derived from lens width, bridge width, and temple length. Lens height
and total frame width remain separate nullable measurements. Frame shape, material, color, target
style, media, sizes, and lens compatibility require controlled values or relationships rather than
an unvalidated metadata bag.

## Money and inventory

Never use binary floating point. Choose integer minor units or PostgreSQL numeric and standardize
the choice before migrations. Store currency on every persisted price snapshot. Inventory changes
need an auditable ledger or reservation model before checkout is built.

## Prescription boundary

Prescription details are sensitive health-adjacent data. Separate the prescription record from its
order usage, encrypt sensitive fields where appropriate, authorize every access, define retention,
and never emit values into general analytics. Model right and left eyes explicitly with SPH, CYL,
axis, ADD, PD, and optional prism validation.

## Tenant readiness

The first schema should create `stores` before catalog tables. Store-owned tables receive a non-null
`store_id`; unique constraints that appear global, such as slug or SKU, must usually be composite
with `store_id`. Global reference data is an explicit exception, not an accident.
