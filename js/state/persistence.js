// localStorage persistence
import { CONFIG } from '../config.js';

export function saveState(state) {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}

export function loadState() {
  try {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return null;
  }
}

export function clearState() {
  try {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}
