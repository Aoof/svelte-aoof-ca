import type { RequestHandler } from './$types';
import { loadContent } from '$lib/server/content';
import { href } from '$lib/i18n';

export const prerender = true;

const origin = 'https://aoof.ca';

type PageConfig = {
  path: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

export const GET: RequestHandler = async () => {
  const { tracks, projects } = await loadContent('en');

  // Define page configurations with priority and changefreq
  const pages: PageConfig[] = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/work', priority: 0.8, changefreq: 'weekly' },
    { path: '/experience', priority: 0.7, changefreq: 'monthly' },
    { path: '/events', priority: 0.7, changefreq: 'monthly' },
    { path: '/contact', priority: 0.6, changefreq: 'yearly' },
    { path: '/footnotes', priority: 0.4, changefreq: 'yearly' },
    ...tracks.map((track) => ({ path: `/hire/${track.slug}`, priority: 0.85, changefreq: 'monthly' as const })),
    ...projects.map((project) => ({ path: `/work/${project.slug}`, priority: 0.65, changefreq: 'monthly' as const }))
  ];

  const alternates = (path: string) =>
    `    <xhtml:link rel="alternate" hreflang="en" href="${origin}${href('en', path)}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${origin}${href('fr', path)}"/>`;

  const urls = pages
    .flatMap((page) => (['en', 'fr'] as const).map((lang) => `  <url>
    <loc>${origin}${href(lang, page.path)}</loc>
    <priority>${page.priority.toFixed(1)}</priority>
    <changefreq>${page.changefreq}</changefreq>
${alternates(page.path)}
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
