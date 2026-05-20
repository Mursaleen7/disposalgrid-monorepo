# Design System: DisposalGrid Web App

## 1. Visual Theme & Atmosphere
A restrained, gallery-airy interface with confident asymmetric layouts and fluid spring-physics motion. The atmosphere is clinical yet warm — reflecting a modern, utility-driven aesthetic akin to high-end Apple software and premium Uber product interfaces. The density is 5 (Balanced), Variance is 6 (Offset Asymmetric), and Motion is 7 (Fluid CSS).

## 2. Color Palette & Roles
- **Canvas White** (`#FAFAFA`) — Primary background surface for light mode sections.
- **Pure Surface** (`#FFFFFF`) — Card and container fill.
- **Charcoal Ink** (`#09090B`) — Primary text, deep dark backgrounds, Zinc-950 depth (REPLACES PURE BLACK).
- **Muted Steel** (`#71717A`) — Secondary text, descriptions, metadata (Zinc-500).
- **Whisper Border** (`#E4E4E7`) — Card borders, 1px structural lines (Zinc-200).
- **Uber Green** (`#06C167`) — Single accent for CTAs, active states, focus rings. (Max 1 accent. Saturation < 80%. No purple/neon).
- **Soft Success** (`#E6F9EE`) — Background tint for success/verified states.

## 3. Typography Rules
- **Display/Headlines:** `Geist Sans` — Track-tight, controlled scale, weight-driven hierarchy. Never screaming.
- **Body:** `Geist Sans` — Relaxed leading, 65ch max-width, neutral secondary color.
- **Mono:** `JetBrains Mono` or `Geist Mono` — For code, metadata, timestamps, high-density numbers.
- **Banned:** `Inter`, `Times New Roman`, `Arial`. Serif fonts are entirely banned in this utility dashboard context.

## 4. Component Stylings
* **Buttons:** Flat, no outer glow. Tactile -1px translate on active state (Spring physics). Accent fill for primary, ghost/outline for secondary.
* **Cards:** Generously rounded corners (`--radius-xl`: 24px). Diffused whisper shadow. Used only when elevation serves hierarchy. For high-density areas, replace with border-top dividers or heavy negative space.
* **Inputs:** Label above, error below. Focus ring in Charcoal Ink or Uber Green. Minimalist border, no floating labels.
* **Loaders:** Skeletal shimmer matching exact layout dimensions. No generic circular spinners.
* **Empty States:** Composed, illustrated compositions.

## 5. Layout Principles
Grid-first responsive architecture.
- Asymmetric splits for Hero sections (e.g., massive left text, offset right imagery).
- Strict single-column collapse below 768px.
- Max-width containment (e.g., 1440px centered).
- No flexbox percentage math; use CSS Grid.
- Generous internal padding and negative space.
- NO 3-column equal grid feature rows — use 2-column Zig-Zag, asymmetric Bento Box, or horizontal scroll.

## 6. Motion & Interaction
- Spring physics for all interactive elements (`stiffness: 100, damping: 20` or cubic-bezier `0.16, 1, 0.3, 1`).
- Staggered cascade reveals on scroll (Framer Motion `whileInView`).
- Perpetual micro-loops on active components (e.g., pulse dots on verified badges).
- Hardware-accelerated transforms only (animate `transform` and `opacity`, never `top/left/width`).

## 7. Anti-Patterns (Banned)
- 🚫 NO `Inter` font.
- 🚫 NO emojis anywhere.
- 🚫 NO pure black (`#000000`).
- 🚫 NO neon glows or excessive gradients.
- 🚫 NO 3-column equal card layouts for features.
- 🚫 NO overlapping elements — clean spatial separation always.
- 🚫 NO AI copywriting clichés ("Elevate", "Seamless", "Unleash").
- 🚫 NO fake system/metric sections with fabricated numbers.
- 🚫 NO filler UI text ("Scroll to explore", bouncing scroll arrows).
