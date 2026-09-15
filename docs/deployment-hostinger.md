# Hostinger Preview Deployment

This runbook publishes only the Next.js storefront to `https://mytestingsites.net` as a private,
non-indexable showcase. The Laravel API, admin, PostgreSQL, and Redis are deliberately outside this
first deployment.

## Deployment shape

```text
GitHub pull request -> Quality workflow -> staging branch -> Hostinger automatic deployment
                                                       |
                                                       +-> mytestingsites.net (private preview)

Later:
api.mytestingsites.net -> Laravel API -> managed PostgreSQL + managed Redis
```

Use a `staging` branch for the preview deployment. Keep `master` as the integration baseline until
the release process and production domain are decided. Configure branch protection so a pull request
cannot merge into `staging` or `master` unless the **Quality / Verify platform** check passes.

## One-time Hostinger application setup

Create a Node.js web application in hPanel and connect the GitHub repository with these settings:

| Setting                | Value                      |
| ---------------------- | -------------------------- |
| Domain                 | `mytestingsites.net`       |
| Branch                 | `staging`                  |
| Project/root directory | Repository root            |
| Node.js version        | `22`                       |
| Install command        | `npm ci`                   |
| Build command          | `npm run build:storefront` |
| Start command          | `npm run start:storefront` |
| Build output           | `apps/storefront/.next`    |

Let the platform provide the runtime `PORT`; Next.js reads it automatically. Do not put a real
password, API key, or database credential in a committed file or in a `NEXT_PUBLIC_*` variable.

Add these environment variables in hPanel:

```dotenv
NEXT_PUBLIC_STORE_KEY=default
NEXT_PUBLIC_STORE_NAME=Eyewear
NEXT_PUBLIC_STORE_DOMAIN=mytestingsites.net
NEXT_PUBLIC_STOREFRONT_URL=https://mytestingsites.net
NEXT_PUBLIC_STORE_LOCALE=en
NEXT_PUBLIC_INDEXABLE=false
BACKEND_API_URL=https://api.mytestingsites.net/api/v1

PREVIEW_AUTH_ENABLED=true
PREVIEW_AUTH_USERNAME=<private-review-username>
PREVIEW_AUTH_PASSWORD=<random-password-of-at-least-24-characters>
```

`BACKEND_API_URL` is reserved for server-side data access and can point at the future API before any
catalogue gateway uses it. The preview password must be shared through a password manager, not
email, source control, screenshots, or browser-visible JavaScript. HTTP Basic authentication is
acceptable for a temporary showcase only when HTTPS is active.

The gate challenges page and data routes before rendering. Next.js framework files, metadata, and
the proposal's public image assets remain directly reachable so its image optimizer can fetch them.
Those files must never contain secrets or private customer information; this is a showcase access
gate, not a substitute for data-layer authorization.

## Automated release flow

1. Create a feature branch and open a pull request into `staging`.
2. GitHub runs formatting, linting, strict TypeScript checks, frontend and backend tests, and both
   production builds.
3. Merge only after the required **Quality / Verify platform** check passes.
4. Hostinger detects the `staging` update and builds the storefront with the commands above.
5. Review the live URL before promoting the same commit elsewhere.

Do not configure Hostinger to deploy every feature branch. A failing GitHub check cannot stop an
independent host from reacting to a direct push, so branch protection and pull-request-only merges
are part of this safety boundary.

## Live verification checklist

- An incognito page request receives an authentication challenge before the page is rendered.
- Wrong credentials remain unauthorized; the review credentials load the complete homepage.
- The response includes `Cache-Control: private, no-store` and
  `X-Robots-Tag: noindex, nofollow, noarchive` while preview protection is enabled.
- `/robots.txt` disallows crawling and page metadata remains `noindex`.
- Desktop, tablet, and mobile navigation, search, hero motion, product image transitions, and
  keyboard focus are reviewed on the live origin.
- Browser console and Hostinger application logs contain no build, asset, or runtime errors.
- No Laravel admin route or sensitive test data is reachable from this frontend deployment.

If a deployment fails, keep the current successful preview online, inspect the Hostinger build log,
and fix the same commit through a new pull request. For a bad successful release, redeploy the last
known-good commit from deployment history or revert it through Git and let the normal workflow run.

## Backend phase (later)

Use `api.mytestingsites.net` for the Laravel REST API and keep admin routes on that same Laravel
application under `/admin`. The shared/web Node hosting tier is only being used for the storefront;
do not force PostgreSQL or Redis into it. Before the first persistent commerce slice, select either
a VPS or managed PostgreSQL and Redis providers, then configure backups, TLS, connection pooling,
private network rules where available, migrations, queues, scheduled tasks, object storage, and a
health check. No customer, prescription, payment, or admin data should be introduced before that
infrastructure review.

## Removing preview protection

Do not merely remove the username and password: an enabled gate with missing credentials correctly
returns `503`. When a deployment is intentionally public, set `PREVIEW_AUTH_ENABLED=false`. Keep
`NEXT_PUBLIC_INDEXABLE=false` until the canonical production domain, legal pages, real catalogue,
structured data, analytics consent, performance budget, and release checklist are all approved.

## Provider references

- [Hostinger: add a Node.js web app](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Hostinger: select the Node.js version](https://www.hostinger.com/support/how-to-select-the-node-js-version-for-your-application/)
- [Hostinger: supported databases and data tools](https://www.hostinger.com/support/which-databases-and-data-tools-are-supported-at-hostinger/)
- [GitHub: manage a branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
