/**
 * DisposalGrid — Uber Design System Tokens
 *
 * Every CSS custom property from globals.css exported as a typed constant.
 * Use these for inline styles, Framer Motion, or any JS-driven styling.
 */

// ──────────────────────────────────────────────
// COLOR TOKENS
// ──────────────────────────────────────────────

export const colors = {
  /** Primary — Uber Black System */
  black: "#000000",
  white: "#FFFFFF",

  /** Gray Ramp */
  gray: {
    50: "#F6F6F6",
    100: "#EEEEEE",
    200: "#E2E2E2",
    300: "#CBCBCB",
    400: "#AFAFAF",
    500: "#757575",
    600: "#545454",
    700: "#333333",
    800: "#1F1F1F",
    900: "#141414",
  },

  /** Accent — Uber Green */
  green: {
    DEFAULT: "#06C167",
    dark: "#038C48",
    light: "#E6F9EE",
  },

  /** Semantic */
  danger: "#D44333",
  warning: "#F5A623",
  info: "#276EF1",
  success: "#06C167",

  /** Surfaces */
  surface: {
    primary: "#FFFFFF",
    secondary: "#F6F6F6",
    inverse: "#000000",
    invertSecondary: "#1F1F1F",
  },
} as const;

export type ColorToken = typeof colors;

// ──────────────────────────────────────────────
// TYPOGRAPHY TOKENS
// ──────────────────────────────────────────────

export const fontFamily = {
  primary: "'Inter', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

export const typography = {
  hero: {
    fontSize: "72px",
    lineHeight: "1.0",
    letterSpacing: "-2px",
    fontWeight: fontWeight.bold,
  },
  display: {
    fontSize: "48px",
    lineHeight: "1.05",
    letterSpacing: "-1.5px",
    fontWeight: fontWeight.bold,
  },
  h1: {
    fontSize: "40px",
    lineHeight: "1.1",
    letterSpacing: "-1px",
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontSize: "32px",
    lineHeight: "1.15",
    letterSpacing: "-0.5px",
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontSize: "24px",
    lineHeight: "1.2",
    letterSpacing: "0px",
    fontWeight: fontWeight.bold,
  },
  h4: {
    fontSize: "20px",
    lineHeight: "1.3",
    letterSpacing: "0px",
    fontWeight: fontWeight.medium,
  },
  bodyLg: {
    fontSize: "18px",
    lineHeight: "1.6",
    fontWeight: fontWeight.regular,
  },
  body: {
    fontSize: "16px",
    lineHeight: "1.6",
    fontWeight: fontWeight.regular,
  },
  sm: {
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: fontWeight.regular,
  },
  xs: {
    fontSize: "12px",
    lineHeight: "1.4",
    fontWeight: fontWeight.regular,
  },
} as const;

export type TypographyToken = keyof typeof typography;

// ──────────────────────────────────────────────
// SPACING TOKENS (8px base grid)
// ──────────────────────────────────────────────

export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "48px",
  8: "64px",
  9: "80px",
  10: "96px",
  11: "128px",
} as const;

export type SpacingToken = keyof typeof spacing;

// ──────────────────────────────────────────────
// BORDER RADIUS TOKENS
// ──────────────────────────────────────────────

export const radius = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  pill: "9999px",
} as const;

export type RadiusToken = keyof typeof radius;

// ──────────────────────────────────────────────
// ELEVATION TOKENS
// ──────────────────────────────────────────────

export const shadow = {
  card: "0 2px 8px rgba(0,0,0,0.08)",
} as const;

export type ShadowToken = keyof typeof shadow;

// ──────────────────────────────────────────────
// MOTION TOKENS
// ──────────────────────────────────────────────

export const easing = {
  uber: [0.4, 0, 0.2, 1] as const,
  uberCss: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const duration = {
  fast: 120,
  base: 200,
  slow: 320,
} as const;

/** Framer Motion transition presets */
export const motionTransition = {
  fast: { duration: duration.fast / 1000, ease: easing.uber },
  base: { duration: duration.base / 1000, ease: easing.uber },
  slow: { duration: duration.slow / 1000, ease: easing.uber },
} as const;

/** Framer Motion page entrance variants */
export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [...easing.uber] },
  },
} as const;

/** Framer Motion hero float loop */
export const floatVariants = {
  animate: {
    y: [-8, 0, -8],
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
  },
} as const;

// ──────────────────────────────────────────────
// CSS VARIABLE REFERENCES (for use in inline styles)
// ──────────────────────────────────────────────

export const cssVar = {
  fontPrimary: "var(--font-primary)",
  fontMono: "var(--font-mono)",
  black: "var(--black)",
  white: "var(--white)",
  gray50: "var(--uber-gray-50)",
  gray100: "var(--uber-gray-100)",
  gray200: "var(--uber-gray-200)",
  gray300: "var(--uber-gray-300)",
  gray400: "var(--uber-gray-400)",
  gray500: "var(--uber-gray-500)",
  gray600: "var(--uber-gray-600)",
  gray700: "var(--uber-gray-700)",
  gray800: "var(--uber-gray-800)",
  gray900: "var(--uber-gray-900)",
  green: "var(--uber-green)",
  greenDark: "var(--uber-green-dark)",
  greenLight: "var(--uber-green-light)",
  danger: "var(--danger)",
  warning: "var(--warning)",
  info: "var(--info)",
  success: "var(--success)",
  surfacePrimary: "var(--surface-primary)",
  surfaceSecondary: "var(--surface-secondary)",
  surfaceInverse: "var(--surface-inverse)",
  surfaceInvertSecondary: "var(--surface-invert-secondary)",
  shadowCard: "var(--shadow-card)",
  easeUber: "var(--ease-uber)",
  durationFast: "var(--duration-fast)",
  durationBase: "var(--duration-base)",
  durationSlow: "var(--duration-slow)",
} as const;

export type CssVarToken = keyof typeof cssVar;
