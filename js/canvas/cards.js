// App cards rendering
import { roundRect } from '../utils/shapes.js';
import { loadImage } from '../utils/imageLoader.js';
import { CONFIG } from '../config.js';

// Cache for loaded images
const imageCache = new Map();

export async function loadAppImages(apps) {
  const images = [];

  for (const app of apps) {
    const appImages = {
      screenshot: null,
      logo: null,
    };

    // Load screenshot
    if (app.screenshot) {
      if (!imageCache.has(app.screenshot)) {
        const img = await loadImage(app.screenshot);
        if (img) imageCache.set(app.screenshot, img);
      }
      appImages.screenshot = imageCache.get(app.screenshot);
    }

    // Load logo
    if (app.logo) {
      if (!imageCache.has(app.logo)) {
        const img = await loadImage(app.logo);
        if (img) imageCache.set(app.logo, img);
      }
      appImages.logo = imageCache.get(app.logo);
    }

    images.push(appImages);
  }

  return images;
}

export function drawCards(ctx, apps, appImages, theme, canvasConfig, showAppLabels = true) {
  if (!apps || apps.length === 0) return;

  const { cardHeight: baseCardHeight, rightPadding } = canvasConfig.layout;
  const isCompany = canvasConfig.width > 2000;
  const cardGap = isCompany ? 16 : 8;

  // Increase card height when labels are hidden (no space needed below)
  const cardHeight = showAppLabels ? baseCardHeight : (isCompany ? baseCardHeight * 1.3 : baseCardHeight * 1.2);

  // Calculate total width needed
  const cardWidths = apps.map((app, i) => {
    const img = appImages[i]?.screenshot;
    if (!img) return isCompany ? 300 : 150; // Default width
    return cardHeight * (img.width / img.height);
  });

  const totalWidth = cardWidths.reduce((sum, w) => sum + w, 0) + (cardGap * (apps.length - 1));
  const cardsStartX = canvasConfig.width - rightPadding - totalWidth;
  // Adjust vertical position - less bottom margin when labels hidden
  const bottomMargin = showAppLabels ? (isCompany ? 60 : 30) : 0;
  const cardsY = (canvasConfig.height - cardHeight - bottomMargin) / 2;

  let currentX = cardsStartX;

  apps.forEach((app, i) => {
    const width = cardWidths[i];
    drawCard(ctx, currentX, cardsY, width, cardHeight, app, appImages[i], theme, isCompany, showAppLabels);
    currentX += width + cardGap;
  });
}

function drawCard(ctx, x, y, width, height, app, images, theme, isCompany, showAppLabels) {
  const screenshot = images?.screenshot;
  const logo = images?.logo;

  // Draw screenshot if loaded
  if (screenshot) {
    const imgRatio = screenshot.width / screenshot.height;
    const cardRatio = width / height;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > cardRatio) {
      // Image is wider - fit by width
      drawWidth = width;
      drawHeight = width / imgRatio;
      drawX = x;
      drawY = y + (height - drawHeight) / 2;
    } else {
      // Image is taller - fit by height
      drawHeight = height;
      drawWidth = height * imgRatio;
      drawX = x + (width - drawWidth) / 2;
      drawY = y;
    }

    // Draw with rounded corners
    const radius = isCompany ? 32 : 20;
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, drawX, drawY, drawWidth, drawHeight, radius);
    ctx.clip();
    ctx.drawImage(screenshot, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }

  // Draw app name with logo below (only if showAppLabels is true)
  if (showAppLabels) {
    const logoHeight = isCompany ? 40 : 20;
    const textGap = isCompany ? 12 : 6;
    const fontSize = isCompany ? 28 : 14;
    ctx.font = `400 ${fontSize}px Inter, system-ui, sans-serif`;
    const textWidth = ctx.measureText(app.name).width;
    const textHeight = fontSize;

    // Calculate logo width maintaining aspect ratio
    let logoWidth = logoHeight;
    if (logo) {
      const logoRatio = logo.width / logo.height;
      logoWidth = logoHeight * logoRatio;
    }

    const totalWidth = logo ? logoWidth + textGap + textWidth : textWidth;
    const startX = x + (width - totalWidth) / 2;
    const labelY = y + height + (isCompany ? 24 : 12);

    if (logo) {
      const logoY = labelY + (textHeight - logoHeight) / 2;
      ctx.drawImage(logo, startX, logoY, logoWidth, logoHeight);
    }

    ctx.fillStyle = theme.secondaryText;
    ctx.font = `400 ${fontSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(app.name, logo ? startX + logoWidth + textGap : startX, labelY);
  }
}

export function clearImageCache() {
  imageCache.clear();
}
