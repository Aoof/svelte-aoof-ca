import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
import { writable } from 'svelte/store';

export const locale = writable('en');

// Register locales with lazy loading
register('en', () => import('../locales/en.js'));
register('fr', () => import('../locales/fr.js'));

// Initialize i18n
init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator() || 'en',
});

// Store for current locale
export const currentLocale = locale;

// Function to change locale
export const setLocale = async (newLocale: string) => {
  locale.set(newLocale);
  // This will trigger the lazy loading of the locale
  await import(`./locales/${newLocale}.ts`);
};

// Get current locale synchronously
export const getCurrentLocale = () => {
  let current = 'en';
  locale.subscribe(value => current = value)();
  return current;
};

// Initialize with stored preference or system language
export const initializeLocale = async () => {
  let preferredLocale = 'en';

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferredLocale');
    if (stored && (stored === 'en' || stored === 'fr')) {
      preferredLocale = stored;
    } else {
      // Try to detect system language
      const systemLang = navigator.language.split('-')[0];
      if (systemLang === 'fr') {
        preferredLocale = 'fr';
      }
    }
  }

  await setLocale(preferredLocale);
};