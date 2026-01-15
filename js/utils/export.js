// Export utilities for canvas

export function downloadCanvas(canvas, filename, format = 'png', quality = 1.0) {
  const link = document.createElement('a');
  link.download = filename;

  if (format === 'jpeg') {
    link.href = canvas.toDataURL('image/jpeg', quality);
  } else {
    link.href = canvas.toDataURL('image/png');
  }

  link.click();
}

export async function copyCanvasToClipboard(canvas) {
  try {
    // Convert canvas to blob
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png');
    });

    // Copy to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);

    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export function scaleCanvas(sourceCanvas, scale) {
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = sourceCanvas.width * scale;
  scaledCanvas.height = sourceCanvas.height * scale;

  const ctx = scaledCanvas.getContext('2d');
  ctx.scale(scale, scale);
  ctx.drawImage(sourceCanvas, 0, 0);

  return scaledCanvas;
}
