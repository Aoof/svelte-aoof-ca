import { writable } from 'svelte/store';

export type Locale = 'en' | 'fr';

export const currentLocale = writable<Locale>('en');

export const setLocale = async (newLocale: string) => {
  const nextLocale: Locale = newLocale === 'fr' ? 'fr' : 'en';
  currentLocale.set(nextLocale);

  if (typeof document !== 'undefined') {
    document.documentElement.lang = nextLocale;
    localStorage.setItem('preferredLocale', nextLocale);
  }
};

export const getCurrentLocale = () => {
  let current: Locale = 'en';
  const unsubscribe = currentLocale.subscribe(value => current = value);
  unsubscribe();
  return current;
};

export const initializeLocale = async () => {
  let preferredLocale: Locale = 'en';

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferredLocale');
    if (stored && (stored === 'en' || stored === 'fr')) {
      preferredLocale = stored;
    } else if (navigator.language.split('-')[0] === 'fr') {
      preferredLocale = 'fr';
    }
  }

  await setLocale(preferredLocale);
};