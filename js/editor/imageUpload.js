// Image upload handler
import { store } from '../state/store.js';
import { imageToDataURL } from '../utils/imageLoader.js';
import { forceReloadImages } from '../canvas/renderer.js';

export function createImageUploadSection(apps) {
  const container = document.createElement('div');
  container.className = 'image-upload-section';

  // Apps list
  const appsList = document.createElement('div');
  appsList.className = 'apps-list';

  apps.forEach((app, index) => {
    const appCard = createAppCard(app, index);
    appsList.appendChild(appCard);
  });

  container.appendChild(appsList);

  // Add button
  const addBtn = document.createElement('button');
  addBtn.className = 'add-app-btn';
  addBtn.textContent = '+ Add App Card';
  addBtn.addEventListener('click', () => {
    const success = store.addApp({
      name: 'New App',
      screenshot: null,
      logo: null,
    });

    if (success) {
      // Refresh the section
      const newSection = createImageUploadSection(store.getState().apps);
      container.replaceWith(newSection);
    }
  });

  container.appendChild(addBtn);

  return container;
}

function createAppCard(app, index) {
  const card = document.createElement('div');
  card.className = 'app-card';

  // App name
  const nameField = document.createElement('div');
  nameField.className = 'form-field';

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'App Name';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = app.name;
  nameInput.addEventListener('input', (e) => {
    store.updateApp(index, { name: e.target.value });
  });

  nameField.appendChild(nameLabel);
  nameField.appendChild(nameInput);
  card.appendChild(nameField);

  // Screenshot upload
  const screenshotField = createFileUpload(
    'Screenshot',
    app.screenshot,
    (dataUrl) => {
      store.updateApp(index, { screenshot: dataUrl });
      forceReloadImages();
    }
  );
  card.appendChild(screenshotField);

  // Logo upload
  const logoField = createFileUpload(
    'Logo (optional)',
    app.logo,
    (dataUrl) => {
      store.updateApp(index, { logo: dataUrl });
      forceReloadImages();
    }
  );
  card.appendChild(logoField);

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-app-btn';
  removeBtn.textContent = 'Remove App';
  removeBtn.addEventListener('click', () => {
    if (confirm('Remove this app card?')) {
      store.removeApp(index);
    }
  });
  card.appendChild(removeBtn);

  return card;
}

function createFileUpload(label, currentValue, onUpload) {
  const container = document.createElement('div');
  container.className = 'file-upload-field';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const dataUrl = await imageToDataURL(file);
        onUpload(dataUrl);
      } catch (error) {
        alert('Failed to load image');
        console.error(error);
      }
    }
  });

  const preview = document.createElement('div');
  preview.className = 'image-preview';
  if (currentValue) {
    const img = document.createElement('img');
    img.src = currentValue;
    preview.appendChild(img);
  } else {
    preview.textContent = 'No image';
  }

  container.appendChild(labelEl);
  container.appendChild(input);
  container.appendChild(preview);

  return container;
}

export function createSocialLinksSection(socialLinks) {
  const container = document.createElement('div');
  container.className = 'social-links-section';

  const list = document.createElement('div');
  list.className = 'social-links-list';

  socialLinks.forEach((link, index) => {
    const linkCard = createSocialLinkCard(link, index);
    list.appendChild(linkCard);
  });

  container.appendChild(list);

  // Add button
  const addBtn = document.createElement('button');
  addBtn.className = 'add-link-btn';
  addBtn.textContent = '+ Add Social Link';
  addBtn.addEventListener('click', () => {
    store.addSocialLink({
      icon: 'website',
      text: 'yoursite.com',
      iconUrl: 'https://cdn.simpleicons.org/safari/94a3b8',
    });
  });

  container.appendChild(addBtn);

  return container;
}

function createSocialLinkCard(link, index) {
  const card = document.createElement('div');
  card.className = 'social-link-card';

  // Icon URL
  const iconField = document.createElement('div');
  iconField.className = 'form-field';

  const iconLabel = document.createElement('label');
  iconLabel.textContent = 'Icon URL';

  const iconInput = document.createElement('input');
  iconInput.type = 'text';
  iconInput.value = link.iconUrl;
  iconInput.placeholder = 'https://cdn.simpleicons.org/...';
  iconInput.addEventListener('input', (e) => {
    store.updateSocialLink(index, { iconUrl: e.target.value });
    forceReloadImages();
  });

  iconField.appendChild(iconLabel);
  iconField.appendChild(iconInput);
  card.appendChild(iconField);

  // Text
  const textField = document.createElement('div');
  textField.className = 'form-field';

  const textLabel = document.createElement('label');
  textLabel.textContent = 'Text';

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.value = link.text;
  textInput.addEventListener('input', (e) => {
    store.updateSocialLink(index, { text: e.target.value });
  });

  textField.appendChild(textLabel);
  textField.appendChild(textInput);
  card.appendChild(textField);

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-link-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    store.removeSocialLink(index);
  });
  card.appendChild(removeBtn);

  return card;
}
