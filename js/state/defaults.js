// Default state and theme presets

export const THEMES = {
  dark: {
    name: 'Dark',
    bgStart: '#020617',
    bgEnd: '#0f172a',
    primaryText: '#ffffff',
    secondaryText: '#94a3b8',
    accent: '#38bdf8',
  },
  light: {
    name: 'Light',
    bgStart: '#f8fafc',
    bgEnd: '#e2e8f0',
    primaryText: '#0f172a',
    secondaryText: '#475569',
    accent: '#0ea5e9',
  },
  ocean: {
    name: 'Ocean',
    bgStart: '#0c4a6e',
    bgEnd: '#075985',
    primaryText: '#f0f9ff',
    secondaryText: '#bae6fd',
    accent: '#7dd3fc',
  },
  sunset: {
    name: 'Sunset',
    bgStart: '#7c2d12',
    bgEnd: '#9a3412',
    primaryText: '#fff7ed',
    secondaryText: '#fed7aa',
    accent: '#fb923c',
  },
  forest: {
    name: 'Forest',
    bgStart: '#14532d',
    bgEnd: '#166534',
    primaryText: '#f0fdf4',
    secondaryText: '#bbf7d0',
    accent: '#4ade80',
  },
};

export const WATERMARK_STYLES = {
  code: { name: 'Code Symbols', value: 'code' },
  geometric: { name: 'Geometric Shapes', value: 'geometric' },
  dots: { name: 'Dot Grid', value: 'dots' },
  blobs: { name: 'Gradient Blobs', value: 'blobs' },
  none: { name: 'None', value: 'none' },
};

export const DEFAULT_STATE = {
  // Text content
  title: 'Software Developer',
  subtitle: 'Cross-platform apps • Open source • Scalable products',
  tagline: 'Building apps used by millions',
  experience: '7+ Years Experience',

  // Social links
  socialLinks: [
    { icon: 'instagram', text: 'ajitkumar.dev', iconUrl: 'https://cdn.simpleicons.org/instagram/94a3b8' },
    { icon: 'github', text: 'deadlyjack', iconUrl: 'https://cdn.simpleicons.org/github/94a3b8' },
    { icon: 'x', text: 'ajitkumar_dev', iconUrl: 'https://cdn.simpleicons.org/x/94a3b8' },
    { icon: 'website', text: 'ajitkumar.dev', iconUrl: 'https://cdn.simpleicons.org/safari/94a3b8' },
  ],

  // App cards
  apps: [
    {
      id: 1,
      name: 'Acode Editor',
      screenshot: 'acode.jpg',
      logo: 'acode-logo.png',
    },
    {
      id: 2,
      name: 'Better Keep',
      screenshot: 'better-keep.jpg',
      logo: 'betterkeep-logo.png',
    },
  ],

  // Theme
  theme: 'dark',
  customTheme: null, // Will store custom color values if user customizes

  // Watermarks
  watermarkStyle: 'code',
  watermarkDensity: 20,
  watermarkOpacity: 0.10,

  // Canvas size
  canvasSize: 'personal', // 'personal' or 'company'
  showSafeZone: true,
  safeZoneView: 'both', // 'mobile', 'desktop', or 'both'
  showAppLabels: true, // Show app name and logo below screenshots

  // Export settings
  exportScale: 1, // 1x or 2x
  jpegQuality: 0.95,
};
