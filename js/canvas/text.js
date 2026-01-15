// Text rendering
import { roundRect } from '../utils/shapes.js';

export function drawText(ctx, state, theme, canvasConfig) {
  const { leftPadding, topPadding } = canvasConfig.layout;
  const isCompany = canvasConfig.width > 2000; // Company page is 4200px wide

  // Scale font sizes based on canvas size
  const titleSize = isCompany ? 100 : 52;
  const subtitleSize = isCompany ? 48 : 22;
  const taglineSize = isCompany ? 36 : 18;

  const titleY = topPadding + (isCompany ? 80 : 40);

  // Experience badge - for company: next to title (larger), for personal: above title
  if (state.experience) {
    if (isCompany) {
      // Measure title width first to position badge next to it
      ctx.font = `700 ${titleSize}px Inter, system-ui, sans-serif`;
      const titleWidth = ctx.measureText(state.title).width;
      const badgeSize = 40; // Larger for readability on company page
      const badgeHeight = badgeSize * 2;
      // Vertically center badge with title
      const badgeY = titleY + (titleSize - badgeHeight) / 2;
      drawExperienceBadge(ctx, state.experience, leftPadding + titleWidth + 40, badgeY, theme, badgeSize);
    } else {
      const badgeSize = 14;
      drawExperienceBadge(ctx, state.experience, leftPadding, topPadding, theme, badgeSize);
    }
  }

  // Title
  ctx.fillStyle = theme.primaryText;
  ctx.font = `700 ${titleSize}px Inter, system-ui, sans-serif`;
  ctx.textBaseline = 'top';
  ctx.fillText(state.title, leftPadding, titleY);

  // Subtitle
  ctx.fillStyle = theme.secondaryText;
  ctx.font = `400 ${subtitleSize}px Inter, system-ui, sans-serif`;
  ctx.fillText(state.subtitle, leftPadding, topPadding + (isCompany ? 200 : 108));

  // Tagline
  if (state.tagline) {
    ctx.fillStyle = theme.accent;
    ctx.font = `400 ${taglineSize}px Inter, system-ui, sans-serif`;
    ctx.fillText(state.tagline, leftPadding + (isCompany ? 800 : 400), topPadding + (isCompany ? 320 : 160));
  }
}

function drawExperienceBadge(ctx, text, x, y, theme, fontSize = 14) {
  ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
  const textWidth = ctx.measureText(text).width;
  const padding = fontSize * 1.7;
  const badgeWidth = textWidth + padding;
  const badgeHeight = fontSize * 2;
  const radius = fontSize;

  // Draw badge background
  ctx.beginPath();
  roundRect(ctx, x, y, badgeWidth, badgeHeight, radius);
  ctx.fillStyle = `${theme.accent}26`; // 15% opacity
  ctx.fill();
  ctx.strokeStyle = `${theme.accent}4D`; // 30% opacity
  ctx.lineWidth = fontSize > 30 ? 3 : 1; // Thicker border for larger badges
  ctx.stroke();

  // Badge text
  ctx.fillStyle = theme.accent;
  ctx.font = `600 ${fontSize - 1}px Inter, system-ui, sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + padding / 2, y + badgeHeight / 2);
  ctx.textBaseline = 'top';
}
