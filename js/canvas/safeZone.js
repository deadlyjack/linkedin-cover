// Safe zone overlay renderer
import { getCanvasSize } from '../config.js';

export function drawSafeZone(ctx, canvasSize, safeZoneView) {
  const size = getCanvasSize(canvasSize);
  const { safeZones } = size;

  ctx.save();

  // Draw based on view selection
  if (safeZoneView === 'mobile' || safeZoneView === 'both') {
    drawZoneOverlay(ctx, safeZones.mobile, 'rgba(239, 68, 68, 0.3)', size.height, 'Mobile');
  }

  if (safeZoneView === 'desktop' || safeZoneView === 'both') {
    drawZoneOverlay(ctx, safeZones.desktop, 'rgba(251, 146, 60, 0.3)', size.height, 'Desktop');
  }

  ctx.restore();
}

function drawZoneOverlay(ctx, zone, color, canvasHeight, label) {
  // zone.y is the distance from the bottom of the canvas
  // Canvas coordinate system starts at top-left, so we need to convert
  const actualY = canvasHeight - zone.y - zone.height;

  // Draw overlay
  ctx.fillStyle = color;
  ctx.fillRect(zone.x, actualY, zone.width, zone.height);

  // Draw border
  ctx.strokeStyle = color.replace('0.3', '0.8');
  ctx.lineWidth = 3;
  ctx.strokeRect(zone.x, actualY, zone.width, zone.height);

  // Draw label
  const fontSize = Math.max(12, zone.width / 20);
  ctx.fillStyle = color.replace('0.3', '0.9');
  ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.fillText(`${label} Avatar Zone`, zone.x + 10, actualY + 20);
}
