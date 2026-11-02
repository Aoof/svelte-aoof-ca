import type { LayoutServerLoad } from './$types';
import { loadContent } from '$lib/server/content';

export const load: LayoutServerLoad = async ({ params }) => {
  const lang = params.lang === 'fr' ? 'fr' : 'en';
  return { lang, content: await loadContent(lang) } as const;
};
