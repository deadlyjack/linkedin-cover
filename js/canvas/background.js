// Background rendering with gradients

export function drawBackground(ctx, theme, canvasConfig) {
  const { width, height } = canvasConfig;

  // Linear gradient background
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, theme.bgStart);
  bgGradient.addColorStop(1, theme.bgEnd);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Radial gradient overlay at top right
  const radialGradient = ctx.createRadialGradient(width, 0, 0, width, 0, width * 0.6);
  radialGradient.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
  radialGradient.addColorStop(1, 'transparent');
  ctx.fillStyle = radialGradient;
  ctx.fillRect(0, 0, width, height);
}
