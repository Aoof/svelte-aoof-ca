import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
  const { pathname } = event.url;
  const lang = pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
};
