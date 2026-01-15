// Editor panel with collapsible sections
import { createTextField, createTextArea, createSlider, createSelect } from './formFields.js';
import { createColorPicker } from './colorPicker.js';
import { createImageUploadSection, createSocialLinksSection } from './imageUpload.js';
import { WATERMARK_STYLES } from '../state/defaults.js';
import { CANVAS_SIZES } from '../config.js';
import { store } from '../state/store.js';

export class EditorPanel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.sections = [];
    this.prevAppsCount = 0;
    this.prevLinksCount = 0;
    this.init();
  }

  init() {
    this.container.innerHTML = '';
    this.container.className = 'editor-panel';

    const state = store.getState();
    this.prevAppsCount = state.apps.length;
    this.prevLinksCount = state.socialLinks.length;

    // Create sections
    this.createSection('Canvas Settings', this.createCanvasSection(state), true);
    this.createSection('Text Content', this.createTextSection(state), false);
    this.createSection('Social Links', this.createSocialSection(state), false);
    this.createSection('App Cards', this.createAppsSection(state), false);
    this.createSection('Colors & Theme', this.createColorSection(state), false);
    this.createSection('Watermarks', this.createWatermarkSection(state), false);

    // Subscribe to state changes - only refresh when items added/removed
    store.subscribe((newState) => {
      this.refreshSectionsIfNeeded(newState);
    });
  }

  createSection(title, content, expanded = false) {
    const section = document.createElement('div');
    section.className = 'editor-section';

    const header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = `
      <h3>${title}</h3>
      <span class="toggle-icon">${expanded ? '−' : '+'}</span>
    `;

    const body = document.createElement('div');
    body.className = 'section-body';
    body.style.display = expanded ? 'block' : 'none';
    body.appendChild(content);

    header.addEventListener('click', () => {
      const isExpanded = body.style.display === 'block';
      body.style.display = isExpanded ? 'none' : 'block';
      header.querySelector('.toggle-icon').textContent = isExpanded ? '+' : '−';
    });

    section.appendChild(header);
    section.appendChild(body);
    this.container.appendChild(section);

    this.sections.push({ title, body, content });
  }

  createCanvasSection(state) {
    const container = document.createElement('div');

    // Canvas size selector
    const sizeOptions = [
      { value: 'personal', label: 'Personal Profile (1584×396)' },
      { value: 'company', label: 'Company Page (1128×191)' },
    ];

    const { container: sizeField } = createSelect('Canvas Size', state.canvasSize, sizeOptions, 'canvasSize');
    container.appendChild(sizeField);

    // Safe zone toggle
    const safeZoneField = document.createElement('div');
    safeZoneField.className = 'form-field';

    const safeZoneLabel = document.createElement('label');
    safeZoneLabel.textContent = 'Show Safe Zone';

    const safeZoneCheckbox = document.createElement('input');
    safeZoneCheckbox.type = 'checkbox';
    safeZoneCheckbox.checked = state.showSafeZone;
    safeZoneCheckbox.addEventListener('change', (e) => {
      store.updateField('showSafeZone', e.target.checked);
    });

    safeZoneField.appendChild(safeZoneLabel);
    safeZoneField.appendChild(safeZoneCheckbox);
    container.appendChild(safeZoneField);

    // Safe zone view selector
    const viewOptions = [
      { value: 'mobile', label: 'Mobile Only' },
      { value: 'desktop', label: 'Desktop Only' },
      { value: 'both', label: 'Both Overlays' },
    ];

    const { container: viewField } = createSelect('Safe Zone View', state.safeZoneView, viewOptions, 'safeZoneView');
    container.appendChild(viewField);

    return container;
  }

  createTextSection(state) {
    const container = document.createElement('div');

    const { container: titleField } = createTextField('Title', state.title, 'title', 'Software Developer');
    container.appendChild(titleField);

    const { container: subtitleField } = createTextArea('Subtitle', state.subtitle, 'subtitle', 'Your tagline here');
    container.appendChild(subtitleField);

    const { container: taglineField } = createTextField('Tagline', state.tagline, 'tagline', 'Optional tagline');
    container.appendChild(taglineField);

    const { container: expField } = createTextField('Experience Badge', state.experience, 'experience', '5+ Years Experience');
    container.appendChild(expField);

    return container;
  }

  createSocialSection(state) {
    return createSocialLinksSection(state.socialLinks);
  }

  createAppsSection(state) {
    const container = document.createElement('div');

    // Show App Labels toggle
    const labelsField = document.createElement('div');
    labelsField.className = 'form-field';
    labelsField.style.marginBottom = '12px';

    const labelsLabel = document.createElement('label');
    labelsLabel.textContent = 'Show App Labels';

    const labelsCheckbox = document.createElement('input');
    labelsCheckbox.type = 'checkbox';
    labelsCheckbox.checked = state.showAppLabels;
    labelsCheckbox.addEventListener('change', (e) => {
      store.updateField('showAppLabels', e.target.checked);
    });

    labelsField.appendChild(labelsLabel);
    labelsField.appendChild(labelsCheckbox);
    container.appendChild(labelsField);

    // App cards upload section
    const uploadSection = createImageUploadSection(state.apps);
    container.appendChild(uploadSection);

    return container;
  }

  createColorSection(state) {
    return createColorPicker(state);
  }

  createWatermarkSection(state) {
    const container = document.createElement('div');

    // Watermark style selector
    const styleOptions = Object.values(WATERMARK_STYLES).map(style => ({
      value: style.value,
      label: style.name,
    }));

    const { container: styleField } = createSelect('Style', state.watermarkStyle, styleOptions, 'watermarkStyle');
    container.appendChild(styleField);

    // Density slider
    const { container: densityField } = createSlider('Density', state.watermarkDensity, 5, 30, 1, 'watermarkDensity');
    container.appendChild(densityField);

    // Opacity slider
    const { container: opacityField } = createSlider('Opacity', state.watermarkOpacity, 0.02, 0.15, 0.01, 'watermarkOpacity');
    container.appendChild(opacityField);

    return container;
  }

  refreshSectionsIfNeeded(state) {
    // Only refresh sections when items are added/removed, not on text changes
    const appsCountChanged = state.apps.length !== this.prevAppsCount;
    const linksCountChanged = state.socialLinks.length !== this.prevLinksCount;

    if (!appsCountChanged && !linksCountChanged) {
      return; // No structural changes, don't rebuild DOM
    }

    this.sections.forEach(section => {
      if (section.title === 'App Cards' && appsCountChanged) {
        const newContent = this.createAppsSection(state);
        section.body.innerHTML = '';
        section.body.appendChild(newContent);
        this.prevAppsCount = state.apps.length;
      } else if (section.title === 'Social Links' && linksCountChanged) {
        const newContent = this.createSocialSection(state);
        section.body.innerHTML = '';
        section.body.appendChild(newContent);
        this.prevLinksCount = state.socialLinks.length;
      }
    });
  }
}
