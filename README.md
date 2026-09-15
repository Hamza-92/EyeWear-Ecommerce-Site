# Premium Eyewear Commerce Platform

A production-oriented foundation for a configurable premium eyewear storefront and operations
platform. It combines a server-rendered Next.js storefront with a Laravel REST backend and a
Laravel/Inertia React admin. This milestone intentionally contains shells and architecture—not fake
commerce features.

## Repository

```text
apps/
  storefront/   Next.js 16, React 19, TypeScript, Tailwind CSS
  backend/      Laravel 12 REST API + Inertia/React admin
packages/
  ui/           shared design tokens, fonts, and essential primitives
  types/        shared TypeScript transport contracts
  config/       shared strict TypeScript configuration
docs/           architecture and product decisions
```

Laravel 12 is used because the available PHP 8.2 runtime does not satisfy Laravel 13's PHP 8.3
requirement. The application structure does not depend on Laravel 12-specific business APIs.

## Prerequisites

- Node.js 20.19 or newer and npm 10 or newer
- PHP 8.2 or newer with `pdo_pgsql`
- Composer 2
- Docker Desktop (recommended for local PostgreSQL and Redis)

## First-time setup

From the repository root:

```powershell
Copy-Item .env.example .env
Copy-Item apps/storefront/.env.example apps/storefront/.env.local
Copy-Item apps/backend/.env.example apps/backend/.env

docker compose up -d
composer --working-dir=apps/backend install
npm install
php apps/backend/artisan key:generate
php apps/backend/artisan migrate
```

The example credentials are local-only. Replace all secrets and service endpoints outside local
development. If PostgreSQL is installed natively, Docker is optional; keep the backend environment
values aligned with that instance.

## Run locally

Use three terminals from the repository root:

```powershell
npm run dev:storefront
npm run dev:backend
npm run dev:admin
```

- Storefront: `http://localhost:3000`
- Laravel API status: `http://localhost:8000/api/v1/status`
- Inertia admin shell: `http://localhost:8000/admin`
- Laravel liveness: `http://localhost:8000/up`

For Laravel's combined server, queue, logs, and Vite process, run `composer dev` inside
`apps/backend` instead of the separate backend/admin commands.

## Quality commands

```powershell
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify
```

Backend tests use in-memory SQLite and array-backed queues/caches so unit and HTTP behavior can run
without local services. The first persistent domain slice should add PostgreSQL integration tests.

## Configuration notes

- Preview builds are non-indexable until `NEXT_PUBLIC_INDEXABLE=true` is set deliberately.
- Private showcase deployments can enable the server-only preview access gate documented in
  [docs/deployment-hostinger.md](docs/deployment-hostinger.md).
- Redis is the default Laravel cache, queue, and session store; Predis keeps local setup portable.
- Asset storage is provider-neutral and ready for an S3-compatible service such as Cloudflare R2.
- Search, payment, transactional email, and analytics drivers are intentionally unset or logging in
  this milestone.
- The admin shell is not authenticated yet and must not be deployed with sensitive functionality.

Start with [docs/roadmap.md](docs/roadmap.md) for the exact next slice and read
[AGENTS.md](AGENTS.md) before making architectural or visual changes.
