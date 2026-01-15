// Reactive state store with localStorage persistence
import { DEFAULT_STATE } from './defaults.js';
import { saveState, loadState, clearState } from './persistence.js';
import { CONFIG } from '../config.js';

class Store {
  constructor() {
    this.state = { ...DEFAULT_STATE };
    this.listeners = [];
    this.saveTimeout = null;

    // Load persisted state
    this.loadPersistedState();
  }

  loadPersistedState() {
    const saved = loadState();
    if (saved) {
      this.state = { ...DEFAULT_STATE, ...saved };
    }
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
    this.debouncedSave();
  }

  updateField(key, value) {
    this.setState({ [key]: value });
  }

  updateSocialLink(index, updates) {
    const socialLinks = [...this.state.socialLinks];
    socialLinks[index] = { ...socialLinks[index], ...updates };
    this.setState({ socialLinks });
  }

  addSocialLink(link) {
    const socialLinks = [...this.state.socialLinks, link];
    this.setState({ socialLinks });
  }

  removeSocialLink(index) {
    const socialLinks = this.state.socialLinks.filter((_, i) => i !== index);
    this.setState({ socialLinks });
  }

  updateApp(index, updates) {
    const apps = [...this.state.apps];
    apps[index] = { ...apps[index], ...updates };
    this.setState({ apps });
  }

  addApp(app) {
    if (this.state.apps.length >= CONFIG.MAX_APP_CARDS) {
      alert(`Maximum ${CONFIG.MAX_APP_CARDS} app cards allowed`);
      return false;
    }
    const apps = [...this.state.apps, { ...app, id: Date.now() }];
    this.setState({ apps });
    return true;
  }

  removeApp(index) {
    const apps = this.state.apps.filter((_, i) => i !== index);
    this.setState({ apps });
  }

  resetToDefaults() {
    if (confirm('Reset all settings to defaults? This cannot be undone.')) {
      clearState();
      this.state = { ...DEFAULT_STATE };
      this.notifyListeners();
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  debouncedSave() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      saveState(this.state);
    }, CONFIG.DEBOUNCE_DELAY);
  }
}

// Export singleton instance
export const store = new Store();
