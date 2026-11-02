import type { RequestHandler } from './$types';
import { loadContent } from '$lib/server/content';
import { href } from '$lib/i18n';

export const prerender = true;

const origin = 'https://aoof.ca';

export const GET: RequestHandler = async () => {
  const { tracks, projects } = await loadContent('en');
  const paths = [
    '/',
    '/work',
    '/experience',
    '/events',
    '/contact',
    ...tracks.map((track) => `/hire/${track.slug}`),
    ...projects.map((project) => `/work/${project.slug}`)
  ];

  const alternates = (path: string) =>
    `    <xhtml:link rel="alternate" hreflang="en" href="${origin}${href('en', path)}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${origin}${href('fr', path)}"/>`;

  const urls = paths
    .flatMap((path) => (['en', 'fr'] as const).map((lang) => `  <url>
    <loc>${origin}${href(lang, path)}</loc>
${alternates(path)}
  </url>`))
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    { headers: { 'content-type': 'application/xml' } }
  );
};
