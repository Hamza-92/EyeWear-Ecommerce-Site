# Backend

## Responsibilities

Laravel owns store resolution, catalog rules, inventory, prices, promotions, customers,
prescriptions, lens compatibility and pricing, orders, payments, shipping, content, try-on model
metadata, and analytics event intake. Controllers translate HTTP requests; they do not own business
rules.

The intended module flow is:

```text
Http request -> validated input -> Application action -> Domain model/policy -> Infrastructure
```

The initial `Domain/Stores` and `Infrastructure/Stores` folders demonstrate the dependency direction
without prematurely scaffolding every future module.

## API conventions

- Public API routes live under `/api/v1`.
- Return stable JSON envelopes with `data` and optional `meta`.
- Use resource classes for domain payloads once catalog endpoints are added.
- Validate requests with Form Requests and map business failures to consistent problem responses.
- Add idempotency keys before payment, order, or prescription-upload commands.

`GET /api/v1/status` is the only foundation endpoint. It verifies routing and store context without
coupling health to optional external services. Laravel's `/up` remains the process liveness route.

## PostgreSQL and Redis

PostgreSQL is the configured default database. Use database constraints, transactions, decimal or
minor-unit money representations, UTC timestamps, and indexes that begin with `store_id` where
queries are store-scoped.

Redis is the configured cache, queue, and session backend. Queue jobs must be idempotent and safe to
retry. Never treat Redis as the only copy of catalog, order, or prescription data.

Tests deliberately override infrastructure with in-memory SQLite, array caches/sessions, and a sync
queue. Integration tests against PostgreSQL should be added when the first schema lands.

## Integrations

Create application contracts before adding provider SDKs. Place concrete adapters in
`app/Infrastructure`. Configuration selects the adapter. This applies to payments, transactional
email, search, analytics, and object storage.
