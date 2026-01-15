// Configuration constants
export const CONFIG = {
  MAX_APP_CARDS: 4,
  STORAGE_KEY: 'linkedin-cover-state',
  DEBOUNCE_DELAY: 500, // ms for localStorage save
};

// Canvas size presets
export const CANVAS_SIZES = {
  personal: {
    name: 'Personal Profile',
    width: 1584,
    height: 396,
    safeZones: {
      // Profile photo overlay (typically ~160px diameter + padding)
      mobile: { x: 24, y: 0, width: 200, height: 200 },
      desktop: { x: 24, y: 0, width: 180, height: 180 },
    },
    layout: {
      leftPadding: 240, // Avoid profile photo area
      topPadding: 25,
      rightPadding: 60,
      cardHeight: 260,
      socialY: 220,
    },
  },
  company: {
    name: 'Company Page',
    width: 4200,
    height: 700,
    safeZones: {
      // Company logo overlay (typically ~300px + padding)
      mobile: { x: 40, y: 0, width: 360, height: 360 },
      desktop: { x: 40, y: 0, width: 320, height: 320 },
    },
    layout: {
      leftPadding: 450, // Avoid logo area
      topPadding: 60,
      rightPadding: 120,
      cardHeight: 480,
      socialY: 520,
    },
  },
};

// Helper to get current canvas dimensions
export function getCanvasSize(sizeKey = 'personal') {
  return CANVAS_SIZES[sizeKey] || CANVAS_SIZES.personal;
}
