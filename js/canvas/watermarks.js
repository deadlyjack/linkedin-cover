// Watermark patterns
import { drawCircle } from '../utils/shapes.js';

export function drawWatermarks(ctx, style, density, opacity, theme, canvasConfig) {
  switch (style) {
    case 'code':
      drawCodeDoodles(ctx, density, opacity, canvasConfig);
      break;
    case 'geometric':
      drawGeometricShapes(ctx, density, opacity, theme, canvasConfig);
      break;
    case 'dots':
      drawDotGrid(ctx, density, opacity, theme, canvasConfig);
      break;
    case 'blobs':
      drawGradientBlobs(ctx, density, opacity, theme, canvasConfig);
      break;
    case 'none':
    default:
      // No watermarks
      break;
  }
}

function drawCodeDoodles(ctx, density, opacity, canvasConfig) {
  const symbols = ['{', '}', '</>', '( )', '[ ]', '//', '++', '=>', '&&', '{ }', '/*', '*/', '===', '||', '< >', '#', '@', '0x', ';', '::'];
  const isCompany = canvasConfig.width > 2000;
  const sizeMultiplier = isCompany ? 2.5 : 1;

  ctx.save();

  for (let i = 0; i < density; i++) {
    const x = Math.random() * canvasConfig.width;
    const y = Math.random() * canvasConfig.height;
    const size = (20 + Math.random() * 20) * sizeMultiplier;
    const rotation = -20 + Math.random() * 40;
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.font = `600 ${size}px "Fira Code", "SF Mono", Consolas, monospace`;
    ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

function drawGeometricShapes(ctx, density, opacity, theme, canvasConfig) {
  const shapes = ['circle', 'square', 'triangle', 'hexagon'];
  const isCompany = canvasConfig.width > 2000;
  const sizeMultiplier = isCompany ? 2.5 : 1;

  ctx.save();
  ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;
  ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
  ctx.lineWidth = isCompany ? 5 : 2;

  for (let i = 0; i < density; i++) {
    const x = Math.random() * canvasConfig.width;
    const y = Math.random() * canvasConfig.height;
    const size = (15 + Math.random() * 30) * sizeMultiplier;
    const rotation = Math.random() * Math.PI * 2;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const filled = Math.random() > 0.5;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    switch (shape) {
      case 'circle':
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        break;
      case 'square':
        ctx.rect(-size / 2, -size / 2, size, size);
        break;
      case 'triangle':
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.closePath();
        break;
      case 'hexagon':
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j;
          const hx = (size / 2) * Math.cos(angle);
          const hy = (size / 2) * Math.sin(angle);
          if (j === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        break;
    }

    if (filled) ctx.fill();
    else ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
}

function drawDotGrid(ctx, density, opacity, theme, canvasConfig) {
  const isCompany = canvasConfig.width > 2000;
  const baseSpacing = Math.max(30, 150 - density * 3);
  const spacing = baseSpacing * (isCompany ? 2.5 : 1);
  const dotSize = isCompany ? 7 : 3;

  ctx.save();
  ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;

  for (let x = spacing; x < canvasConfig.width; x += spacing) {
    for (let y = spacing; y < canvasConfig.height; y += spacing) {
      // Add some randomness
      const jitterX = (Math.random() - 0.5) * 5;
      const jitterY = (Math.random() - 0.5) * 5;
      drawCircle(ctx, x + jitterX, y + jitterY, dotSize, true, false);
    }
  }

  ctx.restore();
}

function drawGradientBlobs(ctx, density, opacity, theme, canvasConfig) {
  const isCompany = canvasConfig.width > 2000;
  const sizeMultiplier = isCompany ? 2.5 : 1;

  ctx.save();

  for (let i = 0; i < Math.min(density / 2, 15); i++) {
    const x = Math.random() * canvasConfig.width;
    const y = Math.random() * canvasConfig.height;
    const size = (50 + Math.random() * 150) * sizeMultiplier;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, `rgba(148, 163, 184, ${opacity * 1.5})`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
