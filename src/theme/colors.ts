/**
 * Centralized Color Palette and Theme Color Token Interfaces
 */

export interface ColorTheme {
  // Brand & Accent
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primarySoft: string;

  // Background & Surfaces
  background: string;
  surface: string;
  surfaceSubtle: string;
  card: string;

  // Typography
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textPlaceholder: string;

  // Borders & Dividers
  border: string;
  borderFocus: string;
  divider: string;

  // Financial Semantics (Markets)
  gain: string;
  gainLight: string;
  gainSoft: string;
  loss: string;
  lossLight: string;
  lossSoft: string;
  neutral: string;

  // Status & Feedback
  success: string;
  error: string;
  warning: string;
  info: string;

  // Overlays & Highlights
  overlay: string;
  shimmer: string;
  statusBarStyle: 'light-content' | 'dark-content';
}

export type ThemeType = 'green' | 'blue' | 'dark';
