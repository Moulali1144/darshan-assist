import type { AppSettings } from '../types';
import { STORAGE_KEYS } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
  autoBackupEnabled: false,
  encryptionEnabled: true,
  onboardingCompleted: false,
  quickLinksCustom: [],
};

// ─── Chrome Storage wrappers (works in extension context) ─────────────────────

function isChromeExtension(): boolean {
  return typeof chrome !== 'undefined' && !!chrome.storage;
}

export async function getSettings(): Promise<AppSettings> {
  if (isChromeExtension()) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(STORAGE_KEYS.SETTINGS, (result) => {
        resolve({ ...DEFAULT_SETTINGS, ...(result[STORAGE_KEYS.SETTINGS] || {}) });
      });
    });
  }
  // Fallback to localStorage for web dashboard context
  const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<void> {
  const current = await getSettings();
  const merged = { ...current, ...settings };

  if (isChromeExtension()) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [STORAGE_KEYS.SETTINGS]: merged }, resolve);
    });
  }
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
}

export async function getStorageItem<T>(key: string): Promise<T | null> {
  if (isChromeExtension()) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key] ?? null);
      });
    });
  }
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export async function setStorageItem<T>(key: string, value: T): Promise<void> {
  if (isChromeExtension()) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export async function removeStorageItem(key: string): Promise<void> {
  if (isChromeExtension()) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, resolve);
    });
  }
  localStorage.removeItem(key);
}
