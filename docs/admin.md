# Admin

The admin is served by Laravel and rendered with Inertia, React, and strict TypeScript. The current
`/admin` page is a visual and routing shell only. Its module map communicates intended boundaries;
disabled labels are not fake features.

## Conventions

- Laravel routes/controllers authorize work and prepare page props.
- React pages compose layouts and feature components; they do not reproduce backend business rules.
- Page props use shared transport types where appropriate and page-local types for view models.
- Forms will use server validation as the authority and expose accessible field-level summaries.
- Large tables require keyboard access, explicit sorting, URL-backed filters, and useful empty
  states—not dashboard-card decoration.

## Security milestone

The foundation route is intentionally unauthenticated for local review. Authentication,
authorization, session hardening, audit logging, and admin rate limits are mandatory before any
production deployment or sensitive module work. Roles should grant capabilities, not hardcode UI
visibility as authorization.

The first real admin slice should follow the first catalog domain slice so its forms exercise actual
application actions rather than mocked data.
