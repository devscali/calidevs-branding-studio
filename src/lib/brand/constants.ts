// ═══════════════════════════════════════════════════════════════
// CALIDEVS BRAND — SINGLE SOURCE OF TRUTH
// NON-NEGOTIABLE: All brand elements derive from this file
// ═══════════════════════════════════════════════════════════════

export const COLORS = {
  ignite: '#E8501A',
  amber: '#F5A623',
  sand: '#FFECD2',
  charcoal: '#161618',
  lightSand: '#F8F5F0',
  white: '#FFFFFF',
  black: '#000000',
  muted: '#888888',
} as const;

export const FLAME_PATHS = {
  outer: 'M30 0C30 0 8 24 4 42C0 60 12 76 30 76C48 76 60 60 56 42C52 24 30 0 30 0Z',
  inner: 'M30 24C30 24 16 40 14 50C12 60 20 70 30 70C40 70 48 60 46 50C44 40 30 24 30 24Z',
  core: 'M30 42C30 42 22 52 22 58C22 64 26 68 30 68C34 68 38 64 38 58C38 52 30 42 30 42Z',
  viewBox: '0 0 60 76',
} as const;

export type WordmarkVariant = 'on-dark' | 'on-light' | 'on-ignite' | 'warm';

export const WORDMARK_COLORS: Record<WordmarkVariant, { cali: string; devs: string; flame: { outer: string; inner: string; core: string } }> = {
  'on-dark': {
    cali: COLORS.white,
    devs: COLORS.ignite,
    flame: { outer: COLORS.ignite, inner: COLORS.amber, core: COLORS.sand },
  },
  'on-light': {
    cali: COLORS.black,
    devs: COLORS.ignite,
    flame: { outer: COLORS.ignite, inner: COLORS.amber, core: COLORS.sand },
  },
  'on-ignite': {
    cali: COLORS.white,
    devs: COLORS.amber,
    flame: { outer: COLORS.white, inner: COLORS.sand, core: '#FFF5E6' },
  },
  warm: {
    cali: COLORS.ignite,
    devs: COLORS.amber,
    flame: { outer: COLORS.ignite, inner: COLORS.amber, core: COLORS.sand },
  },
} as const;

export const FONTS = {
  sans: { family: 'Plus Jakarta Sans', weights: ['400', '700'] },
  serif: { family: 'DM Serif Display', weights: ['400'] },
  mono: { family: 'JetBrains Mono', weights: ['400', '700'] },
  handwritten: { family: 'Kalam', weights: ['400'] },
} as const;

export const TAGLINE = 'Build fast, ship smart, sleep well.';

export const EXPORT_SIZES = {
  'ig-square': { width: 1080, height: 1080, label: 'Instagram Square' },
  'ig-story': { width: 1080, height: 1920, label: 'Instagram Story' },
  'ig-landscape': { width: 1080, height: 566, label: 'Instagram Landscape' },
  'og': { width: 1200, height: 630, label: 'Open Graph' },
  'twitter': { width: 1200, height: 675, label: 'Twitter / X' },
  'linkedin': { width: 1200, height: 627, label: 'LinkedIn' },
} as const;

export type ExportSize = keyof typeof EXPORT_SIZES;

// ═══════════════════════════════════════════════════════════════
// CANADA CAMPAIGN — Alternate palette (dark minimal + violet)
// ═══════════════════════════════════════════════════════════════
export const CANADA_COLORS = {
  bg: '#0d0d0d',
  violet: '#a78bfa',
  teal: '#5dcaa5',
  coral: '#f0997b',
  blue: '#85b7eb',
  campaignAmber: '#ef9f27',
} as const;

export const SERVICE_DOTS = [
  { color: COLORS.white, label: 'Website' },
  { color: CANADA_COLORS.teal, label: 'SEO' },
  { color: CANADA_COLORS.violet, label: 'AI Chatbot' },
  { color: CANADA_COLORS.campaignAmber, label: 'CRM' },
  { color: CANADA_COLORS.coral, label: 'Custom Software' },
  { color: CANADA_COLORS.blue, label: 'Tech Consulting' },
] as const;
