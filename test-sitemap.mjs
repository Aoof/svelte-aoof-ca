import { loadContent } from './src/lib/server/content.ts';
import { href } from './src/lib/i18n.ts';

async function test() {
  const { tracks, projects } = await loadContent('en');
  
  console.log('Tracks:', tracks.map(t => t.slug));
  console.log('Projects:', projects.length);
  
  const pages = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/work', priority: 0.8, changefreq: 'weekly' },
    { path: '/experience', priority: 0.7, changefreq: 'monthly' },
    { path: '/events', priority: 0.7, changefreq: 'monthly' },
    { path: '/contact', priority: 0.6, changefreq: 'yearly' },
    { path: '/footnotes', priority: 0.4, changefreq: 'yearly' },
    ...tracks.map((track) => ({ path: `/hire/${track.slug}`, priority: 0.85, changefreq: 'monthly' })),
    ...projects.map((project) => ({ path: `/work/${project.slug}`, priority: 0.65, changefreq: 'monthly' }))
  ];
  
  console.log('\nTotal pages:', pages.length);
  console.log('\nSitemap entries (will be doubled for en/fr):');
  pages.forEach(p => console.log(`  ${p.path} - priority: ${p.priority}, changefreq: ${p.changefreq}`));
}

test().catch(console.error);
