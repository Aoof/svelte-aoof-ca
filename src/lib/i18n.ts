import type { Locale } from '$lib/content/types';

export type { Locale };

export const prefix = (lang: Locale) => (lang === 'fr' ? '/fr' : '');

/** Build a link in the given language. */
export const href = (lang: Locale, path = '/') => {
  const p = prefix(lang);
  if (path === '/' || path === '') return p || '/';
  return p + (path.startsWith('/') ? path : `/${path}`);
};

export const stripLang = (pathname: string) => {
  if (pathname === '/fr') return '/';
  return pathname.startsWith('/fr/') ? pathname.slice(3) : pathname;
};

export const swapLang = (pathname: string, to: Locale) => href(to, stripLang(pathname));

const months: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
};

/** "2025-11" becomes "Nov 2025" or "nov. 2025". Hand-rolled so server and browser always agree. */
export function formatMonth(lang: Locale, ym?: string): string {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  if (!m) return y;
  return `${months[lang][Number(m) - 1]} ${y}`;
}

/** end === '' means ongoing; start === end collapses to one month. */
export function period(
  lang: Locale,
  start: string | undefined,
  end: string | undefined,
  words: { present: string; expected?: string },
  expected = false
): string {
  if (!start) return '';
  const from = formatMonth(lang, start);
  const to = lang === 'fr' ? 'à' : 'to';
  if (end === undefined || end === start) return from;
  if (end === '') return `${from} ${to} ${words.present}`;
  const last = formatMonth(lang, end);
  return expected && words.expected ? `${from} ${to} ${last} (${words.expected})` : `${from} ${to} ${last}`;
}

export const newestFirst = <T extends { start?: string }>(a: T, b: T) =>
  (b.start ?? '').localeCompare(a.start ?? '');

/** Whole months from start to end, counting both months. "1 yr 2 mos". Empty when either month is missing. */
export function duration(
  start: string | undefined,
  end: string | undefined,
  words: Record<string, string>
): string {
  if (!start || !end) return '';
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end.split('-').map(Number);
  const total = (ey - sy) * 12 + (em - sm) + 1;
  if (!(total > 0)) return '';
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? words.yr : words.yrs}`);
  if (months) parts.push(`${months} ${months === 1 ? words.mo : words.mos}`);
  return parts.join(' ');
}
