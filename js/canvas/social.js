// Social links rendering
import { loadImage } from '../utils/imageLoader.js';

// Cache for social icons
const iconCache = new Map();

export async function loadSocialIcons(socialLinks) {
  const icons = [];

  for (const link of socialLinks) {
    if (!iconCache.has(link.iconUrl)) {
      const img = await loadImage(link.iconUrl);
      if (img) iconCache.set(link.iconUrl, img);
    }
    icons.push(iconCache.get(link.iconUrl));
  }

  return icons;
}

export function drawSocialLinks(ctx, socialLinks, icons, x, y, theme, canvasConfig) {
  if (!socialLinks || socialLinks.length === 0) return;

  const isCompany = canvasConfig.width > 2000;
  const iconSize = isCompany ? 36 : 18;
  const textGap = isCompany ? 16 : 8;
  const itemGap = isCompany ? 48 : 24;
  const fontSize = isCompany ? 32 : 16;
  let currentX = x;

  ctx.font = `400 ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = theme.secondaryText;
  ctx.textBaseline = 'middle';

  socialLinks.forEach((link, i) => {
    const icon = icons[i];
    const textWidth = ctx.measureText(link.text).width;

    if (icon) {
      ctx.drawImage(icon, currentX, y - iconSize / 2, iconSize, iconSize);
    }

    ctx.fillText(link.text, currentX + iconSize + textGap, y);
    currentX += iconSize + textGap + textWidth + itemGap;
  });

  ctx.textBaseline = 'top';
}

export function clearIconCache() {
  iconCache.clear();
}
