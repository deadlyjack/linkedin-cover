// Main canvas renderer
import { drawBackground } from './background.js';
import { drawWatermarks } from './watermarks.js';
import { drawText } from './text.js';
import { drawCards, loadAppImages } from './cards.js';
import { drawSocialLinks, loadSocialIcons } from './social.js';
import { drawSafeZone } from './safeZone.js';
import { THEMES } from '../state/defaults.js';
import { getCanvasSize } from '../config.js';

let appImages = [];
let socialIcons = [];

export async function loadAllImages(state) {
  // Load app images and social icons
  [appImages, socialIcons] = await Promise.all([
    loadAppImages(state.apps),
    loadSocialIcons(state.socialLinks),
  ]);
}

export async function render(ctx, state, includesSafeZone = true) {
  // Get active theme and canvas size
  const theme = state.customTheme || THEMES[state.theme] || THEMES.dark;
  const canvasConfig = getCanvasSize(state.canvasSize);

  // Load images if needed
  if (appImages.length !== state.apps.length) {
    await loadAllImages(state);
  }

  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Render layers
  drawBackground(ctx, theme, canvasConfig);
  drawWatermarks(ctx, state.watermarkStyle, state.watermarkDensity, state.watermarkOpacity, theme, canvasConfig);
  drawText(ctx, state, theme, canvasConfig);

  // Draw social links
  const { leftPadding, socialY } = canvasConfig.layout;
  const isCompany = canvasConfig.width > 2000;
  const socialX = leftPadding + (isCompany ? 800 : 400);
  drawSocialLinks(ctx, state.socialLinks, socialIcons, socialX, socialY, theme, canvasConfig);

  // Draw app cards
  drawCards(ctx, state.apps, appImages, theme, canvasConfig, state.showAppLabels);

  // Draw safe zone overlay if enabled (not included in exports)
  if (includesSafeZone && state.showSafeZone) {
    drawSafeZone(ctx, state.canvasSize, state.safeZoneView);
  }
}

export function forceReloadImages() {
  appImages = [];
  socialIcons = [];
}
