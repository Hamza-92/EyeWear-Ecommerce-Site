# Design System

## Direction

The visual language is quiet luxury: editorial, contemporary, precise, spacious, and product-led. It
must never drift into generic SaaS, marketplace density, black-and-gold cliché, or an animation
showcase.

## Tokens

The source of truth is `packages/ui/src/styles.css`.

| Role            | Token                     | Value     |
| --------------- | ------------------------- | --------- |
| Main background | `--color-ivory`           | `#F7F5F0` |
| Warm surface    | `--color-surface-warm`    | `#F0ECE4` |
| White           | `--color-white`           | `#FFFFFF` |
| Primary text    | `--color-text-primary`    | `#171613` |
| Obsidian        | `--color-obsidian`        | `#11110F` |
| Secondary text  | `--color-text-secondary`  | `#68645D` |
| Muted text      | `--color-text-muted`      | `#918C83` |
| Champagne       | `--color-champagne`       | `#B4966B` |
| Champagne light | `--color-champagne-light` | `#D8C6A7` |
| Border          | `--color-border`          | `#DED9D0` |
| Soft border     | `--color-border-soft`     | `#EAE6DF` |

Champagne is an accent for small indicators, selected states, premium labels, and editorial rules.
Primary commerce actions use obsidian with ivory text.

Radii are 2, 4, and 8 pixels; the pill radius is semantic only. Use borders and spacing before
shadows. Product tiles have a neutral image field and unboxed information underneath.

## Typography

Fonts are self-hosted through Fontsource to avoid build-time Google requests and layout shifts.
Instrument Serif is display-only. Manrope is the functional face for navigation, prices, filters,
forms, body copy, measurements, and checkout. Use fluid display sizes and compact editorial leading;
retain comfortable body leading.

## Primitives

The initial shared set is intentionally small: `Button`, `Container`, and `VisuallyHidden`. Add a
shared primitive only after its semantics and API are stable in both applications. Feature-specific
components stay with their feature.

## Accessibility and motion

- Minimum interactive target: 44 by 44 CSS pixels.
- Always retain a strong `:focus-visible` treatment.
- Do not communicate state with color alone.
- Dialogs and drawers need focus trapping, escape handling, return focus, and scroll locking.
- Motion uses the `motion` package for purposeful interface state. Honor `prefers-reduced-motion`.
- GSAP is reserved for a justified editorial sequence and must never gate shopping tasks.
