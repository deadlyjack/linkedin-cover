// Color picker component
import { store } from '../state/store.js';
import { THEMES } from '../state/defaults.js';

export function createColorPicker(state) {
  const container = document.createElement('div');
  container.className = 'color-picker-section';

  // Theme presets
  const presetsContainer = document.createElement('div');
  presetsContainer.className = 'theme-presets';

  const presetsLabel = document.createElement('label');
  presetsLabel.textContent = 'Theme Presets';
  presetsContainer.appendChild(presetsLabel);

  const presetsGrid = document.createElement('div');
  presetsGrid.className = 'presets-grid';

  Object.entries(THEMES).forEach(([key, theme]) => {
    const btn = document.createElement('button');
    btn.className = 'theme-preset-btn';
    btn.textContent = theme.name;
    if (state.theme === key && !state.customTheme) {
      btn.classList.add('active');
    }

    // Show theme colors as gradient
    btn.style.background = `linear-gradient(135deg, ${theme.bgStart}, ${theme.bgEnd})`;
    btn.style.color = theme.primaryText;

    btn.addEventListener('click', () => {
      store.setState({ theme: key, customTheme: null });
      // Update active state
      presetsGrid.querySelectorAll('.theme-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });

    presetsGrid.appendChild(btn);
  });

  presetsContainer.appendChild(presetsGrid);
  container.appendChild(presetsContainer);

  // Custom colors section
  const customSection = document.createElement('div');
  customSection.className = 'custom-colors';

  const customLabel = document.createElement('label');
  customLabel.textContent = 'Custom Colors';
  customSection.appendChild(customLabel);

  // Get current theme colors
  const currentTheme = state.customTheme || THEMES[state.theme] || THEMES.dark;

  const colorFields = [
    { label: 'Background Start', key: 'bgStart', value: currentTheme.bgStart },
    { label: 'Background End', key: 'bgEnd', value: currentTheme.bgEnd },
    { label: 'Primary Text', key: 'primaryText', value: currentTheme.primaryText },
    { label: 'Secondary Text', key: 'secondaryText', value: currentTheme.secondaryText },
    { label: 'Accent Color', key: 'accent', value: currentTheme.accent },
  ];

  colorFields.forEach(field => {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'color-field';

    const label = document.createElement('label');
    label.textContent = field.label;

    const input = document.createElement('input');
    input.type = 'color';
    input.value = field.value;
    input.addEventListener('input', (e) => {
      const customTheme = state.customTheme || { ...currentTheme };
      customTheme[field.key] = e.target.value;
      store.setState({ customTheme, theme: 'custom' });
    });

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    customSection.appendChild(fieldContainer);
  });

  container.appendChild(customSection);

  return container;
}
