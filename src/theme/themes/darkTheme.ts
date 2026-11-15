import { ColorTheme } from '../colors';

/**
 * Dark Theme - High contrast, OLED-friendly trading mode matching Groww dark appearance
 */
export const darkTheme: ColorTheme = {
  // Brand & Accent
  primary: '#00D09C',
  primaryLight: '#3BE5B6',
  primaryDark: '#00966F',
  primarySoft: '#0A3326',

  // Background & Surfaces
  background: '#0B0E14',
  surface: '#121620',
  surfaceSubtle: '#1A202C',
  card: '#161B26',

  // Typography
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  textInverse: '#0B0E14',
  textPlaceholder: '#475569',

  // Borders & Dividers
  border: '#242C3D',
  borderFocus: '#00D09C',
  divider: '#1A2230',

  // Financial Semantics
  gain: '#00D09C',
  gainLight: '#3BE5B6',
  gainSoft: '#08382B',
  loss: '#EB5B5B',
  lossLight: '#FCA5A5',
  lossSoft: '#451218',
  neutral: '#94A3B8',

  // Status & Feedback
  success: '#00D09C',
  error: '#EB5B5B',
  warning: '#F59E0B',
  info: '#38BDF8',

  // Overlays & Highlights
  overlay: 'rgba(0, 0, 0, 0.82)',
  shimmer: '#1E2638',
  statusBarStyle: 'light-content',
};
