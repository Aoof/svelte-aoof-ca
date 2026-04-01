import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import en from './locales/en.js';

export { locale as currentLocale };

// Register locales with lazy loading
register('en', en);
register('fr', () => import('./locales/fr.js'));

// Initialize i18n
init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator() || 'en',
});

// Function to change locale
export const setLocale = async (newLocale: string) => {
  locale.set(newLocale);
  // This will trigger the lazy loading of the locale
  await import(`./locales/${newLocale}.js`);
  document.documentElement.lang = newLocale;
  localStorage.setItem('preferredLocale', newLocale);
};

// Get current locale synchronously
export const getCurrentLocale = () => {
  let current : string | null | undefined = 'en';
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