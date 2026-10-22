---
name: Maganta Kreasi Design System
description: Premium Event Fabrication & Design Identity
colors:
  brand-yellow: "#FFD400"
  brand-magenta: "#be3168"
  brand-magenta-hover: "#a32555"
  brand-magenta-mid: "#9e2150"
  brand-magenta-wine: "#8a1a45"
  brand-magenta-deep: "#7c153d"
  brand-whatsapp: "#25D366"
  brand-whatsapp-hover: "#20ba56"
  brand-light: "#ffffff"
  brand-gray: "#f4f4f5"
  brand-dark: "#0f0f12"
  ink-muted: "#52525b"
  border-subtle: "#e4e4e7"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "12px"
  lg: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.brand-yellow}"
    textColor: "{colors.brand-dark}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.brand-magenta}"
    textColor: "{colors.brand-light}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
---

# Visual Theme
An energetic, high-craft editorial showcase pairing crisp daylight gallery surfaces (`#ffffff` / `#f4f4f5`) with signature deep magenta (`#be3168` to `#7c153d`) and industrial safety yellow (`#FFD400`) accents.

# Color Palette
- `brand-yellow`: `#FFD400` (high-visibility safety yellow for primary CTAs, active indicators, and highlights)
- `brand-magenta`: `#be3168` (primary brand surface, navigation, and key emphasis)
- `brand-magenta-wine`: `#8a1a45` / `brand-magenta-deep`: `#7c153d` (elevated dark magenta surfaces and gradients)
- `brand-light`: `#ffffff` (primary showcase background)
- `brand-dark`: `#0f0f12` (high-contrast body ink on light surfaces)
- `ink-muted`: `#52525b` (WCAG AA compliant secondary text on light surfaces, >= 7.0:1 contrast)

# Typography
- **Headings (`--font-heading`)**: `Space Grotesk, sans-serif` — bold geometric display type for engineering authority.
- **Body & UI (`--font-body`)**: `Inter, sans-serif` — clean, highly legible body and metadata copy with a strict `12px` (`0.75rem` / `text-xs`) minimum floor across all viewports.

# Spacing & Layout
Standard 4px/8px spatial grid. Responsive gaps use standard CSS/Tailwind utilities with a `44x44px` minimum interactive touch target on mobile and coarse pointers.

# Components & Elements
- Buttons: Pill-rounded (`rounded-full` or `rounded-xl`), minimum `44px` touch height on mobile, clear focus-visible rings.
- Cards: Elevated glass or crisp bordered surfaces (`border-brand-magenta/10`), smooth GPU-accelerated hover lift.

# Micro-interactions & Motion
- Fast, responsive hover transitions (`200ms–300ms` ease-out).
- Full compliance with `@media (prefers-reduced-motion: reduce)` and Framer Motion `reducedMotion="user"`.
