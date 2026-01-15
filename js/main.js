// Main application entry point
import { store } from './state/store.js';
import { EditorPanel } from './editor/panel.js';
import { render, loadAllImages } from './canvas/renderer.js';
import { downloadCanvas, copyCanvasToClipboard, scaleCanvas } from './utils/export.js';
import { getCanvasSize } from './config.js';

class LinkedInCoverApp {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.editor = null;
    this.exportScale = 1;
    this.jpegQuality = 0.95;
    this.currentSize = 'personal';
  }

  async init() {
    // Setup canvas
    this.canvas = document.getElementById('cover');
    this.ctx = this.canvas.getContext('2d');

    // Set initial size
    this.updateCanvasSize(store.getState().canvasSize);

    // Initialize editor panel
    this.editor = new EditorPanel('editor-panel');

    // Setup export controls
    this.setupExportControls();

    // Subscribe to state changes
    store.subscribe((state) => {
      // Update canvas size if changed
      if (state.canvasSize !== this.currentSize) {
        this.updateCanvasSize(state.canvasSize);
        this.currentSize = state.canvasSize;
      }
      this.renderCanvas(state);
    });

    // Initial render
    await this.renderCanvas(store.getState());

    // Wait for fonts to load before final render
    await document.fonts.ready;
    await this.renderCanvas(store.getState());
  }

  updateCanvasSize(sizeKey) {
    const size = getCanvasSize(sizeKey);
    this.canvas.width = size.width;
    this.canvas.height = size.height;

    // Update container class for aspect ratio
    const container = document.getElementById('canvas-container');
    if (container) {
      container.className = `canvas-container size-${sizeKey}`;
    }

    // Update info text
    const infoEl = document.getElementById('canvas-info');
    if (infoEl) {
      infoEl.textContent = `LinkedIn recommended cover size: ${size.width} × ${size.height} pixels (${size.name})`;
    }

    // Update export scale display
    const scaleSelect = document.getElementById('export-scale');
    if (scaleSelect) {
      scaleSelect.innerHTML = `
        <option value="1">1x (${size.width}×${size.height})</option>
        <option value="2">2x (${size.width * 2}×${size.height * 2})</option>
      `;
    }
  }

  async renderCanvas(state) {
    try {
      await render(this.ctx, state, true); // Include safe zone in preview
    } catch (error) {
      console.error('Render error:', error);
      this.showToast('Render error. Check console.', 'error');
    }
  }

  setupExportControls() {
    // Download PNG - render without safe zone
    const downloadPngBtn = document.getElementById('download-png');
    if (downloadPngBtn) {
      downloadPngBtn.addEventListener('click', async () => {
        // Create temporary canvas without safe zone
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        await render(tempCtx, store.getState(), false); // No safe zone

        const canvas = this.exportScale === 2 ? scaleCanvas(tempCanvas, 2) : tempCanvas;
        downloadCanvas(canvas, `linkedin-cover-${this.exportScale}x.png`, 'png');
        this.showToast('PNG downloaded successfully!', 'success');
      });
    }

    // Download JPEG - render without safe zone
    const downloadJpegBtn = document.getElementById('download-jpeg');
    if (downloadJpegBtn) {
      downloadJpegBtn.addEventListener('click', async () => {
        // Create temporary canvas without safe zone
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        await render(tempCtx, store.getState(), false); // No safe zone

        const canvas = this.exportScale === 2 ? scaleCanvas(tempCanvas, 2) : tempCanvas;
        downloadCanvas(canvas, `linkedin-cover-${this.exportScale}x.jpeg`, 'jpeg', this.jpegQuality);
        this.showToast('JPEG downloaded successfully!', 'success');
      });
    }

    // Copy to clipboard - render without safe zone
    const copyBtn = document.getElementById('copy-clipboard');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        // Create temporary canvas without safe zone
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        await render(tempCtx, store.getState(), false); // No safe zone

        const success = await copyCanvasToClipboard(tempCanvas);
        if (success) {
          this.showToast('Copied to clipboard!', 'success');
        } else {
          this.showToast('Failed to copy to clipboard', 'error');
        }
      });
    }

    // Scale selector
    const scaleSelect = document.getElementById('export-scale');
    if (scaleSelect) {
      scaleSelect.addEventListener('change', (e) => {
        this.exportScale = parseInt(e.target.value);
      });
    }

    // JPEG quality slider
    const qualitySlider = document.getElementById('jpeg-quality');
    const qualityDisplay = document.getElementById('quality-value');
    if (qualitySlider) {
      qualitySlider.addEventListener('input', (e) => {
        this.jpegQuality = parseFloat(e.target.value);
        if (qualityDisplay) {
          qualityDisplay.textContent = Math.round(this.jpegQuality * 100) + '%';
        }
      });
    }

    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.resetToDefaults();
        this.showToast('Reset to defaults', 'success');
      });
    }
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new LinkedInCoverApp();
  app.init();
});
