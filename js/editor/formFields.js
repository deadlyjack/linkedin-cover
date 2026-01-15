// Form field handlers
import { store } from '../state/store.js';

export function createTextField(label, value, key, placeholder = '') {
  const container = document.createElement('div');
  container.className = 'form-field';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.placeholder = placeholder;
  input.addEventListener('input', (e) => {
    store.updateField(key, e.target.value);
  });

  container.appendChild(labelEl);
  container.appendChild(input);

  return { container, input };
}

export function createTextArea(label, value, key, placeholder = '') {
  const container = document.createElement('div');
  container.className = 'form-field';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.placeholder = placeholder;
  textarea.rows = 2;
  textarea.addEventListener('input', (e) => {
    store.updateField(key, e.target.value);
  });

  container.appendChild(labelEl);
  container.appendChild(textarea);

  return { container, textarea };
}

export function createSlider(label, value, min, max, step, key, unit = '') {
  const container = document.createElement('div');
  container.className = 'form-field';

  const labelContainer = document.createElement('div');
  labelContainer.className = 'slider-label';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;

  const valueDisplay = document.createElement('span');
  valueDisplay.className = 'slider-value';
  valueDisplay.textContent = value + unit;

  labelContainer.appendChild(labelEl);
  labelContainer.appendChild(valueDisplay);

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = min;
  slider.max = max;
  slider.step = step;
  slider.value = value;
  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    valueDisplay.textContent = val + unit;
    store.updateField(key, val);
  });

  container.appendChild(labelContainer);
  container.appendChild(slider);

  return { container, slider, valueDisplay };
}

export function createSelect(label, value, options, key) {
  const container = document.createElement('div');
  container.className = 'form-field';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;

  const select = document.createElement('select');
  select.value = value;

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    store.updateField(key, e.target.value);
  });

  container.appendChild(labelEl);
  container.appendChild(select);

  return { container, select };
}
