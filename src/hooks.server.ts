import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;
  const lang = pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  return response;
};
